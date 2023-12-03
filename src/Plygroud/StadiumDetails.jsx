import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Comment from './Comment';
import BookingForm from './BookingForm';

const StadiumDetails = () => {
  const [stadium, setStadium] = useState({});
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const fetchStadiumDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/stadium/${id}`);
        setStadium(response.data);
      } catch (error) {
        console.error('Error fetching stadium details:', error);
      }
    };

    if (id) {
      fetchStadiumDetails();
    }
  }, [id]);

  const handleBookNowClick = () => {
    setShowBookingForm(true);
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div>
      {showBookingForm && <BookingForm />}

      <section className="overflow-hidden bg-white py-11 font-poppins dark:bg-gray-800">
        <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6 mt-20">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full mb-8 md:w-1/2 md:mb-0">
              <div className="sticky top-0 z-[3+] overflow-hidden">
                <div className="relative mb-6 lg:mb-10 lg:h-2/4">
                  {stadium.images && stadium.images.length > 0 && (
                    <img
                      src={stadium.images[currentImageIndex]}
                      alt={stadium.name}
                      className="object-cover w-full lg:h-full cursor-pointer"
                      onClick={() =>
                        handleImageClick((currentImageIndex + 1) % stadium.images.length)
                      }
                    />
                  )}
                </div>
                <div className="flex-wrap hidden md:flex">
                  {stadium.images &&
                    stadium.images.slice(1, 5).map((image, index) => (
                      <div key={index} className="w-1/2 p-2 sm:w-1/4">
                        <a
                          href="#"
                          className="block border border-blue-300 hover:border-blue-300"
                          onClick={() => handleImageClick(index + 1)}
                        >
                          <img
                            src={image}
                            alt={stadium.name}
                            className="object-cover w-full lg:h-20 cursor-pointer"
                          />
                        </a>
                      </div>
                    ))}
                </div>

                <div className="px-6 pb-6 mt-6 border-t border-gray-300 dark:border-gray-400 "></div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2">
              <div className="lg:pl-20">
                <div className="mb-8 ">
                  <h2 className="max-w-xl mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                    {stadium.name}
                  </h2>
                  <p className="inline-block mb-6 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                    <span>{stadium.price} JOD</span>
                  </p>
                  <p className="max-w-md text-gray-700 dark:text-gray-400">
                    {stadium.description}
                  </p>
                </div>
                <div className="mb-8 ">
                  <h2 className="w-32 pb-1 mb-6 text-2xl font-bold  border-b border-emerald-300 dark:border-gray-600 dark:text-gray-400">
                    Time Work
                  </h2>
                  <div className="flex items-center mb-4">
                    <p className="text-gray-700 dark:text-gray-400 font-bold text-left">
                      {stadium.timeWork}
                    </p>
                  </div>
                </div>
                <div className="mb-8">
                  <h2 className="w-16 pb-1 mb-6 text-xl font-bold border-b border-emerald-300 dark:border-gray-600 dark:text-gray-400">
                    Details
                  </h2>
                  <div>
                    <p className="text-gray-700 dark:text-gray-400 font-bold text-left">
                      Location : {stadium.location}
                    </p>
                  </div>
                </div>
                <div className="w-32 mb-8"></div>

                <div className="flex flex-wrap items-center gap-4">
                  <Link to="/bookingform">
                    <button
                      className="w-full p-4 bg-emerald-500 rounded-md lg:w-100% text-white hover:bg-emerald-600"
                      onClick={handleBookNowClick}
                    >
                      Book Now
                    </button>
                  </Link>
                  <button
                    className="flex items-center justify-center w-full p-4 text-emerald-500 border border-emerald-500 rounded-md lg:w-2/5 hover:bg-emerald-600 hover:border-emerald-600 hover:text-white"
                    onClick={handleBookNowClick}
                  >
                    Wish List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Comment />
    </div>
  );
};

export default StadiumDetails;
