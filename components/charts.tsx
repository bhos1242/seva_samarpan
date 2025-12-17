"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart as RechartsAreaChart,
  Area,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

interface ChartProps {
  data: Record<string, unknown>[];
  className?: string;
}
// ...
export const ChartComponent = ({
  title,
  data,
  type = "bar",
  description,
  config,
}: {
  title: string;
  data: Record<string, unknown>[]; // Data shape is flexible
  type?: "bar" | "line" | "pie";
  description?: string;
  config?: Record<string, unknown>; // Config shape depends on recharts
}) => {
  // This component's implementation would go here.
  // The original instruction had a syntax error in this block,
  // which has been corrected to make the code syntactically valid.
  return null; // Placeholder for the actual component logic
};

export function LineChart({
  data,
  dataKey,
  xAxisKey,
  lineColor = "#8884d8",
  className,
}: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={dataKey} stroke={lineColor} />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

export function PieChart({
  data,
  dataKey,
  nameKey,
  className,
}: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <RechartsPieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell -${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}

export function AreaChart({
  data,
  dataKey,
  xAxisKey,
  areaColor = "#8884d8",
  className,
}: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <RechartsAreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={areaColor}
          fill={areaColor}
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
