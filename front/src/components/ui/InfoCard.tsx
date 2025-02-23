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
}

export function InfoCard({
  n,
  title,
  value,
  icon: Icon,
  subtext,
  className,
  iconClass,
}: InfoCardProps) {
  const [isActive, setisActive] = useState(false);
  return (
    <motion.div
      initial={{}}
      animate={{}}
      transition={{ duration: 0.2 }}
      className={
        "relative overflow-hidden border bg-card text-card-foreground shadow rounded-md " +
        className
      }
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 w-full">
        <motion.div
          initial={{
            // scale: 0.6,
            transform: "translateX(20px) translateY(20px) scale(0.6)",
          }}
          animate={{
            scale: 1.05,
            transform: "translateX(0px) translateY(0px) scale(1.05)",
          }}
          whileHover={{ scale: 1.8, width: "50%" }}
          transition={{
            duration: 0.2,
            type: "spring",
            stiffness: 300,
          }}
          className={
            " rounded-full p-2 absolute -bottom-6 -right-6 w-36 h-36 flex place-content-center place-items-center bg-red-600/30 " +
            iconClass
          }
        >
          <Icon className={"h-20 w-20 "} strokeWidth={1.5} />
        </motion.div>
        <motion.h3 className="text-sm font-medium  leading-none tracking-tight">
          {title}
        </motion.h3>
      </CardHeader>
      <CardContent>
        <div className=" flex items-end">
          <h2 className=" min-w-16 text-2xl font-bold">
            <CountUp end={value} duration={1} separator=" " className="" />
          </h2>
          <span className="text-xl font-semibold ml-2">{n}</span>
        </div>
        <p className="text-xs ">{subtext}</p>
      </CardContent>
    </motion.div>
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
