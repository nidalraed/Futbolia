import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const getAuthToken = () => {
  let token = localStorage.getItem('authToken');
  if (!token) {
    token = Cookies.get('authToken');
  }
  return token;
};

const Profile = () => {
  const [userId, setUserId] = useState(1);
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [formbookingData, setFormBookingData] = useState([]);
  const [wishlistData, setWishlistData] = useState([]);
  const [userData, setUserData] = useState({ pic_user: '' });
  const [newUserData, setNewUserData] = useState({ full_name: '', email: '', image: null });
  const [userImage, setUserImage] = useState('');
  const [activeTab, setActiveTab] = useState('EditProfile');
  const [userBookings, setUserBookings] = useState([]);
  const [cancelable, setCancelable] = useState(true);
  const [cancellationExpired, setCancellationExpired] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'YourBooking') {
      fetchUserBookings();
    }
  };

  const fetchUserBookings = async () => {
    try {
      const token = getAuthToken();
  
      if (!token) {
        console.error('Token not found. User not authenticated.');
        return;
      }
  
      const response = await axios.get('http://localhost:2000/user-bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log(response.data);
  
      const bookings = response.data.bookings || [];
  
      if (bookings.length > 0) {
        const currentDateTime = new Date();
        const bookingDateTime = new Date(bookings[0].booking_date);
        const cancellationTimeLimit = new Date(bookingDateTime.getTime() + 60 * 60 * 1000);
  
        setCancelable(currentDateTime < cancellationTimeLimit);
        setCancellationExpired(currentDateTime >= cancellationTimeLimit);
      } else {
        // Handle the case when there are no bookings
        console.warn('No bookings found.');
      }
  
      setUserBookings(bookings);
    } catch (error) {
      console.error('Error fetching user bookings: ', error);
    }
  };

  const fetchUserData = () => {
    const token = getAuthToken();

    if (!token) {
      console.error('Token not found. User not authenticated.');
      return;
    }

    axios.get('http://localhost:2000/user-profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setUserData(response.data.user);
        setFullName(response.data.user.full_name);
        setEmail(response.data.user.email);
        setNewUserData({
          full_name: response.data.user.full_name,
          email: response.data.user.email,
          pic_user: null,
        });
        setUserImage(response.data.user.pic_user);
      })
      .catch(error => {
        console.error('Error fetching user data: ', error);
      });
  };

  const handleSaveDataChanges = async () => {
    try {
      const token = getAuthToken();

      if (!token) {
        console.error('Token not found. User not authenticated.');
        return;
      }

      const data = {
        full_name: newUserData.full_name,
        email: newUserData.email,
      };

      const response = await axios.put(`http://localhost:2000/update-user`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setUserData(response.data.user);
      setFullName(response.data.user.full_name);
      setEmail(response.data.user.email);
      setNewUserData({
        full_name: response.data.user.full_name,
        email: response.data.user.email,
        pic_user: null,
      });

      toast.success('Changes saved successfully', {
        autoClose: 1700,
        position: 'top-center',
      });
      console.log('Response data:', response.data);
    } catch (error) {
      console.error('Error saving changes: ', error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      setNewUserData({
        ...newUserData,
        image: selectedImage,
      });
      setUserImage(URL.createObjectURL(selectedImage));
    }
  };

  const handleSaveImageChanges = async () => {
    try {
      const formData = new FormData();
      formData.append('image', newUserData.image);

      const token = getAuthToken();
      if (!token) {
        console.error('Token not found. User not authenticated.');
        return;
      }

      const response = await axios.post('http://localhost:2000/upload-upic', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setUserImage(response.data.imageUrl);
      toast.success('Changes saved successfully', {
        autoClose: 1700,
        position: 'top-center',
      });
    } catch (error) {
      console.error('Error saving image changes: ', error);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const token = getAuthToken();

      if (!token) {
        console.error('Token not found. User not authenticated.');
        return;
      }


      setCancelable(false);
      setCancellationExpired(true);

      toast.success('Changes saved successfully');
    } catch (error) {
      console.error('Error canceling booking: ', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  useEffect(() => {
    fetchUserBookings();
  }, []); 

  useEffect(() => {
    axios.get('http://localhost:3010/cart')
      .then(response => {
        setWishlistData(response.data);
      })
      .catch(error => {
        console.error('Error fetching wishlist data: ', error);
      });
  }, []);
    useEffect(() => {
    window.scroll({
      top: 0,
      left: 100,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div>
      <div className="sm mt-24 bg-emerald-500 h-52 w-full flex items-center justify-center relative ">
        <img
          src={userImage}
          className="h-32 w-32 rounded-full border-4 border-white absolute"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
          alt="User Profile"
        />
      </div>

      <div className="sm mt-20">
        <div className="text-center p-4">
          <div>
            <span className="font-medium text-gray-900">{full_name}</span><br />
            <span className="text-gray-500">{email}</span><br />
          </div>
        </div>
      </div>

      <ul className="text-sm font-medium text-center text-emerald-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-emerald-700 dark:text-emerald-400">
        <li className="w-full">
          <a
            href="#"
            onClick={() => setActiveTab('EditProfile')}
            className={`inline-block w-full p-4 ${
              activeTab === 'EditProfile'
                ? 'text-emerald-900 bg-gray-100'
                : 'bg-white hover:text-emerald-700 hover:bg-gray-50'
            } rounded-l-lg focus:ring-4 focus:ring-emerald-300 active focus:outline-none dark:bg-emerald-700 dark:text-white`}
            aria-current={activeTab === 'EditProfile' ? 'page' : null}
          >
            Edit Profile
          </a>
        </li>

        <li className="w-full">
          <a
            href="#"
            onClick={() => handleTabClick('YourBooking')}
            className={`inline-block w-full p-4 ${
              activeTab === 'YourBooking'
                ? 'bg-white hover:text-emerald-700 hover:bg-gray-50'
                : 'dark-bg-gray-800 dark-hover-text-white dark-hover-bg-gray-700'
            } focus-ring-4 focus-ring-blue-300 focus-outline-none`}
            aria-current={activeTab === 'YourBooking' ? 'page' : null}
          >
            Your Booking
          </a>
        </li>

        <li className="w-full">
          <a
            href="#"
            onClick={() => setActiveTab('WishList')}
            className={`inline-block w-full p-4 ${
              activeTab === 'WishList'
                ? 'bg-white hover:text-emerald-700 hover:bg-gray-50'
                : 'dark-bg-gray-800 dark-hover-text-white dark-hover-bg-gray-700'
            } rounded-r-lg focus-ring-4 focus-outline-none focus-ring-blue-300`}
            aria-current={activeTab === 'WishList' ? 'page' : null}
          >
            Wish List
          </a>
        </li>
      </ul>

      {activeTab === 'EditProfile' && (
        <div className="flex justify-center mt-20 px-8">
          <form className="max-w-2xl" encType="multipart/form-data" action="/update-profile" method="post">
            <div className="border shadow rounded-lg p-6 bg-white dark:bg-emerald-600">
              <h2 className="text-2xl font-semibold text-emerald-600 dark:text-emerald-300 mb-4">Account Settings</h2>

              <div className="mb-4">
                <label className="text-emerald-600 dark:text-emerald-400 block">Full Name</label>
                <input
                  className="w-full py-2 px-3 border border-emerald-300 rounded-md focus:outline-none focus:border-emerald-500"
                  type="text"
                  value={newUserData.full_name}
                  onChange={(e) => setNewUserData({ ...newUserData, full_name: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="text-emerald-600 dark:text-emerald-400 block">Password</label>
                <input
                  className="w-full py-2 px-3 border border-emerald-300 rounded-md focus:outline-none focus:border-emerald-500"
                  type="password"
                />
              </div>

              <div className="mb-4">
                <label className="text-emerald-600 dark:text-gray-400 block ">Email</label>
                <input
                  className="w-full py-2 px-3 border border-emerald-300 rounded-md focus:outline-none focus:border-emerald-500"
                  type="email"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="text-emerald-600 dark:text-gray-400 block">Profile Picture</label>
                <input
                  className="w-full py-2 px-3 border border-emerald-300 rounded-md focus:outline-none focus:border-emerald-500"
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveDataChanges}
                  className="py-2 px-4 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 focus:outline-none focus:ring focus:border-emerald-300"
                  type="button"
                >
                  Save Data Changes
                </button>
                <button
                  onClick={handleSaveImageChanges}
                  className="ml-2 py-2 px-4 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 focus:outline-none focus:ring focus:border-emerald-300"
                  type="button"
                >
                  Save Image Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
 {activeTab === 'YourBooking' && (
      <section className="overflow-x-auto">
        <h2 className="text-2xl font-semibold text-emerald-600 mb-4 mt-4">Your Bookings:</h2>
        {Array.isArray(userBookings) && userBookings.length > 0 ? (
          <div className="w-full overflow-x-auto">
            <table className="w-full sm:w-auto border-collapse border border-emerald-300 mb-10 sm:ml-96">
              <thead>
                <tr className="bg-emerald-500 text-white">
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Start Time</th>
                  <th className="py-2 px-4">End Time</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {userBookings.map((booking, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                    <td className="py-2 px-4">{booking.name}</td>
                    <td className="py-2 px-4">{booking.booking_date}</td>
                    <td className="py-2 px-4">{booking.start_time}</td>
                    <td className="py-2 px-4">{booking.end_time}</td>
                    <td className="py-2 px-4">
                      {cancelable && !cancellationExpired && (
                        <button
  onClick={() => handleCancelBooking(booking.bookingId)}
  className={`py-2 px-4 ${timeRemaining <= 0 ? 'bg-gray-500' : 'bg-red-500'} text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300`}
  type="button"
  disabled={timeRemaining <= 0}
>
  {timeRemaining <= 0 ? 'Cancellation Expired' : 'Cancel Booking'}
</button>

                      )}
                      {cancellationExpired && (
                        <span className="text-green-500">Booking confirmed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No bookings available.</p>
        )}
      </section>
    )}
        <ToastContainer/>
  </div>
);
};

export default Profile;
