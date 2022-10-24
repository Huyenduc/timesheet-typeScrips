import appConstants from "../constants/appConstants";

class Authentication{
    constructor(){

    }

    isAuthentication(){
        const token = localStorage.getItem(appConstants.USER_TOKEN)
        
        return token
    }
}

const authentication = new Authentication();

export {authentication};