'use client';

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Vision', href: '/vision' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="bg-brand-bg opacity-70 sticky top-0 z-50 border-b border-gray-700">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center 
            rounded-md p-2 text-brand-text hover:bg-brand-surface hover:text-white 
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
                className="text-3xl bg-brand-surface text-brand-text hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white focus:ring-2 focus:ring-brand-accent focus:outline-hidden rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200"
                aria-label="Go to homepage"
              >
                ES
              </a>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={classNames(
                        isActive ? 'bg-brand-surface text-brand-text' : 'text-brand-text hover:bg-brand-surface hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 focus:ring-2 focus:ring-brand-accent focus:outline-hidden',
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
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={classNames(
                  isActive ? 'bg-brand-surface text-brand-text' : 'text-brand-text hover:bg-brand-surface hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium transition-colors duration-200 focus:ring-2 focus:ring-brand-accent focus:outline-hidden',
                )}
              >
                {item.name}
              </DisclosureButton>
            );
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
