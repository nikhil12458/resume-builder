"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import { ArrowLeft, ArrowRight, Plus, Trash2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  resumeId: string;
  onNext: () => void;
  onBack: () => void;
}

interface ExperienceItem {
  company: string;
  role: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
}

interface FormValues {
  experience: ExperienceItem[];
}

export default function ExperienceStep({ resumeId, onNext, onBack }: Props) {
  let router = useRouter();

  const {
    register,
    control,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      experience: [
        {
          company: "",
          role: "",
          employmentType: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
          description: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  useEffect(() => {
    fetchResume();
  }, []);

  const [generatingIndex, setGeneratingIndex] = useState<number | null>(null);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);

      if (data.data?.workExperience?.length) {
        const mappedExperience = data.data.workExperience.map((exp: any) => ({
          ...exp,
          role: exp.position || "",
        }));
        reset({
          experience: mappedExperience,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateDescription = async (index: number) => {
    try {
      setGeneratingIndex(index);
      const exp = watch(`experience.${index}`);

      const { data: resumeData } = await axios.get(`/api/resume/${resumeId}`);

      const resume = resumeData.data;

      const { data } = await axios.post("/api/ai/generate-experience", {
        jobRole: exp.role || resume?.jobTitle || "Software Engineer",
        experienceLevel: resume?.workExperience?.length ? "Experienced" : "Fresher",
        techStack: resume?.skills?.join(", ") || "various technologies",
        yearsOfExperience: resume?.workExperience?.length || 1,
      });

      setValue(`experience.${index}.description`, data.data.workExperienceDescription);
    } catch (error) {
      console.log(error);
    } finally {
      setGeneratingIndex(null);
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const mappedExperience = values.experience.map((exp: any) => ({
        ...exp,
        position: exp.role,
      }));

      await axios.patch(`/api/resume/${resumeId}`, {
        workExperience: mappedExperience,
      });

      onNext();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress */}

        <div className="mb-8">
          <div className="flex justify-between">
            <span>Step 5 of 6</span>

            <span>83%</span>
          </div>

          <div className="h-2 bg-slate-200 rounded-full mt-2">
            <div className="h-full w-[83%] bg-violet-600 rounded-full" />
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Work Experience</h1>

              <p className="text-slate-500 mt-2">
                Showcase your professional experience.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                append({
                  company: "",
                  role: "",
                  employmentType: "",
                  startDate: "",
                  endDate: "",
                  currentlyWorking: false,
                  description: "",
                })
              }
              className="bg-violet-600 text-white px-4 py-3 rounded-xl flex items-center gap-2"
            >
              <Plus size={18} />
              Add Experience
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {fields.map((field, index) => (
              <div key={field.id} className="border rounded-2xl p-6 relative">
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute top-4 right-4 text-red-500"
                  >
                    <Trash2 />
                  </button>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    {...register(`experience.${index}.company`)}
                    placeholder="Company Name"
                    className="border rounded-xl p-3"
                  />

                  <input
                    {...register(`experience.${index}.role`)}
                    placeholder="Job Title"
                    className="border rounded-xl p-3"
                  />

                  <select
                    {...register(`experience.${index}.employmentType`)}
                    className="border rounded-xl p-3"
                  >
                    <option value="">Employment Type</option>
                    <option>Full Time</option>
                    <option>Internship</option>
                    <option>Contract</option>
                    <option>Freelance</option>
                  </select>

                  <input
                    type="date"
                    {...register(`experience.${index}.startDate`)}
                    className="border rounded-xl p-3"
                  />

                  <input
                    type="date"
                    {...register(`experience.${index}.endDate`)}
                    disabled={watch(`experience.${index}.currentlyWorking`)}
                    className="border rounded-xl p-3"
                  />
                </div>

                <div className="mt-4">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      {...register(`experience.${index}.currentlyWorking`)}
                    />
                    Currently Working Here
                  </label>
                </div>

                <div className="mt-6">
                  <div className="flex justify-end mb-3">
                    <button
                      type="button"
                      onClick={() => generateDescription(index)}
                      disabled={generatingIndex === index}
                      className="bg-violet-100 text-violet-700 px-4 py-2 rounded-xl flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <Sparkles size={18} />
                      {generatingIndex === index ? "Generating..." : "Generate Description"}
                    </button>
                  </div>

                  <textarea
                    rows={6}
                    {...register(`experience.${index}.description`)}
                    placeholder="Describe your responsibilities and achievements..."
                    className="w-full border rounded-xl p-4"
                  />
                </div>
              </div>
            ))}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={onBack}
                className="border px-5 py-3 rounded-xl flex items-center gap-2"
              >
                <ArrowLeft size={18} />
                Back
              </button>

              <button
                disabled={isSubmitting}
                className="bg-violet-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
              >
                {isSubmitting ? "Saving..." : "Continue"}

                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
