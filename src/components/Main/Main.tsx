import Sidebar from '../Sidebar/Sidebar'
import { User } from 'firebase/auth'
import { Outlet } from 'react-router-dom'
import Right_Sidebar from '../Dashboard/RightSidebar/Right_Sidebar'

interface MainProps {
    user: User
}

const Main = (props: MainProps) => {

    return (
        <div className='flex min-h-screen bg-background-light dark:bg-background-dark font-display text-[#181310] dark:text-white'>
            {/* Fixed Sidebar Width 64 (16rem/256px) */}
            <div className='w-64 shrink-0'>
                <Sidebar></Sidebar>
            </div>
            
            {/* Main Content - Takes remaining space, but leaves room for right sidebar if present */}
            {/* We will let Outlet handle the margins or internal layout if needed, 
                but for Dashboard specifically it needs the right margin. 
                However, other pages might not have the right sidebar. 
                The current architecture puts Right_Sidebar in Main.tsx always.
            */}
            
            <div className='flex-1 flex flex-col'> 
               <Outlet></Outlet>
            </div>

            {/* Fixed Right Sidebar Width 80 (20rem/320px) */}
            <div className='w-80 shrink-0 border-l border-gray-200 dark:border-white/10 bg-white dark:bg-background-dark'>
                <Right_Sidebar></Right_Sidebar>
            </div>
        </div>

    )
}

export default Main