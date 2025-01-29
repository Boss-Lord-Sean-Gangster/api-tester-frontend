import React, { useState } from 'react';
import TestCasesDisplay from './components/TestCasesDisplay';
import './App.css'

const App = () => {
  // State for storing the test cases and payload data
  const [testCases, setTestCases] = useState(null);
  const [apiUrl, setApiUrl] = useState('https://jsonplaceholder.typicode.com/posts'); // Default API URL
  const [method, setMethod] = useState('POST'); // Default method is GET
  const [headers, setHeaders] = useState('{"Content-Type": "application/json"}'); // Default headers

  const handleGenerateTestCases = async () => {
    try {
      // Parse headers input from JSON format
      const parsedHeaders = headers ? JSON.parse(headers) : {};

      const payload = {
        url: apiUrl,
        method: method,
        headers: parsedHeaders,
      };

      const response = await fetch('https://api-tester-backend-72e0cf49bf98.herokuapp.com/generate-test-cases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate test cases. Status: ${response.status}`);
      }

      const testCasesData = await response.json();
      setTestCases(testCasesData); // Store generated test cases

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Test Case Generator</h1>

      {/* Form to input payload data */}
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="url">API URL:</label>
          <input
            id="url"
            type="text"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white rounded-lg"
            placeholder="Enter the API URL"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="method">HTTP Method:</label>
          <select
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white rounded-lg"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            {/* Add other HTTP methods if needed */}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="headers">Headers (JSON format):</label>
          <textarea
            id="headers"
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white rounded-lg"
            rows="4"
            placeholder='{"Content-Type": "application/json"}'
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerateTestCases}
          className="w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition"
        >
          Generate Test Cases
        </button>
      </div>

      {/* Display Generated Test Cases */}
      <div className="mt-6 w-full max-w-2xl">
        <TestCasesDisplay rawTestCases={testCases} />
      </div>
    </div>
  );
};

export default App;
