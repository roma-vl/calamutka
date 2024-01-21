import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/');
        setData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
      <div>
        <h3>{data.title}</h3>
        {data ? (
            <ul>
              {data.post.map(item => (
                  <li key={item.id}> ID:{ item.id } --- {item.title}</li>
              ))}
            </ul>
        ) : (
            <p>Loading...</p>
        )}
      </div>
  );
};

export default App;
