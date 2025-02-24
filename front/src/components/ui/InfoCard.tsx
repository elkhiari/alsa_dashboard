import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useState } from "react";
import CountUp from "react-countup";

interface InfoCardProps {
  title: string;
  n: string;
  value: number;
  icon: LucideIcon;
  subtext?: string;
  className?: string;
  iconClass?: string;
  textColor?: string;
}

// interface InfoCardProps {
//   n: string; // Assuming 'n' is a string (e.g., currency symbol, unit)
//   title: string;
//   value: number;
//   icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
//   subtext?: string; // Optional subtext
//   className?: string; // Optional additional class names
//   iconClass?: string; // Optional additional class names for the icon container
// }

export function InfoCard({
  n,
  title,
  value,
  icon: Icon,
  subtext,
  className,
  iconClass,
  textColor,
}: InfoCardProps) {
  const [isActive, setisActive] = useState(false); // Remove if not used

  return (
    <div
      className={
        "relative overflow-hidden border bg-card text-card-foreground shadow-md rounded-md flex flex-col justify-between items-center p-2 " +
        (className || "")
      }
    >
      <div className="flex flex-row items-center space-x-2 justify-between w-full p-4  h-full ">
        <div className={" space-x-2 justify-between flex items-center "}>
          <Icon className="h-8 w-8 text-gray-300" />
          <h3 className="text-md font-bold leading-none tracking-tight h-full text-gray-600">
            {title}
          </h3>
          {subtext && (
            <p className="text-sm text-muted-foreground">{subtext}</p>
          )}
        </div>
        <div>
          <h4 className={"text-2xl font-bold w-full h-full " + textColor}>
            <CountUp end={value} duration={1} separator=" " /> {n}
          </h4>
        </div>
      </div>

      {n === "%" && (
        <div className="w-full h-2 bg-black/20 rounded-full ">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            className="h-2 bg-blue-600 rounded-full"
          />
        </div>
      )}
    </div>
  );

  return (
    <div
      className={
        "relative overflow-hidden border bg-card text-card-foreground shadow rounded-md flex justify-between items-center " +
        (className || "")
      }
    >
      <CardHeader className="flex flex-row items-center space-x-2 bg-red-600">
        <div
          className={
            "rounded-full p-2 w-14 h-14 flex place-content-center place-items-center bg-red-600/30 " +
            (iconClass || "")
          }
        >
          <Icon className="h-8 w-8" strokeWidth={1.5} />
        </div>
        <h3 className="text-sm font-medium leading-none tracking-tight h-full">
          {title}
        </h3>
      </CardHeader>

      <CardContent className="bg-black/30 flex flex-col items-start w-full ">
        <h2 className="text-2xl font-bold w-full h-full items-center flex flex-row justify-between">
          <CountUp end={value} duration={1} separator=" " /> {n}
        </h2>
        {subtext && (
          <span className="text-sm text-muted-foreground">{subtext}</span>
        )}
      </CardContent>
    </div>
  );
}
export function InfoCardSkeleton(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={
        "relative overflow-hidden border bg-card text-card-foreground shadow rounded-md " +
        props.className
      }
      {...props}
    >
      <div className="flex flex-row items-center justify-between space-y-0 pb-2 w-full p-4">
        <Skeleton
          className={
            " rounded-full p-2 absolute -bottom-6 -right-6 w-36 h-36 flex place-content-center place-items-center  "
          }
        />
        <Skeleton className="h-4 w-24 bg-gray-300" />
      </div>
      <div className="p-4">
        <div className="flex items-end">
          <Skeleton className="h-8 w-16 bg-gray-300" />
          <Skeleton className="h-6 w-8 ml-2 bg-gray-300" />
        </div>
        {/* <Skeleton className="h-3 w-20 mt-2 bg-gray-300" /> */}
      </div>
    </div>
  );
}

export function ChartSkeleton({ className }: { className?: string }) {
  return (
    <div className={"h-full p-4 rounded-md shadow border " + className}>
      <Skeleton className="h-6 w-48 mb-4 bg-gray-300" />
      <Skeleton className="h-64 w-full bg-gray-300" />
    </div>
  );
}
