"use client"

import Link from "next/link"
import { Heart, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ]

  const quickLinks = [
    { label: "About Us", href: "/about" },
    { label: "Sponsor Students", href: "/students" },
    { label: "Study Room", href: "/study-room" },
    { label: "Old Age Home", href: "/old-age-home" },
    { label: "Donate", href: "/donate" }
  ]

  const programs = [
    "Education Sponsorship",
    "Library & Study Space",
    "Elderly Care Services",
    "Community Outreach",
    "Skill Development"
  ]

  return (
    <footer className="w-full py-10 px-0 md:px-8 border-t bg-muted/30">
      <div className="mx-auto max-w-7xl bg-zinc-950 md:rounded-[3rem] overflow-hidden shadow-2xl relative isolation-isolate">
        {/* Decorative background gradients */}
        <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl opacity-20 translate-y-1/3 -translate-x-1/3"></div>

        <div className="container mx-auto px-6 sm:px-12 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-5 space-y-8">
              <Link href="/" className="flex items-center space-x-4 group">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-primary to-primary-600 shadow-xl shadow-primary/20 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                  <Heart className="h-7 w-7 text-white" fill="white" />
                </div>
                <div className="flex flex-col">
                   <span className="text-3xl font-black text-white tracking-tighter uppercase">Samarpan</span>
                   <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500">Empowering Lives</span>
                </div>
              </Link>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                Dedicated to transforming lives through quality education for underprivileged students
                and compassionate care for elders in rural Mulshi, Pune.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-12 h-12 rounded-2xl bg-zinc-900 hover:bg-primary border border-zinc-800 hover:border-primary flex items-center justify-center transition-all duration-500 group active:scale-95"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-zinc-500 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2 space-y-8">
              <h3 className="text-white font-bold text-xl tracking-tight">Quick Links</h3>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-zinc-400 hover:text-primary transition-all duration-300 flex items-center group font-medium"
                    >
                      <ArrowUpRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:mr-2 group-hover:opacity-100 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div className="lg:col-span-2 space-y-8">
              <h3 className="text-white font-bold text-xl tracking-tight">Focus Areas</h3>
              <ul className="space-y-4">
                {programs.map((program) => (
                  <li 
                    key={program} 
                    className="text-zinc-400 font-medium hover:text-white transition-colors cursor-default flex items-center gap-3"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/40 shrink-0" />
                    {program}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-3 space-y-8">
              <h3 className="text-white font-bold text-xl tracking-tight">Connect with Us</h3>
              <ul className="space-y-6">
                <li className="flex items-start space-x-4 group">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800 group-hover:border-primary/30 transition-colors">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-zinc-400 font-medium pt-1 group-hover:text-zinc-300 transition-colors">
                    Mulshi, Pune,<br />Maharashtra, India
                  </span>
                </li>
                <li className="flex items-center space-x-4 group">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800 group-hover:border-primary/30 transition-colors">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-zinc-400 font-medium group-hover:text-zinc-300 transition-colors">+91 89835 41719</span>
                </li>
                <li className="flex items-center space-x-4 group">
                   <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800 group-hover:border-primary/30 transition-colors">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <a href="mailto:contact@samarpan.org" className="text-zinc-400 font-medium hover:text-white transition-colors">
                    contact@samarpan.org
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Form Section / Newsletter */}
          <div className="mt-20 p-8 rounded-[2rem] bg-zinc-900/50 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="space-y-2 text-center md:text-left">
                <h4 className="text-xl font-bold text-white">Subscribe to our newsletter</h4>
                <p className="text-zinc-400">Receive updates about our impact and upcoming events.</p>
             </div>
             <div className="flex w-full md:w-auto gap-2">
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="bg-black border border-zinc-800 rounded-xl px-4 py-3 h-12 w-full md:w-72 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <Button className="rounded-xl h-12 px-6 font-bold shadow-lg shadow-primary/20">Subscribe</Button>
             </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-20 pt-10 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-zinc-500 font-medium text-sm">
              © {currentYear} Samarpan NGO Foundation. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
              <div className="flex gap-6 text-sm font-semibold">
                <Link href="/privacy" className="text-zinc-500 hover:text-primary transition-colors">Privacy</Link>
                <Link href="/terms" className="text-zinc-500 hover:text-primary transition-colors">Terms</Link>
              </div>
              <div className="hidden md:block h-1.5 w-1.5 bg-zinc-800 rounded-full"></div>
              <div className="text-zinc-500 text-sm font-medium">
                Artfully crafted at 
                <a 
                  href="http://www.navibyte.in" 
                  className="text-primary hover:text-primary-400 ml-1 border-b border-primary/20 hover:border-primary transition-all"
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
