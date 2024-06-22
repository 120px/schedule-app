import CreateEventInfo from '../../../../models/Event/CreateEventInfo'
import { addDoc, arrayUnion, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../../../../firebase-config';
import { auth } from "../../../../firebase-config"
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { useCurrentGroup } from '../../../../provider/CurrentGroupProvider';


interface Props {

}

const CreateEvent = () => {

    const { groupId } = useParams()
    const { currentGroup } = useCurrentGroup();

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
        if (auth !== null || auth !== undefined)
            data.creatorId = auth.currentUser!.uid
        else
            //  TODO: handle this
            console.log("throw error here")

        prepSubmitData(data)

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

    const prepSubmitData = (data: CreateEventInfo) => {
        data.creatorId = auth.currentUser!.uid;
        data.created_at = new Date();
        data.members = [`${data.creatorId}`];
        data.date_for = new Date(data.date_for);

        if (groupId !== undefined)
            data.group = groupId;
        else
            return

    }

    const toggleModal = () => {

    }

    return (
        <div className=''>
            <div className='absolute top-0 right-0 bottom-0 left-0 m-auto shadow-xl max-w-xl bg-white h-fit mx-auto p-20 '>

                <form onSubmit={handleSubmit((data) => {

                    handleFormSubmit(data)
                })}>
                    <div className='mb-8 '>
                        <h3 className='text-3xl font-semibold mb-4'>Create an event</h3>
                        <span className='text-slate-500'>Create a new event & notify everyone in your group</span>
                    </div>

                    <div>
                        <div className="relative max-w-sm">

                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group</label>
                            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                            focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                            dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {currentGroup != null ? <option selected>{currentGroup.name}</option> :
                                    <>
                                        <option value="US">United States</option>
                                        <option value="CA">Canada</option>
                                        <option value="FR">France</option>
                                        <option value="DE">Germany</option>
                                    </>
                                }

                            </select>
                        </div>
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
                            <input type="checkbox"></input>
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
                        <Link type='submit' to={currentGroup != null && currentGroup.id ? `/group/${currentGroup!.id}/dashboard` : "/"} className='w-1/4 py-2 text-center bg-createButton rounded-lg text-white '>Create</Link>

                    </div>
                </form>
            </div>
        </div>

    )
}

export default CreateEvent