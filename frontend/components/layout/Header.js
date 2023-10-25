'use client'
import { useState } from 'react'
import Logo from './Logo'
import NavigationBar from './NavigationBar'
import MobileMenuButton from './MobileMenuButton'
import MobileMenu from './MobileMenu'


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigation = [
    { name: 'Dashboard', href: '/' },
    { name: 'Games Management', href: '/games-management' },
  ];

  return (
    <header className="bg-white sticky top-0">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <Logo />
        <MobileMenuButton setMobileMenuOpen={setMobileMenuOpen} />
        <NavigationBar navigation={navigation} />
      </nav>
      <MobileMenu mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} navigation={navigation} />
    </header>
  );
}
