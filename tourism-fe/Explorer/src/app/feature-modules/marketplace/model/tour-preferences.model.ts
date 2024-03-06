export interface TourPreferences{
    id?: number,
    userId?: number,
    difficultyLevel: number,
    walkingRate: number,
    bicycleRate: number,
    carRate: number,
    boatRate: number,
    tags: Array<string>
}