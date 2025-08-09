import { NextResponse } from 'next/server';
import { auth } from '@/auth'; // Your Auth.js import from history
import { connectDB } from '@/lib/config/db';
import { Post } from '@/lib/models/Post';

export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find().sort({ timestamp: -1 }).lean(); // Sort by newest first
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await request.json();

  if (!data.content) {
    return NextResponse.json({ error: 'Content is required' }, { status: 400 });
  }

  try {
    await connectDB();

    const post = new Post({
      content: data.content,
      userId: session.user.id, // Associate with authenticated user ID
      author: session.user.email || 'Anonymous',
      // Add other fields if sent from frontend
    });

    await post.save();

    return NextResponse.json({
      message: "Post created successfully",
      post,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { postId, action } = await request.json(); // action: 'like' or 'bookmark'
    if (!postId || !action) {
      return NextResponse.json({ error: 'Missing postId or action' }, { status: 400 });
    }

    await connectDB();
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    if (action === 'like') {
      post.isLiked = !post.isLiked;
      post.likes += post.isLiked ? 1 : -1;
    } else if (action === 'bookmark') {
      post.isBookmarked = !post.isBookmarked;
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    await post.save();
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}
