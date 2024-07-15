import React, { useState } from 'react';

const api = {
    baseUrl: "https://api.openweathermap.org/data/2.5/",
    key: ""
};

// 300000ms is 5 minutes
const cacheLife = 300000;

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const weatherCache = new Map();

const dateBuilder = (date) => {
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
};

function getFromCache(location) {
    if (weatherCache.has(location) && weatherCache.get(location).date >= Date.now() - cacheLife) {
        return weatherCache.get(location);
    } else {
        return null;
    }
}

function insertIntoCache(location, weather) {
    weatherCache.set(location, {weather: weather, date: Date.now()});
}

function App() {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState('');

    const search = event => {
        if (event.key === 'Enter') {
            const cachedRecord = getFromCache(query.toLowerCase());
            if (cachedRecord === null) {
                fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
                    .then(reponse => reponse.json())
                    .then(result => {
                        insertIntoCache(query, result)
                        setWeather(result);
                        setQuery('');
                    });
            } else {
                setWeather(cachedRecord.weather);
                setQuery('');
            }
        }
    };

    return (
        <div>
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>
                {(typeof weather.main != 'undefined') ? (
                    <div>
                        <div className="location-box">
                            <div className="location">{weather.name}, {weather.sys.country}</div>
                            <div className="date">{dateBuilder(new Date())}</div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">
                                {Math.round(weather.main.temp)}°c
                            </div>
                            <div className="weather">{weather.weather[0].main}</div>
                        </div>
                    </div>
                ) : ('')}
            </main>
        </div>
    );
}

export default App;