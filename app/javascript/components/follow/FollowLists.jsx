import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline"

const FollowLists = () => {
  const { userId, type } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [follow, setFollow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  const [currentUserFollowerIds, setCurrentUserFollowerIds] = useState([]);
  const [currentUserFollowingIds, setCurrentUserFollowingIds] = useState([]);
  const [currentUserSentReqIds, setCurrentUserSentReqIds] = useState([]);
  const [userSentReqIds, setUserSentReqIds] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/currentUser/${userId}`);
        setUser(response.data.user);
        setCurrentUser(response.data.current_user);
        setCurrentUserFollowerIds(response.data.current_user_followers_id);
        setCurrentUserFollowingIds(response.data.current_user_following_id);
        setCurrentUserSentReqIds(response.data.current_user_pending_request); 
        setUserSentReqIds(response.data.current_user_follow_request);
        setLoading(false);

        if (type === 'followers') {
          setFollow(response.data.followers_users);
        } else {
          setFollow(response.data.following_users);
        }
      } catch (error) {
        setErrors((prev) => [
          ...prev,
          error.response?.data?.error || "Failed to fetch user",
        ]);
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, type]);

  const goToProfile = (id) => {
    navigate(`/profile/${id}`);
  };

  const handleAccept = async (id) => {
    try {
      await axios.post(`/accept/${id}`);
        setUserSentReqIds(prev => prev.filter(usersId => usersId !== id));
        setCurrentUserFollowerIds(prev => [...prev, id]);
    } catch (err) {
      console.error("Accept failed", err);
    }
  };

  const handleDecline = async (id) => {
    try {
      await axios.delete(`/decline/${id}`)
      setUserSentReqIds(prev => prev.filter(usersId => usersId !== id));
    } catch (error) {
      console.error("Error declining request", error)
    }
  }

  const handleUnfollow = async (id) => {
    try {
      await axios.post(`/unfollow/${id}`);
      setCurrentUserFollowingIds(prev => prev.filter(userId => userId !== id));
    } catch (err) {
      console.error("Unfollow failed", err);
    }
  };

  const handleFollow = async (id) => {
    try {
      await axios.post(`/following/${id}`);
      setCurrentUserSentReqIds(prev => [...prev, id]);
    } catch (err) {
      console.error("Follow failed", err);
    }
    
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`/remove/${id}`);
      setCurrentUserSentReqIds(prev => prev.filter(userId => userId !== id));
    } catch (error) {
      console.error("Error removing request", error)
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => goToProfile(user.id)} className="font-md">
          <ArrowLongLeftIcon className="w-5 h-5" />
        </button>

        <h1 className="font-bold text-xl">
          {user.first_name} {user.last_name}'s {type === 'followers' ? 'Followers' : 'Following'}
        </h1>
      </div>

      {follow.length === 0 ? (
        <p>No {type === 'followers' ? 'Followers' : 'Following'}</p>
      ) : (
        follow.map((follows) => {
          const isFollowingMe = currentUserFollowerIds.includes(follows.id);
          const iAmFollowing = currentUserFollowingIds.includes(follows.id);
          const iSentRequest = currentUserSentReqIds.includes(follows.id);
          const sentMeRequest = userSentReqIds.includes(follows.id);

          return (
            <div
              key={follows.id}
              onClick={() => goToProfile(follows.id)}
              className="p-4 border-b border-gray-300 dark:border-gray-700 flex items-center gap-4 w-full text-left cursor-pointer"
            >
              {/* Profile Picture */}
              <img
                src={follows.coverimg_url || "/assets/img/image.png"}
                alt={follows.first_name}
                className="w-14 h-14 rounded-full object-cover"
              />

              {/* User Name */}
              <div className="flex flex-col">
                <p className="text-sm">
                  {follows.first_name} {follows.last_name}
                </p>
              </div>

              {/* Buttons on the right */}
              {currentUser.id !== follows.id && (
                <div className="ml-auto flex gap-2">
                  {sentMeRequest ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); 
                          handleAccept(follows.id);
                        }}
                        className="px-4 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 "
                      >
                        Accept
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDecline(follows.id);
                        }}
                        className="px-4 py-1 text-sm text-white bg-gray-600 rounded hover:bg-gray-700 "
                      >
                        Decline
                      </button>
                    </>
                  ) : isFollowingMe && !iAmFollowing && !iSentRequest ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFollow(follows.id);
                      }}
                      className="px-4 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                      Follow back
                    </button>
                  ) : isFollowingMe && iAmFollowing ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnfollow(follows.id);
                      }}
                      className="px-4 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                      Unfollow
                    </button>
                  ) : iSentRequest ? (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(follows.id);
                      }}
                      className="px-4 py-1 text-sm text-white bg-gray-600 rounded hover:bg-gray-700"
                    >
                      Cancel Request
                    </button>
                  ) : iAmFollowing ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnfollow(follows.id);
                      }}
                      className="px-4 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFollow(follows.id);
                      }}
                      className="px-4 py-1 text-sm text-black rounded bg-white border border-black rounded hover:bg-black hover:text-white"
                    >
                      Follow
                    </button>
                  )}
                </div>              
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default FollowLists;
