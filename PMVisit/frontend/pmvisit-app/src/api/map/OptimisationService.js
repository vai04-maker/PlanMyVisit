import {OPT_URL, OPT_KEY} from '../../Constants.js'
const axios = require("axios");

class OptimisationService{

      findRoutes = async (todos) => {
                let path=''
                for(let i=0;i<todos.length;i++){
                        let todo=todos[i];
                        path+=todo['lon'];
                        path+=','
                        path+=todo['lat']
                        if(i<todos.length-1)
                                path+=';'
                        else
                                path+='?'

                }
                console.log(path)
                path = OPT_URL+path+'access_token='+'  '
                console.log(path)
                //"https://api.mapbox.com/optimized-trips/v1/mapbox/driving/-122.42,37.78;-122.45,37.91;-122.48,37.73?access_token=pk.eyJ1IjoidmFpYjA0MDkiLCJhIjoiY2wzYWtrcWFxMDZoMTNjbnJ4a29ncmhwMiJ9.kmpmZ26kYVH8q34bNq4Xiw"

                return axios.get(path)
                /*
                return response
                .then( response =>{
                console.log(response)
                let paths=[]

                for(let i=0;i<todos.length-1;i++){
                        paths[i]={}
                }
                for(let i=0;i<todos.length-1;i++){
                        if(!response.data['waypoints'][i]['waypoint_index']){
                                console.log(response.data['waypoints'][i]['waypoint_index'])
                                paths[response.data['waypoints'][i]['waypoint_index']]['From']=todos[i]['place'];
                        }
                        else if(response.data['waypoints'][i]['waypoint_index']==todos.length-1){
                                console.log(response.data['waypoints'][i]['waypoint_index'])
                                paths[response.data['waypoints'][i]['waypoint_index']-1]['To']=todos[i]['place'];
                        }
                        else{
                                console.log(response.data['waypoints'][i]['waypoint_index'])
                                paths[response.data['waypoints'][i]['waypoint_index']]['From']=todos[i]['place'];
                                paths[response.data['waypoints'][i]['waypoint_index']-1]['To']=todos[i]['place'];
                        }
                        paths[i]['Time']=response.data['trips'][0]['legs'][i]['duration']/60;
                }
                return paths
        }
        )
        */

        }
}

export default new OptimisationService()