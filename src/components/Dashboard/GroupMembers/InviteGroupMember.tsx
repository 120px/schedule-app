import { doc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { db } from '../../../firebase-config';
import { useParams } from 'react-router-dom';
import GroupData from '../../../models/Group/GroupData';

interface ModalProps {
    isOpen: boolean;
    // children: React.ReactNode;
    groupInfo: GroupData;
    onClose: () => void;
}

const InviteGroupMember: React.FC<ModalProps> = ({ isOpen, onClose, groupInfo }) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-[480px] bg-white dark:bg-[#1A1A1A] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight tracking-[-0.015em]">Invite Member</h3>
                    <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>

                <div className="p-6 flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-gray-900 dark:text-white">Invite Link</label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        readOnly
                                        className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium truncate"
                                        value={groupInfo.groupData.inviteURL || "https://example.com/invite/..."}
                                    />
                                </div>
                                <button
                                    onClick={() => navigator.clipboard.writeText(groupInfo.groupData.inviteURL || "")}
                                    className="h-12 w-12 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    title="Copy Link"
                                >
                                    <span className="material-symbols-outlined">content_copy</span>
                                </button>
                            </div>
                        </div>

                        {/* Placeholder for Password or other invite info if needed */}
                        {/* 
                         <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-gray-900 dark:text-white">Password</label>
                             <input ... />
                         </div> 
                         */}
                    </div>

                    <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 flex gap-3 text-orange-800 dark:text-orange-200">
                        <span className="material-symbols-outlined text-xl mt-0.5">info</span>
                        <p className="text-sm leading-relaxed">Share this link with people you want to invite to <strong>{groupInfo.groupData.name}</strong>. Anyone with the link can request to join.</p>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button onClick={onClose} className="flex-1 h-12 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-base font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            Cancel
                        </button>
                        <button onClick={onClose} className="flex-1 h-12 flex items-center justify-center rounded-xl bg-[#FF9966] text-white text-base font-bold hover:bg-[#ff8547] transition-all shadow-lg shadow-orange-500/20">
                            Done
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default InviteGroupMember