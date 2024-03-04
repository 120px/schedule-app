import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const Sidebar_Profile = () => {
    return (
        <Link to={'/myprofile'}>
            <div className='flex flex-row hover:bg-orange-300 rounded-md px-1 py-1 hover:drop-shadow-md'>
                <div className=''>
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div className='pl-1'>Profile</div>
            </div>
        </Link>
    )
}

export default Sidebar_Profile