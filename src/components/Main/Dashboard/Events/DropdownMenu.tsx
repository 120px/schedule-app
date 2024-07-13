import React, { useState } from "react"

interface Groups {
    id: string,
    name: string
}

interface CreateEventProps {
    selectedGroup: string | null
    setSelectedGroup: React.Dispatch<string | null>
    currentUsersGroups: Groups[]

}

interface DropdownOptionsProps {
    currentUsersGroups: Groups[]
    handleGroupSelect: (group: string) => void;
}


const DropdownMenu: React.FC<CreateEventProps> = ({ setSelectedGroup, selectedGroup, currentUsersGroups }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const handleGroupSelect = (group: string) => {
        setSelectedGroup(group);
        setIsDropdownOpen(!isDropdownOpen);
    }

    return (
        <div>

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group</label>
            <div onClick={() => handleDropdownToggle()} className='w-2/3 flex justify-between text-center mx-auto rounded-md mb-2 border-2 border-gray-200 pl-4 pr-4 pt-2 pb-2'>
                <span className="">{selectedGroup != null ? selectedGroup : "Select a group"}</span>

                <svg className="ml-2 h-4 w-4 self-center" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>


            {isDropdownOpen && <DropdownOptions currentUsersGroups={currentUsersGroups} handleGroupSelect={handleGroupSelect} />}
        </div>
    )

}

const DropdownOptions: React.FC<DropdownOptionsProps> = ({ currentUsersGroups, handleGroupSelect }) => {
    return (
        currentUsersGroups.length > 0 ?
            <div className="relative w-60">
                <div className="bg-white rounded-md shadow-lg left-16 top-0 w-full absolute mt-1 max-h-28 overflow-hidden overflow-y-auto p-3">
                    {currentUsersGroups.map((group, index) => (
                        <li onClick={() => handleGroupSelect(group.id)} className="w-full pl-4 py-1 list-none hover:bg-green-100" key={index}>{group.name}</li>
                    ))}
                </div>
            </div> : null
    )

}

export default DropdownMenu