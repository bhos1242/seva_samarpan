import { StatsCard } from "@/components/stats-card";
import { BarChart, LineChart } from "@/components/charts";
import { Users, Calendar, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { TestNotificationButton } from "@/components/test-notification-button";

// Sample data - replace with your actual data
const bookingsData = [
  { month: "Jan", bookings: 65 },
  { month: "Feb", bookings: 75 },
  { month: "Mar", bookings: 90 },
  { month: "Apr", bookings: 80 },
  { month: "May", bookings: 95 },
  { month: "Jun", bookings: 110 },
];

const revenueData = [
  { month: "Jan", revenue: 4500 },
  { month: "Feb", revenue: 5200 },
  { month: "Mar", revenue: 6100 },
  { month: "Apr", revenue: 5800 },
  { month: "May", revenue: 6500 },
  { month: "Jun", revenue: 7200 },
];

export default async function DashboardPage() {
  const session = await auth();

  // Log session data
  console.log("Dashboard Session:", {
    user: session?.user,
    provider: session?.user?.provider,
    isVerified: session?.user?.isVerified,
  });

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground hidden sm:block">
            Welcome back! Here&apos;s what&apos;s happening.
          </p>
        </div>
        <TestNotificationButton />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value="2,543"
          description="from last month"
          icon={Users}
          trend="+12%"
          trendUp={true}
        />
        <StatsCard
          title="Total Bookings"
          value="1,234"
          description="from last month"
          icon={Calendar}
          trend="+8%"
          trendUp={true}
        />
        <StatsCard
          title="Revenue"
          value="$45,231"
          description="from last month"
          icon={DollarSign}
          trend="+15%"
          trendUp={true}
        />
        <StatsCard
          title="Growth"
          value="24.5%"
          description="from last month"
          icon={TrendingUp}
          trend="+4%"
          trendUp={true}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-3 md:gap-4 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">Monthly Bookings</CardTitle>
          </CardHeader>
          <CardContent className="h-48 md:h-64 flex items-center justify-center p-4 pt-0">
            <BarChart
              data={bookingsData}
              dataKey="bookings"
              xAxisKey="month"
              barColor="#8884d8"
              className="w-full h-full"
            />
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-48 md:h-64 flex items-center justify-center p-4 pt-0">
            <LineChart
              data={revenueData}
              dataKey="revenue"
              xAxisKey="month"
              lineColor="#82ca9d"
              className="w-full h-full"
            />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="shadow-sm">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-border/50 pb-2">
              <div>
                <p className="text-sm font-medium leading-none mb-1">New booking created</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between border-b border-border/50 pb-2">
              <div>
                <p className="text-sm font-medium leading-none mb-1">User registration</p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium leading-none mb-1">Payment received</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
