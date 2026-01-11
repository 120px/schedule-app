import CreateEventInfo from '../../../../models/Event/CreateEventInfo'
import { addDoc, arrayUnion, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../../../../firebase-config';
import { auth } from "../../../../firebase-config"
import { useForm } from 'react-hook-form';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useCurrentGroup } from '../../../../provider/CurrentGroupProvider';
import DropdownMenu from './DropdownMenu';
import { useState } from 'react';

interface Groups {
    id: string,
    name: string
}

const CreateEvent = () => {

    const { groupId } = useParams()
    const { currentGroup } = useCurrentGroup();
    const location = useLocation()
    // const currentUsersGroups = location.state.groups as Groups[]
    const [selectedGroup, setSelectedGroup] = useState<null | string>(null)

    const { register, handleSubmit, formState: { errors } } = useForm<CreateEventInfo>({
        defaultValues: {
            address: "", creatorId: auth.currentUser!.uid, created_at: new Date(), date_for: new Date(),
            description: "", group: "", location: "", members: [""],
            name: "", reservation: false, urgent: false
        }
    });

    const handleFormSubmit = async (data: CreateEventInfo) => {
        if (currentGroup?.id == null)
            // We are not visiting a group
            data.group = selectedGroup!
        if (auth !== null || auth !== undefined)
            data.creatorId = auth.currentUser!.uid
        else
            //  TODO: handle this
            console.log("throw error here")

        try {
            await addDoc(collection(db, "events"), {
                ...data
            }).then((docRef) => {
                updateDoc(doc(db, "groups", groupId!), {
                    events: arrayUnion(docRef.id)
                })
            })

        } catch (error) {
            console.log("There was an error in CreateEvent: " + error)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1f1612] w-full max-w-[640px] rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[90vh]">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#f5f1f0] dark:border-white/10">
                    <h2 className="text-[#181310] dark:text-white tracking-tight text-[24px] font-bold leading-tight">Create New Event</h2>
                    <Link to={currentGroup != null && currentGroup.id ? `/group/${currentGroup!.id}/dashboard` : "/"} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </Link>
                </div>

                {/* Modal Body (Scrollable) */}
                <form onSubmit={handleSubmit((data) => { handleFormSubmit(data) })} className="overflow-y-auto p-6 space-y-6">

                    {/* Group Selection */}
                    {/* {(!currentGroup?.id) && (
                         <DropdownMenu
                            setSelectedGroup={setSelectedGroup}
                            selectedGroup={selectedGroup}
                            currentUsersGroups={currentUsersGroups} 
                            />
                    )} */}

                    {/* Event Title Input */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[#181310] dark:text-white text-base font-medium leading-normal">Event Title</label>
                        <input {...register("name")} className="form-input flex w-full rounded-lg text-[#181310] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-[#e7deda] dark:border-white/10 bg-white dark:bg-white/5 h-14 placeholder:text-[#8d6d5e] p-[15px] text-base font-normal leading-normal" placeholder="e.g. Board Game Night" type="text" />
                    </div>

                    {/* Date & Time Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-[#181310] dark:text-white text-base font-medium leading-normal">Date</label>
                            <div className="relative">
                                <input {...register("date_for")} className="form-input flex w-full rounded-lg text-[#181310] dark:text-white border border-[#e7deda] dark:border-white/10 bg-white dark:bg-white/5 h-14 p-[15px] pr-10" type="date" />
                                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#8d6d5e]">calendar_today</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[#181310] dark:text-white text-base font-medium leading-normal">Time</label>
                            <div className="relative">
                                <input {...register("time")} className="form-input flex w-full rounded-lg text-[#181310] dark:text-white border border-[#e7deda] dark:border-white/10 bg-white dark:bg-white/5 h-14 p-[15px] pr-10" type="time" />
                                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#8d6d5e]">schedule</span>
                            </div>
                        </div>
                    </div>

                    {/* Location Input */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[#181310] dark:text-white text-base font-medium leading-normal">Location</label>
                        <div className="flex w-full items-stretch rounded-lg group">
                            <input {...register("address")} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg rounded-r-none border-r-0 text-[#181310] dark:text-white focus:outline-0 focus:ring-0 border border-[#e7deda] dark:border-white/10 bg-white dark:bg-white/5 h-14 placeholder:text-[#8d6d5e] p-[15px] text-base font-normal" placeholder="Add a place or virtual link" />
                            <div className="text-[#8d6d5e] flex border border-[#e7deda] dark:border-white/10 bg-white dark:bg-white/5 items-center justify-center pr-[15px] rounded-r-lg">
                                <span className="material-symbols-outlined">map</span>
                            </div>
                        </div>
                    </div>

                    {/* Description Textarea */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[#181310] dark:text-white text-base font-medium leading-normal">Description</label>
                        <textarea {...register("description")} className="form-textarea w-full rounded-lg text-[#181310] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-[#e7deda] dark:border-white/10 bg-white dark:bg-white/5 min-h-[100px] placeholder:text-[#8d6d5e] p-[15px] text-base font-normal leading-normal" placeholder="Add details for your friends..."></textarea>
                    </div>

                    {/* Extra Options */}
                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                            <input {...register("urgent")} type="checkbox" className="w-5 h-5 rounded text-primary focus:ring-primary border-gray-300" />
                            <span className="text-[#181310] dark:text-white font-medium">Urgent</span>
                        </div>
                    </div>
                </form>

                {/* Modal Footer Actions */}
                <div className="p-6 border-t border-[#f5f1f0] dark:border-white/10 flex items-center justify-end gap-3 bg-[#fdfdfd] dark:bg-white/[0.02]">
                    <Link to={currentGroup != null && currentGroup.id ? `/group/${currentGroup!.id}/dashboard` : "/"} className="px-6 h-12 flex items-center justify-center rounded-lg text-sm font-bold text-[#181310] dark:text-white bg-[#f5f1f0] dark:bg-white/10 hover:bg-[#ebe5e3] dark:hover:bg-white/20 transition-colors">
                        Cancel
                    </Link>
                    <button onClick={handleSubmit((data) => { handleFormSubmit(data) })} className="px-8 h-12 rounded-lg text-sm font-bold text-white bg-primary hover:brightness-110 shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">event_available</span>
                        Create Event
                    </button>
                </div>
            </div>
        </div>

    )
}

export default CreateEvent