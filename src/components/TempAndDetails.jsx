import React from 'react'

import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";


const TempAndDetails = ({ weather: { details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    name },
    units
 }) => {

    const verticalDetails = [
        {
            id: 1,
            Icon: FaThermometerEmpty,
            title: "Real Feel",
            value: `${feels_like.toFixed()}°`
        },
        {
            id: 2,
            Icon: BiSolidDropletHalf,
            title: "Humidity",
            value: `${humidity.toFixed()}%`
        },
        {
            id: 3,
            Icon: FiWind,
            title: "Wind",
            value: `${speed.toFixed()} ${ units === 'metric' ? 'km/hr' : 'm/s' }`
        }
    ]
    const horizontalDetails = [
        {
            id: 1,
            Icon: GiSunrise,
            title: "",
            value: sunrise
        },
        {
            id: 2,
            Icon: GiSunset,
            title: "",
            value: sunset
        },
        {
            id: 3,
            Icon: MdKeyboardArrowUp,
            title: "H",
            value: `${temp_max.toFixed()}°`
        },
        {
            id: 4,
            Icon: MdKeyboardArrowDown,
            title: "L",
            value: `${temp_min.toFixed()}°`
        }
    ]
    return (
        <div>
        <div className="flex flex-col sm:flex-row items-center justify-between py-3 space-y-6 sm:space-y-0">
            <img
                src={icon}
                alt="weather icon"
                className=" w-24 sm:w-20"
            />

            <div className="text-center space-y-2">
                <div className="text-xl font-light">My Location</div>
                <div className="text-cyan-600">{name} - {details}</div>
                <p className="text-5xl sm:text-7xl font-light">{`${temp.toFixed()}°`}</p>
            </div>

            <div className="flex flex-col space-y-3 items-start">
                {verticalDetails.map(({ id, Icon, title, value }) => (
                    <div
                        key={id}
                        className="flex font-light text-sm items-center"
                    >
                        <Icon size={20} className="mr-2" />
                        {`${title}: `}
                        <span className="font-medium ml-1">{value}</span>
                    </div>
                ))}
            </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-10 text-sm py-3">
            {horizontalDetails.map(({ id, Icon, title, value }) => (
                <div key={id} className="flex flex-row items-center space-x-2">
                    <Icon size={30} />
                    <p className="font-light">
                        {`${title}: `}
                        <span className="font-medium ml-1">{value}</span>
                    </p>
                </div>
            ))}
        </div>
    </div>
    )
}

export default TempAndDetails