import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Validate JSON input
      const parsedInput = JSON.parse(jsonInput);
      setError('');

      // Make API call
      const response = await axios.post('YOUR_API_ENDPOINT', parsedInput);
      setResponseData(response.data);

    } catch (err) {
      setError('Invalid JSON input');
    }
  };

  const handleSelectChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };

  const renderFilteredResponse = () => {
    if (!responseData) return null;

    let filteredData = {};

    if (selectedOptions.includes('Alphabets')) {
      filteredData.Alphabets = responseData.Alphabets;
    }
    if (selectedOptions.includes('Numbers')) {
      filteredData.Numbers = responseData.Numbers;
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      filteredData.HighestLowercase = responseData.HighestLowercase;
    }

    return (
      <div>
        <h3>Filtered Response:</h3>
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Frontend Application</h1>
      <input
        type="text"
        placeholder='Enter JSON'
        value={jsonInput}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {responseData && (
        <div>
          <select multiple={true} onChange={handleSelectChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
        </div>
      )}
      
      {renderFilteredResponse()}
    </div>
  );
}

export default App;
React.useEffect(() => {
    document.title = 'YOUR_ROLL_NUMBER';
  }, []);
  