export class Session {
    id?: number;
    tourId: number;
    touristId: number;
    locationId: number;
    sessionStatus: number;
    transportation: number;
    distanceCrossedPercent?: number;
    lastActivity: Date;
    completedKeyPoints: CompletedKeyPointDto[];
  }
  
  export class PositionSimulator {
    id?: number;
    latitude: number;
    longitude: number;
    touristId: number;
  }

  export class CompletedKeyPointDto{
    keyPointId: number;
    completionTime: Date;
  }