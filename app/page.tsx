"use client";

import React, { useState } from "react";
import Dropdown from "./components/Dropdown";
import CodeTextarea from "./components/CodeTextarea";
import CreateSnippetBtn from "./components/CreateSnippetBtn";
import Modal from "./components/Modal";
import { Languages, Expiries } from "./data";

export default function Home() {
  const [Language, setLanguage] = useState(Languages[0]);
  const [Expiry, setExpiry] = useState(Expiries[0]);
  const [code, setCode] = useState(``);
  const [isShortened, setIsShortened] = useState(false);
  const [isError, setIsError] = useState(false);
  const [shortResponse, setShortResponse] = useState<ShortResponse>({
    full_short_link: "",
    full_short_link2: "",
  });

  return (
    <main
      className={`app w-full flex flex-col gap-4 items-center sm:px-24 px-6 py-[2rem]`}
    >
      {isShortened && <Modal isError={isError} shortResponse={shortResponse} />}
      <div className="flex w-full items-center justify-between">
        <div
          className={`flex flex-col md:flex-row items-center gap-4 ${
            isShortened ? "pointer-events-none" : ""
          }`}
        >
          <Dropdown
            data={Languages}
            label="language"
            selected={Language}
            setSelected={setLanguage}
          />
          <Dropdown
            data={Expiries}
            label="expiring in"
            selected={Expiry}
            setSelected={setExpiry}
          />
        </div>
        <CreateSnippetBtn
          code={code}
          language={Language.label}
          expiry={Expiry.value}
          setShortResponse={setShortResponse}
          setIsShortened={setIsShortened}
          setIsError={setIsError}
        />
      </div>
      <CodeTextarea Language={Language} code={code} setCode={setCode} />
    </main>
  );
}
