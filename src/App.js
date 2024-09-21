import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [searchString, setSearchString] = useState("");
  const [replaceString, setReplaceString] = useState("");
  const [highlightedText, setHighlightedText] = useState("");

  const handleTextChange = (e) => {
    const inputValue = e.target.value;
    setText(inputValue);
    setHighlightedText(applyHighlighting(inputValue));
  };

  const getUniqueWords = () => {
    const words = text.toLowerCase().match(/\b\w+\b/g);
    const uniqueWords = words ? new Set(words) : new Set();
    return uniqueWords.size;
  };

  const getCharCount = () => {
    const chars = text.replace(/[\s\W]/g, "");
    return chars.length;
  };

  const handleReplaceAll = () => {
    if (searchString) {
      const regex = new RegExp(`(${searchString})`, "g");
      const newText = text.replace(regex, replaceString);
      setText(newText);
      const highlighted = highlightReplacedWords(newText, replaceString);
      setHighlightedText(highlighted);
    }
  };

  const highlightReplacedWords = (inputText, replaceStr) => {
    if (!replaceStr) return inputText;
    const regex = new RegExp(`(${replaceStr})`, "g");
    return inputText.replace(regex, `<mark>${replaceStr}</mark>`);
  };

  const applyHighlighting = (inputText) => {
    if (!replaceString) return inputText;
    return highlightReplacedWords(inputText, replaceString);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Real-Time Text Analysis
      </h1>
      <div className="relative">
        <div
          className="absolute inset-0 z-10 whitespace-pre-wrap break-words p-4 border rounded-md bg-transparent pointer-events-none text-gray-900"
          dangerouslySetInnerHTML={{ __html: highlightedText }}
        ></div>
        <textarea
          value={text}
          onChange={handleTextChange}
          className="relative z-20 w-full p-4 border rounded-md shadow-sm bg-transparent caret-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          placeholder="Type your text here..."
          rows="10"
          style={{ color: "transparent", caretColor: "black" }}
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between mt-4">
        <p className="text-lg font-medium">
          <strong>Unique Word Count:</strong> {getUniqueWords()}
        </p>
        <p className="text-lg font-medium">
          <strong>Character Count (Excluding Spaces and Punctuation):</strong>{" "}
          {getCharCount()}
        </p>
      </div>
      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          className="p-2 border rounded-md w-full md:w-auto shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="String to search"
        />
        <input
          type="text"
          value={replaceString}
          onChange={(e) => setReplaceString(e.target.value)}
          className="p-2 border rounded-md w-full md:w-auto shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="String to replace with"
        />
        <button
          onClick={handleReplaceAll}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Replace All
        </button>
      </div>
      <div className="mt-6 p-4 border rounded-md shadow-sm bg-gray-100">
        <div dangerouslySetInnerHTML={{ __html: highlightedText }}></div>
      </div>
    </div>
  );
}

export default App;
