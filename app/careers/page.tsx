/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import SectionTitle from "../about-us/components/SectionTitle";

export default function CareersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-gray-800 px-6 md:px-10 py-10">
      <SectionTitle title="Work Opportunities" />

      <CareerForm />
    </div>
  );
}

/* -------------------------------------------------------
   CAREER FORM (light premium theme)
------------------------------------------------------- */

function CareerForm() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState<string | null>(null);

  const validate = (formData: FormData) => {
    const newErrors: any = {};

    if (!formData.get("name")) newErrors.name = "Name is required";
    if (!formData.get("email")) newErrors.email = "Email is required";

    const email = formData.get("email") as string;
    if (email && !/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email format";

    if (!formData.get("position")) newErrors.position = "Position is required";

    const resume = formData.get("resume") as File;
    if (!resume || resume.size === 0)
      newErrors.resume = "Please upload a resume";

    if (resume && resume.size > 5 * 1024 * 1024)
      newErrors.resume = "Max file size is 5 MB";

    if (
      resume &&
      ![
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(resume.type)
    ) {
      newErrors.resume = "Allowed formats: PDF, DOC, DOCX";
    }

    if (!formData.get("about"))
      newErrors.about = "Tell us something about yourself";

    return newErrors;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    setLoading(true);
    setSuccess(null);
    setErrors({});

    // Validate fields
    const validation = validate(formData);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      setLoading(false);
      return;
    }

    try {
      // Submit to Careers API Route
      const res = await fetch("/api/careers", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit");
      }

      setSuccess("Your application has been submitted successfully.");
      e.target.reset(); // Reset form only after success
    } catch (error: any) {
      console.error("Career Submit Error:", error.message);
      setErrors({ api: error.message });
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-background p-6 rounded-lg border border-gray-200 shadow-sm space-y-6 w-[80vw] mx-auto"
    >
      {success && (
        <p className="p-3 bg-green-100 text-green-700 rounded">{success}</p>
      )}

      {/* Two Column Fields */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <input
            disabled={loading}
            name="name"
            type="text"
            className={`bg-background border ${
              errors.name ? "border-red-400" : "border-gray-300"
            } p-3 rounded text-sm w-full`}
            placeholder="Your Name *"
            required
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            disabled={loading}
            name="email"
            type="email"
            className={`bg-background border ${
              errors.email ? "border-red-400" : "border-gray-300"
            } p-3 rounded text-sm w-full`}
            placeholder="E-Mail *"
            required
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <input
            disabled={loading}
            name="phone"
            type="number"
            className="bg-background border border-gray-300 p-3 rounded text-sm w-full"
            placeholder="Phone Number"
          />
        </div>

        {/* City */}
        <div>
          <input
            disabled={loading}
            name="city"
            type="text"
            className="bg-background border border-gray-300 p-3 rounded text-sm w-full"
            placeholder="City, Country"
          />
        </div>
      </div>

      {/* Position */}
      <div>
        <label className="block text-sm mb-1 text-gray-700">
          Choose a Position:
        </label>

        <input
          disabled={loading}
          name="position"
          type="text"
          className={`bg-background border ${
            errors.position ? "border-red-400" : "border-gray-300"
          } p-3 rounded text-sm w-full`}
          placeholder="Position you are applying for *"
          required
        />

        {errors.position && (
          <p className="text-xs text-red-500 mt-1">{errors.position}</p>
        )}
      </div>

      {/* Resume */}
      <div>
        <label className="block text-sm mb-2 text-gray-700">
          Upload Resume (Max 5 MB):
        </label>

        <input
          disabled={loading}
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          className={`block w-full border cursor-pointer ${
            errors.resume ? "border-red-400" : "border-gray-300"
          } bg-background rounded p-2 text-sm`}
        />

        {errors.resume && (
          <p className="text-xs text-red-500 mt-1">{errors.resume}</p>
        )}

        <p className="text-xs text-gray-500 mt-1">
          Allowed formats: .pdf, .doc, .docx
        </p>
      </div>

      {/* About Yourself */}
      <div>
        <textarea
          name="about"
          rows={4}
          className={`bg-background border ${
            errors.about ? "border-red-400" : "border-gray-300"
          } p-3 rounded text-sm w-full`}
          placeholder="Tell us About Yourself *"
          required
        ></textarea>

        {errors.about && (
          <p className="text-xs text-red-500 mt-1">{errors.about}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 cursor-pointer bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
