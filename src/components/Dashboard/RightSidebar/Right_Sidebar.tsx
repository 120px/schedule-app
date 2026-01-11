import { auth } from "../../../../firebase-config"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import CreateEvent from '../Events/CreateEvent'
import MyEvents from "../Events/MyEvents"

const Right_Sidebar = () => {

    const [showCreateEventModal, setShowCreateEventModal] = useState<Boolean>()

    const handleCreateEventClick = () => {
        setShowCreateEventModal((prev) => !prev)

    }

    return (
        <div className="h-full p-6 overflow-y-auto">
            <MyEvents/>
        </div>
    )
}

export default Right_Sidebar