import React from "react";
import { PieChart, Pie, Cell } from "recharts";

interface ProgressIndicatorProps {
  value: number;
  size?: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  value,
  size = 100,
}) => {
  const data = [
    { name: "Completed", value },
    { name: "Remaining", value: 100 - value },
  ];

  return (
    <div className="relative flex items-center justify-center">
      <PieChart width={size} height={size}>
        <Pie
          data={data}
          cx={size / 2}
          cy={size / 2}
          innerRadius={size / 2 - 10}
          outerRadius={size / 2}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
        >
          <Cell key="cell-0" fill="#3B82F6" />
          <Cell key="cell-1" fill="#E5E7EB" />
        </Pie>
      </PieChart>

      {/* Centered text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold text-gray-800">{value}%</span>
      </div>
    </div>
  );
};
