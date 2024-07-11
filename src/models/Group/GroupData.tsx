export default interface GroupData{
    groupData: {
        id: string,
        groupName: string,
        description: string,
        members: [string],
        inviteURL : string
    }
}