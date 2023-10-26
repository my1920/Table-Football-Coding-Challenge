import { usePathname } from 'next/navigation'
import  Link  from 'next/link'
 

export default function NavigationBar({ navigation }) {
    const pathname = usePathname()

    return (
      <div className="hidden lg:flex lg:gap-x-12">
        {navigation.map((link) => {
            let isActive = false;
            
            if (link.href === "/") {
                if (pathname === "/" ) {
                    isActive = true;
                }
            } else if (pathname !== "/" && pathname.startsWith(link.href)) {
                isActive = true;
            }

            return (
                <Link 
                    key={link.name} 
                    href={link.href} 
                    className={isActive ? 'text-sm font-semibold leading-6 text-indigo-500' : 'text-sm font-semibold leading-6 text-black'}
                >
                    {link.name}
                </Link>
                
            )
        })}
      </div>
    );
  }
  