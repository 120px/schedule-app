import { auth } from "../../../../firebase-config"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import CreateEvent from '../Events/CreateEvent.1'

const Right_Sidebar = () => {

    const [showCreateEventModal, setShowCreateEventModal] = useState<Boolean>()

    const handleCreateEventClick = () => {
        setShowCreateEventModal((prev) => !prev)

    }

    return (
        <div className="basis-1/6 flex flex-col items-center justify-between">

            {showCreateEventModal ? <CreateEvent onClick={handleCreateEventClick}></CreateEvent> : null}

            <div className="flex flex-col items-center">
                {auth.currentUser?.photoURL ? auth.currentUser?.photoURL :
                    <div className="w-12 h-12 bg-red-400 rounded-full"></div>}
                {auth.currentUser ? <h1>{auth.currentUser?.displayName}</h1> : <span>USERNAME HERE</span>}
            </div>

            <div className="flex flex-col items-center">
                { }
            </div>

            <div className="flex flex-col items-center">
                <FontAwesomeIcon onClick={handleCreateEventClick} icon={faPlusCircle} fill="black" color="black"></FontAwesomeIcon>
            </div>
        </div>

    )
}

export default Right_Sidebar