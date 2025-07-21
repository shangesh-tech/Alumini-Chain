"use client";
import { useState } from "react";
import MemberProfileModal from "@/components/modals/MemberProfileModal";
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  Users,
  Heart,
  MessageCircle,
  UserPlus,
  Star,
} from "lucide-react";

const members = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Product Manager",
    company: "Microsoft",
    location: "Seattle, WA",
    skills: ["Product Strategy", "UX Design", "Data Analytics"],
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
    verified: true,
    premium: true,
    connections: 1247,
    isFollowing: false,
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Blockchain Developer",
    company: "ConsenSys",
    location: "New York, NY",
    skills: ["Solidity", "Web3", "Smart Contracts"],
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    verified: true,
    premium: false,
    connections: 892,
    isFollowing: true,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "Marketing Director",
    company: "Spotify",
    location: "Los Angeles, CA",
    skills: ["Digital Marketing", "Brand Strategy", "Growth Hacking"],
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    verified: true,
    premium: true,
    connections: 1534,
    isFollowing: false,
  },
  {
    id: 4,
    name: "David Park",
    title: "Data Scientist",
    company: "Tesla",
    location: "Austin, TX",
    skills: ["Machine Learning", "Python", "AI"],
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    verified: false,
    premium: false,
    connections: 678,
    isFollowing: true,
  },
  {
    id: 5,
    name: "Lisa Wang",
    title: "UX Designer",
    company: "Airbnb",
    location: "San Francisco, CA",
    skills: ["UI/UX", "Figma", "User Research"],
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face",
    verified: true,
    premium: true,
    connections: 1023,
    isFollowing: false,
  },
  {
    id: 6,
    name: "Alex Thompson",
    title: "DevOps Engineer",
    company: "AWS",
    location: "Remote",
    skills: ["Kubernetes", "Docker", "CI/CD"],
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
    verified: true,
    premium: false,
    connections: 945,
    isFollowing: false,
  },
];

export default function Members() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [membersList, setMembersList] = useState(members);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFollow = (memberId) => {
    setMembersList((prev) =>
      prev.map((member) =>
        member.id === memberId
          ? { ...member, isFollowing: !member.isFollowing }
          : member
      )
    );
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const filteredMembers = membersList.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Member Directory</h1>
        <p className="text-zinc-500">
          Connect with {members.length} amazing alumni
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by name, title, company, or skills..."
            className="w-full pl-10 py-2 bg-zinc-800/50 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <button className="flex items-center px-3 py-2 text-sm border border-zinc-700 rounded-md hover:bg-zinc-800">
            <MapPin className="w-4 h-4 mr-2" />
            Location
          </button>
          <button className="flex items-center px-3 py-2 text-sm border border-zinc-700 rounded-md hover:bg-zinc-800">
            <Briefcase className="w-4 h-4 mr-2" />
            Industry
          </button>
          <button className="flex items-center px-3 py-2 text-sm border border-zinc-700 rounded-md hover:bg-zinc-800">
            <Users className="w-4 h-4 mr-2" />
            Role
          </button>
        </div>
      </div>

      {/* Member Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-zinc-800/30 backdrop-blur-sm rounded-lg border border-zinc-700/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="p-6">
              <div className="flex items-start justify-between pb-4">
                <div
                  className="flex items-center space-x-3 cursor-pointer flex-1"
                  onClick={() => handleMemberClick(member)}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium hover:text-purple-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm text-zinc-400">
                      {member.title} at {member.company}
                    </p>
                  </div>
                </div>
                <button className="p-2 text-zinc-400 hover:text-red-500 rounded-md">
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-sm text-zinc-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  {member.location}
                </div>

                <div className="flex flex-wrap gap-2">
                  {member.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs border border-zinc-700 rounded-full text-zinc-300"
                    >
                      {skill}
                    </span>
                  ))}
                  {member.skills.length > 3 && (
                    <span className="px-2 py-1 text-xs border border-zinc-700 rounded-full text-zinc-300">
                      +{member.skills.length - 3} more
                    </span>
                  )}
                </div>

                <div>
                  <button className="flex items-center px-3 py-2 text-sm border border-zinc-700 rounded-md hover:bg-zinc-800">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <button className="px-6 py-3 text-sm border border-zinc-700 rounded-md hover:bg-zinc-800">
          Load More Members
        </button>
      </div>

      {/* Member Profile Modal */}
      <MemberProfileModal
        member={selectedMember}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onFollow={handleFollow}
      />
    </div>
  );
}
