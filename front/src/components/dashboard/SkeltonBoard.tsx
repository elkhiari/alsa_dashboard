import { ChartSkeleton, InfoCardSkeleton } from "../ui/InfoCard";
import { DateRangePickerSkelton } from "../ui/DateRangePicker";

export function PageSkeleton() {
  return (
    <div className="container mx-auto p-4 mt-5">
      <div className="flex flex-col md:flex-row gap-4 max-w-2xl">
        <DateRangePickerSkelton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-b border-gray-200 py-6">
        <InfoCardSkeleton />
        <InfoCardSkeleton />
        <InfoCardSkeleton />
        <ChartSkeleton className="md:col-span-2 md:row-span-2" />
        <InfoCardSkeleton />
        <InfoCardSkeleton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-b border-gray-200 py-6">
        <InfoCardSkeleton />
        <InfoCardSkeleton />
        <InfoCardSkeleton />
        <ChartSkeleton />
        <ChartSkeleton className="col-span-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
        <ChartSkeleton />
        <div className="grid grid-rows-3 gap-6 rounded-md">
          <InfoCardSkeleton />
          <InfoCardSkeleton />
          <InfoCardSkeleton />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
        <div className="grid grid-rows-3 gap-6 rounded-md">
          <InfoCardSkeleton />
          <InfoCardSkeleton />
          <InfoCardSkeleton />
        </div>
        <ChartSkeleton />
      </div>
    </div>
  );
}
