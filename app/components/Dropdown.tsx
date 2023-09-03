"use client";

import { FC, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Dropdown: FC<DropdownProps> = ({
  data,
  label,
  selected,
  setSelected,
}) => {

  return (
        <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className="items-center">
          <Listbox.Label className="block text-xs font-xs md:text-sm md:font-sm leading-6 text-gray-900 text-center dark:text-white ">
            {label}
          </Listbox.Label>
          <div className="relative">
            <Listbox.Button className="relative w-40 cursor-default rounded-md dark:bg-black bg-white py-1  text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs md:text-sm leading-5">
              <span className="flex items-center">
                <span className="ml-3 block truncate dark:text-white">
                  {selected.label}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 dark:text-white py-1 shadow-lg ring-1 ring-black dark:ring-white ring-opacity-5 focus:outline-none text-sm">
                {data.map((lang) => (
                  <Listbox.Option
                    key={lang.value}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "bg-blue-600 text-white"
                          : "text-gray-900 dark:text-gray-50",
                        "relative cursor-default select-none py-1 "
                      )
                    }
                    value={lang}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {lang.label}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-blue-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
};

export default Dropdown;
