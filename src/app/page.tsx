import Link from "next/link";
import { ArrowRight, Sparkles, FileText, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="font-bold text-xl text-violet-600 flex items-center gap-2">
          <Sparkles size={24} />
          AI Resume Builder
        </div>
        <div className="flex gap-4">
          <Link
            href="/auth/login"
            className="px-5 py-2.5 font-medium text-slate-600 hover:text-slate-900 transition"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-8">
          <Sparkles size={16} />
          Powered by Gemini AI
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight max-w-4xl leading-tight">
          Build a resume that gets you <span className="text-violet-600">hired instantly</span>
        </h1>
        
        <p className="mt-6 text-xl text-slate-500 max-w-2xl">
          Create professional, ATS-optimized resumes in minutes using the power of AI. Generate high-impact summaries, skills, and experience descriptions with a single click.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/auth/register"
            className="px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-2xl text-lg flex items-center justify-center gap-2 transition shadow-lg shadow-violet-200"
          >
            Build Your Resume <ArrowRight size={20} />
          </Link>
        </div>

        {/* Features Preview */}
        <div className="mt-24 grid md:grid-cols-3 gap-8 text-left w-full">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">AI-Powered Writing</h3>
            <p className="text-slate-500 leading-relaxed">
              Stuck on what to write? Let our AI generate perfect project descriptions, bullet points, and summaries tailored to your role.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">ATS-Optimized</h3>
            <p className="text-slate-500 leading-relaxed">
              Our generated resumes are structurally formatted to pass through Applicant Tracking Systems (ATS) seamlessly, getting you to the interview.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
              <FileText size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Clean PDF Export</h3>
            <p className="text-slate-500 leading-relaxed">
              Preview your real-time resume progress and download a pixel-perfect, clean PDF file ready to be sent to recruiters instantly.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}