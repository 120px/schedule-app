import { auth } from "../../../../firebase-config"

const Portfolio = () =>{
    return(
        <div className="basis-3/4">
            <span>Welcome, </span>
            {auth.currentUser ? <h1>{auth.currentUser?.displayName}</h1> : null}
        </div>
    )
}

export default Portfolio