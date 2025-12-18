"use client";

import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export function TestNotificationButton() {
  const { data: session } = useSession();

  const handleTest = async () => {
    if (!session?.user?.id) {
      toast.error("Please log in first");
      return;
    }

    try {
      // First check if service worker is ready
      if (!("serviceWorker" in navigator)) {
        toast.error("Service Worker not supported");
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      console.log("Service Worker ready:", registration);

      // Check if push is subscribed
      const subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        toast.error("Please enable notifications first (click the bell icon)");
        return;
      }

      console.log(
        "Push subscription active:",
        subscription.endpoint.substring(0, 50) + "..."
      );

      // Send test notification
      toast.info("Sending test notification...");

      const response = await fetch("/api/notifications/send-to-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          title: "🎉 Test Notification",
          body: "This is a test notification! It worked! 🚀",
          url: "/dashboard",
          data: {
            test: true,
            timestamp: new Date().toISOString(),
          },
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(
          `✅ Notification sent to ${result.summary.successful} device(s)!`
        );
        console.log("Full result:", result);
      } else {
        toast.error(`❌ ${result.error}`);
        console.error("Error:", result);
      }
    } catch (error) {
      console.error("Test notification error:", error);
      toast.error(
        `Failed: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };

  if (!session?.user) {
    return null;
  }

  return (
    <Button onClick={handleTest} variant="outline" size="sm">
      <Bell className="h-4 w-4 mr-2" />
      Test Notification
    </Button>
  );
}
