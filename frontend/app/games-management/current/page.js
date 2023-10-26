import  Link  from 'next/link'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'
import CurrentGameManagementForm from '@/app/_components/forms/CurrentGameManagementForm'

export default function OldGamesManagement() {
  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <div className=" text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left">
        <h1 className={`mb-3 text-lg font-light`}>
          <Link href={"/games-management"} className="flex justify-center lg:justify-start items-center">
            <ArrowLeftCircleIcon className="h-4 w-4 mr-2" aria-hidden="true" /> <span>Games Management</span>
          </Link>
        </h1>
        <div>
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Keep the track of a current game :
          </h2>
          <CurrentGameManagementForm />
        </div>
      </div>
    </main>
  )
}
