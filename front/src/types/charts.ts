interface VehicleExp {
  Month: string;
  NbrVehculeExp: number;
}

interface TotalLivre {
  VolumeLivre: number;
  MntTotalLivre: number;
}

interface Gasoil {
  Month: string;
  volumeConsome: number;
  MntTotalConsome: number;
  prix: number;
}

interface VehicleRavitaillement {
  Month: string;
  parc_affecte: number;
  NbrVehculeRavitaillement: number;
}

interface Stock {
  stock: number;
}

interface Kms {
  Month: string;
  klmCommercial: number;
  KlmLocation: number;
  KlmTotal: number;
}

interface actuelle {
  Month: string;
  Consommation: number;
}

export interface ChartsResponseData {
  NbrVehculeExp: VehicleExp[];
  totalLivre: TotalLivre;
  gasoil: Gasoil[];
  NbrVehculeRavitaillement: VehicleRavitaillement[];
  stock: Stock;
  kms: Kms[];
  consommation: {
    actuelle: actuelle[];
  };
}
