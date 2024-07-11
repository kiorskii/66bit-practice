import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthScreen from "./components/screens/AuthScreen";
import ClientScreen from "./components/screens/ClientScreen";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthScreen />} />
          <Route path="/" element={<ClientScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
