


import React from 'react';

const MajorCities = ({ setQuery }) => {
  const cities = [
    { id: 1, name: "New Delhi" },
    { id: 2, name: "Toronto" },
    { id: 3, name: "Tokyo" },
    { id: 4, name: "Paris" },
    // { id: 5, name: "Mumbai" },
    // { id: 6, name: "London" },
    // { id: 7, name: "Hong Kong" },
  ];

  return (
    
    <div className=" hidden sm:flex mt-8 items-center">
    
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-lg font-small  text-gray-100 hover:bg-gray-700/20 px-4 py-2 rounded-md transition ease-in"
          onClick={() => { setQuery({ q: city.name }); }}
        >
          {city.name}
        </button>
      ))}
    </div>
  );
};

export default MajorCities;

