import axios from "axios";
// export const serverURL = 'http://localhost:8000';
export const serverURL = 'https://api7.indiabuzz.co.in';

export const getData = async (url) => {
    try {
        var response = await fetch(`${serverURL}/${url}`)
        var result = await response.json()
        return (result)
    }
    catch (e) {
        return (null)
    }
}

export const postData = async (url, body) => {
    
    try {
        var response = await axios.post(`${serverURL}/${url}`, body)
        var result = await response.data
        return (result)
    }
    catch (error) {
        return (false)
    }
}

