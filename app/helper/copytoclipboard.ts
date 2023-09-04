export default function copyToClipboard(text) {
  // Create a temporary textarea element
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Set the position to be off-screen
  textArea.style.position = "absolute";
  textArea.style.left = "-9999px";

  // Append the textarea to the document
  document.body.appendChild(textArea);

  // Select the text and copy it
  textArea.select();
  document.execCommand("copy");

  // Clean up - remove the textarea
  document.body.removeChild(textArea);
}
