import { Route, Routes } from "react-router-dom";
import Basic from "./layout/Basic";
import SignUpPage from "./pages/signup";
import LoginPage from "./pages/login";
import Authenticated from "./layout/Authenticated";
import Homepage from "./pages/home";

function App() {
  return (
    <Routes>
      <Route element={<Authenticated />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<div>Dashboard</div>} />
        <Route path="/admin-panel" element={<div>Admin-panel</div>} />
      </Route>

      <Route element={<Basic />}>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
