import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [apodData, setapodData] = useState([]);

  async function getAPODData(reqDate) {
    console.log(reqDate);

    const reqConfig = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: reqDate }),
    };

    const response = await fetch(process.env.REACT_APP_URL, reqConfig);
    const data = await response.json();
    console.log(data.data[0]);
    setapodData(data.data[0]);
  }

  useEffect(() => {
     getAPODData("2019-12-01");
  },[]);

  console.log(apodData);

  return (
    <div>
      <div className="titleDiv">
        <h1>Title :- {apodData.title}</h1>
        <input
          type="date"
          onChange={date => getAPODData(date.target.value)}
          // onChange={(e) => test(e.target.value)}
          className="datePicker"
        />
      </div>
      <div>
        <img className="imageDiv" src={apodData.image_url} alt="image"></img>
      </div>
      <div>
        <h3>Explanations :- </h3>
        <h4>{apodData.explanation}</h4>
      </div>
    </div>
  );
}

export default App;
