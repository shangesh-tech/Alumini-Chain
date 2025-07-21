"use client"
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Plus,
  Video,
  Star
} from "lucide-react";
import { useState } from "react";

const events = [
  {
    id: 1,
    title: "Web3 Career Summit 2024",
    description: "Join industry leaders for insights on building careers in Web3 and blockchain technology.",
    date: "2024-03-15",
    time: "10:00 AM - 6:00 PM PST",
    location: "Virtual Event",
    type: "Conference",
    organizer: "AlumniDAO",
    attendees: 247,
    maxAttendees: 500,
    price: "Free",
    status: "upcoming",
    featured: true,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop",
    speakers: [
      { name: "Vitalik Buterin", role: "Ethereum Founder", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" },
      { name: "Andreessen Horowitz", role: "Partner", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face" }
    ]
  },
  {
    id: 2,
    title: "AI & Machine Learning Workshop",
    description: "Hands-on workshop covering latest ML techniques and practical applications.",
    date: "2024-03-20",
    time: "2:00 PM - 5:00 PM EST",
    location: "New York, NY",
    type: "Workshop",
    organizer: "Sarah Johnson",
    attendees: 45,
    maxAttendees: 50,
    price: "$50",
    status: "upcoming",
    featured: false,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop",
    speakers: [
      { name: "Dr. Emily Chen", role: "ML Researcher", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face" }
    ]
  },
  {
    id: 3,
    title: "Startup Pitch Night",
    description: "Network with entrepreneurs and investors in this monthly pitch event.",
    date: "2024-03-25",
    time: "7:00 PM - 10:00 PM PST",
    location: "San Francisco, CA",
    type: "Networking",
    organizer: "Michael Chen",
    attendees: 89,
    maxAttendees: 100,
    price: "Free",
    status: "upcoming",
    featured: true,
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=200&fit=crop",
    speakers: [
      { name: "Alex Johnson", role: "VC Partner", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face" }
    ]
  },
  {
    id: 4,
    title: "Alumni Book Club: \"The Lean Startup\"",
    description: "Monthly discussion of business and tech books with fellow alumni.",
    date: "2024-04-01",
    time: "6:00 PM - 7:30 PM EST",
    location: "Virtual Event",
    type: "Social",
    organizer: "Lisa Wang",
    attendees: 23,
    maxAttendees: 30,
    price: "Free",
    status: "upcoming",
    featured: false,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop",
    speakers: []
  }
];

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleJoinEvent = (eventId) => {
    // Handle event joining logic
    console.log("Joining event:", eventId);
  };

  const filteredEvents = events.filter(event => {
    if (filter === "all") return true;
    return event.type.toLowerCase() === filter.toLowerCase();
  });

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="text-zinc-400">Discover and join amazing events</p>
        </div>
          <button className="px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm flex items-center transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {["all", "conference", "workshop", "networking", "social"].map((filterType) => (
          <button
            key={filterType}
            className={`px-3 py-2 rounded-md text-sm capitalize ${
              filter === filterType 
                ? "bg-purple-600 text-white" 
                : "border border-zinc-700 hover:bg-zinc-800"
            }`}
            onClick={() => setFilter(filterType)}
          >
            {filterType}
          </button>
        ))}
      </div>

      {/* Featured Events */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Featured Events</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEvents.filter(event => event.featured).map((event) => (
            <div key={event.id} className="bg-zinc-800/30 backdrop-blur-sm rounded-lg border border-zinc-700/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <div 
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${event.image})` }}
              >
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute top-4 right-4">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs">
                    {event.type}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{event.title}</h3>
                    <p className="mt-2 text-zinc-400 text-sm">{event.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="px-6 pb-6 space-y-4">
                <div className="flex items-center text-sm text-zinc-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                
                <div className="flex items-center text-sm text-zinc-400">
                  <Clock className="w-4 h-4 mr-2" />
                  {event.time}
                </div>
                
                <div className="flex items-center text-sm text-zinc-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  {event.location}
                </div>
                
                <div className="flex items-center text-sm text-zinc-400">
                  <Users className="w-4 h-4 mr-2" />
                  {event.attendees} / {event.maxAttendees} attendees
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-purple-500">
                    {event.price}
                  </span>
                  <button 
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm transition-colors"
                    onClick={() => openEventModal(event)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Events */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-zinc-800/30 backdrop-blur-sm rounded-lg border border-zinc-700/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div 
                className="h-32 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${event.image})` }}
              >
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute top-2 right-2">
                  <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs">
                    {event.type}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-medium">{event.title}</h3>
                <p className="text-zinc-400 text-sm line-clamp-2">{event.description}</p>
              </div>
              
              <div className="px-4 pb-4 space-y-3">
                <div className="flex items-center text-sm text-zinc-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                
                <div className="flex items-center text-sm text-zinc-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  {event.location}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-zinc-400">
                    <Users className="w-4 h-4 mr-2" />
                    {event.attendees} attending
                  </div>
                  <span className="text-sm font-semibold text-purple-500">
                    {event.price}
                  </span>
                </div>
                
                <button className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm transition-colors">
                  Join Event
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-zinc-800 rounded-lg shadow-xl max-w-2xl max-h-[90vh] w-full overflow-hidden flex flex-col">
            <div className="p-6 pb-4 border-b border-zinc-700 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold">{selectedEvent.title}</h2>
                <p className="text-zinc-400">{selectedEvent.description}</p>
              </div>
              <button 
                className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="overflow-y-auto p-6 space-y-6">
              <div 
                className="h-48 bg-cover bg-center rounded-lg"
                style={{ backgroundImage: `url(${selectedEvent.image})` }}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Event Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(selectedEvent.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {selectedEvent.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {selectedEvent.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      {selectedEvent.attendees} / {selectedEvent.maxAttendees}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Speakers</h4>
                  <div className="space-y-2">
                    {selectedEvent.speakers.length > 0 ? (
                      selectedEvent.speakers.map((speaker, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img 
                              src={speaker.avatar} 
                              alt={speaker.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{speaker.name}</p>
                            <p className="text-xs text-zinc-400">{speaker.role}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-zinc-400">No speakers listed for this event</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button 
                  className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors"
                  onClick={() => handleJoinEvent(selectedEvent.id)}
                >
                  Join Event - {selectedEvent.price}
                </button>
                <button className="px-4 py-2 border border-zinc-700 rounded-md hover:bg-zinc-700 transition-colors flex items-center">
                  <Video className="w-4 h-4 mr-2" />
                  Add to Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}