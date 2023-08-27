import { Link } from "react-router-dom";
// import ThemeChanger from "./DarkSwitch";
// import Image from "next/image"
import { Disclosure } from "@headlessui/react";

const Nav = () => {
  const navigation = [
    "My Dreams",
   
   
  ];

  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-3 mx-auto lg:justify-between xl:px-0">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <Link href="/">
                  <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 ">
                    <span>
                      {/* <Image
                        src="/img/logo.svg"
                        alt="N"
                        width="32"
                        height="32"
                        className="w-8"
                      /> */}
                    </span>
                    <span>DreamScribe Ai</span>
                  </span>
                </Link>

              

             
              </div>
            </>
          )}
        </Disclosure>

        {/* menu  */}
        {/* <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                <Link href="/" className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none">
                    {menu}
                </Link>
              </li>
            ))}
          </ul>
        </div> */}
{/* 
        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
          <Link to="/mydream" className="px-6 font-bold py-2  text-gray-600 no-underline rounded-md md:ml-5 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none">
       My Dreams
          </Link>

        </div> */}
      </nav>
    </div>
  );
}

export default Nav;
