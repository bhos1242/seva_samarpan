"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useWebPush } from "@/hooks/useWebPush";
import { Bell, BellOff, Loader2, Send } from "lucide-react";

export default function SettingsPage() {
  const {
    isSubscribed,
    subscriptions,
    isLoading,
    subscribe,
    unsubscribe,
    sendTest,
  } = useWebPush();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Push Notifications
              </CardTitle>
              <CardDescription>
                Manage your browser push notifications to stay updated
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    Status:{" "}
                    {isLoading
                      ? "Checking..."
                      : isSubscribed
                      ? "✅ Enabled"
                      : "❌ Disabled"}
                  </p>
                  {subscriptions.length > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Active on {subscriptions.length} device
                      {subscriptions.length > 1 ? "s" : ""}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  {isSubscribed ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => sendTest.mutate()}
                        disabled={sendTest.isPending}
                      >
                        {sendTest.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                        <span className="ml-2">Test</span>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => unsubscribe.mutate()}
                        disabled={unsubscribe.isPending}
                      >
                        {unsubscribe.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <BellOff className="h-4 w-4" />
                        )}
                        <span className="ml-2">Disable</span>
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => subscribe.mutate()}
                      disabled={subscribe.isPending}
                    >
                      {subscribe.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Bell className="h-4 w-4" />
                      )}
                      <span className="ml-2">Enable Notifications</span>
                    </Button>
                  )}
                </div>
              </div>

              {subscriptions.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    Active Devices:
                  </p>
                  {subscriptions.map((sub) => (
                    <div key={sub.id} className="rounded-md border p-3 text-xs">
                      <p className="font-medium">
                        {sub.userAgent?.includes("Mobile")
                          ? "📱 Mobile"
                          : "💻 Desktop"}
                      </p>
                      <p className="text-muted-foreground mt-1">
                        {sub.userAgent && sub.userAgent.length > 50
                          ? sub.userAgent.substring(0, 50) + "..."
                          : sub.userAgent || "Unknown device"}
                      </p>
                      <p className="text-muted-foreground mt-1">
                        Registered: {new Date(sub.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Choose what email notifications you want to receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about new features and updates
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Security Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about account security events
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current">Current Password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new">New Password</Label>
                <Input id="new" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input id="confirm" type="password" />
              </div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
