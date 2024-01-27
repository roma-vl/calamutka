// import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from 'routes/app.routes'
// import axios from 'axios'
// import './App.css'

// const App = () => {
  // const [data, setData] = useState(null);
  //
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:4000/');
  //       setData(response.data);
  //       console.log(response.data)
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //
  //   fetchData();
  // }, []);

  // return (
  //     <div>
  //       <h1>{data ? data.title : <p>Loading...</p>}</h1>
  //       {data ? (
  //           <ul>
  //             {data.map(item => (
  //                 <li key={item.id}> ID:{ item.username } --- {item.password}</li>
  //             ))}
  //           </ul>
  //       ) : (
  //           <p>Loading...</p>
  //       )}
  //     </div>
  // );

  function App() {
    return (
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
    )
  }
// };

export default App;
