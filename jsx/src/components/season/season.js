import React, { useState, useEffect } from 'react';
import { getCurrentWeather } from '../../API/weatherApi';
import '../../Styles/season/season.css';

const vietnamCities = [
    'Ha Noi',
    'Ho Chi Minh',
    'Da Nang',
    'Hai Phong',
    'Can Tho',
    'Bien Hoa',
    'Hue',
    'Nha Trang',
    'Buon Ma Thuot',
    'Quy Nhon',
    'Vung Tau',
    'Nam Dinh',
    'Phan Thiet',
    'Long Xuyen',
    'Ha Long',
    'Thai Nguyen',
    'Thanh Hoa',
    'Rach Gia',
    'Cam Ranh',
    'Vinh',
    'My Tho',
    'Da Lat',
    'Bac Lieu',
    'Bien Hoa'
];

const seasonConfig = {
    summer: {
        text: "let's hit the beach",
        iconName: 'sun'
    },
    winter: {
        text: 'burr, its chilly!',
        iconName: 'snowflake'
    },
    spring: {
        text: 'spring is here, flowers are blooming!',
        iconName: 'flower'
    },
    fall: {
        text: 'leaves are falling, autumn vibes!',
        iconName: 'leaf'
    }
};

const getSeason = (lat, month) => {
    if (month > 2 && month <= 5) {
        return lat > 0 ? 'spring' : 'fall';
    } else if (month >= 6 && month <= 9) {
        return lat > 0 ? 'summer' : 'winter';
    } else {
        return lat > 0 ? 'fall' : 'winter';
    }
};

export default function Season() {
    const [selectedCity, setSelectedCity] = useState('Ho Chi Minh');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWeather(selectedCity);
    }, [selectedCity]);

    const fetchWeather = async (city) => {
        try {
            setLoading(true);
            setError(null);
            const data = await getCurrentWeather(city);
            setWeatherData(data);
            setLoading(false);
        } catch (err) {
            setError('Unable to fetch weather data');
            setLoading(false);
        }
    };

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
    };

    if (loading) {
        return (
            <div className="season-container">
                <div className="season-loading">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="season-container">
                <div className="season-error">{error}</div>
            </div>
        );
    }

    const currentMonth = new Date().getMonth() + 1;
    const monthName = new Date().toLocaleString('en-US', { month: 'long' });
    const season = getSeason(
        weatherData?.location.lat || 0,
        new Date().getMonth()
    );
    const text = seasonConfig[season]?.text || seasonConfig.summer.text;
    const seasonName = season.charAt(0).toUpperCase() + season.slice(1);

    return (
        <div className="season-container">
            <div className="season-center-text">
                <h1 className="season-text">{text}</h1>
                <div className="season-dropdown">
                    <select value={selectedCity} onChange={handleCityChange}>
                        {vietnamCities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {weatherData && (
                <div className="weather-icon weather-icon-top-left">
                    <div className="weather-icon-content">
                        <img
                            src={`https:${weatherData.current.condition.icon}`}
                            alt={weatherData.current.condition.text}
                            className="weather-icon-img"
                        />
                        <div className="weather-info">
                            <h3 className="city-name">{weatherData.location.name}</h3>
                            <p className="temperature">{weatherData.current.temp_c}°C</p>
                            <p className="condition">{weatherData.current.condition.text}</p>
                            <p className="season-info">🌱 {seasonName}</p>
                            <p className="month-info">📅 Month {currentMonth} - {monthName}</p>
                        </div>
                    </div>
                </div>
            )}

            {weatherData && (
                <div className="weather-icon weather-icon-bottom-right">
                    <div className="weather-icon-content">
                        <img
                            src={`https:${weatherData.current.condition.icon}`}
                            alt={weatherData.current.condition.text}
                            className="weather-icon-img"
                        />
                        <div className="weather-info">
                            <h3 className="city-name">{weatherData.location.name}</h3>
                            <p className="temperature">{weatherData.current.temp_c}°C</p>
                            <p className="condition">{weatherData.current.condition.text}</p>
                            <p className="season-info">🌱 {seasonName}</p>
                            <p className="month-info">📅 Month {currentMonth} - {monthName}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}