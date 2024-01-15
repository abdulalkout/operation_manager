import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "./utilities/users-service";
import AuthPage from "./pages/AuthPage/AuthPage.jsx";
import AllWellsPage from "./pages/AllWellsPage/AllWellsPage.jsx";
import OperationsPage from "./pages/OperationsPage/OperationsPage.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";

function App() {
  const [user, setUser] = useState(getUser());
  return (
    <div className="App">
      {user ? (
        <>
          <Navbar />
          <Routes>
            <Route
              path="/operations"
              element={<OperationsPage user={user} setUser={setUser} />}
            />
            <Route
              path="/operations/allwells"
              element={<AllWellsPage user={user} setUser={setUser} />}
            />
            <Route path="/auth" element={<>Already signed in</>} />
            <Route path="" element="" />
          </Routes>
        </>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/auth"
              element={<AuthPage user={user} setUser={setUser} />}
            />
            <Route path="/operations" element={<>Please signin</>} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
