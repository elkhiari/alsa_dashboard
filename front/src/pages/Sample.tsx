import { useGetChartsQuery } from "@/services/report";
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

export default function Sample() {
  const { data, isLoading } = useGetChartsQuery();
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;
  return (
    <>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">
          Flotte Utilisée (Monthly Trend)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.NbrVehculeExp}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="NbrVehculeExp"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart for Gasoil Consumption */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">
          Gasoil Consumption (Monthly Trend)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data.gasoil}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="volumeConsome"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="MntTotalConsome"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart for Kilométrage */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">
          Kilométrage (Monthly Trend)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.kms}>
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

      {/* Chart for NbrVehculeRavitaillement */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">
          Flotte Ravitaillee vs Parc Affecté
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.NbrVehculeRavitaillement}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="parc_affecte" fill="#8884d8" />
            <Bar dataKey="NbrVehculeRavitaillement" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart for Consommation Actuelle */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">
          pourcentage de consommation mensuelle
        </h3>
        <div className=" mx-auto">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data.consommation.actuelle}
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
    </>
  );
}
