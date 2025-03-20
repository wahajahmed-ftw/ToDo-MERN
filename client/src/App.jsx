import Form from "./components/form";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/form" element={<Form />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
