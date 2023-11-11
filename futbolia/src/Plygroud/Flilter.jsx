// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Filter from './Flilter'; // Import the Filter component

// function Cardsground() {
//   const [latestCards, setLatestCards] = useState([]);

//   useEffect(() => {
//     axios
//       .get('http://localhost:3010/playgrounds')
//       .then((response) => {
//         setLatestCards(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching latest cards:', error);
//       });
//   }, []);

//   useEffect(() => {
//     // Add event listener for smooth scrolling
//     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//       anchor.addEventListener('click', function (e) {
//         e.preventDefault();

//         document.querySelector(this.getAttribute('href')).scrollIntoView({
//           behavior: 'smooth',
//         });
//       });
//     });
//   }, []);

//   return (
//     <div>
//       {/* Add the Filter component here */}
//       <Filter data={latestCards} />

//       {/* Display filtered cards */}
//       <div className="flex flex-wrap justify-center mt-10 p-2">
//         {latestCards.map((card) => (
//           <div
//             key={card.id}
//             className="max-w-xs cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md m-4 relative"
//             onClick={() => {
//               console.log(`Clicked on card with ID ${card.id}`);
//               // Add your logic for handling the button click, e.g., navigate to more details page
//             }}
//           >
//             <p className="text-xs opacity-75 mb-2">{card.location}</p>
//             <div className="relative">
//               <img src={card.image} alt={card.name} className="w-full rounded-lg object-cover object-center" />
//               <div className="absolute top-0 right-0 p-3 bg-emerald-600">
//                 <svg
//                   className="w-4 h-4 text-yellow-300 me-1"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 22 20"
//                 >
//                   <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//                 </svg>
//                 <p className="text-2xs font-medium text-white">{card.rating}</p>
//               </div>
//             </div>
//             <div className="my-4 ml-4 font-bold text-gray-500">{card.name}</div>
//             <div className="ml-4 text-xl font-semibold text-gray-800">{`${card.price} JOD`}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Cardsground;
