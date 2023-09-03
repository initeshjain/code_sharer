type ProgrammingLanguage = {
  label: string;
  value: string;
};

type ExpiryDate = {
  label: string;
  value: string;
};

type DropdownProps = {
  data: ProgrammingLanguage[] | ExpiryDate[];
  label: string;
  selected: ProgrammingLanguage | ExpiryDate;
  setSelected: Dispatch<SetStateAction<null>>;
};

type CodeTextAreaProps = {
  Language: ProgrammingLanguagel;
  code: string;
  setCode: Dispatch<SetStateAction<null>>;
};

type CreateSnippetBtnProps = {
  code: string;
  language: string;
  expiry: string;
  setShortResponse?: Dispatch<SetStateAction<null>>;
  setIsShortened?: Dispatch<SetStateAction<null>>;
  setIsError?: Dispatch<SetStateAction<null>>;
};

type ShortResponse = {
  full_short_link: string;
  full_short_link2: string;
};

type ModalProps = {
  isError: boolean;
  shortResponse: ShortResponse;
};
