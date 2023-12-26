'use client';

import { FC, useRef } from "react";
import AceEditor from "react-ace";
import { importModesAndThemes } from "../helper/braceImports";
import { useTheme } from "next-themes";
importModesAndThemes();

const CodeTextarea: FC<CodeTextAreaProps> = ({ Language, code, setCode }) => {
  const { resolvedTheme } = useTheme();

  const canvasRef = useRef(null);


  // const handleDownloadClick = () => {
  //   const canvas = canvasRef.current;

  //   if (canvas) {
  //     const context = canvas.getContext('2d');

  //     // Clear previous content on the canvas
  //     context.clearRect(0, 0, canvas.width, canvas.height);

  //     // Draw your code content on the canvas
  //     context.font = '14px monospace'; // Adjust font and size as needed
  //     context.fillStyle = resolvedTheme === 'light' ? '#000' : '#fff'; // Adjust text color based on theme
  //     context.fillText(code, 10, 20);

  //     // Get data URL and trigger download
  //     const downloadUrl = canvas.toDataURL('image/png');
  //     const a = document.createElement('a');
  //     a.href = downloadUrl;
  //     a.download = 'canvas-image.png';
  //     a.click();
  //   }
  // };


  return (
    <div className="w-full">
      {/* <canvas ref={canvasRef} width={400} height={200} style={{ border: '1px solid #000' }} /> */}
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

      {/* <button onClick={handleDownloadClick}>Download as Image</button> */}
    </div>
  );
};

export default CodeTextarea;
