import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Activity,
  Bus,
  BusFront,
  Calculator,
  CalendarCheck,
  Coins,
  Currency,
  Cylinder,
  Droplet,
  Droplets,
  Fuel,
  MapPin,
  Milestone,
  Navigation,
  Package,
  Receipt,
  ReceiptEuro,
  Route,
  Target,
  Truck,
  Warehouse,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";
import { UserSelect } from "@/components/ui/UserSelect";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { InfoCard } from "@/components/ui/InfoCard";
import { useGetChartsQuery, useGetStatsQuery } from "@/services/report";
import { parsNumber } from "@/lib/utils";
import { PageSkeleton } from "@/components/dashboard/SkeltonBoard";
import Error from "@/components/Error";

const users = [
  { id: "1", name: "Alice Johnson" },
  { id: "2", name: "Bob Smith" },
  { id: "3", name: "Charlie Brown" },
  { id: "4", name: "Diana Martinez" },
];

export default function DashboardPage() {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<Date>(new Date("2025-01-01"));
  const [endDate, setEndDate] = useState<Date>(new Date("2025-01-31"));
  const [selectedUser, setSelectedUser] = useState<string>();

  const { data, isLoading, isFetching, isError } = useGetStatsQuery({
    startDate,
    endDate,
    userId: selectedUser,
  });

  const {
    data: chartsData,
    isLoading: isLoad,
    isError: isErrorCharts,
  } = useGetChartsQuery();

  if (isLoading || isLoad || isFetching) {
    return <PageSkeleton />;
  }

  if (isError || isErrorCharts || !data) {
    return (
      <Error
        title="Oops! Something went wrong"
        description="Please try again later."
        code="500"
      />
    );
  }
  return (
    <div className="container mx-auto p-4 mt-5">
      <div className="flex flex-col md:flex-row gap-4 max-w-2xl ">
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-b border-gray-200 py-6">
        <InfoCard
          title={t("litre_consomme")}
          value={(data?.gasoil.volumeConsome ?? 0) / 1000}
          n={t("tone")}
          icon={Droplet}
          className="bg-gradient-to-r from-indigo-400 to-indigo-600"
          iconClass="bg-indigo-700 text-indigo-100"
        />
        <InfoCard
          title={t("prix")}
          value={data?.gasoil.prix ?? 0}
          n={t("dh")}
          icon={Currency}
          className="bg-gradient-to-r from-green-400 to-green-600"
          iconClass="bg-green-700 text-green-100"
        />
        <InfoCard
          title={t("total_paye")}
          value={data?.gasoil.MntTotalConsome ?? 0}
          n={t("dh")}
          icon={Calculator}
          className="bg-gradient-to-r from-purple-400 to-purple-600"
          iconClass="bg-purple-700 text-purple-100"
        />
        <div className="h-full p-4 rounded-md shadow border md:col-span-2 md:row-span-2">
          <h3 className="text-xl font-semibold mb-4">
            {t("gasoil_consumption_trend")}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={chartsData?.gasoil.map((itemLitre) => ({
                volumeConsome: (itemLitre.volumeConsome / 1000).toFixed(2),
                MntTotalConsome: (itemLitre.MntTotalConsome / 10000).toFixed(2),
                Month: itemLitre.Month,
                prix: itemLitre.prix,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                name="Volume Consome (Tone)"
                dataKey="volumeConsome"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Area
                type="monotone"
                name="Montant Total (1 = 10 000 DH)"
                dataKey="MntTotalConsome"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <InfoCard
          title={t("litre_livre")}
          value={(data?.totalLivre.VolumeLivre ?? 0) / 1000}
          n={t("tone")}
          icon={Package}
          className="bg-gradient-to-r from-blue-400 to-blue-600"
          iconClass="bg-blue-700 text-blue-100"
        />
        <InfoCard
          title={t("montant_livre")}
          value={data?.totalLivre.MntTotalLivre ?? 0}
          n={t("dh")}
          icon={Receipt}
          className="bg-gradient-to-r from-teal-400 to-teal-600"
          iconClass="bg-teal-700 text-teal-100"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-b border-gray-200 py-6">
        <InfoCard
          title={t("flotte_utilisee")}
          value={data?.NbrVehculeExp ?? 0}
          n={t("vehicules")}
          icon={BusFront}
          className="bg-gradient-to-r from-orange-400 to-orange-600"
          iconClass="bg-orange-700 text-orange-100"
        />

        <InfoCard
          title={t("parc_affecte_depot")}
          value={data?.NbrVehculeRavitaillement.parc_affecte ?? 0}
          n={t("vehicules")}
          icon={Warehouse}
          className="bg-gradient-to-r from-pink-400 to-pink-600"
          iconClass="bg-pink-700 text-pink-100"
        />

        <InfoCard
          title={t("flotte_ravitaillee")}
          value={data?.NbrVehculeRavitaillement.NbrVehculeRavitaillement ?? 0}
          n={t("vehicules")}
          icon={Fuel}
          className="bg-gradient-to-r from-yellow-400 to-yellow-600"
          iconClass="bg-yellow-700 text-yellow-100"
        />
        <div className="p-2 rounded-md shadow border">
          <h3 className="text-xl font-semibold mb-4">
            {t("flotte_utilisee_trend")}
          </h3>
          <ResponsiveContainer width="100%" maxHeight={300}>
            <LineChart data={chartsData?.NbrVehculeExp}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="NbrVehculeExp"
                name="Flotte Utilisée"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="md:col-span-2 p-2 rounded-md shadow border">
          <h3 className="text-xl font-semibold mb-4">
            {t("flotte_ravitaillee_vs_parc_affecte")}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartsData?.NbrVehculeRavitaillement}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="parc_affecte" name="Parc Affecté" fill="#8884d8" />
              <Bar
                dataKey="NbrVehculeRavitaillement"
                name="Flotte Ravitailée"
                fill="#82ca9d"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2  gap-6 py-6">
        <div className="h-full p-4 rounded-md shadow border ">
          <h3 className="text-xl font-semibold mb-4">
            {t("kilometrage_trend")}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartsData?.kms}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="klmCommercial"
                stroke="#82ca9d"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="KlmTotal"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-rows-3 gap-6  rounded-md ">
          <InfoCard
            title={t("kilometrage_exploitation")}
            value={data?.kms.klmCommercial ?? 0}
            n="Km"
            icon={MapPin}
            className="bg-gradient-to-r from-red-400 to-red-600"
            iconClass="bg-red-700 text-red-100"
          />
          <InfoCard
            title={t("kilometrage_location")}
            value={data?.kms.KlmLocation ?? 0}
            n="Km"
            icon={Navigation}
            className="bg-gradient-to-r from-cyan-400 to-cyan-600"
            iconClass="bg-cyan-700 text-cyan-100"
          />
          <InfoCard
            title={t("kilometrage_total")}
            value={data?.kms.KlmTotal ?? 0}
            n="Km"
            icon={Route}
            className="bg-gradient-to-r from-lime-400 to-lime-600"
            iconClass="bg-lime-700 text-lime-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2  gap-6 py-6">
        <div className="grid grid-rows-3 gap-6  rounded-md ">
          <InfoCard
            title={t("consommation_actuelle")}
            value={data?.consommation.actuelle ?? 0}
            n="%"
            icon={Activity}
            className="bg-gradient-to-r from-violet-400 to-violet-600"
            iconClass="bg-violet-700 text-violet-100"
          />

          <InfoCard
            title={t("consommation_objectif")}
            value={0}
            n="%"
            icon={Target}
            className="bg-gradient-to-r from-fuchsia-400 to-fuchsia-600"
            iconClass="bg-fuchsia-700 text-fuchsia-100"
          />
          <InfoCard
            title={t("consommation_objectif_mensuel")}
            value={0}
            n="%"
            icon={CalendarCheck}
            className="bg-gradient-to-r from-rose-400 to-rose-600"
            iconClass="bg-rose-700 text-rose-100"
          />
        </div>
        <div className="h-full p-4 rounded-md shadow border ">
          <h3 className="text-xl font-semibold mb-4">
            {t("consommation_mensuelle")}
          </h3>
          <div className="mx-auto">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={chartsData?.consommation.actuelle}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="consommation"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
