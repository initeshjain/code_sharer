"use client";

import { FC, useState } from "react";
import { createSnippet } from "../helper/createsnippet";

const CreateSnippetBtn: FC<CreateSnippetBtnProps> = ({
  code,
  language,
  expiry,
  setIsShortened,
  setShortResponse,
  setIsError,
}) => {

  const [isLoading, setIsLoading] = useState(false);

  const handleBtn = async () => {
    setIsLoading(true);
    try {
      const response = await createSnippet(code, language, expiry);
    if (response !== null) {
      setShortResponse({
        full_short_link: response.result.full_short_link,
        full_short_link2: response.result.full_short_link2,
      });
      setIsShortened(true);
      setIsError(false);
    } else {
      setIsError(true);
    }
    } catch (error) {
      throw new Error("something went wrong, error:" + error)
    } finally {
      setIsLoading(false);
    }
    // window.location.href = `/snippet?s=${encoded}`;
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-xs dark:disabled:bg-blue-500 disabled:bg-blue-500 disabled:cursor-not-allowed dark:disabled:cursor-not-allowed"
        onClick={handleBtn}
        aria-label="create snippet"
        disabled={isLoading}
      >
        create snippet
      </button>
    </div>
  );
};

export default CreateSnippetBtn;
