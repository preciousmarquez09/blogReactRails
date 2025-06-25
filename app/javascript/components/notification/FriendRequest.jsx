

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getTimeAgo } from '../utils/DateFormat.jsx'; 
import { Navigate, useNavigate } from 'react-router-dom';

const FriendRequest = () => {
    const [friendRequest, setfriendRequest] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    const fetchfriendRequest = async () => {
      try {
        const response = await axios.get("/showFriendRequest")
        setfriendRequest(response.data)
        console.log(response.data)
      } catch (error) {
        console.error("Failed to fetch friendRequest:", error)
      }
    }

    fetchfriendRequest()

    const intervalId = setInterval(fetchfriendRequest, 5000)
    return () => clearInterval(intervalId)
  }, [])

  const goToProfile = async (id) => {
    try {
      navigate(`/profile/${id}`);
    } catch (error) {
      console.error("Error navigating to profile:", error);
    }
  };

  const decline = async (id) => {
    try {
      await axios.delete(`decline/${id}`)
      setfriendRequest((prevFriend) => prevFriend.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error declining request", error)
    }
  }

  const accept = async (id) => {
    try {
      await axios.post(`/accept/${id}`);
      setfriendRequest((prevFriend) => prevFriend.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Accept failed", err);
    }
  };
  
  return (
  <div className="p-4 rounded-lg shadow-sm">
    <h1 className="text-xl font-bold mb-4">Friend Request</h1>
    {friendRequest.length === 0 ? (
      <p>No Friend Request </p>
    ) : (
      friendRequest.map((friend) => (
        <div
          key={friend.user.id}
          onClick={() => goToProfile(friend.user.id)}
          className={`p-4 ${
            friend.read_at ? "bg-white" : "bg-gray-200"
          } border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex items-center gap-4 w-full text-left pointer-cursor`}
        >
          {/* Profile Picture */}
          {friend.actor?.coverimg_url ? (
            <img
              src={friend.actor.coverimg_url}
              alt={friend.actor.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <img
              src="/assets/img/image.png"
              alt="Default profile"
              className="w-14 h-14 rounded-full object-cover"
            />
          )}

          {/* Message and Time */}
          <div className="flex flex-col flex-1">
            <p className="text-sm">{friend.user.first_name} {friend.user.last_name}</p>
            <p className="text-sm text-gray-400">{getTimeAgo(friend.created_at)}</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  accept(friend.followerable_id);
                }}
                className="px-4 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
              >
                Accept
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  decline(friend.followerable_id);
                }}
                className="px-4 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
)

}

export default FriendRequest