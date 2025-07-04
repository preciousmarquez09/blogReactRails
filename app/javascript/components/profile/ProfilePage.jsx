import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PostPreview from "../post/PostPreview.jsx";

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  // Followability states
  const [alreadySentRequest, setAlreadySentRequest] = useState(false);
  const [receivedRequest, setReceivedRequest] = useState(false);
  const [mutualFollowing, setMutualFollowing] = useState(false);
  const [alreadyFollowing, setAlreadyFollowing] = useState(false);
  const [theyFollowMe, setTheyFollowMe] = useState(false);

  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [totalLikes, setTotalLikes] = useState([]);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/currentUser/${id}`);
        setUser(response.data.user);
        setCurrentUser(response.data.current_user);
        setAlreadySentRequest(response.data.already_sent_request);
        setReceivedRequest(response.data.received_request);
        setMutualFollowing(response.data.mutual_following);
        setAlreadyFollowing(response.data.already_following);
        setTheyFollowMe(response.data.they_follow_me);
        setFollowersCount(response.data.followers_count);
        setFollowingCount(response.data.following_count);
        setTotalLikes(response.data.total_likes);
        setLoading(false);
      } catch (error) {
        setErrors((prev) => [
          ...prev,
          error.response?.data?.error || "Failed to fetch user",
        ]);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleFollow = async () => {
    try {
      await axios.post(`/following/${id}`);
      setAlreadySentRequest(true);
    } catch (err) {
      console.error("Follow failed", err);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.post(`/unfollow/${id}`);
      setMutualFollowing(false);
      setAlreadySentRequest(false);
      setReceivedRequest(false);
      setAlreadyFollowing(false);
    } catch (err) {
      console.error("Unfollow failed", err);
    }
  };


  const handleAccept = async () => {
    try {
      await axios.post(`/accept/${id}`);
      if (alreadyFollowing) {
        setMutualFollowing(true);
        setTheyFollowMe(false);
      } else {
        setTheyFollowMe(true);
      }
  
      setReceivedRequest(false);
    } catch (err) {
      console.error("Accept failed", err);
    }
  };
  

  const handleRemove = async () => {
    try {
      console.log(id);
      await axios.delete(`/remove/${id}`);
      setAlreadySentRequest(false);
    } catch (error) {
      console.error("Error removing request", error)
    }
  }

  const handleDecline = async () => {
    try {
      await axios.delete(`/decline/${id}`)
      setReceivedRequest(false);
    } catch (error) {
      console.error("Error declining request", error)
    }
  }

  const handleFollowClick = (userId, type) => {
    navigate(`/follows/${userId}/${type}`);
  };

  const goToEditProfile = () => {
    navigate("/editProfile");
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">Loading...</div>
      ) : (
        <div className="p-4">
          {errors.length > 0 && (
            <div className="text-red-500 text-sm mt-2">
              {errors.map((err, idx) => (
                <p key={idx}>{err}</p>
              ))}
            </div>
          )}

          <div className="flex justify-center mb-10">
            <div className="flex gap-6 text-left w-[80%]">
              <img
                className="rounded-full w-24 h-24 object-cover"
                src={user?.coverimg_url || "/assets/img/image.png"}
                alt="Profile Picture"
              />

              <div className="flex flex-col justify-start w-[80%]">
                <h1 className="mb-4 text-4xl md:text-6xl font-extrabold text-black uppercase font-sans">
                  {(user?.first_name || "") + " " + (user?.last_name || "")}
                </h1>

                {user?.bio && <h2 className=" ml-5 text-md text-black">{user?.bio}</h2>}

                {user.id === currentUser.id ? (
                    <button onClick={goToEditProfile}
                      className="mt-4 w-32 px-4 py-1 text-sm font-medium bg-transparent text-black border border-gray-300 rounded-md hover:bg-gray-100 transition">
                      Edit Profile
                    </button>
                  ) : (
                    <>
                      { mutualFollowing  ? (
                        <button
                          onClick={handleUnfollow}
                          className="mt-4 w-32 px-4 py-1 text-sm font-medium bg-blue-600 text-white border border-blue-600 rounded-md hover:bg-blue-700 transition"
                        > 
                          Unfollow
                        </button>
                      ) : theyFollowMe && !alreadyFollowing && !alreadySentRequest ? (
                        <button
                          onClick={handleFollow}
                          className="mt-4 w-32 px-4 py-1 text-sm font-medium bg-blue-600 text-white border border-blue-600 rounded-md hover:bg-blue-700 transition"
                        >
                          Follow Back
                        </button>
                      ) : alreadyFollowing ? (
                        <button
                          onClick={handleUnfollow}
                          className="mt-4 w-32 px-4 py-1 text-sm font-medium bg-blue-600 text-white border border-blue-600 rounded-md hover:bg-blue-700 transition"
                        >
                          Following
                        </button>
                      ) : alreadySentRequest ? (
                        <button
                          onClick={handleRemove}
                          className="mt-4 w-40 px-4 py-1 text-sm font-medium bg-gray-600 text-white border border-gray-600 rounded-md hover:bg-gray-700 transition"
                        >
                          Cancel Request
                        </button>
                      ) : (
                        <button
                          onClick={handleFollow}
                          className="mt-4 w-32 px-4 py-1 text-sm font-medium bg-white text-black border border-black rounded-md hover:bg-black hover:text-white transition"
                        >
                          Follow
                        </button>
                      )}

                      {receivedRequest && (
                        <div className="mt-4 space-y-2">
                          <p className="text-sm text-gray-600">
                            {(user?.first_name || "") + " " + (user?.last_name || "")} wants to follow you
                          </p>  
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={handleAccept}
                              className="w-32 px-4 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                            >
                              Accept
                            </button>
                            <button
                              onClick={handleDecline}
                              className="w-32 px-4 py-1 text-sm font-medium text-white bg-gray-600 rounded hover:bg-gray-700 transition"
                            >
                              Decline
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-10 md:gap-40 text-center mb-10">
            <div onClick={() => handleFollowClick(user.id, 'followers')}>
              <h1 className="text-3xl md:text-4xl font-extrabold font-sans">{followersCount}</h1>
              <h2 className="text-xs md:text-sm text-gray-500">FOLLOWERS</h2>
            </div>
            <div onClick={() => handleFollowClick(user.id, 'following')}>
              <h1 className="text-3xl md:text-4xl font-extrabold font-sans">{followingCount}</h1>
              <h2 className="text-xs md:text-sm text-gray-500">FOLLOWING</h2>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold font-sans">{totalLikes}</h1>
              <h2 className="text-xs md:text-sm text-gray-500">LIKES</h2>
            </div>
          </div>

          <PostPreview id={id} />
        </div>
      )}
    </>
  );
};

export default ProfilePage;
