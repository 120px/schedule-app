import { auth, db } from '../../../firebase-config';
import CreateGroupInfo from '../../../models/Group/CreateGroupInfo';
import { addDoc, arrayUnion, collection, doc, setDoc, updateDoc } from 'firebase/firestore'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from "uuid"
import { Link, useNavigate } from 'react-router-dom'

interface CreateGroupForm extends CreateGroupInfo {
  privacy: string;
}

const CreateGroup = () => {

  const { register, handleSubmit, watch, setValue } = useForm<CreateGroupForm>({
    defaultValues: {
      privacy: 'private'
    }
  });

  const navigate = useNavigate();
  const privacy = watch("privacy");

  const onSubmit = (groupData: CreateGroupForm) => handleFormSubmit(groupData);

  const prepSubmitData = (groupData: CreateGroupForm) => {
    return {
      ...groupData,
      creatorId: auth.currentUser!.uid,
      dateCreated: new Date().toLocaleDateString(),
      members: [auth.currentUser!.uid],
      inviteURL: uuidv4(),
      password: groupData.password || "",
    };
  };

  const handleFormSubmit = async (groupData: CreateGroupForm) => {
    if (!auth.currentUser?.uid) return;
    const preparedData = prepSubmitData(groupData);

    await addDoc(collection(db, "groups"), preparedData)
      .then((docRef) => {
        updateDoc(doc(db, "users", auth.currentUser!.uid), {
          groups: arrayUnion({ id: docRef.id, name: preparedData.groupName }),
        });
        navigate('/mygroups');
      });
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-8">
      <header className="mb-10">
        <h2 className="text-[#1d120c] dark:text-[#f8f6f5] text-4xl font-black leading-tight tracking-tight">Create a New Group</h2>
        <p className="text-[#a16345] text-lg mt-2">Set the stage for your next gathering with friends.</p>
      </header>

      <section className="bg-white dark:bg-[#1a100a] rounded-xl shadow-sm border border-[#ead7cd] dark:border-[#3d291d] overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">

          <div className="space-y-6">
            <h3 className="text-[#1d120c] dark:text-[#f8f6f5] text-xl font-bold border-b border-[#f4ebe6] dark:border-[#2d1b12] pb-4">Group Identity</h3>
            <div className="flex flex-col md:flex-row gap-8 items-start">

              <div className="flex flex-col items-center gap-4 min-w-[160px]">
                <div className="relative group">
                  <div className="size-32 bg-[#fcf9f8] dark:bg-[#2d1b12] border-2 border-dashed border-[#ead7cd] dark:border-[#3d291d] rounded-full flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-primary">
                    <span className="material-symbols-outlined text-4xl text-[#a16345] group-hover:text-primary transition-colors">add_a_photo</span>
                  </div>
                  <button type="button" className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md hover:bg-primary/90 transition-transform hover:scale-110">
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-[#1d120c] dark:text-[#f8f6f5] text-sm font-semibold leading-normal">Group Avatar</p>
                  <p className="text-[#a16345] text-xs font-normal">Min 500x500px</p>
                </div>
              </div>

              <div className="flex-1 w-full space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[#1d120c] dark:text-[#f8f6f5] text-sm font-semibold" htmlFor="groupName">Group Name
                    <input
                      {...register("groupName", { required: true })}
                      className="w-full rounded-lg border-[#ead7cd] dark:border-[#3d291d] bg-[#fcf9f8] dark:bg-[#1a100a] text-[#1d120c] dark:text-white h-14 px-4 focus:ring-primary focus:border-primary placeholder:text-[#a16345]/50 mt-2"
                      id="groupName"
                      placeholder="e.g. Weekend Warriors, Coffee Club"
                      type="text"
                    />
                  </label>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#1d120c] dark:text-[#f8f6f5] text-sm font-semibold" htmlFor="description">Description
                    <textarea
                      {...register("description")}
                      className="w-full rounded-lg border-[#ead7cd] dark:border-[#3d291d] bg-[#fcf9f8] dark:bg-[#1a100a] text-[#1d120c] dark:text-white p-4 focus:ring-primary focus:border-primary placeholder:text-[#a16345]/50 resize-none mt-2"
                      id="description"
                      placeholder="What is this group all about?"
                      rows={3}
                    ></textarea>
                    <p className="text-right text-xs text-[#a16345]">0 / 200 characters</p>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[#1d120c] dark:text-[#f8f6f5] text-xl font-bold border-b border-[#f4ebe6] dark:border-[#2d1b12] pb-4">Privacy Level</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <label className={`relative flex cursor-pointer rounded-lg border-2 p-4 hover:bg-[#fcf9f8] dark:hover:bg-[#2d1b12] transition-all ${privacy === 'public' ? 'border-primary' : 'border-[#ead7cd] dark:border-[#3d291d]'}`}>
                <input
                  {...register("privacy")}
                  className="sr-only peer"
                  type="radio"
                  value="public"
                />
                <div className="flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="material-symbols-outlined">public</span>
                  </div>
                  <div>
                    <p className="font-bold text-[#1d120c] dark:text-white">Public</p>
                    <p className="text-xs text-[#a16345]">Anyone can find and join this group.</p>
                  </div>
                </div>
                <div className={`absolute right-4 top-1/2 -translate-y-1/2 ${privacy === 'public' ? 'opacity-100' : 'opacity-0'} text-primary`}>
                  <span className="material-symbols-outlined fill">check_circle</span>
                </div>
              </label>

              <label className={`relative flex cursor-pointer rounded-lg border-2 p-4 hover:bg-[#fcf9f8] dark:hover:bg-[#2d1b12] transition-all ${privacy === 'private' ? 'border-primary' : 'border-[#ead7cd] dark:border-[#3d291d]'}`}>
                <input
                  {...register("privacy")}
                  className="sr-only peer"
                  type="radio"
                  value="private"
                />
                <div className="flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="material-symbols-outlined">lock</span>
                  </div>
                  <div>
                    <p className="font-bold text-[#1d120c] dark:text-white">Private</p>
                    <p className="text-xs text-[#a16345]">Only invited members can access.</p>
                  </div>
                </div>
                <div className={`absolute right-4 top-1/2 -translate-y-1/2 ${privacy === 'private' ? 'opacity-100' : 'opacity-0'} text-primary`}>
                  <span className="material-symbols-outlined fill">check_circle</span>
                </div>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-6 border-t border-[#f4ebe6] dark:border-[#2d1b12]">
            <Link to="/mygroups" className="px-6 py-3 rounded-lg text-[#a16345] font-semibold hover:bg-[#f4ebe6] dark:hover:bg-[#2d1b12] transition-colors">Cancel</Link>
            <button type="submit" className="px-8 py-3 rounded-lg bg-primary text-white font-bold shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Create Group</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default CreateGroup