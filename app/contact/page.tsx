/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import SectionTitle from "../about-us/components/SectionTitle";
import { MdMail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-backround text-gray-700 px-6 md:px-10 py-10">

      <div className="max-w-5xl mx-auto space-y-12">

        {/* -------------------- KMP DETAILS -------------------- */}
        <div>
          <SectionTitle title="Contact"/>
          <h3 className="text-2xl font-semibold mb-2 text-primary">
            CONTACT DETAILS OF KMP
          </h3>

          <p className="text-sm leading-relaxed mb-6 text-muted-foreground text-justify">
            Contact details of Key Managerial Personnel authorised for the
            purpose of determining materiality of an event or information and
            making disclosures to the Stock Exchange(s).<br />
            (As required under Regulation 30(5) of the SEBI (Listing Obligations
            and Disclosure Requirements) Regulations, 2015)
          </p>

          {/* TABLE */}
          <div className="bg-backround p-6 rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="text-left text-gray-600 bg-gray-100">
                  <th className="border-b border-gray-200 px-3 py-2">#</th>
                  <th className="border-b border-gray-200 px-3 py-2">Name</th>
                  <th className="border-b border-gray-200 px-3 py-2">Designation</th>
                  <th className="border-b border-gray-200 px-3 py-2">Contact Details</th>
                </tr>
              </thead>

              <tbody className="text-gray-700">
                {[
                  {
                    id: 1,
                    name: "Mr. Jagdishkumar M. Gupta",
                    title: "Executive Chairman",
                    tel: "+91 22 6817 1900",
                    email: "info@jkumar.com",
                  },
                  {
                    id: 2,
                    name: "Mr. Kamal J. Gupta",
                    title: "Managing Director",
                    tel: "+91 22 6817 1900",
                    email: "info@jkumar.com",
                  },
                  {
                    id: 3,
                    name: "Dr. Nalin J. Gupta",
                    title: "Managing Director",
                    tel: "+91 22 6817 1900",
                    email: "info@jkumar.com",
                  },
                  {
                    id: 4,
                    name: "Mrs. Poornima Reddy",
                    title: "Company Secretary and Compliance Officer",
                    tel: "+91 22 6817 1900",
                    email: "info@jkumar.com",
                  },
                  {
                    id: 5,
                    name: "Mr. Vasant Savla",
                    title: "Chief Financial Officer",
                    tel: "+91 22 6817 1900",
                    email: "info@jkumar.com",
                  },
                ].map((row) => (
                  <tr key={row.id} className="border-b border-gray-200">
                    <td className="px-3 py-3">{row.id}</td>
                    <td className="px-3 py-3">{row.name}</td>
                    <td className="px-3 py-3">{row.title}</td>
                    <td className="px-3 py-3">
                      <a href={`tel:${row.tel}`} className="flex gap-x-2 items-center"><FaPhone size={13}/>{row.tel}</a>
                      <a href={`mailto:${row.email}`} className="flex gap-x-1 items-center"><MdMail size={17}/>:{row.email}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* -------------------- SHAREHOLDER ENQUIRIES -------------------- */}
        <div className="bg-backround p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-primary">
            FOR SHAREHOLDERS GENERAL ENQUIRIES
          </h3>

          <p className="text-sm leading-relaxed">
            <strong>Registered Office:</strong><br />
            J. Kumar House, CTS No. 448, 448/1, 449, Subhash Road, Vile Parle (East),
            Mumbai - 400057, Maharashtra, India
          </p>

          <p className="mt-4"><strong>TEL:</strong><a href="tel:+91 22 6817 1900"> +91 22 6817 1900</a></p>

          <p className="mt-4">
            <strong>EMAIL US</strong><br />
            info@jkumar.com<br />
            www.jkumar.com
          </p>
        </div>

        {/* -------------------- RTA DETAILS -------------------- */}
        <div className="bg-backround p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-primary">
            REGISTRAR AND SHARE TRANSFER AGENT
          </h3>

          <p className="text-sm leading-relaxed">
            <strong>Bigshare Services Private Limited</strong><br />
            Office No 326, 6th Floor, Pinnacle Business Park, Next to Ahura Centre,
            Mahakali Caves Road, Andheri (East), Mumbai - 400093, India
          </p>

          <p className="mt-4"><strong>TEL:</strong><a href="tel:+91 22 6263 8200"> +91 22 6263 8200</a></p>
          <p className="mt-2"><strong>FAX:</strong> +91 22 6263 8299</p>

          <p className="mt-4">
            <strong>EMAIL US</strong><br />
            investor@bigshareonline.com<br />
            www.bigshareonline.com
          </p>
        </div>

        {/* -------------------- COMPLIANCE OFFICER -------------------- */}
        <div className="bg-backround p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-primary">
            DETAILS OF COMPLIANCE OFFICER
          </h3>

          <p className="text-sm leading-relaxed">
            <strong>Nodal Officer:</strong> Mrs. Poornima Reddy<br />
            <strong>TEL:</strong><a href="tel:+91 22 6817 1900"> +91 22 6817 1900</a><br />
            <strong>EMAIL:</strong> poornima.reddy@jkumar.com
          </p>

          <p className="mt-6 text-sm leading-relaxed">
            <strong>Deputy Nodal Officer:</strong> Mrs. Krinjal C. Shah<br />
            <strong>TEL:</strong><a href="tel:"> +91 22 6817 1900</a><br />
            <strong>EMAIL:</strong> krinjal.shah@jkumar.com
          </p>
        </div>

        {/* -------------------- CONTACT FORM -------------------- */}
        <ContactForm />

        {/* -------------------- MAP SECTION -------------------- */}
        <div className="mt-10 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
          <iframe
            src="https://maps.google.com/maps?q=J.%20Kumar%20House%20Vile%20Parle%20Mumbai&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-[350px] md:h-[450px]"
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </div>
  );
}

/* -------------------------------------------------------
   LIGHT THEME CONTACT FORM
------------------------------------------------------- */

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState<string | null>(null);

  const validate = (formData: FormData) => {
    const newErrors: any = {};

    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string | null;
    const website = formData.get("website") as string | null;

    if (!formData.get("name")) newErrors.name = "Name is required";

    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email format";

    if (phone && !/^[0-9+\- ]+$/.test(phone))
      newErrors.phone = "Phone number can contain only digits, +, - and spaces";

    if (website && website.length > 0) {
      try {
        new URL(website);
      } catch {
        newErrors.website = "Invalid website URL";
      }
    }

    if (!formData.get("message"))
      newErrors.message = "Message is required";

    return newErrors;
  };

  const handleClientSubmit = async (e: any) => {
    e.preventDefault(); // IMPORTANT
    setLoading(true);
    setSuccess(null);
    setErrors({});

    const formData = new FormData(e.target);
    const validation = validate(formData);

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSuccess("Your message has been sent successfully.");
      e.target.reset();
    } catch (error: any) {
      alert("Error sending message: " + error.message);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleClientSubmit}
      className="bg-background p-6 rounded-lg border border-gray-200 shadow-sm space-y-5"
    >
      {success && (
        <p className="text-green-600 font-medium p-2 bg-green-100 rounded">
          {success}
        </p>
      )}

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
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
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
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <input
            disabled={loading}
            name="phone"
            type="number"
            pattern="[0-9+\-\s]*"
            inputMode="numeric"
            className={`bg-background border ${
              errors.phone ? "border-red-400" : "border-gray-300"
            } p-3 rounded text-sm w-full`}
            placeholder="Phone Number (optional)"
          />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
        </div>

        {/* City */}
        <div>
          <input
            disabled={loading}
            name="city"
            type="text"
            className="bg-background border border-gray-300 p-3 rounded text-sm w-full"
            placeholder="City, Country (optional)"
          />
        </div>

        {/* Company */}
        <div>
          <input
            disabled={loading}
            name="company"
            type="text"
            className="bg-background border border-gray-300 p-3 rounded text-sm w-full"
            placeholder="Company Name (optional)"
          />
        </div>

        {/* Website */}
        <div>
          <input
            disabled={loading}
            name="website"
            type="url"
            className={`bg-background border ${
              errors.website ? "border-red-400" : "border-gray-300"
            } p-3 rounded text-sm w-full`}
            placeholder="Website (optional)"
          />
          {errors.website && (
            <p className="text-xs text-red-500">{errors.website}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <textarea
          name="message"
          rows={4}
          className={`bg-background border ${
            errors.message ? "border-red-400" : "border-gray-300"
          } p-3 rounded text-sm w-full`}
          placeholder="Tell Us Everything *"
          required
        ></textarea>
        {errors.message && (
          <p className="text-xs text-red-500">{errors.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 cursor-pointer bg-primary text-black rounded-full hover:bg-[var(--primary-hover)] transition disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}



