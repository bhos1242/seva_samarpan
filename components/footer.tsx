"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: "About Us", href: "/about" },
    { label: "Free Library", href: "/free-library-study-room" },
    { label: "Old Age Home", href: "/old-age-home" },
    { label: "Contact Us", href: "/contact" },
  ]

  const programs = [
    "Library & Study Space",
    "Elderly Care Services",
    "Community Outreach",
    "Skill Development"
  ]

  return (
    <footer className="w-full py-6 md:py-10 px-0 md:px-8 border-t bg-background/50 pb-24 lg:pb-10">
      <div className="mx-auto max-w-7xl bg-secondary md:rounded-[3rem] overflow-hidden shadow-2xl relative isolation-isolate">
        <div className="container mx-auto px-5 sm:px-10 py-8 md:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Brand Section */}
            <div className="col-span-2 lg:col-span-5 space-y-4 md:space-y-6">
              <div className="bg-white rounded-xl md:rounded-[2rem] p-3 md:px-6 md:py-4 w-fit inline-block shadow-md">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/logo/logo_high.png"
                    alt="Seva Samarpan Logo"
                    width={240}
                    height={64}
                    className="h-8 md:h-16 w-auto object-contain"
                    priority
                  />
                </Link>
              </div>
              <p className="text-zinc-400 text-xs md:text-base leading-relaxed max-w-md">
                Transforming lives through education for underprivileged students and care for elders in Pune.
              </p>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2 space-y-3 md:space-y-6">
              <h3 className="text-white font-bold text-sm md:text-lg tracking-tight">Quick Links</h3>
              <ul className="space-y-2 md:space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-zinc-400 hover:text-primary transition-colors text-xs md:text-sm font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div className="lg:col-span-2 space-y-3 md:space-y-6">
              <h3 className="text-white font-bold text-sm md:text-lg tracking-tight">Focus Areas</h3>
              <ul className="space-y-2 md:space-y-3">
                {programs.map((program) => (
                  <li
                    key={program}
                    className="text-zinc-400 font-medium text-xs md:text-sm flex items-center gap-2"
                  >
                    <div className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-primary/40 shrink-0" />
                    {program}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="col-span-2 lg:col-span-3 space-y-3 md:space-y-6">
              <h3 className="text-white font-bold text-sm md:text-lg tracking-tight">Connect with Us</h3>
              <ul className="space-y-3 md:space-y-5">
                <li className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800">
                    <MapPin className="h-3.5 w-3.5 md:h-5 md:w-5 text-primary" />
                  </div>
                  <span className="text-zinc-400 font-medium text-xs md:text-sm">Pune, Maharashtra, India</span>
                </li>
                <li className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800">
                    <Phone className="h-3.5 w-3.5 md:h-5 md:w-5 text-primary" />
                  </div>
                  <span className="text-zinc-400 font-medium text-xs md:text-sm">+91 94222 62499</span>
                </li>
                <li className="flex items-center space-x-3 group">
                   <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800">
                    <Mail className="h-3.5 w-3.5 md:h-5 md:w-5 text-primary" />
                  </div>
                  <a href="mailto:sevasamarpanngo@gmail.com" className="text-zinc-400 font-medium hover:text-white text-xs md:text-sm break-all">
                    sevasamarpanngo@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 md:mt-14 pt-6 md:pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <div className="text-zinc-500 font-medium text-[10px] md:text-sm">
              © {currentYear} Seva Samarpan NGO Foundation.
            </div>

            <div className="flex flex-wrap justify-center items-center gap-x-4 md:gap-x-6 gap-y-2">
              <div className="flex flex-wrap gap-x-3 md:gap-x-6 gap-y-1 text-[10px] md:text-sm font-semibold justify-center">
                <Link href="/privacy" className="text-zinc-500 hover:text-primary transition-colors">Privacy</Link>
                <Link href="/terms" className="text-zinc-500 hover:text-primary transition-colors">Terms</Link>
                <Link href="/refund-policy" className="text-zinc-500 hover:text-primary transition-colors">Refund</Link>
                <Link href="/shipping-policy" className="text-zinc-500 hover:text-primary transition-colors">Shipping</Link>
              </div>
              <div className="text-zinc-500 text-[10px] md:text-sm font-medium">
                by
                <a
                  href="http://www.navibyte.in"
                  className="text-primary ml-1 border-b border-primary/20 hover:border-primary transition-all"
                >
                  Navibyte
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
