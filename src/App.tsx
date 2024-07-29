import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthScreen from "./components/screens/AuthScreen";
import ClientScreen from "./components/screens/ClientScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthScreen />} />
            <Route path="/" element={<ClientScreen />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
