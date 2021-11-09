import './App.css';
import React from "react";
import Login from './components/Login';
import { Route, Routes } from 'react-router';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  )

}

export default App;

// Used this youtube tutorial to help me create the multiple page:
// https://www.youtube.com/watch?v=xMNhDf5-hvk&ab_channel=ConorBailey
// to help me finish, as he was showing version 5, when I was using version 6:
// https://stackoverflow.com/questions/69832748/error-a-route-is-only-ever-to-be-used-as-the-child-of-routes-element