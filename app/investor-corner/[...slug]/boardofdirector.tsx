"use client";

import SectionTitle from "@/app/about-us/components/SectionTitle";
import Link from "next/link";


export default function BoardOfDirectorsPage() {
  const directors = [
    {
      name: "Mr. Jagdishkumar Madanlal Gupta",
      title: "Executive Chairman",
      description: `
        The man who started his journey in 1980, with contract amounting to Rs.15,000 and earned Rs. 2,250 of it.
        Today he heads an organization as a first-generation entrepreneur with 50+ years of experience.
        His passion and energy have shaped the company's growth across major civil projects including flyovers,
        skywalks, pools, rail bridges and more. He has led timely execution of several landmark projects.
      `,
    },
    {
      name: "Mr. Kamal Jagdish Gupta",
      title: "Managing Director",
      description: `
        Bachelor’s in Civil Engineering and associated with JKIL since 1997 with 27+ years of experience.
        He heads civil construction, metro railways, flyovers and played a pivotal role in designing and executing
        U/G Metro line 3 along with elevated & national highway projects.
      `,
    },
    {
      name: "Dr. Nalin Jagdishkumar Gupta",
      title: "Managing Director",
      description: `
        Commerce Graduate & Member of Indian Institution of Bridge Engineers. Joined JKIL in 1995 with 28+ years of experience.
        Led major initiatives in Metro Elevated and U/G projects, and successfully completed multiple metro,
        river bridges, flyovers, cable-stayed skywalks and segmental bridge projects.
      `,
    },
    {
      name: "Mr. Raghav Chandra",
      title: "Non-Executive Independent Director",
      description: `
        Master's in Public Administration from Harvard; MSc in Mathematics.
        Former Chairman of NHAI, IAS 1982 batch. Awarded “Man of the Year” by Construction World (2016).
        Represented India at the 2010 City of London Infrastructure Conference.
      `,
    },
    {
      name: "Mr. Sidharath Kapur",
      title: "Non-Executive Independent Director",
      description: `
        Chartered Accountant (Rank Holder), Company Secretary, GAMP (ISB).
        Currently on Board of Noida International Airport and advisor in multiple sectors.
        Extensive leadership experience across airports, renewable energy, oil & gas and pipelines.
      `,
    },
    {
      name: "Mr. Ramesh Kumar Choubey",
      title: "Non-Executive Independent Director",
      description: `
        Served in Indian Revenue Service (IRS) from 1990–2023; retired as Chief Commissioner of Income Tax, Mumbai.
        Completed 33 years of service with exceptional work across vigilance, investigation, appeals and administration.
      `,
    },
    {
      name: "Mr. Pravin Ghag",
      title: "Director – Administration & Compliances",
      description: `
        Associated with JKIL for 12+ years. Significant contributions in HR planning,
        organizational development and strategic management processes.
      `,
    },
    {
      name: "Mrs. Archana Yadav",
      title: "Non-Executive Independent Director",
      description: `
        Chartered Accountant with 15+ years of experience. PGDBM holder.
        Cleared Forensic Audit & Fraud Detection Course (ICAI). Appointed as GST Faculty by ICAI.
      `,
    },
  ];

  const committeeMembers = [
    { id: 1, name: "Mr. Vasant Savla", role: "Chief Financial Officer" },
    { id: 2, name: "Mrs. Poornima Reddy", role: "Company Secretary and Compliance Officer" },
  ];

  return (
    <div className="min-h-screen bg-background text-gray-700 px-6 md:px-10 py-10">
      <div className="max-w-5xl mx-auto space-y-12">

        <SectionTitle title="Board Of Directors" />

        {/* ---------------------- DIRECTORS ---------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {directors.map((director, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <h4 className="text-lg font-semibold text-gray-900">
                {director.name}  
              </h4>
              <p className="text-sm text-primary font-medium mb-3">
                {director.title}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed text-justify whitespace-pre-line">
                {director.description}
              </p>
            </div>
          ))}
        </div>

        {/* -------------- TABLE: COMMITTEE COMPOSITION -------------- */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-black mb-4">
            Key Managerial Personnel
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-3 py-2 border-b">Sr No.</th>
                  <th className="px-3 py-2 border-b">Name</th>
                  <th className="px-3 py-2 border-b">Designation</th>
                </tr>
              </thead>

              <tbody>
                {committeeMembers.map((m) => (
                  <tr key={m.id} className="border-b">
                    <td className="px-3 py-2">{m.id}</td>
                    <td className="px-3 py-2">{m.name}</td>
                    <td className="px-3 py-2">{m.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Link Section */}
        <div className="mt-6">
          <Link
          target="_blank"
            href="/storage/reportFile/BoardCommittees.pdf"
            className="text-primary text-lg font-medium"
          >
            Composition of various Committees of Board of Directors →
          </Link>
        </div>

      </div>
    </div>
  );
}
