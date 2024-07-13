import React, { useState } from 'react';

const api = {
    baseUrl: "https://api.openweathermap.org/data/2.5/",
    key: ""
};

function App() {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState('');

    const search = event => {
        if (event.key === 'Enter') {
            fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(reponse => reponse.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                });
        }
    };

    return (
        <div>
            <main>
                <div>
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

                    </div>
                ) : ('')}
            </main>
        </div>
    );
}

export default App;