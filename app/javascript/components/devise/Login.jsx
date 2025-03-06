import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import showAlert from "../Alert";
import { EnvelopeIcon, LockClosedIcon } from  "@heroicons/react/24/outline";

const Login = ({ onLoginSuccess, refreshCsrfToken }) => {

=======
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ onLoginSuccess, refreshCsrfToken }) => {
>>>>>>> feat: Crud app with react-rails
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
<<<<<<< HEAD

    // check if user is login, if yes then call the onlogin success to create new csrf then go to post
    // this is useful when we accidentally close the page then goes back again to prevent logging in again
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await axios.get("/users/check_auth");
=======
  
    axios.defaults.withCredentials = true;
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await axios.get("/users/check_auth", { withCredentials: true });
>>>>>>> feat: Crud app with react-rails
          if (response.data.logged_in) {
            onLoginSuccess();
            navigate("/post");
          }
        } catch (err) {
          console.log("Not logged in");
        }
      };
      checkAuth();
    }, [onLoginSuccess, navigate]);
  
<<<<<<< HEAD
    // when user click the login button it sends a request to validate the email and password
    // if successfully login get another csrf token
=======
>>>>>>> feat: Crud app with react-rails
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
      
        try {
<<<<<<< HEAD
          await refreshCsrfToken();
      
          const response = await axios.post(
             "/users/sign_in", { user: { email, password } }
=======
          await refreshCsrfToken(); // ✅ Ensure we use the latest CSRF token
      
          const response = await axios.post(
            "/users/sign_in",
            { user: { email, password } },
            { withCredentials: true }
>>>>>>> feat: Crud app with react-rails
          );
      
          if (response.status === 200) {
            console.log("Login successful:", response.data);
      
<<<<<<< HEAD
            await refreshCsrfToken();
            
            showAlert("Logged In", "You logged in to your accound", "success");
            onLoginSuccess();
            navigate("/home");
          }
        } catch (err) {
          setError("Invalid email or password. Please try again.");
        }
      };
  
    return (
      
      <div className="flex justify-center items-center min-h-[75vh] ">
      <form onSubmit={handleLogin} className="w-full max-w-md p-8 border rounded-2xl shadow-lg bg-white flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

        {error && (
          <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        {/* Email Field */}
        <div className="flex items-center border rounded-md mb-5 px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
          <EnvelopeIcon className="w-5 h-5 text-gray-500 mr-3" />
=======
            await refreshCsrfToken(); // ✅ Refresh CSRF token again after login
            onLoginSuccess();
            navigate("/post");
          }
        } catch (err) {
          console.error("Login error:", err.response?.data || err.message);
          setError("Invalid email or password. Please try again.");
        }
      };
      
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin} className="w-80 p-4 border rounded shadow">
>>>>>>> feat: Crud app with react-rails
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
<<<<<<< HEAD
            className="w-full outline-none bg-transparent"
            required
          />
        </div>

        {/* Password Field */}
        <div className="flex items-center border rounded-md mb-5 px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
          <LockClosedIcon className="w-5 h-5 text-gray-500 mr-3" />
=======
            className="w-full p-2 mb-3 border rounded"
            required
          />
>>>>>>> feat: Crud app with react-rails
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
<<<<<<< HEAD
            className="w-full outline-none bg-transparent"
            required
          />
        </div>

        {/* Remember Me Checkbox */}
        <label className="flex items-center space-x-2 ml-5 cursor-pointer text-gray-700 text-sm">
          <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
          <span>Remember Me</span>
        </label>

        {/* Login Button */}
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300 mt-4">
          Login
        </button>

        {/* Signup Link */}
        <p className="text-gray-600 text-sm mt-4 text-center">
          New to Article App?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline font-medium">
            Create an account
          </Link>
        </p>
      </form>
    </div>
=======
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Login
          </button>
        </form>
      </div>
>>>>>>> feat: Crud app with react-rails
    );
  };
  
  export default Login;
  