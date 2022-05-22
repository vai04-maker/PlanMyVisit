import axios from "axios"

class HelloWorldService{
    executeHelloWorldService() {
        return axios.get('http://localhost:8191/hello-world')
        //console.log("executed service")
    }
}

export default new HelloWorldService()