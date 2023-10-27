import PlayersStatsTable from '@/app/_components/tables/PlayersStatsTable';

export default function Dashboard() {
  return (
    <main className="flex  flex-col items-center justify-between py-24 md:p-24 ">
      <div className=" text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left">
        <h1 className={"mb-3 text-lg font-light"}>
          Dashboard
        </h1>
        <h2 className={"mb-3 text-2xl font-semibold px-6 lg:px-0"}>
          who is the ultimate champion ?
        </h2>
        <div className=' w-screen lg:w-auto overflow-x-scroll md:overflow-x-visible p-6 lg:px-0'>
          <PlayersStatsTable />
        </div>
      </div>
    </main>
  )
}
