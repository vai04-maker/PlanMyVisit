import {GEO_API, GEO_KEY} from '../../Constants.js'
const axios = require("axios");

class GeocodingService{

    async geocoding(place){

    const options = {
    method: 'GET',
    url: GEO_API,
    params: {address: `${place}`, language: 'en'},
    headers: {
        'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com',
        'X-RapidAPI-Key':  GEO_KEY
    }
    };


    let response = await axios.request(options)
    console.log(response)
    return response.data.results[0]['location']
    /*
        console.log("Geocoding giving response")
        console.log(response.data.results[0]['location']['lat']);
        val= response.data.results[0]['location']['lat'];
        return val
    }).catch( (error) => {
        console.log("Geocoding unresponsive")
        console.error(error);
    });
    */
    
    }

    


}

export default new GeocodingService()