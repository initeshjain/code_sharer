import { Languages } from "../data";

export default function getLanguageByLabel(labelToFind: string) {
  const language = Languages.find((language) => language.label === labelToFind);
  return language ? language.value : "text";
}
