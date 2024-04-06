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
        <div className="basis-1/6 flex flex-col items-center justify-between pt-8">
            <MyEvents/>
        </div>

    )
}

export default Right_Sidebar