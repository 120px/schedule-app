export default interface CreateEventInfo{

    creatorId: string,
    group: string,
    address: string,
    dateCreated: string,
    dateFor: string,
    description: string,
    location: string,
    members: [string],
    name: string,
    reservation: boolean,
    urgent: boolean
}