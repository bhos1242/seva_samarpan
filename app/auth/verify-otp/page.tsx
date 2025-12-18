"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import toast from "react-hot-toast";
import { useVerifyOtp } from "@/hooks/auth/useVerifyOtp";
import { useResendOtp } from "@/hooks/auth/useResendOtp";

function VerifyOTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const verifyMutation = useVerifyOtp();
  const resendMutation = useResendOtp();

  // Cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }

    try {
      const result = await verifyMutation.mutateAsync({ email, otp });
      toast.success(result.message);
      router.push("/auth/login");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Invalid or expired OTP";
      toast.error(errorMessage);
      setOtp("");
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) {
      toast.error(`Please wait ${cooldown} seconds before resending`);
      return;
    }

    try {
      const result = await resendMutation.mutateAsync({ email });
      toast.success(result.message);
      setCooldown(60); // 60 second cooldown
      setOtp("");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Failed to resend OTP";
      toast.error(errorMessage);

      // Handle rate limit
      if (error.response?.status === 429) {
        const retryAfter = error.response?.data?.retryAfter;
        if (retryAfter) {
          const secondsRemaining = Math.ceil(
            (new Date(retryAfter).getTime() - Date.now()) / 1000
          );
          setCooldown(secondsRemaining);
        }
      }
    }
  };

  if (!email) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4 dark:bg-gray-950">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Error</CardTitle>
            <CardDescription className="text-center">
              Email address not found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/auth/signup">
              <Button className="w-full">Go to Signup</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4 dark:bg-gray-950">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-center">
            Verify Your Email
          </CardTitle>
          <CardDescription className="text-center">
            We've sent a 6-digit OTP to{" "}
            <span className="font-semibold text-foreground">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              onComplete={handleVerify}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <p className="text-sm text-muted-foreground text-center">
              Enter the OTP code sent to your email
            </p>
          </div>

          <Button
            className="w-full"
            onClick={handleVerify}
            disabled={otp.length !== 6 || verifyMutation.isPending}
          >
            {verifyMutation.isPending ? "Verifying..." : "Verify OTP"}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Didn't receive the code?
            </p>
            <Button
              variant="outline"
              onClick={handleResend}
              disabled={
                cooldown > 0 || resendMutation.isPending
              }
              className="w-full"
            >
              {resendMutation.isPending
                ? "Sending..."
                : cooldown > 0
                ? `Resend in ${cooldown}s`
                : "Resend OTP"}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center">
            <Link
              href="/auth/signup"
              className="text-primary hover:underline font-medium"
            >
              Back to Signup
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOTPContent />
    </Suspense>
  );
}
