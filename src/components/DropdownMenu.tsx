import React, { useState } from "react"

interface DropdownMenuProps {
    currentUsersGroups: [{
        id: string,
        name: string
    }];
}

interface DropdownOptionsProps {
    currentUsersGroups: [{
        id: string,
        name: string
    }];
    handleGroupSelect: (group: string) => void;
}


const DropdownMenu: React.FC<DropdownMenuProps> = ({ currentUsersGroups }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState<null | string>(null)

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const handleGroupSelect = (group: string) =>{
        setSelectedGroup(group);
        setIsDropdownOpen(!isDropdownOpen);
    }

    return (
        <div>

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group</label>
            <div onClick={() => handleDropdownToggle()} className='text-center mx-auto rounded-md mb-2 border-2 border-gray-200 '>
                <span>{selectedGroup != null ? selectedGroup : "Select a group"}</span>
            </div>

            {isDropdownOpen && <DropdownOptions currentUsersGroups={currentUsersGroups} handleGroupSelect={handleGroupSelect}/>}
        </div>
    )

}

const DropdownOptions: React.FC<DropdownOptionsProps> = ({currentUsersGroups, handleGroupSelect}) => {

    return (
        currentUsersGroups.length > 0 ?
            <div className="bg-white rounded-md shadow-lg absolute z-10 left-44 mt-2 max-h-28 overflow-hidden overflow-y-auto p-3">
                {currentUsersGroups.map((group, index) => (
                    <li onClick={() => handleGroupSelect(group.name)} className="w-full pl-4 list-none hover:bg-gray-200" key={index}>{group.name}</li>
                ))}
            </div> : null
    )

}

export default DropdownMenu