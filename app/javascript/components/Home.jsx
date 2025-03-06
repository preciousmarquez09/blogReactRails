<<<<<<< HEAD
import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import { ChatBubbleLeftRightIcon, HandThumbUpIcon, BookmarkIcon } from '@heroicons/react/24/outline';

function Home() {
  const [activeTab, setActiveTab] = useState("forYou");

  return (
    <>
      <nav className="flex justify-center items-center gap-14 px-6 pb-6 mt-0">
        <button
          className={`mb-1 pb-2 border-b-4 ${
            activeTab === "forYou" ? "border-blue-500" : "border-transparent"
          }`}
          onClick={() => setActiveTab("forYou")}
        >
          For You
        </button>
        <button
          className={`mb-1 pb-2 border-b-4 ${
            activeTab === "following" ? "border-blue-500" : "border-transparent"
          }`}
          onClick={() => setActiveTab("following")}
        >
          Following
        </button>
      </nav>
      <div className="min-h-screen flex flex-col pb-10">
      {/* Center the Card */}
      <div className="flex justify-center mb-5">
        <div className="block max-w-5xl bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-4 pt-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition">

          {/* Left Side (Text Content) */}
          <div className="flex-grow">
            <div className="flex items-center gap-2">
              {/* Small Image */}
              <Link to="/profile" className="w-8 h-8 flex-shrink-0">
                <img
                  className="rounded-full w-full h-full object-cover"
                  src="/assets/img/image.png"
                  alt="Profile"
                />
              </Link>

              {/* Author Name */}
              <Link to="/profile" className="text-sm font-semibold text-gray-900 dark:text-white hover:underline">
                Mehdi BAFDIL
              </Link>
            </div>

            <Link to="/post" className="block p-2">
              <h5 className="mt-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white  line-clamp-1 hover:underline">
                Express.js Secrets That Senior Developers Don’t Share
              </h5>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-400 text-justify line-clamp-2">
                Express.js has been the backbone of Node.js web development for
                years, but are you truly harnessing its full potential? Most...
                Express.js has been the backbone of Node.js web development for
                years, but are you truly harnessing its full potential? Most...
                Express.js has been the backbone of Node.js web development for
                years, but are you truly harnessing its full potential? Most...
              </p>
            </Link>

            {/* Icons & Actions */}
            <div className=" flex items-center text-sm text-gray-500 dark:text-gray-400 w-full">
  {/* Left-aligned items */}
  <div className="flex items-center space-x-4 mt-1">
    <span>⭐ Dec 3, 2024</span>
    <button className="flex items-center space-x-1 hover:text-blue-500" onClick={() => console.log("like click")}>
      <HandThumbUpIcon className="h-5 w-5" />
      <span>738</span>
    </button>
    <Link to="/post" className="flex items-center space-x-1 hover:text-blue-500">
      <ChatBubbleLeftRightIcon className="h-5 w-5" />
      <span>24</span>
    </Link>
  </div>

  {/* Right-aligned Bookmark */}
  <div className="ml-auto flex items-center space-x-4">
    <button className="flex items-center space-x-1 hover:text-blue-500" onClick={() => console.log("bookmark click")}>
      <BookmarkIcon className="h-7 w-7" />
    </button>
  </div>
</div>


          </div>

          {/* Right Side (Image) */}
          <Link to="/post" className="w-full h-auto md:w-60 md:h-40 flex-shrink-0 mt-2">
            <img
              className="rounded-lg w-full h-full object-cover"
              src="/assets/img/image.png"
              alt="Express.js Image"
            />
          </Link>
        </div>
      </div>
        {/* Center the Card */}
        <div className="flex justify-center mb-5">
        <div className="block max-w-5xl bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-4 pt-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition">

          {/* Left Side (Text Content) */}
          <div className="flex-grow">
            <div className="flex items-center gap-2">
              {/* Small Image */}
              <Link to="/profile" className="w-8 h-8 flex-shrink-0">
                <img
                  className="rounded-full w-full h-full object-cover"
                  src="/assets/img/image.png"
                  alt="Profile"
                />
              </Link>

              {/* Author Name */}
              <Link to="/profile" className="text-sm font-semibold text-gray-900 dark:text-white hover:underline">
                Mehdi BAFDIL
              </Link>
            </div>

            <Link to="/post" className="block p-2">
              <h5 className="mt-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-justify line-clamp-1 hover:underline">
                Express.js Secrets That Senior Developers Don’t Share
              </h5>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-400 text-justify line-clamp-2">
                Express.js has been the backbone of Node.js web development for
                years, but are you truly harnessing its full potential? Most...
                Express.js has been the backbone of Node.js web development for
                years, but are you truly harnessing its full potential? Most...
                Express.js has been the backbone of Node.js web development for
                years, but are you truly harnessing its full potential? Most...
              </p>
            </Link>

            {/* Icons & Actions */}
            <div className=" flex items-center text-sm text-gray-500 dark:text-gray-400 w-full">
  {/* Left-aligned items */}
  <div className="flex items-center space-x-4 mt-1">
    <span>⭐ Dec 3, 2024</span>
    <button className="flex items-center space-x-1 hover:text-blue-500" onClick={() => console.log("like click")}>
      <HandThumbUpIcon className="h-5 w-5" />
      <span>738</span>
    </button>
    <Link to="/post" className="flex items-center space-x-1 hover:text-blue-500">
      <ChatBubbleLeftRightIcon className="h-5 w-5" />
      <span>24</span>
    </Link>
  </div>

  {/* Right-aligned Bookmark */}
  <div className="ml-auto flex items-center space-x-4">
    <button className="flex items-center space-x-1 hover:text-blue-500" onClick={() => console.log("bookmark click")}>
      <BookmarkIcon className="h-7 w-7" />
    </button>
  </div>
</div>


          </div>

          {/* Right Side (Image) */}
          <Link to="/post" className="w-full h-auto md:w-60 md:h-40 flex-shrink-0 mt-2">
            <img
              className="rounded-lg w-full h-full object-cover"
              src="/assets/img/image.png"
              alt="Express.js Image"
            />
          </Link>
        </div>
      </div>
        {/* Center the Card */}
        <div className="flex justify-center mb-5">
        <div className="block max-w-5xl bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-4 pt-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition">

          {/* Left Side (Text Content) */}
          <div className="flex-grow">
            <div className="flex items-center gap-2">
              {/* Small Image */}
              <Link to="/profile" className="w-8 h-8 flex-shrink-0">
                <img
                  className="rounded-full w-full h-full object-cover"
                  src="/assets/img/image.png"
                  alt="Profile"
                />
              </Link>

              {/* Author Name */}
              <Link to="/profile" className="text-sm font-semibold text-gray-900 dark:text-white hover:underline">
                Mehdi BAFDIL
              </Link>
            </div>

            <Link to="/post" className="block p-2">
              <h5 className="mt-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-justify line-clamp-1 hover:underline">
                Express.js Secrets That Senior Developers Don’t Share
              </h5>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-400 text-justify line-clamp-2">
                Express.js has been the backbone of Node.js web development for
                years, but are you truly harnessing its full potential? Most...
                Express.js has been the backbone of Node.js web development for
                years, but are you truly harnessing its full potential? Most...
                Express.js has been the backbone of Node.js web development for
                years, but are you truly harnessing its full potential? Most...
              </p>
            </Link>

            {/* Icons & Actions */}
            <div className=" flex items-center text-sm text-gray-500 dark:text-gray-400 w-full">
  {/* Left-aligned items */}
  <div className="flex items-center space-x-4 mt-1">
    <span>⭐ Dec 3, 2024</span>
    <button className="flex items-center space-x-1 hover:text-blue-500" onClick={() => console.log("like click")}>
      <HandThumbUpIcon className="h-5 w-5" />
      <span>738</span>
    </button>
    <Link to="/post" className="flex items-center space-x-1 hover:text-blue-500">
      <ChatBubbleLeftRightIcon className="h-5 w-5" />
      <span>24</span>
    </Link>
  </div>

  {/* Right-aligned Bookmark */}
  <div className="ml-auto flex items-center space-x-4">
    <button className="flex items-center space-x-1 hover:text-blue-500" onClick={() => console.log("bookmark click")}>
      <BookmarkIcon className="h-7 w-7" />
    </button>
  </div>
</div>


          </div>

          {/* Right Side (Image) */}
          <Link to="/post" className="w-full h-auto md:w-60 md:h-40 flex-shrink-0 mt-2">
            <img
              className="rounded-lg w-full h-full object-cover"
              src="/assets/img/image.png"
              alt="Express.js Image"
            />
          </Link>
        </div>
      </div>
        {/* Center the Card */}
        <div className="flex justify-center mb-5">
        <div className="block max-w-5xl bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-4 pt-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition">

          {/* Left Side (Text Content) */}
          <div className="flex-grow">
            <div className="flex items-center gap-2">
              {/* Small Image */}
              <Link to="/profile" className="w-8 h-8 flex-shrink-0">
                <img
                  className="rounded-full w-full h-full object-cover"
                  src="/assets/img/image.png"
                  alt="Profile"
                />
              </Link>

              {/* Author Name */}
              <Link to="/profile" className="text-sm font-semibold text-gray-900 dark:text-white hover:underline">
                Mehdi BAFDIL
              </Link>
            </div>

            <Link to="/post" className="block p-2">
              <h5 className="mt-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-justify line-clamp-1 hover:underline">
                Express.js Secrets That Senior Developers Don’t Share
              </h5>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-400 text-justify line-clamp-2">
                Express.js has been the backbone of Node.js web development for
                years, but are you truly harnessing its full potential? Most...
                Express.js has been the backbone of Node.js web development for
                years, but are you truly harnessing its full potential? Most...
                Express.js has been the backbone of Node.js web development for
                years, but are you truly harnessing its full potential? Most...
              </p>
            </Link>

            {/* Icons & Actions */}
            <div className=" flex items-center text-sm text-gray-500 dark:text-gray-400 w-full">
  {/* Left-aligned items */}
  <div className="flex items-center space-x-4 mt-1">
    <span>⭐ Dec 3, 2024</span>
    <button className="flex items-center space-x-1 hover:text-blue-500" onClick={() => console.log("like click")}>
      <HandThumbUpIcon className="h-5 w-5" />
      <span>738</span>
    </button>
    <Link to="/post" className="flex items-center space-x-1 hover:text-blue-500">
      <ChatBubbleLeftRightIcon className="h-5 w-5" />
      <span>24</span>
    </Link>
  </div>

  {/* Right-aligned Bookmark */}
  <div className="ml-auto flex items-center space-x-4">
    <button className="flex items-center space-x-1 hover:text-blue-500" onClick={() => console.log("bookmark click")}>
      <BookmarkIcon className="h-7 w-7" />
    </button>
  </div>
</div>


          </div>

          {/* Right Side (Image) */}
          <Link to="/post" className="w-full h-auto md:w-60 md:h-40 flex-shrink-0 mt-2">
            <img
              className="rounded-lg w-full h-full object-cover"
              src="/assets/img/image.png"
              alt="Express.js Image"
            />
          </Link>
        </div>
      </div>
        {/* Center the Card */}
        <div className="flex justify-center mb-5">
        <div className="block max-w-5xl bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-4 pt-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition">

          {/* Left Side (Text Content) */}
          <div className="flex-grow">
            <div className="flex items-center gap-2">
              {/* Small Image */}
              <Link to="/profile" className="w-8 h-8 flex-shrink-0">
                <img
                  className="rounded-full w-full h-full object-cover"
                  src="/assets/img/image.png"
                  alt="Profile"
                />
              </Link>

              {/* Author Name */}
              <Link to="/profile" className="text-sm font-semibold text-gray-900 dark:text-white hover:underline">
                Mehdi BAFDIL
              </Link>
            </div>

            <Link to="/post" className="block p-2">
              <h5 className="mt-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-justify line-clamp-1 hover:underline">
                Express.js Secrets That Senior Developers Don’t Share
              </h5>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-400 text-justify line-clamp-2">
                Express.js has been the backbone of Node.js web development for
                years, but are you truly harnessing its full potential? Most...
                Express.js has been the backbone of Node.js web development for
                years, but are you truly harnessing its full potential? Most...
                Express.js has been the backbone of Node.js web development for
                years, but are you truly harnessing its full potential? Most...
              </p>
            </Link>

            {/* Icons & Actions */}
            <div className=" flex items-center text-sm text-gray-500 dark:text-gray-400 w-full">
  {/* Left-aligned items */}
  <div className="flex items-center space-x-4 mt-1">
    <span>⭐ Dec 3, 2024</span>
    <button className="flex items-center space-x-1 hover:text-blue-500" onClick={() => console.log("like click")}>
      <HandThumbUpIcon className="h-5 w-5" />
      <span>738</span>
    </button>
    <Link to="/post" className="flex items-center space-x-1 hover:text-blue-500">
      <ChatBubbleLeftRightIcon className="h-5 w-5" />
      <span>24</span>
    </Link>
  </div>

  {/* Right-aligned Bookmark */}
  <div className="ml-auto flex items-center space-x-4">
    <button className="flex items-center space-x-1 hover:text-blue-500" onClick={() => console.log("bookmark click")}>
      <BookmarkIcon className="h-7 w-7" />
    </button>
  </div>
</div>


          </div>

          {/* Right Side (Image) */}
          <Link to="/post" className="w-full h-auto md:w-60 md:h-40 flex-shrink-0 mt-2">
            <img
              className="rounded-lg w-full h-full object-cover"
              src="/assets/img/image.png"
              alt="Express.js Image"
            />
          </Link>
        </div>
      </div>
        {/* Center the Card */}
        <div className="flex justify-center mb-5">
        <div className="block max-w-5xl bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-4 pt-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition">

          {/* Left Side (Text Content) */}
          <div className="flex-grow">
            <div className="flex items-center gap-2">
              {/* Small Image */}
              <Link to="/profile" className="w-8 h-8 flex-shrink-0">
                <img
                  className="rounded-full w-full h-full object-cover"
                  src="/assets/img/image.png"
                  alt="Profile"
                />
              </Link>

              {/* Author Name */}
              <Link to="/profile" className="text-sm font-semibold text-gray-900 dark:text-white hover:underline">
                Mehdi BAFDIL
              </Link>
            </div>

            <Link to="/post" className="block p-2">
              <h5 className="mt-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-justify line-clamp-1 hover:underline">
                Express.js Secrets That Senior Developers Don’t Share
              </h5>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-400 text-justify line-clamp-2">
                Express.js has been the backbone of Node.js web development for
                years, but are you truly harnessing its full potential? Most...
                Express.js has been the backbone of Node.js web development for
                years, but are you truly harnessing its full potential? Most...
                Express.js has been the backbone of Node.js web development for
                years, but are you truly harnessing its full potential? Most...
              </p>
            </Link>

            {/* Icons & Actions */}
            <div className=" flex items-center text-sm text-gray-500 dark:text-gray-400 w-full">
  {/* Left-aligned items */}
  <div className="flex items-center space-x-4 mt-1">
    <span>⭐ Dec 3, 2024</span>
    <button className="flex items-center space-x-1 hover:text-blue-500" onClick={() => console.log("like click")}>
      <HandThumbUpIcon className="h-5 w-5" />
      <span>738</span>
    </button>
    <Link to="/post" className="flex items-center space-x-1 hover:text-blue-500">
      <ChatBubbleLeftRightIcon className="h-5 w-5" />
      <span>24</span>
    </Link>
  </div>

  {/* Right-aligned Bookmark */}
  <div className="ml-auto flex items-center space-x-4">
    <button className="flex items-center space-x-1 hover:text-blue-500" onClick={() => console.log("bookmark click")}>
      <BookmarkIcon className="h-7 w-7" />
    </button>
  </div>
</div>


          </div>

          {/* Right Side (Image) */}
          <Link to="/post" className="w-full h-auto md:w-60 md:h-40 flex-shrink-0 mt-2">
            <img
              className="rounded-lg w-full h-full object-cover"
              src="/assets/img/image.png"
              alt="Express.js Image"
            />
          </Link>
        </div>
      </div>
      </div>
    </>
  );
}

=======
import React from "react";
import PropTypes from "prop-types";


function Home(props) {
  return (
    <>
    <div className="bg-white py-20">
      <div className="grid grid-cols-2 gap-4 p-10">

        <div className="flex flex-col space-y-2 p-5">
          <h6 className="text-2xl font-bold text-gray-800 mb-0">YOUR GO-TO</h6>
          <h1 className="text-7xl font-bold text-gray-800 mb-5">CONNECT > SHARE > DISCOVER </h1>
          <p style={{ marginBottom: '10px', textAlign: 'justify' }} className="text-lg text-gray-600 ">
            Stay in the loop with friends, family, and communities that matter to you.
            Explore a world of content, from trending posts and captivating stories to insightful discussions and engaging media.
          </p>
          <button className="border-2 border-red-500 text-black px-4 py-2 rounded-full hover:bg-red-500 hover:text-white w-max">
            Join the conversation today!
          </button>
        </div>

        <div className="flex items-center justify-center p-5">
          <img
            src="/assets/img/homepic.png"
            alt="Placeholder"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        
        <hr className="col-span-2 border-t-2 border-gray-300 my-10" />
      </div>
    </div>

  </>
  );
}

Home.propTypes = {
  greeting: PropTypes.string,
};

>>>>>>> feat: Crud app with react-rails
export default Home;
