export interface Request {
    id?: number,
    clubId: number,
    userId: number,
    requestStatus: string,
    requestDirection: boolean
}