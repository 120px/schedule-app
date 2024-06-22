export default interface EventInfo {
    // group: string,
    creatorName: string,
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
    // urgent: boolean
}