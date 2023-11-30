import React, { useState, useEffect } from 'react';
import StarRating from 'react-star-rating-component';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Comment() {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [commentsList, setCommentsList] = useState([]);

  const onStarClick = (nextValue) => {
    setRating(nextValue);
  };

  const handlePostComment = () => {
    const token = fetchUserData();

    if (!token) {
      console.error('Authentication token not found. User not authenticated.');
      return;
    }

    const data = {
      comment: comment,
      rating: rating,
    };

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios.post('http://localhost:2000/add-review', data, { headers })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          toast.success('Review added successfully!', {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          // Refresh comments list after posting a new comment
          fetchComments();
        }
      })
      .catch((error) => {
        console.error('Error adding review:', error);
        toast.error('Error adding review. Please try again later.');
      });
  };

  const fetchUserData = () => {
    let token = Cookies.get('authToken');

    if (!token) {
      token = localStorage.getItem('isLoggedIn');
    }

    return token;
  };

  const fetchComments = () => {
    const token = fetchUserData();

    if (!token) {
      console.error('Authentication token not found. Unable to fetch comments.');
      return;
    }

    axios.get('http://localhost:2000/get-reviews', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setCommentsList(response.data); // Assuming your server returns an array of comments
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  };

  useEffect(() => {
    // Fetch comments when the component mounts
    fetchComments();
  }, []);

  return (
    <div>
      <div className="border border-gray-300 p-4 rounded-lg max-w-full mx-auto ">
        <h2 className="text-lg font-medium mb-2">Leave a comment</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="comment">
              Comment
            </label>
            <textarea
              rows={4}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500"
              id="comment"
              placeholder="Enter your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="rating">
              Rating
            </label>
            <StarRating
              name="rating"
              starCount={5}
              value={rating}
              onStarClick={onStarClick}
              emptyStarColor="#ccc"
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-emerald-500 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handlePostComment}
            >
              Post Comment
            </button>
          </div>
        </form>

        {/* Render existing comments */}
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Comments:</h3>
          <ul className="list-none p-0">
            {commentsList.map((commentData, index) => (
              <li key={index} className="mb-4">
                <div className="border p-3 rounded-md bg-gray-100">
                  <p className="text-gray-700">{commentData.comment}</p>
                  <StarRating
                    name={`rating-${index}`}
                    starCount={5}
                    value={commentData.rating}
                    editing={false}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Comment;
