import sql from "mssql";

const config: sql.config = {
  user: "nabil1",
  password: "nabil2025",
  database: "Gasoil",
  server: "192.168.1.17",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => {
    console.error("Database connection failed", err);
    process.exit(1);
  });
