export default interface CreateGroupInfo{
    creatorId: string,
    groupName: string,
    dateCreated: string,
    description: string,
    password: string,
    members: [string],
    inviteURL: string
}