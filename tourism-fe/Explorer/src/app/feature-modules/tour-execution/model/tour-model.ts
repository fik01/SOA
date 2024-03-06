export interface Tour {
    id: number;
    name: string;
    description: string;
    difficulty: number;
    tags: string[];
    status: number;
    price: number;
    authorId: number;
    equipment: number[];
    distanceInKm: number;
    archivedDate: Date | null;
    bundleId?: number;
    firstInBundle?: boolean;
    image?: string; 
  }