import axios from 'axios';

export const handleLike = async (postId, setPosts, setErrors) => {
  try {
    await axios.post(`/posts/${postId}/like`);
    setPosts(prev => {
      if (Array.isArray(prev)) {
        // Handle list of posts
        return prev.map(post =>
          post.id === postId
            ? { ...post, liked_by_current_user: true, likes_count: post.likes_count + 1 }
            : post
        );
      } else if (prev && typeof prev === 'object') {
        // Handle single post
        return {
          ...prev,
          liked_by_current_user: true,
          likes_count: prev.likes_count + 1
        };
      } else {
        return prev;
      }
    });
  } catch (error) {
    setErrors([`Error liking post: ${error.message}`]);
  }
};

export const handleUnlike = async (postId, setPosts, setErrors) => {
  try {
    await axios.delete(`/posts/${postId}/like`);
    setPosts(prev => {
      if (Array.isArray(prev)) {
        // Handle list of posts
        return prev.map(post =>
          post.id === postId
            ? { ...post, liked_by_current_user: false, likes_count: post.likes_count - 1 }
            : post
        );
      } else if (prev && typeof prev === 'object') {
        // Handle single post
        return {
          ...prev,
          liked_by_current_user: false,
          likes_count: prev.likes_count - 1
        };
      } else {
        return prev;
      }
    });
  } catch (error) {
    setErrors([`Error unliking post: ${error.message}`]);
  }
};
