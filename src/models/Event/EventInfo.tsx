export default interface EventInfo {
    creatorId: string,
    group: string,
    address: string,
    dateCreated: string,
    dateFor: string,
    time: Date,
    description: string,
    location: string,
    members: [string],
    name: string,
    reservation: boolean,
    urgent: boolean
}