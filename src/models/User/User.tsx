export interface User {
    data:{
        username: string
    }, 
    groups: [{
        id: string,
        name: string
    }]
}