"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Eye, Download, Sparkles, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface Resume {
  title: string;
  summary: string;

  personalInfo: {
    fullname: string;
    email: string;
    mobile: string;
    location: string;
    github: string;
    portfolio: string;
  };

  education: {
    institute: string;
    degree: string;
    startDate: string;
    endDate: string;
  }[];

  skills: string[];

  projects: {
    title: string;
    description: string;
    techStack: string[];
    githubUrl: string;
    liveUrl: string;
  }[];

  workExperience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];

  certifications: string[];
}

export default function ResumePreviewPage() {
  const [resume, setResume] = useState<Resume | null>(null);

  const [loading, setLoading] = useState(true);
  const [atsLoading, setAtsLoading] = useState(false);
  const [showAtsModal, setShowAtsModal] = useState(false);
  const [atsResult, setAtsResult] = useState<any>(null);

  const { resumeId } = useParams();
  const router = useRouter();

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);

      console.log("main resume in data", data);

      setResume(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAtsScore = async () => {
    try {
      setAtsLoading(true);
      setShowAtsModal(true);
      const resumeText = JSON.stringify(resume);
      const { data } = await axios.post("/api/ai/ats-score", { resumeText });
      
      let scoreData = data.data.AtsScore;
      if (typeof scoreData === "string") {
        try {
          scoreData = JSON.parse(scoreData);
        } catch (e) {
          console.log("Failed to parse ATS score JSON");
        }
      }
      setAtsResult(scoreData);
    } catch (error) {
      console.log(error);
    } finally {
      setAtsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading Resume...
      </div>
    );
  }

  if (!resume) return null;

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Actions */}

          <div className="lg:col-span-1 print:hidden">
            <div className="bg-white rounded-3xl p-6 border sticky top-6">
              <h2 className="font-bold text-xl mb-6">Resume Actions</h2>

              <div className="space-y-3">
                <button
                  onClick={handleAtsScore}
                  className="w-full flex items-center gap-3 bg-violet-600 hover:bg-violet-700 text-white px-4 py-3 rounded-xl transition"
                >
                  <Sparkles size={18} />
                  ATS Score
                </button>

                <button
                  onClick={() => window.print()}
                  className="w-full flex items-center gap-3 border px-4 py-3 rounded-xl hover:bg-slate-50 transition"
                >
                  <Download size={18} />
                  Download PDF
                </button>

                <button
                  onClick={() => router.push(`/resume/${resumeId}`)}
                  className="w-full flex items-center gap-3 border px-4 py-3 rounded-xl hover:bg-slate-50 transition"
                >
                  <Eye size={18} />
                  Edit Resume
                </button>
              </div>
            </div>
          </div>

          {/* Resume */}

          <div className="lg:col-span-3">
            <div
              id="resume-preview"
              className="bg-white shadow-lg rounded-lg p-10"
            >
              {/* Header */}

              <div className="border-b pb-6">
                <h1 className="text-4xl font-bold">
                  {resume.personalInfo?.fullname}
                </h1>

                <div className="mt-3 text-gray-600 text-sm flex flex-wrap gap-4">
                  <span>{resume.personalInfo?.email}</span>

                  <span>{resume.personalInfo?.mobile}</span>

                  <span>{resume.personalInfo?.location}</span>
                </div>

                <div className="mt-2 flex gap-4 text-sm">
                  <span>{resume.personalInfo?.github}</span>

                  <span>{resume.personalInfo?.portfolio}</span>
                </div>
              </div>

              {/* Summary */}

              {resume.summary && (
                <section className="mt-8">
                  <h2 className="font-bold text-xl mb-3">
                    Professional Summary
                  </h2>

                  <p className="text-gray-700 leading-7">{resume.summary}</p>
                </section>
              )}

              {/* Skills */}

              <section className="mt-8">
                <h2 className="font-bold text-xl mb-3">Skills</h2>

                <div className="flex flex-wrap gap-2">
                  {resume.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="bg-slate-100 px-3 py-1 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* Experience */}

              <section className="mt-8">
                <h2 className="font-bold text-xl mb-4">Work Experience</h2>

                {resume.workExperience?.map((exp, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="font-semibold">{exp.position}</h3>

                    <p className="text-gray-500 text-sm">{exp.company}</p>

                    <p className="text-sm text-gray-500">
                      {exp.startDate}
                      {" - "}
                      {exp.endDate}
                    </p>

                    <p className="mt-2 text-gray-700">{exp.description}</p>
                  </div>
                ))}
              </section>

              {/* Projects */}

              <section className="mt-8">
                <h2 className="font-bold text-xl mb-4">Projects</h2>

                {resume.projects?.map((project, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="font-semibold">{project.title}</h3>

                    <p className="mt-2 text-gray-700">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.techStack?.map((tech) => (
                        <span
                          key={tech}
                          className="bg-violet-100 text-violet-700 px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </section>

              {/* Education */}

              <section className="mt-8">
                <h2 className="font-bold text-xl mb-4">Education</h2>

                {resume.education?.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-semibold">{edu.degree}</h3>

                    <p className="text-gray-600">{edu.institute}</p>

                    <p className="text-sm text-gray-500">
                      {edu.startDate}
                      {" - "}
                      {edu.endDate}
                    </p>
                  </div>
                ))}
              </section>

              {/* Certifications */}

              {resume.certifications?.length > 0 && (
                <section className="mt-8">
                  <h2 className="font-bold text-xl mb-4">Certifications</h2>

                  <ul className="list-disc pl-5">
                    {resume.certifications.map((cert, index) => (
                      <li key={index}>{cert}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ATS Modal */}
      {showAtsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAtsModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="text-violet-600" />
              ATS Evaluation
            </h2>

            {atsLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-12 h-12 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mb-4" />
                <p className="text-slate-500">Analyzing your resume...</p>
              </div>
            ) : atsResult ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-violet-50 p-6 rounded-2xl">
                  <div>
                    <h3 className="font-semibold text-lg text-violet-900">Overall Score</h3>
                    <p className="text-violet-700 text-sm mt-1">Based on industry standards</p>
                  </div>
                  <div className="text-4xl font-bold text-violet-600">
                    {atsResult.atsScore}/100
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Summary</h4>
                  <p className="text-slate-600">{atsResult.summary}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                      Strengths
                    </h4>
                    <ul className="space-y-2">
                      {atsResult.strengths?.map((item: string, i: number) => (
                        <li key={i} className="flex gap-2 text-slate-600 text-sm">
                          <span className="text-green-500">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-orange-700 mb-3 flex items-center gap-2">
                      Areas to Improve
                    </h4>
                    <ul className="space-y-2">
                      {atsResult.improvements?.map((item: string, i: number) => (
                        <li key={i} className="flex gap-2 text-slate-600 text-sm">
                          <span className="text-orange-500">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                    Recommendations
                  </h4>
                  <ul className="space-y-2">
                    {atsResult.recommendations?.map((item: string, i: number) => (
                      <li key={i} className="flex gap-2 text-slate-600 text-sm">
                        <span className="text-blue-500">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500">
                Failed to load ATS analysis.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
