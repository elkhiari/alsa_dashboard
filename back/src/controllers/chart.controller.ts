import { Request, Response } from "express";
import { poolPromise } from "../config/db";

export const getCharts = async (req: Request, res: Response): Promise<void> => {
  try {
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
      SELECT 
    FORMAT(e_date, 'yyyy-MM') AS Month,
    COUNT(DISTINCT e_vehicule) AS NbrVehculeExp
FROM MyMarts.dbo.billetique_bords_mart
WHERE e_date >= DATEADD(MONTH, -6, GETDATE()) 
AND e_ligne IN ('L005','L007','L019','L050','L051','L084','L300','L301','L306','L307','L309','L310')
GROUP BY FORMAT(e_date, 'yyyy-MM')
ORDER BY Month;
      `),
      request.query(`
SELECT 
    SUM(CONVERT(float, ["delivered_volume"])) AS VolumeLivre, 
    SUM(CONVERT(float, ["delivered_volume"])) * 8.9113 AS MntTotalLivre 
FROM Livraison 
WHERE TRY_CONVERT(date, ["delivery_start_date"]) >= DATEADD(MONTH, -6, GETDATE()) 
  AND TRY_CONVERT(date, ["delivery_start_date"]) <= GETDATE();




`),
      request.query(`
       SELECT 
    FORMAT(CONVERT(DATE, e_consumption_date, 103), 'yyyy-MM') AS Month,
    SUM(e_volume) AS volumeConsome,
    SUM(e_volume) * 8.9113 AS MntTotalConsome,
    8.9113 AS prix
FROM MyMarts.dbo.pump_transaction_mart
WHERE e_bu = 'MAARIF'
AND CONVERT(DATE, e_consumption_date, 103) >= DATEADD(MONTH, -6, GETDATE())
GROUP BY FORMAT(CONVERT(DATE, e_consumption_date, 103), 'yyyy-MM')
ORDER BY Month;

      `),
      request.query(`
       SELECT 
    FORMAT(CONVERT(DATE, e_consumption_date, 103), 'yyyy-MM') AS Month,
    200 AS parc_affecte, 
    COUNT(DISTINCT e_vehicule) AS NbrVehculeRavitaillement
FROM MyMarts.dbo.pump_transaction_mart
WHERE e_bu = 'MAARIF'
AND CONVERT(DATE, e_consumption_date, 103) >= DATEADD(MONTH, -6, GETDATE())
AND e_vehicule BETWEEN 32000 AND 33999
GROUP BY FORMAT(CONVERT(DATE, e_consumption_date, 103), 'yyyy-MM')
ORDER BY Month;

      `),
      request.query(`SELECT 75091 AS stock`),
      request.query(`
      SELECT 
    FORMAT(CONVERT(DATE, e_date_travail, 103), 'yyyy-MM') AS Month,
    SUM(e_mtrg / 100000) AS klmCommercial, 
    0 AS KlmLocation, 
    SUM(e_mtrg / 100000) AS KlmTotal
FROM MyMarts.dbo.trip_mart
WHERE CONVERT(DATE, e_date_travail, 103) >= DATEADD(MONTH, -6, GETDATE())
AND e_ligne IN ('5', '7', '19', '50', '51', '84', '300', '301', '306', '307', '309', '310')
GROUP BY FORMAT(CONVERT(DATE, e_date_travail, 103), 'yyyy-MM')
ORDER BY Month;

      `),
    ]);
    res.json({
      NbrVehculeExp: NbrVehculeExp.recordset,
      totalLivre: totalLivre.recordset[0],
      gasoil: gasoil.recordset,
      NbrVehculeRavitaillement: NbrVehculeRavitaillement.recordset,
      stock: stock.recordset[0],
      kms: kms.recordset,
      consommation: {
        actuelle: gasoil.recordset.map((gasoil: any, index: number) => ({
          month: gasoil.Month,
          consommation:
            ((gasoil.volumeConsome ?? 0) / kms.recordset[index].klmCommercial) *
            100,
        })),
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
