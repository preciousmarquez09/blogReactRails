import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import showAlert from "../Alert"
import { fetchReadingList, addReadingList, deleteReadingList } from "../readingList/ReadingListFunction.jsx"
import { ChatBubbleLeftRightIcon, HandThumbUpIcon, BookmarkIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";

const PostPreview = ({ id }) => {

    const [user, setUser] = useState({});
    const [currentUser, setcurrentUser] = useState([]);
    const [posts, setPosts] = useState([]);
    const [readingList, setReadingList] = useState([]);
    const [dropdownOpenId, setDropdownOpenId] = useState(null);
    const dropdownRefs = useRef({});
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await axios.get(`/userPost/${id}`);
            setUser(response.data.user);
            setPosts(response.data.posts);
            setcurrentUser(response.data.current_user);
            setLoading(false);
            console.log(response.data.posts); 
        };
        fetchPost();
    }, [id]);

    useEffect(() => {
        fetchReadingList("", setReadingList, setErrors);
        console.log("readList");
        console.log(readingList);
    }, []);
    

    const toggleDropdown = (postId) => {
        setDropdownOpenId(prev => (prev === postId ? null : postId));
      };

    const handleReadingList = (postId) => {
        const existingItem = readingList.find(rl => rl.post_id === postId);
          existingItem ? 
            deleteReadingList(existingItem.id, setReadingList, readingList, setErrors)
          : addReadingList(postId, setReadingList, readingList, setErrors);
    };

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

  return (
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
                            <button className="flex items-center space-x-1 hover:text-blue-500" onClick={() => console.log("like click")}>
                                <HandThumbUpIcon className="h-5 w-5" />
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
  )
}

export default PostPreview