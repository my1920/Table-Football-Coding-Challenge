import  Link  from 'next/link'

export default function GamesManagement() {
  return (
    <main className="flex  flex-col items-center justify-between px-6 py-24 md:p-24">
      <div className=" text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left">
        <h1 className={`mb-3 text-lg font-light`}>
          Games Management
        </h1>
        <div>
          <h2 className={`mb-3 text-2xl font-semibold`}>
            What do you want to do ?
          </h2>
          <div className="flex gap-6 mt-8 flex-col lg:flex-row">
            <Link href={"/games-management/current"} className="bg-indigo-500 hover:bg-indigo-700 text-center text-white font-bold py-2 px-4 rounded-3xl lg:w-1/2 grow">
              Keep the track of a game
            </Link>

            <Link href={"/games-management/old"} className="bg-indigo-500 hover:bg-indigo-700 text-center text-white font-bold py-2 px-4 rounded-3xl lg:w-1/2 grow">
              Add an old game
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
