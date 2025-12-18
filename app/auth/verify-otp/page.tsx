"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
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
import { useAutoSendOtp } from "@/hooks/auth/useAutoSendOtp";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "@/components/AppInputFields/InputField";

const otpSchema = z.object({
  otp: z.string().length(4, "OTP must be 4 digits"),
});

type OTPFormData = z.infer<typeof otpSchema>;

function VerifyOTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const verifyMutation = useVerifyOtp();
  const resendMutation = useResendOtp();
  
  const form = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const [cooldown, setCooldown] = React.useState(0);
  
  // Auto-send OTP when page loads using useQuery
  const { data: autoSendData, isError: autoSendError, error: autoSendErrorData } = useAutoSendOtp(email, !!email);

  // Show toast when auto-send completes
  useEffect(() => {
    if (autoSendData) {
      toast.success(autoSendData.message);
      setCooldown(60);
    }
  }, [autoSendData]);

  // Show error toast if auto-send fails
  useEffect(() => {
    if (autoSendError) {
      const errorMessage = (autoSendErrorData as any)?.response?.data?.error || "Failed to send OTP";
      toast.error(errorMessage);
    }
  }, [autoSendError, autoSendErrorData]);

  // Cooldown timer
  useEffect(() => {
    if (cooldown > 0) {data: OTPFormData) => {
    try {
      const result = await verifyMutation.mutateAsync({ email, otp: data.otp });
      toast.success(result.message);
      router.push("/auth/login");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Invalid or expired OTP";
      toast.error(errorMessage);
      form.reset(cess(result.message);
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
form.reset(
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
            We've sent a 4-digit OTP to{" "}
            <span className="font-semibold text-foreground">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <InputOTP
              maxLength={4}
              value={otp}
         FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleVerify)}>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <InputField
                  name="otp"
                  type="OTP"
                  label="Enter OTP"
                  placeholder="Enter 4-digit OTP"
                  required
                  description="Enter the OTP code sent to your email"
                  onComplete={(data) => {
                    // Auto-submit when all 4 digits are entered
                    form.handleSubmit(handleVerify)();
                  }}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={verifyMutation.isPending}
              >
                {verifyMutation.isPending ? "Verifying..." : "Verify OTP"}
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Didn't receive the code?
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResend}
                  disabled={cooldown > 0 || resendMutation.isPending}
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
          </form>
        </FormProviderme="text-primary hover:underline font-medium"
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
