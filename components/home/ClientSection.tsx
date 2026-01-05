/* eslint-disable @next/next/no-img-element */
"use client"
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionTitle from "@/app/about-us/components/SectionTitle";

const clients = [
  "/clients/clientlogo_1.png",
  "/clients/clientlogo_2.png",
  "/clients/clientlogo_3.png",
  "/clients/clientlogo_4.png",
  "/clients/clientlogo_5.png",
  "/clients/clientlogo_6.png",
  "/clients/clientlogo_7.png",
  "/clients/clientlogo_8.png",
  "/clients/clientlogo_9.png",
  "/clients/clientlogo_10.png",
  "/clients/clientlogo_11.png",
  "/clients/clientlogo_12.png",
  "/clients/clientlogo_13.png",
  "/clients/clientlogo_14.png",
];

export default function ClientSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="clients" className="py-24 bg-card  max-w-7xl mx-auto border-t-2" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SectionTitle title="Our Clients"/>
          <h2 className="section-title mt-2 text-black/80">Trusted By Leading Companies</h2>
          <p className="section-subtitle mt-4 max-w-2xl mx-auto">
            We are proud to partner with India&apos;s most prestigious government 
            bodies and private organizations in building world-class infrastructure.
          </p>
        </motion.div>

        {/* Logo Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4"
        >
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 flex items-center justify-center aspect-square p-4"
            >
              <img 
                src={client} 
                alt={`Client ${index + 1}`}
                className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
