import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useNavigate } from "react-router-dom"
import supabase from "../../server/supabaseClient"

// eslint-disable-next-line react/prop-types
export default function WorkoutsModal({participant, workoutNr}) {

  let [isOpen, setIsOpen] = useState(false)
  const [timeMins, setTimeMins] = useState(0)
  const [timeSecs, setTimeSecs] = useState(0)
  const [formError, setFormError] = useState(null);

  const navigate = useNavigate()

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!timeMins || !timeSecs) {
      setFormError("Fill in all fields")
      return
    }
    
    const { data, error } = await supabase
      .from('workouts')
      .insert([
        { 
          time_mins: timeMins, 
          time_secs: timeSecs, 
          workout_nr: workoutNr,
          participant_id: participant.id, 
        }
      ])

    if (error) {
      console.log(error)
      setFormError('An error occurred with retrieving the data from the database')
    }

    if (data) {
      console.log(data)
      setFormError(null)
    }
    closeModal()
    navigate('/')
    navigate(0)
  }

  return (
    <>
      <div className="flex items-center p-4">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-gray-600 bg-opacity-90 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Add Workout Data
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-5 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-medium leading-6 text-gray-900 pb-4"
                  >
                    {"Add Workout " + workoutNr + " for " + participant.first_name + " " + participant.last_name}
                  </Dialog.Title>
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex">
                      <label
                        htmlFor="timeMins"
                        className="block text-md font-medium text-gray-900 dark:text-white"
                      >
                        Minutes:
                      </label>
                      <input
                        type="number"
                        id="timeMins"
                        value={timeMins}
                        onChange={(e) => setTimeMins(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      />
                      
                    </div>
                    <div className="flex">
                    <label
                        htmlFor="timeSecs"
                        className="block text-md font-medium text-gray-900 dark:text-white"
                      >
                        Seconds:
                      </label>

                      <input
                        type="number"
                        id="timeSecs"
                        value={timeSecs}
                        onChange={(e) => setTimeSecs(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      />
                    </div>

                    {formError && <p className="bg-red-700 text-white font-semibold rounded-lg flex justify-center">{formError}</p>}

                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Submit
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
