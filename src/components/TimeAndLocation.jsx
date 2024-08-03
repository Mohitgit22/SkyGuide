import React from 'react';

const TimeAndLocation = ({ weather: { formattedLocalTime, name, country } }) => {
  return (
    <div className="text-left">
      <div className="my-6">
        <p className="text-xl font-extralight text-gray-100">{formattedLocalTime}</p>
      </div>
      <div className="my-3">
        <p className="text-3xl font-medium text-gray-100">{`${name}, ${country}`}</p>
      </div>
    </div>
  );
};

export default TimeAndLocation;
