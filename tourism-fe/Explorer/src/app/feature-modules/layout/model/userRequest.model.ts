export interface UserRequest {
    id?: number,
    username: string,
    clubId: number,
    userId: number,
    requestStatus: string,
    requestDirection: boolean
}