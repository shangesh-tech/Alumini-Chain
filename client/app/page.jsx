'use client';

import { useState } from "react";
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

const posts = [
  {
    id: 1,
    author: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
    title: "Senior Product Manager",
    company: "Microsoft",
    timestamp: "2h ago",
    content: "Just wrapped up an amazing presentation on Web3 product strategy. The future of decentralized applications is so bright! 🚀\n\nKey takeaways:\n• User experience is still the most important factor\n• Scalability solutions are rapidly improving\n• Community governance is becoming mainstream\n\nWhat are your thoughts on the current state of Web3 UX?",
    tags: ["Web3", "Product", "UX", "Strategy"],
    likes: 127,
    comments: 23,
    shares: 12,
    isLiked: false,
    isBookmarked: true,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop"
  },
  {
    id: 2,
    author: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    title: "Blockchain Developer",
    company: "ConsenSys",
    timestamp: "4h ago",
    content: "Big milestone achieved! 🎉 Our smart contract audit is complete with zero critical vulnerabilities found. \n\nSpecial thanks to the amazing team at OpenZeppelin for their thorough review. Security first, always! 🔒\n\n#SmartContracts #Security #Ethereum",
    tags: ["Blockchain", "Security", "Ethereum", "Smart Contracts"],
    likes: 89,
    comments: 15,
    shares: 8,
    isLiked: true,
    isBookmarked: false
  },
  {
    id: 3,
    author: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    title: "Marketing Director",
    company: "Spotify",
    timestamp: "6h ago",
    content: "Exciting news! 📢 We're launching our new alumni mentorship program next month. \n\nThis program will connect recent graduates with experienced professionals in their field. Looking for both mentors and mentees!\n\nInterested? Drop a comment below or send me a DM. Let's grow together! 🌱",
    tags: ["Mentorship", "Career", "Networking", "Growth"],
    likes: 156,
    comments: 34,
    shares: 19,
    isLiked: false,
    isBookmarked: true
  },
  {
    id: 4,
    author: "David Park",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    title: "Data Scientist",
    company: "Tesla",
    timestamp: "8h ago",
    content: "Mind-blowing AI research paper just dropped! 🤖\n\n\"Attention Is All You Need\" revolutionized NLP, and now we're seeing similar breakthroughs in computer vision. The transformer architecture continues to amaze.\n\nLink to the paper in comments. What's your favorite recent ML breakthrough?",
    tags: ["AI", "MachineLearning", "Research", "Innovation"],
    likes: 78,
    comments: 12,
    shares: 6,
    isLiked: true,
    isBookmarked: false
  }
];

export default function Home() {
  const [newPost, setNewPost] = useState("");
  const [feedPosts, setFeedPosts] = useState(posts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLike = (postId) => {
    setFeedPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked, 
              likes: post.isLiked ? post.likes - 1 : post.likes + 1 
            }
          : post
      )
    );
  };

  const handleBookmark = (postId) => {
    setFeedPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post
      )
    );
  };

  const handleShare = (postId) => {
    // Handle share logic
    console.log("Sharing post:", postId);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-3">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Community Feed</h1>
        <p className="text-zinc-500">Stay updated with your network</p>
      </div>

      {/* Create Post */}
      <div className="bg-zinc-800/30 backdrop-blur-sm rounded-lg border border-zinc-700/50 shadow-lg mb-8">
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-4">
              <textarea
                placeholder="What's on your mind?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="w-full min-h-[100px] resize-none bg-zinc-800/50 rounded-lg border border-zinc-700/50 p-3 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="flex items-center px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-colors">
                    <Image className="w-4 h-4 mr-2" />
                    Photo
                  </button>
                  <button className="flex items-center px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-colors">
                    <Video className="w-4 h-4 mr-2" />
                    Video
                  </button>
                  <button className="flex items-center px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-colors">
                    <Link className="w-4 h-4 mr-2" />
                    Link
                  </button>
                </div>
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${newPost.trim() 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                      : 'bg-zinc-700/50 text-zinc-400 cursor-not-allowed'}`}
                  disabled={!newPost.trim()}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feed Posts */}
      <div className="space-y-6">
        {feedPosts.map((post) => (
          <div key={post.id} className="bg-zinc-800/30 backdrop-blur-sm rounded-lg border border-zinc-700/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div 
                  className="flex items-center space-x-3 cursor-pointer"
                  onClick={() => handlePostClick(post)}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold hover:text-purple-400 transition-colors">{post.author}</h3>
                    <p className="text-sm text-zinc-400">{post.title} at {post.company}</p>
                    <p className="text-xs text-zinc-500">{post.timestamp}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-zinc-700/50 rounded-lg transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-zinc-400" />
                </button>
              </div>
              
              <div className="mt-4 space-y-4">
                <div 
                  className="whitespace-pre-wrap cursor-pointer hover:text-zinc-300 transition-colors"
                  onClick={() => handlePostClick(post)}
                >
                  {post.content.length > 200 ? `${post.content.substring(0, 200)}... ` : post.content}
                  {post.content.length > 200 && (
                    <button className="text-purple-400 hover:text-purple-300 font-medium">
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
                      className="px-2 py-1 text-xs rounded-full border border-zinc-700 text-zinc-300 hover:border-purple-500 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-zinc-700/40">
                  <div className="flex items-center space-x-6">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors
                        ${post.isLiked 
                          ? 'text-red-500 hover:bg-red-500/10' 
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-700/50'}`}
                    >
                      <Heart className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`} />
                      <span>{post.likes}</span>
                    </button>
                    
                    <button 
                      onClick={() => handlePostClick(post)}
                      className="flex items-center space-x-2 px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </button>
                    
                    <button 
                      onClick={() => handleShare(post.id)}
                      className="flex items-center space-x-2 px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{post.shares}</span>
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => handleBookmark(post.id)}
                    className={`p-2 rounded-lg transition-colors
                      ${post.isBookmarked 
                        ? 'text-purple-400 hover:bg-purple-500/10' 
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-700/50'}`}
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
        <button className="px-6 py-3 border border-zinc-700 rounded-lg text-zinc-300 hover:text-white hover:border-purple-500 transition-colors">
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