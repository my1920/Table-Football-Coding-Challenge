import  Link  from 'next/link'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'
import OldGameManagementForm from '@/components/form/oldGameManagementForm'

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
            Add an old game :
          </h2>
          <OldGameManagementForm />
        </div>
      </div>
    </main>
  )
}
