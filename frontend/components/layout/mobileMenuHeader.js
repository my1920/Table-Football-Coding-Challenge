import { XMarkIcon } from '@heroicons/react/24/outline'
import Logo from './Logo'

export default function MobileMenuHeader({ setMobileMenuOpen }) {
    return (
      <div className="flex items-center justify-between">
        <Logo />
        <button
          type="button"
          className="-m-2.5 rounded-md p-2.5 text-gray-700"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="sr-only">Close menu</span>
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    );
  }
  