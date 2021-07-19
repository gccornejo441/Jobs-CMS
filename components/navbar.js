import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { useUser } from '@auth0/nextjs-auth0'
import Image from 'next/image'


export default function Navbar({ isShowing }) {
  const { user } = useUser();

  return (
    <>
      <Disclosure as="nav" class="bg-white fixed w-screen top-0 z-20">
        {({ open }) => (
          <>
            <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div class="relative flex items-center justify-between h-16">
                {/* RACKET SPACE LOGO */}
                <div class="flex w-max rounded-md px-2">
                  <a href="/">
                  <span>
                    <Image src="/images/jobbox.svg" alt="Jobster Logo" height={40} width={120} />
                  </span>
                  </a>
                </div>

                {/* RACKET SPACE LOGIN & LOGOUT */}
                <div class="hidden lg:flex">
                  {user ? (
                    <>
                      <ul class="flex">
                        <li class="md:mx-3">
                            <a href="/api/auth/logout" data-testid="logout" class="text-gray-50 border rounded-md bg-regal-blue text-xl p-2">
                              Logout
                            </a>
                        </li>
                        <li class="md:mx-3">
                            <a href="/dashboard" class="text-regal-blue border rounded-md bg-green-300 text-xl p-2">
                              Dashboard
                            </a>
                        </li>
                        <li class="md:mx-3">
                          <div class="text-2xl text-regal-blue">
                            <h1>Hello, {user.nickname}!</h1>
                          </div>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <li class="md:mx-3 list-none">
                        <a href="/api/auth/login" data-testid="login" class="text-regal-blue border rounded-md bg-green-300 text-regal-blue text-xl p-2">
                          Login
                        </a>
                      </li>
                    </>
                  )}
                </div>

                <div class="absolute inset-y-0 right-0 flex items-center lg:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button class="inline-flex items-center justify-center p-2 rounded-md text-regal-blue hover:bg-regal-blue hover:text-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span class="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon class="block h-6 w-6 z-30" aria-hidden="true" />
                    ) : (
                      <MenuIcon class="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
            <Transition
              appear={true}
              show={isShowing}
              enter="transition-opacity duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Disclosure.Panel class="lg:hidden relative">
                {user ? (
                  <>
                    <ul class="bg-regal-blue absolute z-20 top-0 w-full opacity-95">
                      <li class="border-t-2 border-green-400 py-4 text-center">
                          <a href="/dashboard" class="ml-8 text-gray-50 hover:underline">
                            Dashboard
                          </a>
                      </li>
                      <li class="border-t-2 border-green-400 py-4 text-center">
                          <a href="/api/auth/logout"  data-testid="logout" class="ml-8 text-gray-50 hover:underline">
                            Logout
                          </a>
                      </li>
                      <li class="border-b-2 border-t-2 border-green-400 py-4 flex flex-row-reverse">
                        <div class="text-normal text-gray-50 mr-8">
                          <h1>Hello, {user.nickname}!</h1>
                        </div>
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <ul class="bg-regal-blue absolute z-20 top-0 w-full opacity-95">
                      <li class="border-t-2 border-b-2 border-green-400 py-4 text-center">
                          <a href="/api/auth/login" data-testid="login" class="ml-8 text-gray-50 hover:underline">
                            Login
                          </a>
                      </li>
                    </ul>
                  </>
                )}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </>
  )
}
