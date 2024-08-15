import { auth, db } from '../../../../firebase-config'
import CreateGroupInfo from '../../../../models/Group/CreateGroupInfo'
import { addDoc, arrayUnion, collection, doc, setDoc, updateDoc } from 'firebase/firestore'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from "uuid"
import { useCurrentGroup } from '../../../../provider/CurrentGroupProvider'
import { Link } from 'react-router-dom'

const CreateGroup = () => {

  const { register, handleSubmit } = useForm<CreateGroupInfo>();
  const onSubmit = (groupData: CreateGroupInfo) => handleFormSubmit(groupData);

  const { currentGroup } = useCurrentGroup();

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
        groups: arrayUnion({ id: docRef.id, name: groupData.groupName })
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
    <div className='w-1/2 mx-auto h-max mt-10'>
      <div className=' m-auto shadow-xl max-w-xl bg-white mx-auto pl-20 pr-20 pt-10 pb-10'>

        <form onSubmit={handleSubmit(onSubmit)} className='mt-6'>
            <div className='mb-8'>
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

            <Link to={currentGroup != null && currentGroup.id ? `/group/${currentGroup!.id}/dashboard` : "/"} className='w-1/4 py-2 text-center bg-red-400 rounded-lg text-white'>Cancel</Link>
              <button type='submit' className='bg-createButton rounded-lg text-white py-2 px-4 '>Create Group</button>

            </div>

        </form>

      </div>
    </div>

  )
}

export default CreateGroup