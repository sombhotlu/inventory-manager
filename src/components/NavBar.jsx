import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const default_navigation = [
  { name: 'All', href: '/products' },
  { name: 'Manage Types', href: '/manage-types' },
];

function NavLink({
  to,
  className,
  activeClassName,
  inactiveClassName,
  ...rest
}) {
  let location = useLocation();
  let isActive = location.pathname === to;

  let allClassNames =
    className + (isActive ? ` ${activeClassName}` : ` ${inactiveClassName}`);

  return <Link className={allClassNames} to={to} {...rest} />;
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
  const currentData = useSelector((state) => state.productTypes);

  let dynamicNavigation = Object.keys(currentData)
    .map((id) => {
      let value = currentData[id].object_type.value;
      if (value !== '') {
        return {
          name: value,
          href: `/types/${id}`,
        };
      }
      return value;
    })
    .filter(Boolean);

  let navigation = [
    default_navigation[0],
    ...dynamicNavigation,
    default_navigation[1],
  ];

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <div className="text-white w-auto text-xl">Objector</div>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        end="true"
                        to={item.href}
                        activeClassName="bg-gray-900 text-white"
                        inactiveClassName="text-gray-300 hover:bg-gray-700 hover:text-white"
                        className="px-3 py-2 rounded-md text-sm font-medium"
                        aria-current={item.current ? 'page' : undefined}>
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"></div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium',
                  )}
                  aria-current={item.current ? 'page' : undefined}>
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
