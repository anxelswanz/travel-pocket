import axios from "axios";

export const getPlaceData = async (type, sw, ne) => {
    try {
        const response = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY,
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        });
        console.log('response =>' + response);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}


export const getWeatherData = async (lat, lng) => {
    try {
        const response = await axios.get('https://weatherapi-com.p.rapidapi.com/current.json', {
            params: { q: `${lat},${lng}` },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY,
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        })
        return response.data;
    } catch (e) {

    }
}