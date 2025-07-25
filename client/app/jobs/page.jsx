"use client"
import { useState } from "react";
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign,
  Users,
  Bookmark,
  ExternalLink,
  Plus
} from "lucide-react";

const jobs = [
  {
    id: 1,
    title: "Senior Smart Contract Developer",
    company: "ConsenSys",
    location: "New York, NY",
    type: "Full-time",
    salary: "$120k - $180k",
    remote: true,
    posted: "2 days ago",
    description: "We're looking for an experienced smart contract developer to join our growing team. You'll work on cutting-edge DeFi protocols and help shape the future of decentralized finance.",
    requirements: ["5+ years of Solidity experience", "Deep understanding of Ethereum", "Experience with testing frameworks", "Knowledge of DeFi protocols"],
    skills: ["Solidity", "Ethereum", "Web3", "DeFi", "JavaScript"],
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=32&h=32&fit=crop",
    featured: true,
    applicants: 47,
    isBookmarked: false
  },
  {
    id: 2,
    title: "Product Manager - Web3",
    company: "Coinbase",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$140k - $200k",
    remote: false,
    posted: "3 days ago",
    description: "Lead product strategy for our next-generation Web3 platform. Work with engineering and design teams to build intuitive crypto experiences.",
    requirements: ["3+ years product management experience", "Understanding of blockchain technology", "Experience with consumer products", "Strong analytical skills"],
    skills: ["Product Management", "Web3", "Analytics", "Strategy", "Leadership"],
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=32&h=32&fit=crop",
    featured: true,
    applicants: 89,
    isBookmarked: true
  },
  {
    id: 3,
    title: "Frontend Developer - DeFi",
    company: "Uniswap Labs",
    location: "Remote",
    type: "Contract",
    salary: "$80k - $120k",
    remote: true,
    posted: "1 week ago",
    description: "Join our frontend team to build the next generation of DeFi interfaces. Work with React, TypeScript, and Web3 libraries.",
    requirements: ["Strong React/TypeScript skills", "Experience with Web3 libraries", "Understanding of DeFi protocols", "Attention to detail"],
    skills: ["React", "TypeScript", "Web3.js", "DeFi", "CSS"],
    logo: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=32&h=32&fit=crop",
    featured: false,
    applicants: 23,
    isBookmarked: false
  },
  {
    id: 4,
    title: "Data Scientist - Blockchain Analytics",
    company: "Chainalysis",
    location: "Washington, DC",
    type: "Full-time",
    salary: "$110k - $160k",
    remote: true,
    posted: "1 week ago",
    description: "Analyze blockchain data to identify patterns and insights. Work with our research team to develop new analytical tools.",
    requirements: ["PhD in Computer Science or related field", "Experience with Python/R", "Knowledge of blockchain technology", "Strong statistical background"],
    skills: ["Python", "R", "Machine Learning", "Blockchain", "Statistics"],
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=32&h=32&fit=crop",
    featured: false,
    applicants: 34,
    isBookmarked: true
  }
];

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobsList, setJobsList] = useState(jobs);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookmark = (jobId) => {
    setJobsList(prev => 
      prev.map(job => 
        job.id === jobId 
          ? { ...job, isBookmarked: !job.isBookmarked }
          : job
      )
    );
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleApply = (jobId) => {
    console.log("Applying to job:", jobId);
  };

  const filteredJobs = jobsList.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === "all" || job.type.toLowerCase() === selectedType.toLowerCase();
    const matchesLocation = selectedLocation === "all" || 
                           (selectedLocation === "remote" && job.remote) ||
                           job.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Job Board</h1>
          <p className="text-gray-500">Discover your next opportunity</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm flex items-center hover:bg-gray-100">
            <Bookmark className="w-4 h-4 mr-2" />
            Saved Jobs
          </button>
          <button className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-md text-sm flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Post Job
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search jobs, companies, or skills..."
            className="w-full pl-10 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="relative w-full md:w-40">
          <select 
            className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="full-time">Full-time</option>
            <option value="contract">Contract</option>
            <option value="part-time">Part-time</option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <Filter className="w-4 h-4 text-gray-500" />
          </div>
        </div>
        
        <div className="relative w-full md:w-40">
          <select 
            className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="all">All Locations</option>
            <option value="remote">Remote</option>
            <option value="new york">New York</option>
            <option value="san francisco">San Francisco</option>
            <option value="washington">Washington</option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <Filter className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Featured Jobs */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Featured Jobs</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.filter(job => job.featured).map((job) => (
            <div key={job.id} className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg hover:translate-y-[-4px] transition-all duration-300 animate-fade-in">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                      <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{job.title}</h3>
                      <p className="text-gray-500">{job.company}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleBookmark(job.id)}
                    className={`p-2 rounded-full hover:bg-gray-100 ${job.isBookmarked ? "text-purple-500" : ""}`}
                  >
                    <Bookmark className={`w-4 h-4 ${job.isBookmarked ? "fill-current" : ""}`} />
                  </button>
                </div>
              </div>
              
              <div className="px-6 pb-6 space-y-4">
                <p className="text-sm text-gray-500">{job.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {job.skills.slice(0, 4).map((skill, index) => (
                    <span key={index} className="px-2 py-1 text-xs border border-gray-300 rounded-full">
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 4 && (
                    <span className="px-2 py-1 text-xs border border-gray-300 rounded-full">
                      +{job.skills.length - 4} more
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {job.type}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {job.salary}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    {job.applicants} applicants
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      className="px-3 py-1.5 border border-gray-300 rounded-md text-sm flex items-center hover:bg-gray-100"
                      onClick={() => handleJobClick(job)}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Details
                    </button>
                    <button 
                      className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-md text-sm"
                      onClick={() => handleApply(job.id)}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Jobs */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Jobs</h2>
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg hover:translate-y-[-4px] transition-all duration-300 animate-fade-in">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                      <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        {job.remote && <span className="px-2 py-0.5 bg-gray-200 text-xs rounded-full">Remote</span>}
                      </div>
                      <p className="text-gray-500 mb-2">{job.company}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {job.type}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {job.salary}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {job.skills.slice(0, 5).map((skill, index) => (
                          <span key={index} className="px-2 py-1 text-xs border border-gray-300 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <button
                      onClick={() => handleBookmark(job.id)}
                      className={`p-2 rounded-full hover:bg-gray-100 ${job.isBookmarked ? "text-purple-500" : ""}`}
                    >
                      <Bookmark className={`w-4 h-4 ${job.isBookmarked ? "fill-current" : ""}`} />
                    </button>
                    
                    <div className="text-xs text-gray-500 text-right">
                      <p>Posted {job.posted}</p>
                      <p>{job.applicants} applicants</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        className="px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-100"
                        onClick={() => handleJobClick(job)}
                      >
                        View Details
                      </button>
                      <button 
                        className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-md text-sm"
                        onClick={() => handleApply(job.id)}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Job Detail Modal */}
      {isModalOpen && selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white border border-gray-200 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                    <img src={selectedJob.logo} alt={selectedJob.company} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
                    <p className="text-gray-500">{selectedJob.company}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p>{selectedJob.location}</p>
                    {selectedJob.remote && <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">Remote</span>}
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-500">Job Type</p>
                    <p>{selectedJob.type}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-500">Salary</p>
                    <p>{selectedJob.salary}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{selectedJob.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={() => handleBookmark(selectedJob.id)}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${selectedJob.isBookmarked ? "fill-current text-purple-500" : ""}`} />
                  {selectedJob.isBookmarked ? "Saved" : "Save Job"}
                </button>
                
                <button
                  onClick={() => handleApply(selectedJob.id)}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-md"
                >
                  Apply for this position
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}