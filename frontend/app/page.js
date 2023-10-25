import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <div className=" text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left">
        <h2 className={`mb-3 text-2xl font-semibold`}>
          Dashboard
        </h2>
      </div>
    </main>
  )
}
