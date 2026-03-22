import { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact Us – Phone, Email & Visiting Hours",
  description: "Reach Seva Samarpan by phone (+91 94222 62499), email, or WhatsApp. Visit our facilities in Pune daily from 9 AM to 6 PM.",
  keywords: ["contact Seva Samarpan", "Seva Samarpan phone number", "Seva Samarpan address", "visit NGO Pune"],
  openGraph: {
    title: "Contact Seva Samarpan – Phone, Email & Visit",
    description: "Call, email, or visit us in Pune. We're open every day from 9 AM to 6 PM.",
    url: "/contact",
  }
};

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen py-6 md:py-14">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-5 md:mb-10 text-center lg:text-left">
          <h1 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4 leading-tight">
            Get in <span className="text-primary">touch</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
            Have questions? Reach out through any of the channels below.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-4 lg:gap-10">
          {/* Contact Information */}
          <div className="lg:col-span-3 space-y-3 md:space-y-4">
            <div className="grid grid-cols-2 gap-2.5 md:gap-4">
              <div className="p-4 md:p-6 bg-white dark:bg-zinc-950 rounded-xl md:rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2.5 md:mb-4">
                  <Phone className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <h3 className="text-sm md:text-lg font-semibold mb-0.5">Phone</h3>
                <p className="text-xs md:text-sm text-muted-foreground ">+91 94222 62499</p>
              </div>

              <div className="p-4 md:p-6 bg-white dark:bg-zinc-950 rounded-xl md:rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2.5 md:mb-4">
                  <Mail className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <h3 className="text-sm md:text-lg font-semibold mb-0.5">Email</h3>
                <p className="text-[11px] md:text-sm text-muted-foreground break-all">sevasamarpanngo@gmail.com</p>
              </div>
            </div>

            <div className="p-4 md:p-6 bg-white dark:bg-zinc-950 rounded-xl md:rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <div>
                  <h3 className="text-sm md:text-lg font-semibold mb-0.5">Location</h3>
                  <p className="text-xs md:text-sm text-muted-foreground ">Pune, Maharashtra, India</p>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 bg-zinc-950 text-white rounded-xl md:rounded-3xl shadow-lg relative overflow-hidden border border-white/5">
               <div className="relative z-10 flex items-center gap-3 md:gap-5">
                 <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                    <Clock className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                 </div>
                 <div>
                    <h3 className="text-sm md:text-lg font-semibold">Visiting Hours</h3>
                    <p className="text-zinc-400 text-xs md:text-sm">Every day, 9:00 AM – 6:00 PM</p>
                 </div>
               </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="lg:col-span-2 p-5 md:p-8 bg-muted/30 rounded-xl md:rounded-3xl border border-black/5 dark:border-white/5 flex flex-col items-center justify-center text-center space-y-4 md:space-y-6">
             <div className="space-y-1.5">
                <h2 className="text-lg md:text-2xl font-semibolder">Direct Message</h2>
                <p className="text-[11px] md:text-sm text-muted-foreground">
                  The quickest way to reach us is via WhatsApp.
                </p>
             </div>
             <div className="flex flex-col w-full gap-2.5">
                <Button size="default" className="h-11 md:h-14 rounded-xl md:rounded-2xl font-semibold shadow-md text-xs md:text-base" asChild>
                   <a href="https://wa.me/919422262499">WhatsApp Us</a>
                </Button>
                <Button size="default" variant="outline" className="h-11 md:h-14 rounded-xl md:rounded-2xl font-semibold border-2 text-xs md:text-base" asChild>
                   <a href="mailto:sevasamarpanngo@gmail.com">Email Us</a>
                </Button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
