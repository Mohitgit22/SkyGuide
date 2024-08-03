import React from 'react';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const Forecast = ({ title, data, type }) => {
    // console.log(data)
    return (
        <div className="bg-black p-6  sm:p-2 rounded-lg shadow-lg">
            <div className="flex items-center justify-start mt-6">
                <p className="text-white font-semibold uppercase text-sm sm:text-lg lg:text-2xl lg:ml-2">{title}</p>
            </div>

            <hr className="my-4 border-gray-800"></hr>
            
            {/* <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5"> */}
            <div className="flex flex-col sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
                {data.map((d, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center bg-black p-4 rounded-lg shadow-md hover:bg-gray-600 transition ease-in-out duration-200 transform hover:-translate-y-1 hover:shadow-lg"
                    > 
                          {type === 'daily' && (
                            <p className="text-white font-light text-xsm mb-2">{formatDate(d.date)}</p>
                        )}
                        <p className="text-white font-light text-sm mb-1">{d.title}</p>
                        <img src={d.icon} alt="weather icon" className="w-12 mb-1" />
                        <p className="text-white font-medium">{`${d.temp.toFixed()}°`}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forecast;
