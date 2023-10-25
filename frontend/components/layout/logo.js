import Image from 'next/image'
import  Link  from 'next/link'

export default function Logo() {
    return (
      <Link href="/" className="-m-1.5 p-1.5">
        <span className="sr-only">Aurélien Santi</span>
        <Image
            src="/bbccv0.4.svg"
            alt="Babyfoot Coding Challenge Logo"
            className="dark:invert"
            width={150}
            height={36}
            priority
          />
      </Link>
    );
  }
  