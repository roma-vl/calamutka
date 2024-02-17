// import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from 'routes/app.routes'
import { Provider } from 'react-redux';
import store from "./store";
  function App() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    )
  }

export default App;

