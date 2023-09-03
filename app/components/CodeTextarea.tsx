import { FC } from "react";
import AceEditor from "react-ace";
import { importModesAndThemes } from "../helper/braceImports";
import { useTheme } from "next-themes";
importModesAndThemes();

const CodeTextarea: FC<CodeTextAreaProps> = ({ Language, code, setCode }) => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="w-full">
      <AceEditor
        highlightActiveLine
        wrapEnabled
        placeholder="write your code here"
        mode={Language.value}
        theme={resolvedTheme === "light" ? "sqlserver" : "dracula"}
        value={code}
        onChange={(newCode: string) => setCode(newCode)}
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
        style={{ width: "100%", height: "500px" }}
        className="border rounded-md shadow-sm"
        showPrintMargin={false}
      />
    </div>
  );
};

export default CodeTextarea;
