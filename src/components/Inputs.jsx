import React, { useState } from 'react';
import { BiSearch, BiCurrentLocation } from "react-icons/bi";

const Inputs = ({ setQuery, setUnits }) => {
    const [city, setCity] = useState("");

    const handleSearchClick = () => {
        if (city !== "") setQuery({ q: city });
    };

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setQuery({ lat: latitude, lon: longitude });
            });
        }
    };

    return (
        <div className="flex flex-col sm:flex-row justify-center my-6 space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex flex-row w-full sm:w-3/4 items-center justify-center space-x-4">
                <input
                    value={city}
                    onChange={(e) => setCity(e.currentTarget.value)}
                    type="text"
                    placeholder="Search City"
                    className="text-gray-900 text-md font-light p-2 w-[100%] shadow-xl rounded-md focus:outline-none placeholder:lowercase"
                />
                <BiSearch
                    size={30}
                    className="text-white cursor-pointer transition ease-out hover:scale-125 hover:text-gray-600"
                    onClick={handleSearchClick}
                />
                <BiCurrentLocation
                    size={30}
                    className="text-white cursor-pointer transition ease-out hover:scale-125 hover:text-gray-600"
                    onClick={handleLocationClick}
                />
            </div>

            <div className="flex flex-row items-center justify-center w-full sm:w-1/4 space-x-2">
                <button
                    className="text-xl font-medium transition ease-out hover:scale-125 hover:text-gray-600"
                    onClick={() => { setUnits("metric"); }}
                >
                    °C
                </button>
                <p className="text-xl font-medium">|</p>
                <button
                    className="text-xl font-medium transition ease-out hover:scale-125 hover:text-gray-600"
                    onClick={() => { setUnits("imperial"); }}
                >
                    °F
                </button>
            </div>
        </div>
    );
};

export default Inputs;
