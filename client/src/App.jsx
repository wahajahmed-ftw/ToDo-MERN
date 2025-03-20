import Form from "./components/form";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Signup from "./components/signup";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/form" element={<Form />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
