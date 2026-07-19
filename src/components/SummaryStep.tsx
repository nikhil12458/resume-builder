"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

interface Props {
  resumeId: string;
  onNext: () => void;
  onBack: () => void;
}

export default function SummaryStep({ resumeId, onNext, onBack }: Props) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);
      if (data.data?.summary) {
        setSummary(data.data.summary);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateSummary = async () => {
    try {
      setAiLoading(true);

      const { data: resumeData } = await axios.get(`/api/resume/${resumeId}`);
      const resume = resumeData.data;

      const jobTitle =
        resume.workExperience?.at(-1)?.position ||
        resume.jobTitle ||
        "Software Engineer";
      const experienceLevel = resume.workExperience?.length ? "Experienced" : "Fresher";
      const skills = resume.skills?.join(", ") || "";

      const { data } = await axios.post("/api/ai/generate-summary", {
        jobTitle,
        experienceLevel,
        skills,
      });

      setSummary(data.data.summary);
    } catch (error) {
      console.log(error);
    } finally {
      setAiLoading(false);
    }
  };

  const saveSummary = async () => {
    try {
      setLoading(true);

      await axios.patch(`/api/resume/${resumeId}`, {
        summary,
      });

      onNext();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span>Step 6 of 6</span>
            <span>100%</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full">
            <div className="h-full w-full bg-violet-600 rounded-full" />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Professional Summary</h1>
              <p className="text-slate-500 mt-2">
                Write a short summary highlighting your experience and goals.
              </p>
            </div>
            <button
              onClick={generateSummary}
              disabled={aiLoading}
              className="flex items-center gap-2 px-5 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 disabled:opacity-70"
            >
              <Sparkles size={18} />
              {aiLoading ? "Generating..." : "Generate with AI"}
            </button>
          </div>

          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={8}
            placeholder="A motivated and detail-oriented software engineer..."
            className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          {/* Footer */}
          <div className="flex justify-between mt-12">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-5 py-3 border rounded-xl hover:bg-slate-50"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <button
              onClick={saveSummary}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl disabled:opacity-70"
            >
              {loading ? "Saving..." : "Finish"}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
