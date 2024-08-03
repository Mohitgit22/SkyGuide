// import React from 'react';

// const TopButtons = ({setQuery}) => {
//     const cities = [
//         { id: 1, name: "London" },
//         { id: 2, name: "Sydney" },
//         { id: 3, name: "Tokyo" },
//         { id: 4, name: "Paris" },
//         { id: 5, name: "Toronto" }
//     ];

//     return (
//         <div className='flex items-center justify-around my-6'>
//             {cities.map((city) => (
//                 <button 
//                     key={city.id}
//                     className='text-lg font-medium hover:bg-gray-700/20 px-3 py-2 
//                     rounded-md transition ease-in'

//                     onClick={() => {setQuery({q: city.name})}}
//                 >
//                     {city.name}
//                 </button>
//             ))}
//         </div>
//     );
// };

// export default TopButtons;


import React from 'react';

const TopButtons = ({ setQuery }) => {
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

export default TopButtons;

