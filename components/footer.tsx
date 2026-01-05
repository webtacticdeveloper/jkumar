"use client";

import React from "react";
import Link from "next/link";
import { menulist } from "@/data/menulist";
import { motion } from "motion/react";
import { GrLinkedinOption, GrFacebookOption } from "react-icons/gr";
import { FaXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();
  if(pathname.includes("pdf"))return null;

  return (
    <footer
      className="relative bg-black/90 shadow-2xl text-white border-t border-[var(--border)]"
      style={{ boxShadow: "0 -8px 20px -6px rgba(0, 0, 0,0.2)" }}
    >
      {/* ✨ Top Gradient Accent */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--primary)] to-[#ED3237]" />
      {/* --- Footer Grid --- */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-x-12 gap-y-2">
        {/* --- Brand Column --- */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl  font-bold  mb-4 tracking-wide">
            <Link href={"/"} className="flex gap-x-5 items-center text-white">
              <Image
                src="/jkumar_logo_white.png"
                alt="JKumar Logo"
                width={30}
                height={30}
              />
              J. Kumar Infra
            </Link>
          </h3>
          <p className="text-sm text-white/60 leading-relaxed max-w-sm mb-6">
            Delivering engineering excellence since 1980. Building India’s
            tomorrow — metro, bridges, flyovers, and urban infrastructure that
            stand the test of time.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4">
            {[
              {
                name: "LinkedIn",
                icon: GrLinkedinOption,
                href: "https://www.linkedin.com/in/j-kumar-infraprojects-ltd-344236104/",
              },
              {
                name: "Facebook",
                icon: GrFacebookOption,
                href: "https://www.facebook.com/people/Jkumar-infraprojectsLtd/100063812271960/",
              },
              {
                name: "Twitter",
                icon: FaXTwitter,
                href: "https://x.com/JkumarLtd",
              },
              {
                name: "Instagram",
                icon: RiInstagramFill,
                href: "https://www.instagram.com/jkumarinfraprojectslimited/",
              },
            ].map((social) => (
              <motion.a
                target="_blank"
                key={social.name}
                href={social.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-card/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* --- Dynamic Menu Sections --- */}
        {menulist.map((menu, idx) => (
          <div key={idx}>
            <h4 className="text-lg font-semibold text-white mb-4">
              {menu.label}
            </h4>

            {menu.links && menu.links.length > 0 ? (
              <ul className="space-y-2 text-sm">
                {menu.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="footer-link text-white/80 hover:text-primary focus:text-primary transition-all duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}

        {/* --- Contact Info --- */}
        <div>
          <h4 className="text-lg font-semibold text-white/80 mb-4">
            Contact
          </h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li>Mumbai, Maharashtra, India</li>
            <li>
              <Link
                href="/contact"
                className="footer-link text-white/80 hover:text-primary focus:text-primary transition-all duration-300"
              >
                Click here Contact us
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white/80 mb-4">
            Careers
          </h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li>Work Opportunities</li>
            <li>
              <Link
                href="/careers"
                className="footer-link text-white/80 hover:text-primary focus:text-primary transition-all duration-300"
              >
                Click here get in touch
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* --- Bottom Bar --- */}
      <div className="relative border-t border-[var(--border)] py-6 px-6 md:px-10 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:justify-center gap-2">
          <p className="text-white">
            © {new Date().getFullYear()} J. Kumar Infraprojects Ltd. All rights
            reserved.
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-white/80"
          >
            Designed & Developed by{" "}
            <Link target="_blank" href={"https://webtactic.in/"} className="text-primary font-medium">Webtatic</Link>
          </motion.p>
        </div>
      </div>

      {/* --- Hover & focus underline --- */}
      <style jsx>{`
        .footer-link {
          position: relative;
        }
        .footer-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0%;
          height: 1.5px;
          background: var(--background);
          transition: width 0.3s;
        }
        .footer-link:hover::after,
        .footer-link:focus::after {
          width: 100%;
        }
        /* Touch focus color */
        .footer-link:focus {
          color: var(--primary) !important;
        }
      `}</style>
    </footer>
  );
};
