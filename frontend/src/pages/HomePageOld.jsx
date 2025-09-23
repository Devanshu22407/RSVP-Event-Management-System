import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { eventsAPI } from '../services/api';
import AnimatedButton from '../components/AnimatedButton';

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    date: ''
  });

  useEffect(() => {
    fetchEvents();
  }, [filters]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventsAPI.getEvents(filters);
      setEvents(response.data.events || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeObj) => {
    if (typeof timeObj === 'string') {
      return new Date(`2000-01-01T${timeObj}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    }
    if (timeObj && timeObj.start) {
      return new Date(`2000-01-01T${timeObj.start}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    }
    return 'Time TBD';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {isAuthenticated ? (
            <>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Welcome back, {user?.firstName}! 👋
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Ready to discover amazing events and connect with your community today?
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Discover Amazing Events
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Connect with your community through exciting events, meetups, and experiences that matter to you
              </p>
            </>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/events" 
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg transform hover:scale-105"
            >
              🎯 Explore Events
            </Link>
            {isAuthenticated ? (
              <Link 
                to="/create-event" 
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all shadow-lg transform hover:scale-105"
              >
                ✨ Create Event
              </Link>
            ) : (
              <Link 
                to="/signup" 
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all shadow-lg transform hover:scale-105"
              >
                🚀 Get Started
              </Link>
            )}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white opacity-10 rounded-full"></div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">Find Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  <option value="Technology">Technology</option>
                  <option value="Business">Business</option>
                  <option value="Health & Wellness">Health & Wellness</option>
                  <option value="Education">Education</option>
                  <option value="Arts & Culture">Arts & Culture</option>
                  <option value="Sports & Fitness">Sports & Fitness</option>
                  <option value="Food & Drink">Food & Drink</option>
                  <option value="Music">Music</option>
                  <option value="Social">Social</option>
                  <option value="Networking">Networking</option>
                  <option value="Other">Other</option>
                </select>
                
                <input
                  type="text"
                  placeholder="Location"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                
                <input
                  type="date"
                  value={filters.date}
                  onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Events List */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
                <AnimatedButton 
                  to="/events"
                  size="medium"
                >
                  Explore All Events
                </AnimatedButton>
              </div>
              
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
              ) : events.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
                  <p className="text-gray-500">Try adjusting your filters or create a new event.</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {events.map((event) => (
                    <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <img
                            src={event.image || '/api/placeholder/400/250'}
                            alt={event.title}
                            className="w-full h-48 md:h-full object-cover"
                          />
                        </div>
                        <div className="md:w-2/3 p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                <Link to={`/events/${event._id}`} className="hover:text-blue-600">
                                  {event.title}
                                </Link>
                              </h3>
                              <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                              
                              <div className="space-y-2 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  {formatDate(event.date)} at {formatTime(event.time)}
                                </div>
                                <div className="flex items-center">
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  {event.location?.city && event.location?.state 
                                    ? `${event.location.city}, ${event.location.state}` 
                                    : event.location?.address || 'Location TBD'}
                                </div>
                                <div className="flex items-center">
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                  </svg>
                                  {event.attendees?.length || 0} / {event.capacity} attendees
                                </div>
                              </div>
                            </div>
                            
                            <div className="ml-4">
                              <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                                {event.category}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-between items-center">
                            <AnimatedButton 
                              to={`/events/${event._id}`}
                              size="small"
                            >
                              View Details
                            </AnimatedButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4">
            {/* Quick Actions - Enhanced */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-6 text-gray-900 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Quick Actions
              </h3>
              <div className="space-y-4">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/create-event"
                      className="group flex items-center w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md transform hover:scale-105"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <div className="text-left">
                        <div className="font-medium">Create Event</div>
                        <div className="text-sm text-blue-100">Share your passion</div>
                      </div>
                    </Link>
                    <Link
                      to="/my-events"
                      className="group flex items-center w-full border-2 border-green-500 text-green-600 p-4 rounded-lg hover:bg-green-50 transition-all transform hover:scale-105"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <div className="text-left">
                        <div className="font-medium">My Events</div>
                        <div className="text-sm text-green-500">Manage your events</div>
                      </div>
                    </Link>
                    <Link
                      to="/attending"
                      className="group flex items-center w-full border-2 border-purple-500 text-purple-600 p-4 rounded-lg hover:bg-purple-50 transition-all transform hover:scale-105"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="text-left">
                        <div className="font-medium">My RSVPs</div>
                        <div className="text-sm text-purple-500">Events you're attending</div>
                      </div>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="group flex items-center w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md transform hover:scale-105"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      <div className="text-left">
                        <div className="font-medium">Join EventHub</div>
                        <div className="text-sm text-blue-100">Start your journey</div>
                      </div>
                    </Link>
                    <Link
                      to="/login"
                      className="group flex items-center w-full border-2 border-blue-500 text-blue-600 p-4 rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <div className="text-left">
                        <div className="font-medium">Sign In</div>
                        <div className="text-sm text-blue-500">Welcome back</div>
                      </div>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border border-blue-100">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Events</span>
                  <span className="font-bold text-blue-600">{events.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Members</span>
                  <span className="font-bold text-purple-600">15,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Communities</span>
                  <span className="font-bold text-green-600">42</span>
                </div>
              </div>
            </div>

            {/* Popular Categories - Enhanced */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Categories
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => setFilters({ ...filters, category: '' })}
                  className={`flex items-center justify-between w-full text-left text-sm py-3 px-4 rounded-lg transition-all ${
                    filters.category === '' 
                      ? 'bg-blue-100 text-blue-700 font-medium shadow-sm' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                    {events.length}
                  </span>
                </button>
                {['Technology', 'Business', 'Health & Wellness', 'Education', 'Arts & Culture'].map((category) => {
                  const categoryCount = events.filter(event => event.category === category).length;
                  return (
                    <button
                      key={category}
                      onClick={() => setFilters({ ...filters, category: category })}
                      className={`flex items-center justify-between w-full text-left text-sm py-3 px-4 rounded-lg transition-all ${
                        filters.category === category 
                          ? 'bg-blue-100 text-blue-700 font-medium shadow-sm' 
                          : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      <span>{category}</span>
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                        {categoryCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;