export default interface EventInfo {
    creatorId: string,
    group: string,
    address: string,
    date_for: {
        nanoseconds: number,
        seconds: number
    },
    time: Date,
    description: string,
    location: string,
    members: [string],
    name: string,
    reservation: boolean,
    urgent: boolean
}