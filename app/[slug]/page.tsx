"use client";

import { useSearchParams } from "next/navigation";
import { decrypt } from "../helper/createsnippet";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import formatDate from "../helper/dateformatter";
import getLanguageByLabel from "../helper/languagefilter";
import AceEditor from "react-ace";
import { importModesAndThemes } from "../helper/braceImports";
import { useTheme } from "next-themes";
import Image from "next/image";

importModesAndThemes();

function Page() {
  const searchParams = useSearchParams();
  const [wrapLines, setWrapLines] = useState(false);
  const { resolvedTheme } = useTheme();
  let q = searchParams.get("s") || "";
  q = q.replaceAll(" ", "+");
  const decodedData = q;
  let dm: CreateSnippetBtnProps | null = null;

  let d: string | null = null;

  if (typeof decodedData === "string") {
    d = decrypt(decodeURIComponent(q));
  }

  try {
    dm = JSON.parse(d || "");
  } catch (e) {
    dm = null;
  }

  if (dm === null)
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-screen">
        <Image
          alt="bad-url"
          src="/bad-url.svg"
          height={300}
          width={300}
        ></Image>
        <span>Bad URL</span>
      </div>
    );

  if (new Date(dm.expiry) <= new Date())
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-screen">
        <Image
          alt="snippet-expired"
          src="/link-expired.svg"
          height={300}
          width={300}
        ></Image>
        <span>Snippet Expired</span>
      </div>
    );

  return (
    <div
      className="flex flex-col md:mx-24 mx-6 my-6 md:my-12 text-sm"
      suppressHydrationWarning
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="mb-2 text-xs md:text-sm text-black dark:text-white flex items-center gap-2">
            language:<span className=" text-blue-600">{dm.language}</span>
          </p>
          <p className="mb-2 text-xs md:text-sm text-black dark:text-white flex items-center gap-2">
            code will expire on:{" "}
            <span className="text-blue-600">{formatDate(dm.expiry)}</span>
          </p>
          <div className="flex flex-cols gap-2 text-xs md:text-sm">
            <span>wrap lines:</span>
            <Switch
              checked={wrapLines}
              onChange={setWrapLines}
              className={`${wrapLines ? "bg-blue-700" : "bg-black"}
          relative inline-flex h-[20px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">wrap lines</span>
              <span
                aria-hidden="true"
                className={`${wrapLines ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-[17px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
          </div>
        </div>
        <button
          onClick={() => (window.location.href = "/")}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-xs md:text-sm px-2 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-xs"
        >
          🚀 create yours
        </button>
      </div>
      <div className="mt-4 text-xs md:text-sm">
        <AceEditor
          highlightActiveLine
          wrapEnabled={wrapLines}
          placeholder="write your code here"
          mode={getLanguageByLabel(dm.language)}
          theme={resolvedTheme === "light" ? "sqlserver" : "dracula"}
          value={dm.code}
          readOnly
          name="code-editor"
          editorProps={{ $blockScrolling: true }}
          style={{ width: "100%", height: "500px" }}
          className="border rounded-md shadow-sm"
          showPrintMargin={false}
        />
      </div>
    </div>
  );
}

export default Page;
