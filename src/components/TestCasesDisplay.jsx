import React, { useState, useEffect } from "react";
import './TestCasesDisplay.css'; // Import the CSS file

const TestCasesDisplay = ({ rawTestCases }) => {
  // Function to convert markdown-like syntax to HTML
  const formatTestCases = (text) => {
    if (!text || typeof text !== 'string') {
      console.log("No valid text input.");
      return "No test cases generated yet"; // Return a fallback message
    }

    // Convert \n to <br /> for newlines
    let formattedText = text.replace(/\n/g, '<br />');

    // Convert **text** to <b>text</b> for bold
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

    // Convert `code` to <code>code</code> for inline code
    formattedText = formattedText.replace(/`(.*?)`/g, '<code>$1</code>');

    // Convert ## to <h2> for headings
    formattedText = formattedText.replace(/^## (.*)$/gm, '<p>$1</p>');

    // Convert * or - to <ul><li> for bullet points
    formattedText = formattedText.replace(/^(\*|\-) (.*)$/gm, '<ul><li>$2</li></ul>');

    // Optional: Convert multiple bullet points to properly formatted <ul> (fixing list nesting)
    formattedText = formattedText.replace(/<\/ul>\s*<ul>/g, '');

    return formattedText;
  };

  const [formattedTestCases, setFormattedTestCases] = useState("");

  useEffect(() => {
    if (rawTestCases && rawTestCases.testCases) {
      console.log("Raw Test Cases:", rawTestCases.testCases); // Log the string value
      setFormattedTestCases(formatTestCases(rawTestCases.testCases));
    } else {
      console.log("No valid test input.");
      setFormattedTestCases("No test cases generated yet"); // Fallback message
    }
  }, [rawTestCases]);

  return (
    <div className="test-cases-container">
      <h2>Generated Test Cases</h2>
      <div className="test-case-box">
        <div
          className="formatted-text"
          dangerouslySetInnerHTML={{ __html: formattedTestCases }}
        />
      </div>
    </div>
  );
};

export default TestCasesDisplay;
