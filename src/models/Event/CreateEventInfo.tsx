export default interface CreateEventInfo{

    creatorId: string,
    group: string,
    address: string,
    created_at: Date,
    date_for: Date,
    time: Date,
    description: string,
    location: string,
    members: [string],
    name: string,
    reservation: boolean,
    urgent: boolean
}