'use client';

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Vision', href: '/vision' },
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
      <Disclosure as="nav" className="bg-brand-bg/80 backdrop-blur-md rounded-full border border-brand-border/50 shadow-lg opacity-90">
        <div className="px-4 py-3">
          <div className="relative flex items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center 
              rounded-full p-2 text-brand-text hover:bg-brand-surface hover:text-white 
              focus:ring-2 focus:ring-brand-accent focus:outline-hidden focus:ring-inset">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
              </DisclosureButton>
            </div>
            
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <a 
                  href='/' 
                  className="text-xl font-bold bg-brand-accent text-white hover:bg-brand-accent-hover focus:bg-brand-accent-hover focus:ring-2 focus:ring-brand-accent focus:outline-hidden rounded-full px-4 py-2 transition-colors duration-200"
                  aria-label="Go to homepage"
                >
                  ES
                </a>
              </div>
            </div>
            
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={classNames(
                          isActive ? 'bg-brand-accent text-white' : 'text-brand-text-secondary hover:text-brand-text hover:bg-brand-surface/50',
                          'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-transparent',
                        )}
                      >
                        {item.name}
                      </a>
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
                  as="a"
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={classNames(
                    isActive ? 'bg-brand-accent text-white' : 'text-brand-text-secondary hover:text-brand-text hover:bg-brand-surface/50',
                    'block rounded-full px-4 py-2 text-base font-medium transition-all duration-200 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-transparent',
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
