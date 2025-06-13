

import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import axios from "axios";
import showAlert from "../Alert";
import useDebounce from '../hooks/useDebounce';
import { fetchReadingList, deleteReadingList } from "./ReadingListFunction.jsx"
import { ChatBubbleLeftRightIcon, HandThumbUpIcon, BookmarkIcon, MagnifyingGlassIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";


const ReadingList = () => {

    const [readingList, setReadingList] = useState([]);
    const [errors, setErrors] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
        fetchReadingList(debouncedSearchQuery, setReadingList, setErrors);
    }, [debouncedSearchQuery]);
     

    return(
    <>
        <form className="max-w-2xl mx-auto mb-5">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
                <input type="search" id="search" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); }} 
                placeholder="Search" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-3xl focus:ring-gray-300 focus:border-gray-300 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none" required />
            </div>
        </form>        
        <div className="min-h-screen flex flex-col pb-10 items-center">
            <div className="w-full max-w-4xl">
            {Array.isArray(readingList) && readingList.length > 0 ? (
                readingList.map((rl) => (
                <div key={rl.id} className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-4 flex flex-col-reverse md:flex-row gap-4 transition mb-4">
                    <div className="flex flex-col flex-grow">
                    {/* Profile pic, name, and date */}
                    <div className="flex items-center gap-2">
                        <Link to="/profile" className="w-10 h-10 flex-shrink-0">
                        <img className="rounded-full w-full h-full object-cover" src={rl.post.user?.coverimg_url || "/assets/img/image.png"} alt="Profile" />
                        </Link>
                        <div className="flex flex-col">
                        <Link to="/profile" className="text-sm font-semibold text-gray-900 dark:text-white hover:underline">
                            {rl.post?.user ? rl.post.user.first_name + " " + rl.post.user.last_name : "Unknown"}
                        </Link>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(rl.post.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                        </span>
                        </div>
                    </div>

                    {/* Title and Body */}
                    <Link to={`/show/${rl.post.id}`} className="block mt-2">
                        <h5 className="mt-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white hover:underline text-justify line-clamp-2 break-all">{rl.post.title}</h5>
                        <p className="mt-1 text-sm text-gray-700 dark:text-gray-400 text-justify line-clamp-2 break-all">{rl.post.description}</p>
                    </Link>
                        {/* Buttons */}
                    <div className="flex items-center justify-between mt-auto pt-4 text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-4">
                        <Link to={`/show/${rl.post.id}`} className="flex items-center space-x-1 hover:text-blue-500 text-gray-500 mr-2">
                            <span>Learn More</span>
                            <ArrowLongRightIcon className="h-5 w-5" />
                        </Link>
                        <button className="flex items-center space-x-1 hover:text-blue-500" onClick={() => console.log("like click")}>
                            <HandThumbUpIcon className="h-5 w-5" />
                            <span>{rl.likes_count}</span>
                        </button>
                        <Link to={`/show/${rl.post.id}`}  className="flex items-center space-x-1 hover:text-blue-500">
                            <ChatBubbleLeftRightIcon className="h-5 w-5" />
                            <span>{rl.post.comments.length}</span>
                        </Link>
                        </div>
                        <button className="flex items-center space-x-1 hover:text-blue-500" onClick={() => { deleteReadingList(rl.id, setReadingList, readingList, setErrors)}}>
                            <BookmarkIconSolid className="h-7 w-7 text-black" />
                        </button>
                    </div>
                    </div>
                    <Link to={`/show/${rl.post.id}`}  className="w-full md:w-60 h-40 md:h-48 flex-shrink-0 mt-2 md:mt-0">
                        <img className="rounded-lg w-full h-full object-cover" src={rl.post.coverimg_url || "/assets/img/image.png"} alt="Post Image" />
                    </Link>
                </div>
                
                ))
            ) : (
                <p className="text-center text-gray-600 dark:text-gray-400">No reading list available.</p>
            )}
            </div>
        </div>
     </>   
    )
}

export default ReadingList;