'use client';

import { useState } from "react";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MoreHorizontal,
  Send,
  ThumbsUp,
  ThumbsDown,
  Reply,
  X
} from "lucide-react";

const sampleComments = [
  {
    id: 1,
    author: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
    content: "This is such an insightful post! I completely agree with your points about user experience being crucial in Web3 adoption.",
    timestamp: "1h ago",
    likes: 12,
    replies: [
      {
        id: 11,
        author: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
        content: "Thanks Alex! I think the industry is finally starting to prioritize UX over just technical innovation.",
        timestamp: "30m ago",
        likes: 5,
        replies: []
      }
    ]
  },
  {
    id: 2,
    author: "Maria Garcia",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    content: "Would love to hear more about the scalability solutions you mentioned. Are you referring to L2 solutions or something else?",
    timestamp: "45m ago",
    likes: 8,
    replies: []
  }
];

export default function PostDetailModal({ post, open, onOpenChange, onLike, onBookmark, onShare }) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(sampleComments);

  if (!open || !post) return null;

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      author: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      content: newComment,
      timestamp: "now",
      likes: 0,
      replies: []
    };
    
    setComments(prev => [comment, ...prev]);
    setNewComment("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] mx-4 overflow-hidden">
        {/* Close button */}
        <button 
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{post.author}</h3>
                <p className="text-sm text-gray-500">{post.title} at {post.company}</p>
                <p className="text-xs text-gray-500">{post.timestamp}</p>
              </div>
            </div>
           
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="p-6 space-y-6">
            {/* Post Content */}
            <div className="space-y-4">
              <div className="whitespace-pre-wrap text-sm leading-relaxed">{post.content}</div>
              
              {post.image && (
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={post.image} 
                    alt="Post image" 
                    className="w-full h-64 object-cover"
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
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => onLike(post.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors
                    ${post.isLiked 
                      ? 'text-red-500 hover:bg-red-100' 
                      : 'text-gray-500 hover:text-black hover:bg-gray-100'}`}
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`} />
                  <span>{post.likes}</span>
                </button>
                
                <button className="flex items-center space-x-2 px-3 py-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments}</span>
                </button>
                
                <button 
                  onClick={() => onShare(post.id)}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{post.shares}</span>
                </button>
              </div>
              
              <button 
                onClick={() => onBookmark(post.id)}
                className={`p-2 rounded-lg transition-colors
                  ${post.isBookmarked 
                    ? 'text-purple-600 hover:bg-purple-100' 
                    : 'text-gray-500 hover:text-black hover:bg-gray-100'}`}
              >
                <Bookmark className={`w-4 h-4 ${post.isBookmarked ? "fill-current" : ""}`} />
              </button>
            </div>

            <div className="border-t border-gray-200 pt-6">
              {/* Add Comment */}
              <div className="space-y-4">
                <h4 className="font-semibold">Add a comment</h4>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <textarea
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full min-h-[80px] resize-none bg-gray-50 rounded-lg border border-gray-200 p-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    />
                    <div className="flex justify-end">
                      <button 
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                        className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors
                          ${newComment.trim() 
                            ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments */}
              <div className="space-y-4 mt-6">
                <h4 className="font-semibold">Comments ({comments.length})</h4>
                {comments.map((comment) => (
                  <div key={comment.id} className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img src={comment.avatar} alt={comment.author} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-sm">{comment.author}</h5>
                            <span className="text-xs text-gray-500">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm leading-relaxed">{comment.content}</p>
                        </div>
                        <div className="flex items-center space-x-4 mt-2">
                          <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-black transition-colors">
                            <ThumbsUp className="w-3 h-3" />
                            <span>{comment.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-black transition-colors">
                            <Reply className="w-3 h-3" />
                            <span>Reply</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Replies */}
                    {comment.replies.length > 0 && (
                      <div className="ml-11 space-y-3">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex items-start space-x-3">
                            <div className="w-6 h-6 rounded-full overflow-hidden">
                              <img src={reply.avatar} alt={reply.author} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <div className="bg-gray-50 p-2 rounded-lg">
                                <div className="flex items-center justify-between mb-1">
                                  <h6 className="font-medium text-xs">{reply.author}</h6>
                                  <span className="text-xs text-gray-500">{reply.timestamp}</span>
                                </div>
                                <p className="text-xs leading-relaxed">{reply.content}</p>
                              </div>
                              <div className="flex items-center space-x-2 mt-1">
                                <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-black transition-colors">
                                  <ThumbsUp className="w-3 h-3" />
                                  <span>{reply.likes}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 