export default interface CreateGroupInfo{

    creatorId: string,
    name: string,
    dateCreated: string,
    description: string,
    password: string,
    members: [string],
}