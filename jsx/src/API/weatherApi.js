import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

// Get current weather for a city
export const getCurrentWeather = async (city = 'Ho Chi Minh') => {
    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json`, {
            params: {
                key: API_KEY,
                q: city,
                aqi: 'no'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching weather:', error);
        throw error;
    }
};

export const getForecastWeather = async (city = 'Ho Chi Minh', days = 3) => {
    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json`, {
            params: {
                key: API_KEY,
                q: city,
                days: days,
                aqi: 'no'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching forecast:', error);
        throw error;
    }
};

// Get weather for multiple cities
export const getMultipleCitiesWeather = async (cities = ['Ho Chi Minh', 'Hanoi']) => {
    try {
        const promises = cities.map(city => getCurrentWeather(city));
        const results = await Promise.all(promises);
        return results;
    } catch (error) {
        console.error('Error fetching multiple cities weather:', error);
        throw error;
    }
};