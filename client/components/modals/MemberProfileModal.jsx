import { useState, useEffect } from "react";
import { 
  MapPin, 
  Briefcase, 
  Users, 
  MessageCircle,
  UserPlus,
  Star,
  ExternalLink,
  Calendar,
  GraduationCap,
  Award,
  Building,
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin,
  Twitter,
  X
} from "lucide-react";

export default function MemberProfileModal({ member, open, onOpenChange, onFollow }) {
  if (!member) return null;

  const profileData = {
    bio: "Passionate product manager with 8+ years of experience building scalable web applications and leading cross-functional teams. Currently focused on Web3 and blockchain technologies at Microsoft.",
    experience: [
      {
        title: "Senior Product Manager",
        company: "Microsoft",
        period: "2022 - Present",
        location: "Seattle, WA",
        description: "Leading product strategy for Azure blockchain services, managing a team of 12 engineers and designers."
      },
      {
        title: "Product Manager",
        company: "Google",
        period: "2020 - 2022",
        location: "Mountain View, CA",
        description: "Drove product development for Google Cloud Platform, focusing on developer tools and API services."
      },
      {
        title: "Associate Product Manager",
        company: "Facebook",
        period: "2018 - 2020",
        location: "Menlo Park, CA",
        description: "Worked on Facebook's main platform, specializing in user engagement and analytics features."
      }
    ],
    education: [
      {
        degree: "Master of Business Administration",
        school: "Stanford University",
        period: "2016 - 2018",
        description: "Specialized in Technology Management and Entrepreneurship"
      },
      {
        degree: "Bachelor of Science in Computer Science",
        school: "University of California, Berkeley",
        period: "2012 - 2016",
        description: "Graduated Summa Cum Laude, Member of Phi Beta Kappa"
      }
    ],
    certifications: [
      {
        name: "Certified Product Manager",
        issuer: "Product Management Institute",
        date: "2023"
      },
      {
        name: "AWS Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2022"
      },
      {
        name: "Scrum Master Certification",
        issuer: "Scrum Alliance",
        date: "2021"
      }
    ],
    projects: [
      {
        name: "DeFi Analytics Platform",
        description: "Built a comprehensive analytics platform for DeFi protocols using React and Node.js",
        tags: ["React", "Node.js", "DeFi", "Analytics"]
      },
      {
        name: "Web3 Wallet Integration",
        description: "Developed seamless wallet integration for enterprise blockchain applications",
        tags: ["Web3", "Blockchain", "Enterprise", "Security"]
      }
    ],
    achievements: [
      "Led the launch of Microsoft's first blockchain-as-a-service platform",
      "Increased user engagement by 40% through data-driven product decisions",
      "Mentored 15+ junior product managers and engineers",
      "Speaker at Web3 Summit 2023 and Product Management Conference 2022"
    ],
    contact: {
      email: "sarah.johnson@microsoft.com",
      phone: "+1 (555) 123-4567",
      website: "https://sarahjohnson.dev",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      github: "https://github.com/sarahjohnson",
      twitter: "https://twitter.com/sarahjohnson"
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-zinc-800 rounded-lg shadow-xl max-w-4xl max-h-[90vh] w-full overflow-hidden flex flex-col">
        <div className="p-6 pb-4 border-b border-zinc-700">
          <h2 className="sr-only">Member Profile</h2>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div>
                
                <h1 className="text-2xl font-bold">{member.name}</h1>
                <p className="text-lg text-zinc-400">{member.title}</p>
                <p className="text-sm text-zinc-400">{member.company}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-zinc-400">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {member.location}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1.5 border border-zinc-600 rounded-lg text-sm flex items-center hover:bg-zinc-700 transition-colors">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </button>
              <button 
                className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
                onClick={() => onOpenChange(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-sm leading-relaxed text-zinc-400">{profileData.bio}</p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-zinc-400" />
                <span>{profileData.contact.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-zinc-400" />
                <span>{profileData.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Globe className="w-4 h-4 text-zinc-400" />
                <span>{profileData.contact.website}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Linkedin className="w-4 h-4 text-zinc-400" />
                <span>LinkedIn Profile</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-zinc-700 text-zinc-300 rounded-full text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-zinc-700 my-6"></div>

          {/* Experience */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Experience</h3>
            <div className="space-y-4">
              {profileData.experience.map((exp, index) => (
                <div key={index} className="bg-zinc-800/50 border border-zinc-700 rounded-lg">
                  <div className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-purple-600/10 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-purple-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{exp.title}</h4>
                        <p className="text-sm text-zinc-400">{exp.company} • {exp.location}</p>
                        <p className="text-xs text-zinc-500 mb-2">{exp.period}</p>
                        <p className="text-sm leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Education</h3>
            <div className="space-y-4">
              {profileData.education.map((edu, index) => (
                <div key={index} className="bg-zinc-800/50 border border-zinc-700 rounded-lg">
                  <div className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-purple-600/10 rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-purple-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{edu.degree}</h4>
                        <p className="text-sm text-zinc-400">{edu.school}</p>
                        <p className="text-xs text-zinc-500 mb-2">{edu.period}</p>
                        <p className="text-sm leading-relaxed">{edu.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profileData.certifications.map((cert, index) => (
                <div key={index} className="bg-zinc-800/50 border border-zinc-700 rounded-lg">
                  <div className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-purple-600/10 rounded-lg flex items-center justify-center">
                        <Award className="w-4 h-4 text-purple-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{cert.name}</h4>
                        <p className="text-xs text-zinc-400">{cert.issuer} • {cert.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Featured Projects</h3>
            <div className="space-y-4">
              {profileData.projects.map((project, index) => (
                <div key={index} className="bg-zinc-800/50 border border-zinc-700 rounded-lg">
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{project.name}</h4>
                        <p className="text-sm text-zinc-400 mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="px-2 py-1 border border-zinc-600 text-zinc-300 rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="p-2 hover:bg-zinc-700 rounded-lg transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Key Achievements</h3>
            <ul className="space-y-2">
              {profileData.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}