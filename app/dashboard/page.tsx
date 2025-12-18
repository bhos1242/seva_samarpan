import { StatsCard } from "@/components/stats-card";
import { BarChart, LineChart } from "@/components/charts";
import { Users, Calendar, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s what&apos;s happening.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Bookings</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <BarChart
              data={bookingsData}
              dataKey="bookings"
              xAxisKey="month"
              barColor="#8884d8"
              className="w-full h-full"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
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
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <p className="font-medium">New booking created</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <p className="font-medium">User registration</p>
                <p className="text-sm text-muted-foreground">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Payment received</p>
                <p className="text-sm text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
