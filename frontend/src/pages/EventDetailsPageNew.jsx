import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { eventsAPI, rsvpAPI, commentsAPI } from '../services/api';

const EventDetailsPageNew = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rsvpStatus, setRsvpStatus] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showRsvpModal, setShowRsvpModal] = useState(false);
  const [rsvpData, setRsvpData] = useState({
    status: '',
    attendeeDetails: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: '',
      dietaryRequirements: '',
      specialRequests: '',
      emergencyContact: {
        name: '',
        phone: ''
      }
    }
  });

  useEffect(() => {
    if (id) {
      fetchEventDetails();
      fetchComments();
      if (isAuthenticated) {
        checkRsvpStatus();
      }
    }
  }, [id, isAuthenticated]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const response = await eventsAPI.getEvent(id);
      setEvent(response.data);
    } catch (error) {
      console.error('Error fetching event:', error);
      // Mock data fallback
      setEvent({
        _id: id,
        title: 'Tech Conference 2024',
        description: 'Join us for an amazing technology conference featuring the latest innovations and networking opportunities.',
        date: '2024-03-15',
        time: '09:00',
        location: {
          address: '123 Tech Center',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94105'
        },
        category: 'Technology',
        capacity: 100,
        price: 99,
        organizer: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com'
        },
        attendees: [],
        image: null
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await commentsAPI.getComments(id);
      setComments(response.data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
    }
  };

  const checkRsvpStatus = async () => {
    try {
      const response = await rsvpAPI.getUserRsvp(id);
      setRsvpStatus(response.data?.status || null);
    } catch (error) {
      console.error('Error checking RSVP status:', error);
      setRsvpStatus(null);
    }
  };

  const handleRsvpSubmit = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const response = await rsvpAPI.createRsvp(id, rsvpData);
      setRsvpStatus(rsvpData.status);
      setShowRsvpModal(false);
      alert('RSVP submitted successfully!');
      fetchEventDetails(); // Refresh event data
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('Failed to submit RSVP. Please try again.');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!newComment.trim()) return;

    try {
      await commentsAPI.createComment(id, { content: newComment });
      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'Time TBD';
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Event not found</h2>
          <Link to="/events" className="text-gray-600 hover:text-gray-900">
            Back to events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/events" className="text-gray-600 hover:text-gray-900 mb-4 inline-block">
            ← Back to Events
          </Link>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <span className="inline-block bg-gray-900 text-white px-3 py-1 rounded text-sm mb-3">
                {event.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {event.title}
              </h1>
              <div className="text-gray-600 space-y-1">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(event.date)} at {formatTime(event.time)}
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location.address}, {event.location.city}, {event.location.state}
                </div>
              </div>
            </div>
            <div className="mt-6 lg:mt-0 lg:ml-8">
              {isAuthenticated ? (
                <div className="space-y-3">
                  {rsvpStatus ? (
                    <div className="text-center">
                      <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium">
                        You're {rsvpStatus === 'attending' ? 'attending' : rsvpStatus === 'not_attending' ? 'not attending' : 'maybe attending'}
                      </div>
                      <button
                        onClick={() => setShowRsvpModal(true)}
                        className="text-sm text-gray-600 hover:text-gray-900 mt-2"
                      >
                        Change RSVP
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowRsvpModal(true)}
                      className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    >
                      RSVP Now
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <Link
                    to="/login"
                    className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors inline-block"
                  >
                    Sign in to RSVP
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* Description */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">About This Event</h2>
                <p className="text-gray-600 leading-relaxed">{event.description}</p>
              </div>

              {/* Event Info */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Event Details</h2>
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Date & Time</h3>
                      <p className="text-gray-600">{formatDate(event.date)}</p>
                      <p className="text-gray-600">{formatTime(event.time)}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Location</h3>
                      <p className="text-gray-600">
                        {event.location.address}<br />
                        {event.location.city}, {event.location.state} {event.location.zipCode}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Price</h3>
                      <p className="text-gray-600">{event.price > 0 ? `$${event.price}` : 'Free'}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Capacity</h3>
                      <p className="text-gray-600">{event.attendees?.length || 0} / {event.capacity} attendees</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Discussion</h2>
                
                {/* Comment Form */}
                {isAuthenticated ? (
                  <form onSubmit={handleCommentSubmit} className="mb-6">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts about this event..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
                      rows="3"
                    />
                    <button
                      type="submit"
                      className="mt-3 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Post Comment
                    </button>
                  </form>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center mb-6">
                    <p className="text-gray-600">
                      <Link to="/login" className="text-gray-900 hover:underline">Sign in</Link> to join the discussion
                    </p>
                  </div>
                )}

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.length > 0 ? (
                    comments.map((comment, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white text-sm font-medium">
                              {comment.user?.firstName?.charAt(0).toUpperCase() || 'U'}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {comment.user?.firstName} {comment.user?.lastName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(comment.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-600">{comment.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">No comments yet. Be the first to share your thoughts!</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Organizer Info */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Organizer</h3>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-medium">
                    {event.organizer?.firstName?.charAt(0).toUpperCase() || 'O'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {event.organizer?.firstName} {event.organizer?.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{event.organizer?.email}</p>
                </div>
              </div>
            </div>

            {/* Event Stats */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Event Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Attendees</span>
                  <span className="font-medium">{event.attendees?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Capacity</span>
                  <span className="font-medium">{event.capacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Available Spots</span>
                  <span className="font-medium">{event.capacity - (event.attendees?.length || 0)}</span>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Share Event</h3>
              <div className="space-y-2">
                <button className="w-full text-left text-gray-600 hover:text-gray-900 py-2">
                  Copy link
                </button>
                <button className="w-full text-left text-gray-600 hover:text-gray-900 py-2">
                  Share via email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RSVP Modal */}
      {showRsvpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">RSVP for {event.title}</h3>
                <button
                  onClick={() => setShowRsvpModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form className="space-y-4">
                {/* RSVP Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Will you attend this event?
                  </label>
                  <div className="space-y-2">
                    {['attending', 'not_attending', 'maybe'].map((status) => (
                      <label key={status} className="flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value={status}
                          checked={rsvpData.status === status}
                          onChange={(e) => setRsvpData({ ...rsvpData, status: e.target.value })}
                          className="mr-2"
                        />
                        <span className="capitalize">
                          {status === 'not_attending' ? 'Not Attending' : status}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {rsvpData.status === 'attending' && (
                  <>
                    {/* Personal Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={rsvpData.attendeeDetails.firstName}
                          onChange={(e) => setRsvpData({
                            ...rsvpData,
                            attendeeDetails: { ...rsvpData.attendeeDetails, firstName: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={rsvpData.attendeeDetails.lastName}
                          onChange={(e) => setRsvpData({
                            ...rsvpData,
                            attendeeDetails: { ...rsvpData.attendeeDetails, lastName: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={rsvpData.attendeeDetails.email}
                        onChange={(e) => setRsvpData({
                          ...rsvpData,
                          attendeeDetails: { ...rsvpData.attendeeDetails, email: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={rsvpData.attendeeDetails.phone}
                        onChange={(e) => setRsvpData({
                          ...rsvpData,
                          attendeeDetails: { ...rsvpData.attendeeDetails, phone: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dietary Requirements
                      </label>
                      <textarea
                        value={rsvpData.attendeeDetails.dietaryRequirements}
                        onChange={(e) => setRsvpData({
                          ...rsvpData,
                          attendeeDetails: { ...rsvpData.attendeeDetails, dietaryRequirements: e.target.value }
                        })}
                        placeholder="Any allergies or special dietary needs..."
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        rows="2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Special Requests
                      </label>
                      <textarea
                        value={rsvpData.attendeeDetails.specialRequests}
                        onChange={(e) => setRsvpData({
                          ...rsvpData,
                          attendeeDetails: { ...rsvpData.attendeeDetails, specialRequests: e.target.value }
                        })}
                        placeholder="Any special accommodations needed..."
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        rows="2"
                      />
                    </div>

                    {/* Emergency Contact */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Emergency Contact (Optional)</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            value={rsvpData.attendeeDetails.emergencyContact.name}
                            onChange={(e) => setRsvpData({
                              ...rsvpData,
                              attendeeDetails: {
                                ...rsvpData.attendeeDetails,
                                emergencyContact: { ...rsvpData.attendeeDetails.emergencyContact, name: e.target.value }
                              }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={rsvpData.attendeeDetails.emergencyContact.phone}
                            onChange={(e) => setRsvpData({
                              ...rsvpData,
                              attendeeDetails: {
                                ...rsvpData.attendeeDetails,
                                emergencyContact: { ...rsvpData.attendeeDetails.emergencyContact, phone: e.target.value }
                              }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowRsvpModal(false)}
                    className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleRsvpSubmit}
                    disabled={!rsvpData.status}
                    className="flex-1 bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    Submit RSVP
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailsPageNew;