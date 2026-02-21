"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import Script from "next/script"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import InputField from "@/components/AppInputFields/InputField"
import { Lock, Heart, Loader2 } from "lucide-react"

// Strict Razorpay Types to avoid 'any'
interface RazorpaySuccessResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

interface RazorpayErrorResponse {
    error: {
        code: string;
        description: string;
        source: string;
        step: string;
        reason: string;
        metadata: {
            order_id: string;
            payment_id: string;
        };
    };
}

interface RazorpayOptions {
    key: string | undefined;
    amount: number;
    currency: string;
    name: string;
    description?: string;
    image?: string;
    order_id: string;
    handler: (response: RazorpaySuccessResponse) => void;
    prefill?: {
        name?: string;
        email?: string;
        contact?: string;
    };
    theme?: {
        color?: string;
    };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
        on: (event: string, handler: (response: RazorpayErrorResponse) => void) => void;
        open: () => void;
    };
  }
}

const donateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number").max(15, "Please enter a valid phone number"),
  amount: z.number().min(1, "Amount must be at least ₹1")
})

type DonateFormValues = z.infer<typeof donateSchema>

const PRESET_AMOUNTS = [500, 1000, 2500, 5000]

export function DonateForm() {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false)
    const [customAmount, setCustomAmount] = useState<string>("")

    const form = useForm<DonateFormValues>({
        resolver: zodResolver(donateSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            amount: 1000,
        },
    })

    const selectedAmount = form.watch("amount")

    const handlePresetClick = (amount: number) => {
        setCustomAmount("")
        form.setValue("amount", amount, { shouldValidate: true })
    }

    const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setCustomAmount(val)
        if (val) {
            form.setValue("amount", parseInt(val, 10), { shouldValidate: true })
        } else {
            form.setValue("amount", 0)
        }
    }

    const createOrderMutation = useMutation({
        mutationFn: async (data: { amount: number }) => {
            const res = await fetch("/api/razorpay/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
            if (!res.ok) {
                const err = await res.json()
                throw new Error(err.error || "Failed to create order")
            }
            return res.json()
        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    })

    const onSubmit = async (data: DonateFormValues) => {
        if (!isScriptLoaded) {
            toast.error("Payment system is still loading. Please wait a moment.")
            return
        }

        try {
            const order = await createOrderMutation.mutateAsync({ amount: data.amount })

            if (!order || !order.id) {
                throw new Error("Invalid order generated")
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Ensure you use public env var here if needed, or pass from server. Usually RAZORPAY_KEY_ID can be passed here if public.
                amount: order.amount,
                currency: order.currency,
                name: "Seva Samarpan",
                description: "Donation for Education and Elder Care",
                image: "https://sevasamarpan.org/icon.svg", // Replace with your actual logo
                order_id: order.id,
                handler: function (response: RazorpaySuccessResponse) {
                    // This is where you would normally call a verify API route,
                    // but for this simple implementation we just show success.
                    toast.success(`Thank you, ${data.name}! Your donation of ₹${data.amount} was successful. (ID: ${response.razorpay_payment_id})`)
                    form.reset()
                },
                prefill: {
                    name: data.name,
                    email: data.email,
                    contact: data.phone,
                },
                theme: {
                    color: "#f97316", // Tailwind orange-500 (Primary color match)
                },
            }

            const rzp1 = new window.Razorpay(options)
            
            rzp1.on('payment.failed', function (response: RazorpayErrorResponse) {
                toast.error("Payment Failed. Reason: " + response.error.description)
            })

            rzp1.open()

        } catch (error) {
            console.error(error)
             // mutate error is handled in onError
        }
    }

    return (
        <Card className="border-none shadow-2xl bg-card rounded-[2.5rem] overflow-hidden ring-1 ring-border/50">
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="lazyOnload"
                onLoad={() => setIsScriptLoaded(true)}
                onError={() => toast.error("Failed to load payment gateway")}
            />
            
            <CardHeader className="bg-primary/5 pb-8 pt-10 text-center border-b">
                <CardTitle className="text-2xl font-bold uppercase tracking-tight mb-2">Secure Donation</CardTitle>
                <CardDescription className="text-base">Join us in making a difference today.</CardDescription>
            </CardHeader>
            
            <CardContent className="p-6 md:p-10">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Amount Selection */}
                    <div className="space-y-4">
                        <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Select Amount (₹)</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {PRESET_AMOUNTS.map((amt) => (
                                <Button
                                    key={amt}
                                    type="button"
                                    variant={selectedAmount === amt && !customAmount ? 'default' : 'outline'}
                                    onClick={() => handlePresetClick(amt)}
                                    className="h-14 font-bold text-lg rounded-xl"
                                >
                                    ₹{amt}
                                </Button>
                            ))}
                        </div>
                        <div className="pt-2">
                            <InputField 
                                name="amount"
                                type="number"
                                placeholder="Other Amount (₹)"
                                className="h-14 bg-muted/30 border-none font-bold text-lg rounded-xl"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Your Details</label>
                        
                        <div className="space-y-4">
                            <InputField 
                                name="name"
                                type="text"
                                placeholder="Full Name"
                                className="h-14 bg-muted/30 border-none rounded-xl"
                            />

                            <div className="grid md:grid-cols-2 gap-4">
                                <InputField 
                                    name="email"
                                    type="email"
                                    placeholder="Email Address"
                                    className="h-14 bg-muted/30 border-none rounded-xl"
                                />
                                <InputField 
                                    name="phone"
                                    type="phone"
                                    placeholder="Phone Number"
                                    className="h-14 bg-muted/30 border-none rounded-xl"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 space-y-4">
                        <Button 
                            type="submit" 
                            size="lg" 
                            className="w-full h-16 rounded-2xl text-lg font-black uppercase shadow-xl hover:scale-[1.02] transition-transform shadow-primary/20 gap-2"
                            disabled={createOrderMutation.isPending || !isScriptLoaded}
                        >
                            {createOrderMutation.isPending ? (
                                <Loader2 className="h-6 w-6 animate-spin" />
                            ) : (
                                <Heart className="h-6 w-6 fill-current" />
                            )}
                            Donate {selectedAmount ? `₹${selectedAmount}` : ''}
                        </Button>

                        <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-wider">
                             <Lock className="h-4 w-4" /> 
                             100% Secure Payment by Razorpay
                        </div>
                    </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
