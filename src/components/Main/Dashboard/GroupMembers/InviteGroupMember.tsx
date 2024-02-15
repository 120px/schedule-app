import { doc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { db } from '../../../../firebase-config';
import { useParams } from 'react-router-dom';
import GroupData from '../../../../models/Group/GroupData';

interface ModalProps {
    isOpen: boolean;
    // children: React.ReactNode;
    groupInfo: GroupData;
    onClose: () => void;
}

const InviteGroupMember: React.FC<ModalProps> = ({ isOpen, onClose, groupInfo }) => {

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
            <div className='rounded-lg bg-white mx-auto z-50 max-w-xl h-fit px-12 py-6 dark:bg-gray-700'>

                <div className='mb-8 '>
                    <h3 className='text-3xl font-semibold mb-4'>Invite a member</h3>
                </div>

                <div>
                    <h1>Invite link</h1>
                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    value={groupInfo.groupData.inviteURL} />

                    <h1>Password</h1>
                </div>

                <div className='flex justify-between mt-10'>

                    <div className='w-4/12 mx-auto'>
                        <button onClick={onClose} className='bg-white-full rounded-md text-gray-500 py-3'>Cancel</button>
                    </div>
                    <div className='w-4/12'>
                        <button type='submit' className='bg-orange-400 w-full rounded-lg text-white py-3 hover:bg-orange-600'>Send</button>
                    </div>

                </div>

            </div>
        </div>

    )
}

export default InviteGroupMember