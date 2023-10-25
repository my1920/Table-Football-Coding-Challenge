import Image from 'next/image'

export default function Logo() {
    return (
      <a href="#" className="-m-1.5 p-1.5">
        <span className="sr-only">Aurélien Santi</span>
        <Image //todo: add logo
            src="/vercel.svg"
            alt="Vercel Logo"
            className="dark:invert"
            width={100}
            height={24}
            priority
          />
      </a>
    );
  }
  