import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "./utilities/users-service";
import AuthPage from "./pages/AuthPage/AuthPage.jsx";
import AllWellsPage from "./pages/AllWellsPage/AllWellsPage.jsx";
import AllRigsPage from "./pages/AllRigsPage/AllRigsPage.jsx";
import OperationsPage from "./pages/OperationsPage/OperationsPage.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import DevelopmentWells from "./pages/DevelopmentWells/DevelopmentWells.jsx";
import ProductionWells from "./pages/ProductionWells/ProductionWells.jsx";
import WellDetailPage from "./pages/WellDetailPage/WellDetailPage.jsx";
import RigDetailPage from "./pages/RigDetailPage/RigDetailPage.jsx";

function App() {
  const [user, setUser] = useState(getUser());
  return (
    <div className="App">
      {user ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/operations"
              element={<OperationsPage user={user} setUser={setUser} />}
            />
            <Route
              path="/allwells"
              element={<AllWellsPage user={user} setUser={setUser} />}
            />
            <Route
              path="/production"
              element={<ProductionWells user={user} setUser={setUser} />}
            />
            <Route
              path="/development"
              element={<DevelopmentWells user={user} setUser={setUser} />}
            />
            <Route
              path="/Rigs"
              element={<AllRigsPage user={user} setUser={setUser} />}
            />
            <Route
              path="/well/:id"
              element={<WellDetailPage user={user} setUser={setUser} />}
            />
            <Route
              path="/rig/:id"
              element={<RigDetailPage user={user} setUser={setUser} />}
            />
            <Route path="/auth" element={<>Already signed in</>} />
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
