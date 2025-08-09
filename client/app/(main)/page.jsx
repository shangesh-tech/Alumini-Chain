'use client';

import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import PostDetailModal from "@/components/modals/PostDetailModal";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MoreHorizontal,
  Image,
  Video,
  Link
} from "lucide-react";

export default function Home() {
  const { data: session, status } = useSession(); // Added for auth check
  const [newPost, setNewPost] = useState("");
  const [feedPosts, setFeedPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState(null); // Added missing state

  // Fetch posts from backend on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        setFeedPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Optional: Show error UI
      }
    };
    fetchPosts();
  }, []);

  // Function to handle post submission with user ID
  const handleCreatePost = async () => {
    if (!newPost.trim()) return;
    if (!session?.user?.id) {
      setPostError("User ID not available. Please log in again.");
      return;
    }

    setPosting(true);
    setPostError(null);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newPost,
          userId: session.user.id, // Include authenticated user ID
        }),
      });

      if (response.ok) {
        setNewPost(""); // Clear input on success
        console.log("Post created successfully");
        // Refresh posts after creation
        const fetchPosts = async () => {
          const response = await fetch('/api/posts');
          if (response.ok) {
            const data = await response.json();
            setFeedPosts(data);
          }
        };
        fetchPosts();
      } else {
        setPostError("Failed to create post");
      }
    } catch (err) {
      setPostError("Error creating post");
    } finally {
      setPosting(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, action: 'like' }),
      });
      if (!response.ok) throw new Error('Failed to update like');
      const updatedPost = await response.json();

      // Update local state
      setFeedPosts(prev =>
        prev.map(post =>
          post.id === postId ? updatedPost : post
        )
      );
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleBookmark = async (postId) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, action: 'bookmark' }),
      });
      if (!response.ok) throw new Error('Failed to update bookmark');
      const updatedPost = await response.json();

      // Update local state
      setFeedPosts(prev =>
        prev.map(post =>
          post.id === postId ? updatedPost : post
        )
      );
    } catch (error) {
      console.error('Error bookmarking post:', error);
    }
  };

  const handleShare = (postId) => {
    // Handle share logic (e.g., copy link or social share)
    console.log("Sharing post:", postId);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-3">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Community Feed</h1>
        <p className="text-gray-500">Stay updated with your network</p>
      </div>

      {/* Create Post */}
      <div className="bg-white/80 rounded-lg border border-gray-200 shadow-lg shadow-purple-500/30 mb-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img 
                src="https://avatar.iran.liara.run/public/9"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-4">
              <textarea
                placeholder="What's on your mind?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="w-full min-h-[100px] resize-none bg-gray-50 rounded-lg border border-gray-200 p-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="flex items-center px-1 md:px-3 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                    <Image className="w-4 h-4 mr-2" />
                    Photo
                  </button>
                  <button className="flex items-center px-1 md:px-3 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                    <Video className="w-4 h-4 mr-2" />
                    Video
                  </button>
                </div>
                <button 
                  onClick={handleCreatePost}
                  disabled={posting || !newPost.trim()}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${newPost.trim() && !posting 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                  {posting ? "Posting..." : "Post"}
                </button>
              </div>
              {postError && <p className="text-red-600 text-sm">{postError}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Feed Posts */}
      <div className="space-y-6">
        {feedPosts.map((post) => (
          <div key={post._id} className="bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div 
                  className="flex items-center space-x-3 cursor-pointer"
                  onClick={() => handlePostClick(post)}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src={post.avatar || "https://avatar.iran.liara.run/public/9"} alt={post.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold hover:text-purple-400 transition-colors">{post.author}</h3>
                    <p className="text-sm text-gray-600">{post.title}</p>
                    <p className="text-xs text-gray-500">{post.timestamp}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              
              <div className="mt-4 space-y-4">
                <div 
                  className="whitespace-pre-wrap cursor-pointer hover:text-gray-700 transition-colors"
                  onClick={() => handlePostClick(post)}
                >
                  {post.content.length > 200 ? `${post.content.substring(0, 200)}... ` : post.content}
                  {post.content.length > 200 && (
                    <button className="text-purple-600 hover:text-purple-500 font-medium">
                      Read more
                    </button>
                  )}
                </div>
                
                {post.image && (
                  <div className="rounded-lg overflow-hidden cursor-pointer" onClick={() => handlePostClick(post)}>
                    <img 
                      src={post.image} 
                      alt="Post image" 
                      className="w-full h-64 object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 text-xs rounded-full border border-gray-300 text-gray-600 hover:border-purple-500 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-6">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors
                        ${post.isLiked 
                          ? 'text-red-500 hover:bg-red-100' 
                          : 'text-gray-500 hover:text-black hover:bg-gray-100'}`}
                    >
                      <Heart className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`} />
                      <span>{post.likes}</span>
                    </button>
                    
                    <button 
                      onClick={() => handlePostClick(post)}
                      className="flex items-center space-x-2 px-3 py-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </button>
                    
                    <button 
                      onClick={() => handleShare(post.id)}
                      className="flex items-center space-x-2 px-3 py-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{post.shares}</span>
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => handleBookmark(post.id)}
                    className={`p-2 rounded-lg transition-colors
                      ${post.isBookmarked 
                        ? 'text-purple-600 hover:bg-purple-100' 
                        : 'text-gray-500 hover:text-black hover:bg-gray-100'}`}
                  >
                    <Bookmark className={`w-4 h-4 ${post.isBookmarked ? "fill-current" : ""}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-600 hover:text-black hover:border-purple-500 transition-colors">
          Load More Posts
        </button>
      </div>

      {/* Post Detail Modal */}
      <PostDetailModal
        post={selectedPost}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onLike={handleLike}
        onBookmark={handleBookmark}
        onShare={handleShare}
      />
    </div>
  );
}
