"use client";

import { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import copyToClipboard from "../helper/copytoclipboard";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

const Modal: FC<ModalProps> = ({ isError, shortResponse }) => {
  return (
    <>
      <Transition appear show={true} as={Fragment}>
        <Dialog onClose={() => {}} as="div" className="relative z-10">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {!isError ? (
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                    >
                      copy any url from below and share
                    </Dialog.Title>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-300 flex flex-col gap-2">
                      <div className="flex gap-2 items-center">
                        <div>{shortResponse.full_short_link}</div>
                        <button
                          onClick={() => {
                            copyToClipboard(shortResponse.full_short_link);
                          }}
                        >
                          <DocumentDuplicateIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div>{shortResponse.full_short_link2}</div>
                        <button
                          onClick={() => {
                            copyToClipboard(shortResponse.full_short_link2);
                          }}
                        >
                          <DocumentDuplicateIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => (window.location.href = "/")}
                      >
                        create another
                      </button>
                    </div>
                  </Dialog.Panel>
                ) : (
                  <div>some error occurred, please try again later</div>
                )}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
