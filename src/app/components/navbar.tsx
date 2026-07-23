'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Creative', href: '/creative' },
  { name: 'Contact', href: '/contact' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <Disclosure as="nav" className="relative bg-brand-bg/95 rounded-sm border border-brand-border transition-all duration-300">
        <span aria-hidden="true" className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-brand-accent" />
        <span aria-hidden="true" className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-brand-accent" />
        <span aria-hidden="true" className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-brand-accent" />
        <span aria-hidden="true" className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-brand-accent" />
        <div className="px-4 py-3">
          <div className="relative flex items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center
              rounded-sm p-2 text-brand-text hover:bg-brand-surface hover:text-white
              focus:ring-2 focus:ring-brand-accent focus:outline-none focus:ring-offset-2 focus:ring-offset-transparent">
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
              </DisclosureButton>
            </div>
            
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <Link 
                  href='/'
                  className="flex items-center justify-center hover:opacity-80 transition-opacity duration-200"
                  aria-label="Go to homepage"
                >
                  <img
                    src="/logo.svg"
                    alt="ES Logo"
                    className="w-10 h-10"
                  />
                </Link>
              </div>
            </div>
            
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={classNames(
                          isActive ? 'bg-brand-accent text-white' : 'text-brand-text-secondary hover:text-brand-text hover:bg-brand-surface/50',
                          'rounded-sm px-4 py-2 text-sm font-mono uppercase tracking-[0.04em] transition-all duration-200 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-transparent',
                        )}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-4 pb-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={classNames(
                    isActive ? 'bg-brand-accent text-white' : 'text-brand-text-secondary hover:text-brand-text hover:bg-brand-surface/50',
                    'block rounded-sm px-4 py-2 text-base font-mono uppercase tracking-[0.04em] transition-all duration-200 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-transparent',
                  )}
                >
                  {item.name}
                </DisclosureButton>
              );
            })}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  )
}
