import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostPreview from "../post/PostPreview.jsx";

const ProfilePage = () => {
  const { id } = useParams();

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
        setLoading(false);
        console.log("profile_data");
        console.log(id);
        console.log(response.data);
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
        // Now both follow each other
        setMutualFollowing(true);
        setTheyFollowMe(false);

      } else {
        setTheyFollowMe(true);
      }
  
      setReceivedRequest(false); // ✅ clear request
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
            <div className="flex gap-6 text-left w-full max-w-4xl">
              <img
                className="rounded-full w-24 h-24 object-cover"
                src={user?.coverimg_url || "/assets/img/image.png"}
                alt="Profile Picture"
              />

              <div className="flex flex-col justify-start">
                <h1 className="text-4xl md:text-6xl font-extrabold text-black uppercase font-sans">
                  {(user?.first_name || "") + " " + (user?.last_name || "")}
                </h1>

                {user.bio && <h2 className="text-md text-gray-500">{user.bio}</h2>}

                {user.id === currentUser.id ? (
  <button className="mt-4 w-32 px-4 py-1 text-sm font-medium bg-transparent text-black border border-gray-300 rounded-md hover:bg-gray-100 transition">
    Edit Profile
  </button>
) : (
  <>
    {/* 🔼 Top: Follow-related button */}
    { mutualFollowing  ? (
      <button
        onClick={handleUnfollow}
        className="mt-4 w-32 px-4 py-1 text-sm font-medium bg-white text-black border border-gray-300 rounded-md hover:bg-gray-100 transition"
      >
        Unfollow
      </button>
    ) : theyFollowMe && !alreadyFollowing && !alreadySentRequest ? (
      <button
        onClick={handleFollow}
        className="mt-4 w-32 px-4 py-1 text-sm font-medium bg-blue-500 text-white border border-blue-500 rounded-md hover:bg-blue-600 transition"
      >
        Follow Back
      </button>
    ) : alreadyFollowing ? (
      <button
        onClick={handleUnfollow}
        className="mt-4 w-32 px-4 py-1 text-sm font-medium bg-white text-black border border-gray-300 rounded-md hover:bg-gray-100 transition"
      >
        Following
      </button>
    ) : alreadySentRequest ? (
      <button
        onClick={handleRemove}
        className="mt-4 w-32 px-4 py-1 text-sm font-medium bg-white text-black border border-gray-300 rounded-md hover:bg-gray-100 transition"
      >
        Request Sent
      </button>
    ) : (
      <button
        onClick={handleFollow}
        className="mt-4 w-32 px-4 py-1 text-sm font-medium bg-blue-500 text-white border border-blue-500 rounded-md hover:bg-blue-600 transition"
      >
        Follow
      </button>
    )}

    {/* 🔽 Bottom: "User wants to follow you" + Accept/Decline */}
    {receivedRequest && (
      <div className="mt-4 space-y-2">
        <p className="text-sm text-gray-600">
          {(user?.first_name || "") + " " + (user?.last_name || "")} wants to follow you
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleAccept}
            className="w-32 px-4 py-1 text-sm font-medium bg-blue-500 text-white border border-blue-500 rounded-md hover:bg-blue-600 transition"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="w-32 px-4 py-1 text-sm font-medium bg-white text-black border border-gray-300 rounded-md hover:bg-gray-100 transition"
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
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold font-sans">123</h1>
              <h2 className="text-xs md:text-sm text-gray-500">FOLLOWERS</h2>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold font-sans">12345</h1>
              <h2 className="text-xs md:text-sm text-gray-500">FOLLOWING</h2>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold font-sans">123</h1>
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
