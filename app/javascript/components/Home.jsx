import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useDebounce from './hooks/useDebounce';
import { fetchReadingList, addReadingList, deleteReadingList } from "./readingList/ReadingListFunction.jsx"
import showAlert from "./Alert";
import { ChatBubbleLeftRightIcon, HandThumbUpIcon, BookmarkIcon, MagnifyingGlassIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid, HandThumbUpIcon as HandThumbUpIconSolid } from "@heroicons/react/24/solid";

function Home() {
  const [activeTab, setActiveTab] = useState("forYou");
  const [posts, setPosts] = useState([]);
  const [readingList, setReadingList] = useState([]);
  const [errors, setErrors] = useState([]);
  const [currentUser, setcurrentUser] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, nextPage: null, prevPage: null });
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const dropdownRefs = useRef({});

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const toggleDropdown = (postId) => {
    setDropdownOpenId(prev => (prev === postId ? null : postId));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const refs = Object.values(dropdownRefs.current);
      if (!refs.some(ref => ref && ref.contains(event.target))) {
        setDropdownOpenId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/posts', {
          params: {
            'q[title_or_description_or_user_first_name_or_user_last_name_cont]': debouncedSearchQuery
          }
        });
        setPosts(response.data.posts);
        setcurrentUser(response.data.current_user);
        console.log("result");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    fetchPosts();
  }, [debouncedSearchQuery]); 
  

  useEffect(() => {
          fetchReadingList("", setReadingList, setErrors);
  }, []);
  
  const handleReadingList = (postId) => {
    const existingItem = readingList.find(rl => rl.post_id === postId);
      existingItem ? 
        deleteReadingList(existingItem.id, setReadingList, readingList, setErrors)
      : addReadingList(postId, setReadingList, readingList, setErrors);
  };

  //delete post getting the id
  const deletePost = async (id) => {
    setErrors(null);
    console.log(id);
    // Wait for the confirmation of sweet alert to resolve
    const result = await showAlert("Are you sure?", "You won't be able to revert this post!", "warning", "delete");
  
    if (!result.isConfirmed) return;
  
    try {
      await axios.delete(`/posts/${id}`); // API request to delete post
      setPosts(posts.filter((p) => p.id !== id)); // Remove deleted post from state
  
      // Show success alert after deletion
      showAlert("Deleted!", "Post deleted successfully", "success");
    } catch (error) {
      setError("Error deleting post:", error);
    }
  };

  
  const liked = async (postId) => {
    try {
      await axios.post(`/posts/${postId}/like`);
      setPosts(prev => prev.map(post =>
        post.id === postId ? { ...post, liked_by_current_user: true, likes_count: post.likes_count + 1 } : post
      ));
    } catch (error) {
      setErrors([`Error liking post: ${error.message}`]);
    }
  };

  const unlike = async (postId) => {
    try {
      await axios.delete(`/posts/${postId}/like`);
      setPosts(prev => prev.map(post =>
        post.id === postId ? { ...post, liked_by_current_user: false, likes_count: post.likes_count - 1 } : post
      ));
    } catch (err) {
      setErrors([`Error unliking post: ${err.message}`]);
    }
  };
  

  return (
    <>
      <form className="max-w-2xl mx-auto mb-5">
        <label htmlFor="search" className="sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input type="search" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); }} 
            id="search" placeholder="Search" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-3xl focus:ring-gray-300 focus:border-gray-300 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none" required />
        </div>
      </form>

      <nav className="flex justify-center items-center gap-14 px-6 pb-6 mt-0">
        <button className={`mb-1 pb-2 border-b-4 ${activeTab === "forYou" ? "border-blue-500" : "border-transparent"}`} onClick={() => setActiveTab("forYou")}>For You</button>
        <button className={`mb-1 pb-2 border-b-4 ${activeTab === "following" ? "border-blue-500" : "border-transparent"}`} onClick={() => setActiveTab("following")}>Following</button>
      </nav>

      <div className="min-h-screen flex flex-col pb-10 items-center">
        <div className="w-full max-w-4xl">
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((p) => (
              <div key={p.id} className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-4 flex flex-col-reverse md:flex-row gap-4 transition mb-4">
                <div className="flex flex-col flex-grow">
                  {/* Profile pic, name, and date */}
                  <div className="flex items-center gap-2">
                    <Link to={`/profile/${p.user.id}`} className="w-10 h-10 flex-shrink-0">
                      <img className="rounded-full w-full h-full object-cover" src="/assets/img/image.png" alt="Profile" />
                    </Link>
                    <div className="flex flex-col">
                      <Link to={`/profile/${p.user.id}`}  className="text-sm font-semibold text-gray-900 dark:text-white hover:underline">
                        {p.user ? p.user.first_name + " " + p.user.last_name : "Unknown"}
                      </Link>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(p.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                  </div>

                  {/* Title and Body */}
                  <Link to={`/show/${p.id}`} className="block mt-2">
                    <h5 className="mt-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white hover:underline text-justify line-clamp-2 break-all">{p.title}</h5>
                    <p className="mt-1 text-sm text-gray-700 dark:text-gray-400 text-justify line-clamp-2 break-all">{p.description}</p>
                  </Link>
                    {/* Buttons */}
                  <div className="flex items-center justify-between mt-auto pt-4 text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-4">
                      <Link to={`/show/${p.id}`} className="flex items-center space-x-1 hover:text-blue-500 text-gray-500 mr-2">
                        <span>Learn More</span>
                        <ArrowLongRightIcon className="h-5 w-5" />
                      </Link>
                      <button className="flex items-center space-x-1 text-blue-500 hover:text-blue-500" onClick={() => p.liked_by_current_user ? unlike(p.id) : liked(p.id)}>
                        {p.liked_by_current_user ? <HandThumbUpIconSolid className="h-5 w-5" /> : <HandThumbUpIcon className="h-5 w-5" />}
                        <span>{p.likes_count}</span>
                      </button>
                      <Link to={`/show/${p.id}`}  className="flex items-center space-x-1 hover:text-blue-500">
                        <ChatBubbleLeftRightIcon className="h-5 w-5" />
                        <span>{p.comments.length}</span>
                      </Link>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button onClick={() => handleReadingList(p.id)} className="flex items-center space-x-1 hover:text-blue-500">
                        {readingList.map(rl => rl.post_id).includes(p.id) ? <BookmarkIconSolid className="h-7 w-7 text-black" /> : <BookmarkIcon className="h-7 w-7" />}
                      </button>
                      {currentUser.id === p.user.id && (
                        <div className="relative inline-block text-left" ref={(el) => (dropdownRefs.current[p.id] = el)}>
                          <button onClick={() => toggleDropdown(p.id)} type="button" className="inline-flex items-center p-2 text-sm font-medium text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                            </svg>
                          </button>

                          {dropdownOpenId === p.id && (
                            <div className="absolute z-10 mt-2 w-32 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow-md dark:bg-gray-700 dark:divide-gray-600">
                              <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                                <li>
                                  <Link to={`/edit/${p.id}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    Edit
                                  </Link>
                                </li>
                                <li className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                  <button onClick={() => deletePost(p.id)}>
                                    Delete
                                  </button>
                                </li>
                              
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <Link to={`/show/${p.id}`}  className="w-full md:w-60 h-40 md:h-48 flex-shrink-0 mt-2 md:mt-0">
                  <img className="rounded-lg w-full h-full object-cover" src={p.coverimg_url || "/assets/img/image.png"} alt="Post Image" />
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">No posts available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
