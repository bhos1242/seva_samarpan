import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { z } from "zod";

const orderSchema = z.object({
    amount: z.number().min(1, "Donation amount must be at least ₹1"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { amount } = orderSchema.parse(body);

        if (!process.env.NEXT_RAZORPAY_KEY_ID || !process.env.NEXT_RAZORPAY_KEY_SECRET) {
            return NextResponse.json(
                { error: "Razorpay keys are missing on the server." },
                { status: 500 }
            );
        }

        const instance = new Razorpay({
            key_id: process.env.NEXT_RAZORPAY_KEY_ID,
            key_secret: process.env.NEXT_RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: amount * 100, // amount in smallest currency unit (paise)
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await instance.orders.create(options);

        return NextResponse.json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
            status: order.status,
        }, { status: 200 });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 });
        }
        console.error("Razorpay order creation failed:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
