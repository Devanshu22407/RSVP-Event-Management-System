import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { communitiesAPI } from '../services/api';

const CommunityDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [members, setMembers] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    if (id) {
      fetchCommunityDetails();
      fetchMembers();
      fetchDiscussions();
    }
  }, [id]);

  const fetchCommunityDetails = async () => {
    try {
      const response = await communitiesAPI.getCommunities();
      if (response.data.success) {
        const foundCommunity = response.data.communities.find(c => c._id === id);
        if (foundCommunity) {
          setCommunity(foundCommunity);
        } else {
          setError('Community not found');
        }
      }
    } catch (err) {
      setError('Failed to load community details');
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    // Mock members data - in real app, this would come from API
    setMembers([
      { id: 1, name: 'John Doe', role: 'Admin', joinDate: '2024-01-15', avatar: 'JD' },
      { id: 2, name: 'Jane Smith', role: 'Moderator', joinDate: '2024-02-01', avatar: 'JS' },
      { id: 3, name: 'Mike Johnson', role: 'Member', joinDate: '2024-02-15', avatar: 'MJ' },
      { id: 4, name: 'Sarah Wilson', role: 'Member', joinDate: '2024-03-01', avatar: 'SW' },
      { id: 5, name: 'David Brown', role: 'Member', joinDate: '2024-03-10', avatar: 'DB' },
    ]);
  };

  const fetchDiscussions = async () => {
    // Mock discussions data - in real app, this would come from API
    setDiscussions([
      {
        id: 1,
        author: 'John Doe',
        avatar: 'JD',
        content: 'Welcome to our community! Feel free to introduce yourselves and share what brings you here.',
        timestamp: '2024-01-15T10:00:00Z',
        likes: 15,
        replies: 8
      },
      {
        id: 2,
        author: 'Jane Smith',
        avatar: 'JS',
        content: 'Excited to share some upcoming events and workshops we have planned for this month!',
        timestamp: '2024-01-16T14:30:00Z',
        likes: 12,
        replies: 5
      },
      {
        id: 3,
        author: 'Mike Johnson',
        avatar: 'MJ',
        content: 'Just wanted to say thanks to everyone for the warm welcome. Looking forward to contributing to this community!',
        timestamp: '2024-01-17T09:15:00Z',
        likes: 8,
        replies: 3
      }
    ]);
  };

  const handleJoinLeave = async () => {
    if (!isAuthenticated) {
      alert('Please login to join communities');
      navigate('/login');
      return;
    }

    try {
      if (isJoined) {
        await communitiesAPI.leaveCommunity(id);
        setIsJoined(false);
        setCommunity(prev => ({ ...prev, members: prev.members - 1 }));
        alert('Successfully left the community');
      } else {
        await communitiesAPI.joinCommunity(id);
        setIsJoined(true);
        setCommunity(prev => ({ ...prev, members: prev.members + 1 }));
        alert('Successfully joined the community!');
      }
    } catch (err) {
      alert('Failed to update membership. Please try again.');
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to post in the community');
      return;
    }
    if (!newPost.trim()) return;

    // Mock posting - in real app, this would call an API
    const newDiscussion = {
      id: discussions.length + 1,
      author: user?.name || 'Current User',
      avatar: 'CU',
      content: newPost,
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: 0
    };

    setDiscussions(prev => [newDiscussion, ...prev]);
    setNewPost('');
    alert('Post added successfully!');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getActivityColor = (activity) => {
    switch (activity) {
      case 'Very Active': return 'bg-green-100 text-green-800';
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading community details...</p>
        </div>
      </div>
    );
  }

  if (error || !community) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Community Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/communities" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Back to Communities
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link to="/communities" className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center">
            ← Back to Communities
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Community Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-48 bg-gray-200">
                <img 
                  src={community.image} 
                  alt={community.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-gray-900">{community.name}</h1>
                    {community.isVerified && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={handleJoinLeave}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      isJoined
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isJoined ? 'Leave Community' : 'Join Community'}
                  </button>
                </div>

                <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {community.members.toLocaleString()} members
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {community.location}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityColor(community.activity)}`}>
                    {community.activity}
                  </span>
                </div>

                <p className="text-gray-700 mb-4">{community.description}</p>

                <div className="flex flex-wrap gap-2">
                  {community.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Discussion Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Community Discussions</h2>
              
              {/* New Post Form */}
              {isAuthenticated && isJoined && (
                <form onSubmit={handlePostSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share something with the community..."
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows="3"
                  />
                  <button
                    type="submit"
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Post
                  </button>
                </form>
              )}

              {!isAuthenticated && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg text-center">
                  <p className="text-blue-800">
                    <Link to="/login" className="font-medium hover:underline">Login</Link> to participate in discussions
                  </p>
                </div>
              )}

              {!isJoined && isAuthenticated && (
                <div className="mb-6 p-4 bg-yellow-50 rounded-lg text-center">
                  <p className="text-yellow-800">Join the community to participate in discussions</p>
                </div>
              )}

              {/* Discussion Posts */}
              <div className="space-y-4">
                {discussions.map((post) => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-gray-600">{post.avatar}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{post.author}</p>
                        <p className="text-sm text-gray-500">{formatDate(post.timestamp)}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{post.content}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <button className="flex items-center gap-1 hover:text-blue-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {post.likes} likes
                      </button>
                      <button className="flex items-center gap-1 hover:text-blue-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {post.replies} replies
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Members</span>
                  <span className="font-medium">{community.members.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Activity Level</span>
                  <span className="font-medium">{community.activity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{community.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium">{community.location}</span>
                </div>
              </div>
            </div>

            {/* Recent Members */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Members</h3>
              <div className="space-y-3">
                {members.slice(0, 5).map((member) => (
                  <div key={member.id} className="flex items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs font-medium text-gray-600">{member.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800">
                View All Members
              </button>
            </div>

            {/* Community Rules */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Guidelines</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Be respectful and kind to all members</li>
                <li>• Stay on topic and relevant to the community</li>
                <li>• No spam or promotional content</li>
                <li>• Use appropriate language and content</li>
                <li>• Help create a welcoming environment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetailsPage;