import React, { useState } from 'react'
import CreateEventInfo from '../../../../models/auth/Event/CreateEventInfo'
import { auth } from "../../../../firebase-config"

const CreateEvent = () => {

    //https://dribbble.com/shots/14182509-Create-event
    //https://dribbble.com/shots/18964945-Calendar-create-event
    //https://dribbble.com/shots/3085179-Create-event-flow-Under-construction

    const [userInput, setUserInput] = useState<CreateEventInfo>({
        address: "", creatorId: "abc", dateCreated: "", dateFor: "",
        description: "generic", group: "123", location: "happy", members: ["asd"],
        name: "bday bash", reservation: false, urgent: true
    })

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        // userInput[e.currentTarget.name] = e.currentTarget.value

        // auth.

        // setUserInput({})
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // const newEvent = setDoc

        console.log(userInput)
    }

    return (

        <div className='shadow-xl max-w-xl bg-white h-fit mx-auto p-20'>

            <form onSubmit={handleFormSubmit}>
                <div className='mb-8 '>
                    <h3 className='text-3xl font-semibold mb-4'>Create an event</h3>
                    <span className='text-slate-500'>Create a new event & notify everyone in your group</span>
                </div>

                <div className='flex flex-row justify-between mb-4'>
                    <div className="relative max-w-sm">

                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event date</label>
                        <input onChange={handleUserInput} name='eventDateFor' type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                    block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
                    </div>

                    <div className="relative max-w-sm">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event time</label>
                        <input name="eventDateTime" type="time" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                    block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
                    </div>

                </div>

                <div className='mb-4'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea name="eventDescription" id="first_name" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Give your friends a brief summary of what's going on at the event" />
                </div>

                <div className='mb-6'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                    <input name="eventAddress" id="first_name" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
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

                    <div className='w-4/12'>
                        <button className='bg-red-500 w-full rounded-lg text-white py-3 hover:bg-orange-600'>Cancel</button>
                    </div>
                    <div className='w-4/12'>
                        <button type='submit' className='bg-orange-400 w-full rounded-lg text-white py-3 hover:bg-orange-600'>Create</button>
                    </div>

                </div>

            </form>

        </div>

    )
}

export default CreateEvent