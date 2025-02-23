import { convertDate } from "@/lib/utils";
import { apiSlice } from "./api";
import { ChartsResponseData } from "@/types/charts";

interface FuelReport {
  NbrVehculeExp: number;
  gasoil: {
    volumeConsome: number;
    MntTotalConsome: number;
    prix: number;
  };
  totalLivre: {
    VolumeLivre: number;
    MntTotalLivre: number;
  };
  NbrVehculeRavitaillement: {
    parc_affecte: number;
    NbrVehculeRavitaillement: number;
  };
  stock: number;
  kms: {
    klmCommercial: number;
    KlmLocation: number;
    KlmTotal: number;
  };
  consommation: {
    actuelle: number;
  };
}

export const statsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query<
      FuelReport,
      { startDate?: Date; endDate?: Date; userId?: string }
    >({
      query: ({
        startDate = "2024-01-01",
        endDate = "2024-01-31",
        userId = "1",
      }) => ({
        url: "report",
        params: {
          startDate: convertDate(new Date(startDate as Date)),
          endDate: convertDate(new Date(endDate as Date)),
          userId,
        },
      }),
    }),
    getCharts: builder.query<ChartsResponseData, void>({
      query: () => "charts",
    }),
  }),
});

export const { useGetStatsQuery, useGetChartsQuery } = statsApi;
