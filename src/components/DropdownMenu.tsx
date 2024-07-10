import React, { useState } from "react"

interface DropdownMenuProps {
    currentUsersGroups: string[];
}

interface DropdownOptionsProps {
    currentUsersGroups: string[];
    handleGroupSelect: (group: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ currentUsersGroups }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState<null | string>(null)

    const handleDropdownToggle = () => {
        console.log("CLICK")
        // Toggle the entries visibility
        setIsDropdownOpen(!isDropdownOpen);
    }

    const handleGroupSelect = (group: string) =>{
        setSelectedGroup(group)
    }

    return (
        <div>

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group</label>
            <div onClick={() => handleDropdownToggle()} className='mx-auto rounded-sm mb-2'>
                <span>{selectedGroup != null ? selectedGroup : "Select a group"}</span>
            </div>

            {isDropdownOpen && <DropdownOptions currentUsersGroups={currentUsersGroups} handleGroupSelect={handleGroupSelect}/>}
        </div>
    )

}

const DropdownOptions: React.FC<DropdownOptionsProps> = ({currentUsersGroups, handleGroupSelect}) => {

    return (
        currentUsersGroups.length > 0 ?
            <div className="bg-white rounded-md shadow-lg absolute z-10 left-44 mt-2 max-h-28 overflow-hidden overflow-y-auto">
                {currentUsersGroups.map((groupId, index) => (
                    <li onClick={(e) => handleGroupSelect(e.currentTarget.innerHTML)} className="pl-6 list-none hover:bg-gray-200" key={index}>{groupId}</li>
                ))}
            </div> : null
    )

}

export default DropdownMenu