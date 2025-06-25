import axios from "axios";
import showAlert from "../Alert";

export const handleDeletePost = async (id, setPosts, setErrors) => {
    setErrors(null);
    console.log(id);
  
    const result = await showAlert(
      "Are you sure?",
      "You won't be able to revert this post!",
      "warning",
      "delete"
    );
  
    if (!result.isConfirmed) return;
  
    try {
      await axios.delete(`/posts/${id}`);
      setPosts((prevPosts) => prevPosts.filter((p) => p.id !== id));
    } catch (error) {
      setErrors("Error deleting post:", error);
    }
  };
  
