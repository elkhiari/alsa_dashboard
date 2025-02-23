import { Request, Response } from "express";
import { poolPromise } from "../config/db";

const convertDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export const getReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const { startDate = "2025-01-01", endDate = "2025-01-31" } = req.query;

    const start = convertDate(new Date(startDate as string));
    const end = convertDate(new Date(endDate as string));

    const pool = await poolPromise;
    const request = pool.request();

    const [
      NbrVehculeExp,
      totalLivre,
      gasoil,
      NbrVehculeRavitaillement,
      stock,
      kms,
    ] = await Promise.all([
      request.query(`
        SELECT COUNT(DISTINCT e_vehicule) AS NbrVehculeExp 
        FROM MyMarts.dbo.billetique_bords_mart 
        WHERE CONVERT(DATE, e_date, 103) BETWEEN '${start}' AND '${end}'
        AND e_ligne IN ('L005','L007','L019','L050','L051','L084','L300','L301','L306','L307','L309','L310')
      `),
      request.query(`
SELECT 
    SUM(CONVERT(float, ["delivered_volume"])) AS VolumeLivre, 
    SUM(CONVERT(float, ["delivered_volume"])) * 8.9113 AS MntTotalLivre 
FROM Livraison 
WHERE TRY_CONVERT(date, ["delivery_start_date"]) >=  '${start}' 
  AND TRY_CONVERT(date, ["delivery_start_date"]) <= '${end}';


`),
      request.query(`
        SELECT 
          SUM(e_volume) AS volumeConsome,
          SUM(e_volume) * 8.9113 AS MntTotalConsome,
          8.9113 AS prix
        FROM MyMarts.dbo.pump_transaction_mart
        WHERE e_bu = 'MAARIF'
        AND CONVERT(DATE, e_consumption_date, 103) BETWEEN  '${start}' AND '${end}'
      `),
      request.query(`
        SELECT 
          200 AS parc_affecte, 
          COUNT(DISTINCT e_vehicule) AS NbrVehculeRavitaillement
        FROM MyMarts.dbo.pump_transaction_mart
        WHERE e_bu = 'MAARIF'
        AND CONVERT(DATE, e_consumption_date, 103) BETWEEN  '${start}' AND '${end}'
        AND e_vehicule BETWEEN 32000 AND 33999
      `),
      request.query(`SELECT 75091 AS stock`),
      request.query(`
        SELECT 
          SUM(e_mtrg / 100000) AS klmCommercial, 
          0 AS KlmLocation, 
          SUM(e_mtrg / 100000) + 0 AS KlmTotal
        FROM MyMarts.dbo.trip_mart
        WHERE CONVERT(DATE, e_date_travail, 103) BETWEEN  '${start}' AND '${end}'
        AND e_ligne IN ('5', '7', '19', '50', '51', '84', '300', '301', '306', '307', '309', '310')
      `),
    ]);

    res.json({
      NbrVehculeExp: NbrVehculeExp.recordset[0]?.NbrVehculeExp || 0,
      totalLivre: totalLivre.recordset[0] || {},
      gasoil: gasoil.recordset[0] || {},
      NbrVehculeRavitaillement: NbrVehculeRavitaillement.recordset[0] || {},
      stock: stock.recordset[0]?.stock || 0,
      kms: kms.recordset[0] || {},
      consommation: {
        actuelle:
          ((gasoil.recordset[0]?.volumeConsome ?? 0) /
            kms.recordset[0].klmCommercial) *
          100,
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
