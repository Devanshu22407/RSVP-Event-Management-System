import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { eventsAPI, rsvpAPI, commentsAPI } from '../services/api';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rsvpStatus, setRsvpStatus] = useState(null);
  const [showRsvpForm, setShowRsvpForm] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  
  // RSVP Form Data
  const [rsvpData, setRsvpData] = useState({
    status: '',
    attendees: 1,
    dietaryRequirements: '',
    specialRequests: '',
    phone: '',
    emergencyContact: ''
  });

  useEffect(() => {
    if (id) {
      fetchEventDetails();
      fetchComments();
      if (isAuthenticated) {
        fetchUserRsvp();
      }
    }
  }, [id, isAuthenticated]);

  const fetchEventDetails = async () => {
    try {
      const response = await eventsAPI.getEvent(id);
      if (response.data.success) {
        setEvent(response.data.event);
      } else {
        setError('Event not found');
      }
    } catch (err) {
      setError('Failed to load event details');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRsvp = async () => {
    try {
      const response = await rsvpAPI.getUserEventRSVP(id);
      if (response.data.success && response.data.rsvp) {
        setRsvpStatus(response.data.rsvp.status);
        setRsvpData(prev => ({ ...prev, ...response.data.rsvp }));
      }
    } catch (err) {
      console.error('Error fetching RSVP:', err);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await commentsAPI.getEventComments(id);
      if (response.data.success) {
        setComments(response.data.comments || []);
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  const handleRsvpSubmit = async (status) => {
    if (!isAuthenticated) {
      alert('Please login to RSVP for this event');
      navigate('/login');
      return;
    }

    try {
      const rsvpPayload = { ...rsvpData, status };
      
      if (rsvpStatus) {
        // Update existing RSVP
        await rsvpAPI.updateRSVP(id, rsvpPayload);
      } else {
        // Create new RSVP
        await rsvpAPI.createRSVP(id, rsvpPayload);
      }
      
      setRsvpStatus(status);
      setShowRsvpForm(false);
      alert(`Successfully ${status === 'attending' ? 'confirmed attendance' : status === 'maybe' ? 'marked as maybe' : 'declined'} for this event!`);
    } catch (err) {
      alert('Failed to update RSVP. Please try again.');
    }
  };

  const handleQuickRsvp = (status) => {
    if (status === 'attending') {
      setRsvpData(prev => ({ ...prev, status }));
      setShowRsvpForm(true);
    } else {
      handleRsvpSubmit(status);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to comment');
      return;
    }
    if (!newComment.trim()) return;

    try {
      const response = await commentsAPI.createComment(id, { content: newComment });
      if (response.data.success) {
        setComments(prev => [response.data.comment, ...prev]);
        setNewComment('');
      }
    } catch (err) {
      alert('Failed to add comment');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (typeof timeString === 'string') {
      return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    }
    return timeString;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/events" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link to="/events" className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center">
            ← Back to Events
          </Link>
        </div>

        {/* Event Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Event Image */}
          {event.image && (
            <div className="h-64 bg-gray-200">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            {/* Title and Category */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {event.category}
                </span>
                <span className="text-gray-500 text-sm">
                  {event.attendees?.length || 0} attending
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{event.description}</p>
            </div>

            {/* Event Details Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Date & Time */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Date & Time</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatTime(event.time?.start)} - {formatTime(event.time?.end)}
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Location</h3>
                <div className="text-gray-600">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p>{event.location?.venue}</p>
                      <p>{event.location?.address}</p>
                      <p>{event.location?.city}, {event.location?.state} {event.location?.pincode}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Organizer */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Organizer</h3>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                    <span className="text-gray-600 font-medium">
                      {event.organizer?.firstName?.[0]}{event.organizer?.lastName?.[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {event.organizer?.firstName} {event.organizer?.lastName}
                    </p>
                    <p className="text-gray-600">{event.organizer?.email}</p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Price</h3>
                <div className="text-2xl font-bold text-green-600">
                  {event.price === 0 ? 'Free' : `₹${event.price}`}
                </div>
                {event.maxAttendees && (
                  <p className="text-gray-600 text-sm">
                    {event.maxAttendees - (event.attendees?.length || 0)} spots remaining
                  </p>
                )}
              </div>
            </div>

            {/* RSVP Section */}
            <div className="border-t border-gray-200 pt-8 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">RSVP Status</h3>
              
              {!isAuthenticated ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 mb-4">Please login to RSVP for this event</p>
                  <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Login to RSVP
                  </Link>
                </div>
              ) : rsvpStatus ? (
                <div className="text-center py-6 bg-green-50 rounded-lg">
                  <p className="text-green-800 mb-4">
                    You are <strong>{rsvpStatus}</strong> for this event
                  </p>
                  <div className="space-x-4">
                    <button
                      onClick={() => handleQuickRsvp('attending')}
                      className={`px-6 py-2 rounded-lg transition-colors ${
                        rsvpStatus === 'attending' 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Attending
                    </button>
                    <button
                      onClick={() => handleRsvpSubmit('maybe')}
                      className={`px-6 py-2 rounded-lg transition-colors ${
                        rsvpStatus === 'maybe' 
                          ? 'bg-yellow-600 text-white' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Maybe
                    </button>
                    <button
                      onClick={() => handleRsvpSubmit('not_attending')}
                      className={`px-6 py-2 rounded-lg transition-colors ${
                        rsvpStatus === 'not_attending' 
                          ? 'bg-red-600 text-white' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Not Attending
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-x-4">
                  <button
                    onClick={() => handleQuickRsvp('attending')}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    I'm Attending
                  </button>
                  <button
                    onClick={() => handleRsvpSubmit('maybe')}
                    className="bg-yellow-600 text-white px-8 py-3 rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    Maybe
                  </button>
                  <button
                    onClick={() => handleRsvpSubmit('not_attending')}
                    className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Can't Attend
                  </button>
                </div>
              )}
            </div>

            {/* RSVP Form Modal */}
            {showRsvpForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-4">Attendance Details</h3>
                  <form onSubmit={(e) => { e.preventDefault(); handleRsvpSubmit('attending'); }}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Number of Attendees
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={rsvpData.attendees}
                          onChange={(e) => setRsvpData(prev => ({ ...prev, attendees: parseInt(e.target.value) }))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={rsvpData.phone}
                          onChange={(e) => setRsvpData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Dietary Requirements
                        </label>
                        <textarea
                          value={rsvpData.dietaryRequirements}
                          onChange={(e) => setRsvpData(prev => ({ ...prev, dietaryRequirements: e.target.value }))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows="2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Special Requests
                        </label>
                        <textarea
                          value={rsvpData.specialRequests}
                          onChange={(e) => setRsvpData(prev => ({ ...prev, specialRequests: e.target.value }))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows="2"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-4 mt-6">
                      <button
                        type="submit"
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Confirm Attendance
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowRsvpForm(false)}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Comments Section */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Comments</h3>
              
              {isAuthenticated && (
                <form onSubmit={handleCommentSubmit} className="mb-6">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                  <button
                    type="submit"
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Post Comment
                  </button>
                </form>
              )}

              <div className="space-y-4">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment._id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-medium text-gray-600">
                            {comment.author?.firstName?.[0]}{comment.author?.lastName?.[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {comment.author?.firstName} {comment.author?.lastName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;