import { 
  MapPin, 
  Clock, 
  Building, 
  DollarSign,
  Users,
  Bookmark,
  ExternalLink,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Globe,
  Mail
} from "lucide-react";

export default function JobDetailModal({ job, open, onOpenChange, onBookmark, onApply }) {
  if (!job) return null;

  const companyInfo = {
    website: "https://consensys.net",
    email: "careers@consensys.net",
    size: "1000-5000 employees",
    industry: "Blockchain Technology",
    founded: "2014",
    description: "ConsenSys is the leading Ethereum software company. We enable developers, enterprises, and people worldwide to build next-generation applications, launch modern financial infrastructure, and access the decentralized web."
  };

  const benefits = [
    "Competitive salary and equity",
    "Comprehensive health insurance",
    "Flexible work arrangements",
    "Professional development budget",
    "Conference attendance support",
    "Unlimited PTO",
    "Remote work stipend",
    "Latest tech equipment"
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Engineering Manager",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "Senior Developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Product Manager",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
    }
  ];

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 rounded-lg max-w-4xl max-h-[90vh] w-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-zinc-800">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-zinc-800 flex items-center justify-center">
                <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{job.title}</h2>
                <p className="text-lg text-zinc-400">{job.company}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-zinc-400">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {job.type}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Posted {job.posted}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => onBookmark(job.id)}
              className={`p-2 rounded-full hover:bg-zinc-800 ${job.isBookmarked ? "text-purple-500" : ""}`}
            >
              <Bookmark className={`w-5 h-5 ${job.isBookmarked ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-zinc-800/50 backdrop-blur-sm p-4 rounded-lg text-center">
              <DollarSign className="w-6 h-6 mx-auto mb-2 text-purple-500" />
              <p className="text-sm font-medium">{job.salary}</p>
              <p className="text-xs text-zinc-400">Salary</p>
            </div>
            <div className="bg-zinc-800/50 backdrop-blur-sm p-4 rounded-lg text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-purple-500" />
              <p className="text-sm font-medium">{job.applicants}</p>
              <p className="text-xs text-zinc-400">Applicants</p>
            </div>
            <div className="bg-zinc-800/50 backdrop-blur-sm p-4 rounded-lg text-center">
              <Building className="w-6 h-6 mx-auto mb-2 text-purple-500" />
              <p className="text-sm font-medium">{job.remote ? "Remote" : "On-site"}</p>
              <p className="text-xs text-zinc-400">Work Mode</p>
            </div>
            <div className="bg-zinc-800/50 backdrop-blur-sm p-4 rounded-lg text-center">
              <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-purple-500" />
              <p className="text-sm font-medium">Open</p>
              <p className="text-xs text-zinc-400">Status</p>
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About this role</h3>
            <p className="text-sm leading-relaxed text-zinc-400">{job.description}</p>
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span key={index} className="bg-zinc-800 text-xs px-2 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Requirements</h3>
            <ul className="space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Benefits & Perks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-zinc-800 my-6"></div>

          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About {job.company}</h3>
            <div className="bg-zinc-800/50 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-700 flex items-center justify-center">
                  <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold">{job.company}</h4>
                  <p className="text-sm text-zinc-400">{companyInfo.industry}</p>
                </div>
              </div>
              <p className="text-sm text-zinc-400 mb-4">{companyInfo.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Company Size</p>
                  <p className="text-zinc-400">{companyInfo.size}</p>
                </div>
                <div>
                  <p className="font-medium">Founded</p>
                  <p className="text-zinc-400">{companyInfo.founded}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-4">
                <button className="px-3 py-1 border border-zinc-700 rounded-md text-sm flex items-center hover:bg-zinc-800">
                  <Globe className="w-4 h-4 mr-2" />
                  Website
                </button>
                <button className="px-3 py-1 border border-zinc-700 rounded-md text-sm flex items-center hover:bg-zinc-800">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact
                </button>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Meet the team</h3>
            <div className="flex space-x-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-zinc-800/50 backdrop-blur-sm p-3 rounded-lg text-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-700 mx-auto mb-2">
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-zinc-400">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between p-6 border-t border-zinc-800">
          <div className="flex items-center space-x-2 text-sm text-zinc-400">
            <Users className="w-4 h-4" />
            <span>{job.applicants} people have applied</span>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 border border-zinc-700 rounded-md text-sm flex items-center hover:bg-zinc-800">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Company
            </button>
            <button 
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm flex items-center"
              onClick={() => onApply(job.id)}
            >
              Apply Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
        
        {/* Close button */}
        <button 
          className="absolute top-4 right-4 text-zinc-400 hover:text-white"
          onClick={() => onOpenChange(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}