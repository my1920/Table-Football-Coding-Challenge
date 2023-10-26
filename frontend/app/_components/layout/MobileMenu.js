import MobileMenuHeader from './MobileMenuHeader';
import { usePathname } from 'next/navigation'
import { Dialog } from '@headlessui/react'
import  Link  from 'next/link'

export default function MobileMenu({ mobileMenuOpen, setMobileMenuOpen, navigation }) {
    const pathname = usePathname()

  return (
    <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
      <div className="fixed inset-0 z-10" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <MobileMenuHeader setMobileMenuOpen={setMobileMenuOpen} />
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {navigation.map((link) => {
                let isActive = false;
            
                if (link.href === "/") {
                    if (pathname === "/" ) {
                        isActive = true;
                    }
                } else if (pathname !== "/" && pathname.startsWith(link.href)) {
                    isActive = true;
                }
                return(
                  <Link
                      key={link.name} 
                      href={link.href} 
                      className={isActive ? "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-indigo-500 hover:bg-gray-50" : "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"}
                      onClick={() => setMobileMenuOpen(false)}
                  >
                      {link.name}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
