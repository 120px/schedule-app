import { auth, db } from '../../../../firebase-config'
import CreateGroupInfo from '../../../../models/Group/CreateGroupInfo'
import { addDoc, arrayUnion, collection, doc, setDoc, updateDoc } from 'firebase/firestore'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from "uuid"

const CreateGroup = () => {

  const { register, handleSubmit } = useForm<CreateGroupInfo>();
  const onSubmit = (groupData: CreateGroupInfo) => handleFormSubmit(groupData);

  // https://dribbble.com/shots/16525609-Group-Creation-Website

  const handleFormSubmit = async (groupData: CreateGroupInfo) => {

    if (!auth.currentUser!.uid) {
      return
    }

    prepSubmitData(groupData);

    await addDoc(collection(db, "groups"), {
      groupData
    }).then((docRef) => {
      updateDoc(doc(db, "users", auth.currentUser!.uid), {
        groups: arrayUnion( {id: docRef.id, name: groupData.groupName})
      });
    });    

    //Reroute to home of group
  }

  const prepSubmitData = (groupData: CreateGroupInfo) => {
    groupData.creatorId = auth.currentUser!.uid;
    groupData.dateCreated = new Date().toLocaleDateString();
    groupData.members = [`${groupData.creatorId}`];
    groupData.inviteURL = uuidv4();
    groupData.groupName = groupData.groupName

  }

  return (
    <div className='w-1/2 mx-auto'>

      <form onSubmit={handleSubmit(onSubmit)} className='mt-6'>
        <div className='w-1/2'>
          <div className='mb-8 text-center'>
            <h3 className='text-3xl font-semibold mb-4'>Create a Group</h3>
            <span className='text-slate-500'>Invite your friends, create events</span>
          </div>

          <div className='mb-4'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group name</label>
            <input {...register("groupName")} name="groupName" id="groupName" className="h-10 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Something interesting" />
          </div>

          <div className='mb-4'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <input {...register("description")} name="description" id="description" className="h-20 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
          </div>

          <div className='mb-4'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input {...register("password")} type='password' name="password" id="password" className="h-10 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="The secret code needed to join this group!" />
          </div>

          <div className='flex justify-between mt-10'>

            <div className='w-4/12 mx-auto'>
              <a className='bg-white-full rounded-md text-gray-500 py-3 hover:cursor-pointer'>Cancel</a>
            </div>
            <div className='w-4/12'>
              <button type='submit' className='bg-orange-400 w-full rounded-lg text-white py-3 hover:bg-orange-600'>Create</button>
            </div>
          </div>
        </div>
      </form>

    </div>

  )
}

export default CreateGroup