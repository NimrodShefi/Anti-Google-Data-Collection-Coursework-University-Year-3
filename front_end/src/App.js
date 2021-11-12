import './App.css';
import Login from './components/Login';
import { Route, Routes } from 'react-router';
import { Navigate } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} /> {/* used this: https://gist.github.com/mjackson/b5748add2795ce7448a366ae8f8ae3bb#not-server-rendering */}
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
