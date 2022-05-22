import React, {Component} from 'react'   
import moment from 'moment'
import {ErrorMessage, Field, Form, Formik} from 'formik';
import TodoDataService from '../../api/todo/TodoDataService.js'
import GeocodingService from '../../api/map/GeocodingService.js'
import AuthenticationService from './AuthenticationService.js'

class TodoComponent extends Component {
    constructor(props) {
        super(props)
 
        this.state = {
            id: this.props.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD'),
            place: ''
        }
    }

    componentDidMount(){
        if(this.state.id == -1){
            return;
        }
        else{
        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.retrieveTodo(username, this.state.id)
        .then(response => this.setState({
            description: response.data.description,
            targetDate: response.data.targetDate,
            place: response.data.place
        }))
        }
    }

    validate= (values) =>{
       let errors={}
       if(!values.place){
            errors.description='Enter the place'
       }
       if(!values.description){
           errors.description='Enter a description'
       }
       else if(values.description.length<5){
           errors.description='Enter atleast 5 Characters in Description'
       }
       if(!moment(values.targetDate).isValid()){
           errors.targetDate ='Enter a valid target date.'
       }
       return errors; 
    }
    onSubmit = async (values) => {
        let username = AuthenticationService.getLoggedInUserName();
        console.log("Got username")
        if (this.state.id == -1) {
            console.log("Calling create todo")
            let geocodes= await GeocodingService.geocoding(values.place)
            console.log(geocodes)
            TodoDataService.createTodo(username, {
                id: this.state.id,
                description: values.description,
                targetDate: values.targetDate,
                place: values.place,
                lat: geocodes['lat'],
                lon: geocodes['lng']
            })
            .then(() => this.props.navigate('/todos'))
            .catch( (error) =>{
                console.log("Getting error")
                console.error(error)
            })
        } else {
            console.log("Calling update todo")
            let geocodes= await GeocodingService.geocoding(values.place)
            console.log(geocodes)
            TodoDataService.updateTodo(username, this.state.id, {
                id: this.state.id,
                description: values.description,
                targetDate: values.targetDate,
                place: values.place,
                lat: geocodes['lat'],
                lon: geocodes['lng']
            })
            .then(() => this.props.navigate('/todos'))
            .catch( (error) =>{
                console.log("Getting error")
                console.error(error)
            })
        }
    }

    render() {
        let description = this.state.description
        let targetDate = moment(this.state.targetDate).format('YYYY-MM-DD')
        let place = this.state.place
        return(
        <div> 
            <h1>Todo</h1>
            <div className="container">
                <Formik initialValues={
                    {
                        description: description,
                        targetDate: targetDate,
                        place: place
                    }
                }
                onSubmit={this.onSubmit}
                validate={this.validate}
                validateOnChange={false}
                validateonBlur={false}
                enableReinitialize={true}
                >
                    {
                        (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                    <ErrorMessage name="place" component="div" className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"></Field>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"></Field>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Place</label>
                                        <Field className="form-control" type="text" name="place"></Field>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
        )
    }
}

export default TodoComponent;