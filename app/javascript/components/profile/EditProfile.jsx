import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import showAlert from "../Alert";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setconfirmPassword] = useState("");

  const [user, setUser] = useState([]);

  // Error states
  const [firstNameErrors, setFirstNameErrors] = useState([]);
  const [lastNameErrors, setLastNameErrors] = useState([]);
  const [birthdayErrors, setBirthdayErrors] = useState([]);
  const [emailErrors, setEmailErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [confirmationPasswordErrors, setConfirmationPasswordErrors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get("/users/profile");
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setBio(response.data.bio);
        setBirthday(response.data.birthday);
        setEmail(response.data.email);
        setPreviewImage(response.data.cover_img);
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };
    fetchCurrentUser();
  }, []);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    // Only allow JPEG or PNG
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setProfileImage(file);
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      showAlert("Invalid File", "Please upload a JPEG or PNG image", "error");
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear errors before submitting
    setFirstNameErrors([]);
    setLastNameErrors([]);
    setEmailErrors([]);
    setBirthdayErrors([]);
    setPasswordErrors([]);
    setConfirmationPasswordErrors([]);

    const formData = new FormData();
    formData.append("user[first_name]", first_name);
    formData.append("user[last_name]", last_name);
    formData.append("user[email]", email);
    formData.append("user[password]", password);
    formData.append("user[password_confirmation]", password_confirmation);
    formData.append("user[birthday]", birthday);
    formData.append("user[bio]", bio);
    if (profileImage) {
      formData.append("user[cover_img]", profileImage);
    }

    try {
      await axios.put(`/users/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showAlert("Saved!", "Profile updated successfully", "success", "success");
      navigate(`/profile/${user.id}`);
    } catch (error) {
      if (error.response?.data?.errors) {
        showAlert("Error Updating Profile!", "Please check the form", "error");
        const errors = error.response.data.errors;

        setFirstNameErrors(errors.filter(err => err.toLowerCase().includes("first name")));
        setLastNameErrors(errors.filter(err => err.toLowerCase().includes("last name")));
        setBirthdayErrors(errors.filter(err => err.toLowerCase().includes("date of birth") || err.toLowerCase().includes("birthday")));
        setEmailErrors(errors.filter(err => err.toLowerCase().includes("email")));
        setPasswordErrors(errors.filter(err => err.toLowerCase().includes("password") && !err.toLowerCase().includes("confirmation")));
        setConfirmationPasswordErrors(errors.filter(err => err.toLowerCase().includes("confirmation")));

        console.log(errors);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const goToProfile = (id) => {
    navigate(`/profile/${id}`);
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => goToProfile(user.id)} className="font-md">
          <ArrowLongLeftIcon className="w-5 h-5" />
        </button>
        <h1 className="font-bold text-xl">Edit Profile</h1>
      </div>

      {/* 🖼 Profile Picture Upload */}
      <div className="flex justify-center mb-5 px-4 sm:px-8 md:px-12 lg:px-20">
        <div className="flex flex-col items-center gap-2">
          <div
            className="relative w-28 h-28 rounded-full overflow-hidden cursor-pointer hover:opacity-80"
            onClick={handleImageClick}
          >
            <img
              src={
                previewImage ||
                "/assets/img/image.png"
              }
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <button
            type="button"
            onClick={handleImageClick}
            className="text-sm text-blue-600"
          >
            Change Profile Picture
          </button>
        </div>
      </div>

      {/* 📝 Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-4 px-4 sm:px-8 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 dark:text-white">
              First Name
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {firstNameErrors.map((err, i) => (
              <p key={i} className="text-red-500 text-sm mt-1">{err}</p>
            ))}
          </div>

          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 dark:text-white">
              Last Name
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
            {lastNameErrors.map((err, i) => (
              <p key={i} className="text-red-500 text-sm mt-1">{err}</p>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-semibold text-gray-700 dark:text-white">
              Bio
            </label>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {bio?.length}/150 characters
            </span>
          </div>
          <textarea
            maxLength={150}
            rows={3}
            className="w-full p-2 border rounded-md resize-none dark:bg-gray-700 dark:text-white"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="text-sm font-semibold text-gray-700 dark:text-white">
              Email
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailErrors.map((err, i) => (
              <p key={i} className="text-red-500 text-sm mt-1">{err}</p>
            ))}
          </div>

          <div className="flex-1">
            <label className="text-sm font-semibold text-gray-700 dark:text-white">
              Birthday
            </label>
            <input
              type="date"
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
            {birthdayErrors.map((err, i) => (
              <p key={i} className="text-red-500 text-sm mt-1">{err}</p>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="text-sm font-semibold text-gray-700 dark:text-white flex items-center gap-2">
              Password
              <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                (Required to confirm or update)
              </span>
            </label>


            <input
              type="password"
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordErrors.map((err, i) => (
              <p key={i} className="text-red-500 text-sm mt-1">{err}</p>
            ))}
          </div>

          <div className="flex-1">
            <label className="text-sm font-semibold text-gray-700 dark:text-white">
              Password Confirmation
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              value={password_confirmation}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
            {confirmationPasswordErrors.map((err, i) => (
              <p key={i} className="text-red-500 text-sm mt-1">{err}</p>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full font-black mb-5 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 dark:bg-blue-700 dark:hover:bg-blue-900"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
