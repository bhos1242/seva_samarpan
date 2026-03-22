"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  Users,
  Target,
  Award,
  MapPin,
  BookOpen,
  Heart,
  Share2,
  Loader2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { RazorpayOptions, RazorpaySuccessResponse, RazorpayErrorResponse } from "@/types/razorpay";

interface Donation {
  id: string;
  name?: string;
  amount: number;
  createdAt: string;
}

interface Student {
  id: string;
  fullName: string;
  photoUrl: string;
  age?: number;
  standard: string;
  schoolOrCollege: string;
  location: string;
  category: string;
  requiredAmount: number;
  collectedAmount: number;
  progressPercentage?: number;
  story?: string;
  achievements?: string;
  donations?: Donation[];
}

type RazorpayResponse = RazorpaySuccessResponse;

// Declare Razorpay globally
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      on: (event: string, handler: (response: RazorpayErrorResponse) => void) => void;
      open: () => void;
    };
  }
}

export default function StudentDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();

  // Core data state
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Donation state
  const [donationAmount, setDonationAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Donor Details
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [needs80G, setNeeds80G] = useState(false);
  const [panNumber, setPanNumber] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(`/api/students/${resolvedParams.id}`);
        if (!res.ok) throw new Error("Student not found");
        const data = await res.json();
        setStudent(data);
      } catch {
        toast.error("Failed to load student details");
        router.push("/sponsor-students");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudent();
  }, [resolvedParams.id, router]);

  const formatINR = (amt: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amt);

  const handleDonation = async () => {
    const finalAmount = customAmount ? parseInt(customAmount) : donationAmount;
    if (!finalAmount || finalAmount < 100) {
      toast.error("Please enter a minimum donation amount of ₹100");
      return;
    }
    if (!donorName || !donorEmail) {
      toast.error("Please provide your name and email for the receipt");
      return;
    }
    if (needs80G && !panNumber) {
      toast.error("PAN number is required for an 80G tax receipt");
      return;
    }

    if (!student) return;

    setIsSubmitting(true);
    try {
      // 1. Create Razorpay Order
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmount }),
      });

      if (!orderRes.ok) throw new Error("Failed to initialize payment");
      const order = await orderRes.json();

      // 2. Configure Razorpay Options
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      
      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: "Seva Samarpan",
        description: `Sponsorship for ${student.fullName}`,
        order_id: order.id,
        handler: async function (response: RazorpayResponse) {
          try {
            const verifyRes = await fetch("/api/donations/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount: finalAmount,
                name: donorName,
                email: donorEmail,
                phone: donorPhone,
                panNumber: needs80G ? panNumber : undefined,
                needs80G,
                studentId: student.id,
              }),
            });

            if (!verifyRes.ok) throw new Error("Verification failed");

            toast.success("Donation successful! Thank you.");

            // Optimistically update the UI
            setStudent((prev) => {
              if (!prev) return null;
              const newCollected = prev.collectedAmount + finalAmount;
              return {
                ...prev,
                collectedAmount: newCollected,
                progressPercentage: Math.min(
                  100,
                  Math.round((newCollected / prev.requiredAmount) * 100),
                ),
              };
            });

            // Reset forms
            setDonorName("");
            setDonorEmail("");
            setDonorPhone("");
            setPanNumber("");
            setNeeds80G(false);
          } catch (err) {
            toast.error(err instanceof Error ? err.message : "Payment verification failed");
          }
        },
        prefill: {
          name: donorName,
          email: donorEmail,
          contact: donorPhone,
        },
        theme: { color: "#ea580c" }, // Primary brand color
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response: { error: { description: string } }) {
        toast.error(response.error.description || "Payment failed");
      });
      rzp.open();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong initializing payment");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!student) return null;

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-12">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      {/* Context Header */}
      <div className="bg-primary/5 border-b border-primary/10">
        <div className="container mx-auto px-4 py-8 md:py-10 max-w-5xl">
          <Link
            href="/sponsor-students"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Students
          </Link>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start text-center md:text-left">
            <div className="relative w-28 h-28 md:w-40 md:h-40 shrink-0">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl md:rounded-3xl rotate-3 -z-10 group-hover:rotate-6 transition-transform duration-500" />
              <div className="w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-lg bg-card">
                {student.photoUrl ? (
                  <Image
                    src={student.photoUrl}
                    alt={student.fullName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <Users className="h-10 w-10 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3 flex-1 pt-2">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <Badge
                  variant="secondary"
                  className="rounded-md px-2 py-0.5 text-xs font-semibold"
                >
                  {student.category}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground font-medium">
                  <MapPin className="h-4 w-4 text-primary shrink-0 mr-1" />
                  <span className="truncate">{student.location}</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold leading-none text-foreground/90">
                {student.fullName}
              </h1>

              <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-3 text-sm font-medium text-muted-foreground">
                <div className="flex flex-col items-center md:items-start space-y-0.5">
                  <span className="text-[10px] opacity-60 flex items-center">
                    <BookOpen className="h-3 w-3 mr-1" /> Standard
                  </span>
                  <span className="text-foreground">{student.standard}</span>
                </div>
                <Separator
                  orientation="vertical"
                  className="h-8 hidden sm:block bg-border/60"
                />
                <div className="flex flex-col items-center md:items-start space-y-0.5">
                  <span className="text-[10px] opacity-60 flex items-center">
                    <Users className="h-3 w-3 mr-1" /> Age
                  </span>
                  <span className="text-foreground">{student.age} Yrs</span>
                </div>
                <Separator
                  orientation="vertical"
                  className="h-8 hidden sm:block bg-border/60"
                />
                <div className="flex flex-col items-center md:items-start space-y-0.5">
                  <span className="text-[10px] opacity-60 flex items-center">
                    <Heart className="h-3 w-3 mr-1" /> Impact
                  </span>
                  <span className="text-primary font-bold">
                    {student.donations?.length || 0} Supporters
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12 flex-col-reverse md:grid">
          {/* Content Section */}
          <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
            <Tabs defaultValue="story" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 gap-8 bg-transparent">
                <TabsTrigger
                  value="story"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground rounded-none px-0 py-3 text-sm md:text-base font-bold whitespace-nowrap data-[state=active]:shadow-none"
                >
                  Their Story
                </TabsTrigger>
                {student.achievements && (
                  <TabsTrigger
                    value="achievements"
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground rounded-none px-0 py-3 text-sm md:text-base font-bold whitespace-nowrap data-[state=active]:shadow-none"
                  >
                    Achievements
                  </TabsTrigger>
                )}
                {student.donations && student.donations.length > 0 && (
                  <TabsTrigger
                    value="supporters"
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground rounded-none px-0 py-3 text-sm md:text-base font-bold whitespace-nowrap data-[state=active]:shadow-none"
                  >
                    Supporters ({student.donations.length})
                  </TabsTrigger>
                )}
              </TabsList>
              <TabsContent value="story" className="mt-6">
                <div className="prose prose-sm md:prose-base max-w-none text-muted-foreground leading-relaxed whitespace-pre-line font-medium">
                  {student.story}
                </div>
              </TabsContent>
              {student.achievements && (
                <TabsContent value="achievements" className="mt-6">
                  <div className="space-y-3">
                    {student.achievements
                      .split("\n")
                      .filter((a: string) => a.trim() !== "")
                      .map((achievement: string, i: number) => (
                        <div
                          key={i}
                          className="flex items-start gap-4 p-4 rounded-xl bg-muted/20 border border-border/40"
                        >
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Award className="h-4 w-4 text-primary" />
                          </div>
                          <p className="font-medium text-sm text-foreground/80 md:text-base leading-snug">
                            {achievement.replace(/^[•\-\*]\s*/, "")}
                          </p>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              )}
              {student.donations && student.donations.length > 0 && (
                <TabsContent value="supporters" className="mt-6">
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 supports-scrollbars:pr-2">
                    {[...student.donations]
                      .sort(
                        (a: Donation, b: Donation) =>
                          new Date(b.createdAt).getTime() -
                          new Date(a.createdAt).getTime(),
                      )
                      .map((donation: Donation) => (
                        <div
                          key={donation.id}
                          className="flex items-center justify-between p-4 rounded-xl bg-muted/20 border border-border/40 transition-colors hover:bg-muted/40"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                              <Heart className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-bold text-sm md:text-base text-foreground/90 capitalize">
                                {donation.name || "Anonymous Donor"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(
                                  donation.createdAt,
                                ).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                          <p className="font-black text-primary text-sm md:text-base bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap">
                            ₹{donation.amount}
                          </p>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              )}
            </Tabs>

            {/* Share Card */}
            <div className="p-6 md:p-8 rounded-2xl bg-muted/30 border border-border/40 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div className="space-y-2 flex-1">
                <h3 className="text-lg md:text-xl font-bold flex items-center justify-center sm:justify-start gap-2 text-foreground/90">
                  <Share2 className="h-5 w-5 text-primary" />
                  Share {student.fullName.split(" ")[0]}&apos;s profile
                </h3>
                <p className="text-sm text-muted-foreground leading-snug">
                  Share this on WhatsApp or social media to help us reach more supporters.
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button
                  variant="default"
                  className="rounded-full h-10 px-4 gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm"
                  asChild
                >
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Support ${student.fullName}'s education! ${student.collectedAmount > 0 ? `Already ₹${student.collectedAmount.toLocaleString('en-IN')} raised.` : ''} Donate here: ${typeof window !== 'undefined' ? window.location.href : ''}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-10 w-10"
                  onClick={() => {
                    const url = typeof window !== 'undefined' ? window.location.href : '';
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
                  }}
                >
                  <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-10 w-10"
                  onClick={() => {
                    if (typeof navigator !== 'undefined' && navigator.share) {
                      navigator.share({ title: `Support ${student.fullName}`, url: window.location.href });
                    } else if (typeof navigator !== 'undefined') {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success('Link copied!');
                    }
                  }}
                >
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </div>
          </div>

          {/* Donation Sidebar */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="sticky top-20 pt-2 lg:pt-0 space-y-6">
              <div className="border border-border/50 shadow-lg bg-card rounded-2xl overflow-hidden relative">
                {/* Subtle top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary/80" />

                <div className="p-6 md:p-8 space-y-6 md:space-y-7">
                  <div className="space-y-4">
                    <div className="flex justify-between items-end gap-2 px-1">
                      <div className="space-y-1">
                        <p className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest">
                          Funded
                        </p>
                        <p className="text-2xl md:text-3xl font-black text-primary leading-none">
                          {formatINR(student.collectedAmount)}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest">
                          Goal
                        </p>
                        <p className="text-sm md:text-base font-bold leading-none">
                          {formatINR(student.requiredAmount)}
                        </p>
                      </div>
                    </div>
                    <Progress
                      value={student.progressPercentage}
                      className="h-2 bg-muted/60"
                    />
                    <div className="flex justify-between text-xs font-medium tracking-tight px-1">
                      <span className="text-muted-foreground border border-border/50 rounded-md px-1.5 py-0.5 bg-muted/20">
                        {student.progressPercentage}% Complete
                      </span>
                      <span className="text-muted-foreground flex items-center border border-border/50 rounded-md px-1.5 py-0.5 bg-muted/20">
                        <Users className="h-3 w-3 mr-1 opacity-70" />{" "}
                        {student.donations?.length || 0}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="text-center space-y-1">
                      <h3 className="text-base md:text-lg font-bold text-foreground/90">
                        Support {student.fullName.split(" ")[0]}
                      </h3>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[500, 1000, 2500].map((amt) => (
                        <Button
                          key={amt}
                          variant={
                            donationAmount === amt && !customAmount
                              ? "default"
                              : "outline"
                          }
                          className="h-11 rounded-lg font-bold text-sm bg-background border-border hover:bg-muted/50"
                          onClick={() => {
                            setDonationAmount(amt);
                            setCustomAmount("");
                          }}
                        >
                          ₹{amt}
                        </Button>
                      ))}
                    </div>

                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-muted-foreground text-sm">
                        ₹
                      </span>
                      <Input
                        placeholder="Custom amount"
                        className="h-11 pl-8 bg-background border-border focus-visible:ring-1 focus-visible:ring-primary/50 rounded-lg font-bold text-sm shadow-sm"
                        type="number"
                        min="100"
                        value={customAmount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setCustomAmount(e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-3.5 pt-4 border-t border-border/40">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-muted-foreground">
                          Your Full Name{" "}
                          <span className="text-red-500/80">*</span>
                        </Label>
                        <Input
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          placeholder="E.g. Rahul Sharma"
                          required
                          className="h-10 rounded-lg bg-background text-sm shadow-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-muted-foreground">
                          Email Address{" "}
                          <span className="text-red-500/80">*</span>
                        </Label>
                        <Input
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          type="email"
                          placeholder="For receipt delivery"
                          required
                          className="h-10 rounded-lg bg-background text-sm shadow-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-muted-foreground">
                          Phone{" "}
                          <span className="text-muted-foreground/50 font-normal">
                            (Optional)
                          </span>
                        </Label>
                        <Input
                          value={donorPhone}
                          onChange={(e) => setDonorPhone(e.target.value)}
                          type="tel"
                          placeholder="For WhatsApp updates"
                          className="h-10 rounded-lg bg-background text-sm shadow-sm"
                        />
                      </div>

                      <div className="flex items-start space-x-3 pt-2 bg-muted/10 p-3 rounded-lg border border-border/40 mt-2">
                        <Checkbox
                          id="80g"
                          checked={needs80G}
                          onCheckedChange={(c) => setNeeds80G(c as boolean)}
                          className="mt-0.5"
                        />
                        <div className="grid gap-1 leading-none">
                          <label
                            htmlFor="80g"
                            className="text-xs font-bold cursor-pointer text-foreground/90"
                          >
                            Need an 80G Tax Exemption?
                          </label>
                          <p className="text-[10px] text-muted-foreground leading-snug">
                            Get a tax deduction certificate for your
                            contribution.
                          </p>
                        </div>
                      </div>

                      {needs80G && (
                        <div className="space-y-1.5 pt-1 animate-in fade-in slide-in-from-top-1">
                          <Label className="text-xs font-semibold text-primary">
                            PAN Number{" "}
                            <span className="text-red-500/80">*</span>
                          </Label>
                          <Input
                            value={panNumber}
                            onChange={(e) =>
                              setPanNumber(e.target.value.toUpperCase())
                            }
                            placeholder="ABCDE1234F"
                            className="uppercase h-10 rounded-lg shadow-sm border-primary/20 bg-primary/5 focus-visible:ring-1 focus-visible:ring-primary/50"
                            required
                          />
                        </div>
                      )}
                    </div>

                    <div className="pt-2">
                      <Button
                        size="lg"
                        className="w-full h-12 md:h-14 rounded-xl text-sm md:text-base font-semibold shadow-md hover:shadow-lg transition-all select-none group"
                        onClick={handleDonation}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <Loader2 className="mr-2 h-4 w-4 md:h-5 md:w-5 animate-spin" />
                        ) : (
                          <Heart className="mr-2 h-4 w-4 md:h-5 md:w-5 fill-current group-hover:scale-110 transition-transform" />
                        )}
                        Donate{" "}
                        {customAmount
                          ? formatINR(parseInt(customAmount))
                          : formatINR(donationAmount)}
                      </Button>
                    </div>
                    <div className="flex flex-col items-center justify-center pt-1">
                      <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1.5">
                        <svg
                          className="w-3.5 h-3.5 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                        Secure Razorpay Checkout
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-5 rounded-2xl bg-muted/20 border border-border/40 text-center space-y-3 hidden md:block">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Target className="h-5 w-5 text-primary" />
                </span>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-foreground/90">
                    Direct impact
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed px-4">
                    100% of your donation goes directly towards resolving their
                    financial barrier to education.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Floating CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 border-t bg-background/80 backdrop-blur-xl z-40 animate-in slide-in-from-bottom-full">
        <Button
          size="lg"
          className="w-full h-14 rounded-2xl text-base font-semibold shadow-xl"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            // Small timeout to allow scrolling before focusing
            setTimeout(() => {
              const firstInput = document.querySelector(
                'input[type="number"]',
              ) as HTMLInputElement;
              if (firstInput) firstInput.focus();
            }, 500);
          }}
        >
          <Heart className="mr-2 h-5 w-5 fill-current" />
          Donate
        </Button>
      </div>
    </div>
  );
}
