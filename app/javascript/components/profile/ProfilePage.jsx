import React, {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import PostPreview from "../post/PostPreview.jsx";


const ProfilePage = () => {

    const { id } = useParams();
    const [user, setUser] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(true);

    const [errors, setErrors] = useState([]);
    
    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await axios.get(`/currentUser/${id}`);
            setUser(response.data.user);
            setCurrentUser(response.data.current_user);
            setLoading(false);
            

          } catch (error) {
            setErrors(prev => [...prev, error.response?.data?.error || "Failed to fetch user"]);
            setLoading(false);
            console.error("Error fetching user:", error);
          }
        };
      
        fetchUser();
      }, [id]);

    return (
        <>
        {loading ? (
            <div className="flex justify-center items-center h-screen">Loading...</div>
          ) : (
            
        <div className="p-4">
            {errors.length > 0 && (
                <div className="text-red-500 text-sm mt-2">
                    {errors.map((err, idx) => <p key={idx}>{err}</p>)}
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
                        <h1 className="text-4xl md:text-6xl font-extrabold text-black uppercase  font-sans">
                            {(user?.first_name || "") + " " + (user?.last_name || "")}
                        </h1>

                        {user.bio && (
                            <h2 className="text-md text-gray-500">{user.bio}</h2>
                        )}

                        {user.id === currentUser.id ? (
                            <button className="mt-4 w-40 md:w-32 px-2 py-1 text-sm bg-white text-black border border-black rounded-full hover:bg-black hover:text-white transition">
                                EDIT PROFILE
                            </button>
                        ) : (
                            <button className="mt-4 w-40 md:w-32 px-2 py-1 text-sm bg-white text-blue-500 border border-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition">
                                FOLLOW
                            </button>
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
            
            <PostPreview id={id}/>
           
        </div>
    )}
    </>
    )
}

export default ProfilePage;