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
    const currentUsersGroups = location.state.groups as Groups[]
    console.log(currentUsersGroups)
    const [selectedGroup, setSelectedGroup] = useState<null | string>(null)

    //https://dribbble.com/shots/14182509-Create-event
    //https://dribbble.com/shots/18964945-Calendar-create-event
    //https://dribbble.com/shots/3085179-Create-event-flow-Under-construction

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

    const toggleDropdownMenu = () => {

    }

    return (
        <div className='mx-auto mt-10'>

            <form onSubmit={handleSubmit((data) => {

                handleFormSubmit(data)
            })}>
                <div className='mb-8 '>
                    <h3 className='text-3xl font-semibold mb-4'>Create an event</h3>
                    <span className='text-slate-500'>Create a new event & notify everyone in your group</span>
                </div>

                {currentGroup?.id !== null ? null : <DropdownMenu
                    setSelectedGroup={setSelectedGroup}
                    selectedGroup={selectedGroup}
                    currentUsersGroups={currentUsersGroups} />
                }

                <div className='mb-4'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Name</label>
                    <input {...register("name")} name="name" id="name" className=" bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                </div>

                <div className='flex flex-row justify-between mb-4'>
                    <div className="relative max-w-sm">

                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                        <input {...register("date_for")} type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                    block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
                    </div>

                    <div className="relative max-w-sm">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
                        <input {...register("time")} type="time" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                    block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
                    </div>

                </div>

                <div className='mb-4'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <input {...register("description")} name="description" id="description" className="h-20 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Give your friends a brief summary of what's going on at the event" />
                </div>

                <div className='mb-6'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                    <input {...register("address")} name="address" id="address" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123 Parc Street" />

                </div>

                <div className='mb-2'>
                    <div>
                        <input {...register("urgent")} name="urgent" id="urgent" type="checkbox"></input>
                        <label className='pl-2 font-normal'>Urgent</label>
                    </div>
                </div>

                <div className='mb-2'>
                    <div>
                        <input type="checkbox"></input>
                        <label className='pl-2 font-normal'>Reservations</label>
                    </div>
                </div>

                <div className='flex justify-between mt-10'>

                    <Link to={currentGroup != null && currentGroup.id ? `/group/${currentGroup!.id}/dashboard` : "/"} className='w-1/4 py-2 text-center bg-red-400 rounded-lg text-white'>Cancel</Link>
                    <button type='submit' className='w-1/4 py-2 text-center bg-createButton rounded-lg text-white '>Create</button>

                </div>
            </form>
        </div>

    )
}

export default CreateEvent