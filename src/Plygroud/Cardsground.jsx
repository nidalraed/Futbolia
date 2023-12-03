import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Cardsground() {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [playgrounds, setPlaygrounds] = useState([]);
  const [filteredPlaygrounds, setFilteredPlaygrounds] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    location: '',
    rating: '',
    sizeOfField: '',
  });
  const [locations, setLocations] = useState([]);
  const [fieldSizes, setFieldSizes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3010/filterplayground')
      .then((response) => {
        setPlaygrounds(response.data);
        setFilteredPlaygrounds(response.data);
        const uniqueLocations = [...new Set(response.data.map(playground => playground.location))];
        const uniqueFieldSizes = [...new Set(response.data.map(playground => playground.sizeOfField))];
        setLocations(uniqueLocations);
        setFieldSizes(uniqueFieldSizes);
      })
      .catch((error) => {
        console.error('Error fetching playgrounds:', error);
      });
  }, []);

  useEffect(() => {
    filterPlaygrounds();
  }, [filterCriteria, currentPage]);

  const filterPlaygrounds = () => {
    let filtered = [...playgrounds];

    if (filterCriteria.location) {
      filtered = filtered.filter(playground =>
        playground.location.toLowerCase().includes(filterCriteria.location.toLowerCase())
      );
    }

    if (filterCriteria.rating) {
      filtered = filtered.sort((a, b) => {
        if (filterCriteria.rating === 'lowToHigh') {
          return a.rating - b.rating;
        } else {
          return b.rating - a.rating;
        }
      });
    }

    if (filterCriteria.sizeOfField) {
      filtered = filtered.filter(playground =>
        playground.sizeOfField === filterCriteria.sizeOfField
      );
    }

    setFilteredPlaygrounds(filtered);
  };

  const handleLocationChange = (e) => {
    setFilterCriteria({ ...filterCriteria, location: e.target.value });
    setCurrentPage(1);
  };

  const handleRatingChange = (e) => {
    setFilterCriteria({ ...filterCriteria, rating: e.target.value });
    setCurrentPage(1);
  };

  const handleFieldSizeChange = (e) => {
    setFilterCriteria({ ...filterCriteria, sizeOfField: e.target.value });
    setCurrentPage(1);
  };

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredPlaygrounds.slice(firstItemIndex, lastItemIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='mt-32'>
      <div className="relative inline-flex mb-6">
        <select
          value={filterCriteria.location}
          onChange={handleLocationChange}
          className="inline-flex items-center justify-center h-10 gap-8 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
        >
          <option value="">All Locations</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>{location}</option>
          ))}
        </select>

        <select
          value={filterCriteria.rating}
          onChange={handleRatingChange}
          className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none ml-4"
        >
          <option value="">All Ratings</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>

        <select
          value={filterCriteria.sizeOfField}
          onChange={handleFieldSizeChange}
          className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none ml-4"
        >
          <option value="">All Sizes</option>
          {fieldSizes.map((size, index) => (
            <option key={index} value={size}>{size}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ml-16 mr-16">
        {currentItems.map((playground, index) => (
          <div key={playground.id} className="bg-white shadow-md rounded-xl overflow-hidden">
            <div className="relative h-56 overflow-hidden">
              <img
                src={playground.image}
                alt={playground.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <h5 className="block mb-2 font-sans text-xl font-semibold leading-snug text-blue-gray-900">
                {playground.name}
              </h5>
              <p className="block mb-2 text-sm font-light text-gray-700">
                Location: {playground.location}
              </p>
              <p className="block mb-2 text-sm font-light text-gray-700">
                Rating: {playground.rating}
              </p>
              <p className="block mb-4 text-sm font-light text-gray-700">
                Size of Field: {playground.sizeOfField}
              </p>
              <p className="block text-sm font-light text-gray-700">
                {playground.description}
              </p>
            </div>
            <div className="p-6 pt-0">
              <Link to={`/details/${playground.id}`}>
                <button
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-emerald-600 text-white shadow-md shadow-emerald-900/50 hover:shadow-lg hover:shadow-emerald-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                  type="button"
                >
                  Read More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center mb-10">
        {Array.from({ length: Math.ceil(filteredPlaygrounds.length / itemsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`mx-2 px-4 py-2 rounded-md ${currentPage === i + 1 ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Cardsground;
