import { Route, Routes } from "react-router-dom";
import "./App.css";
import Addproduct from "./components/Addproduct";
import Dashborad from "./components/Dashborad";
import { MyNav } from "./components/MyNav";
import Error from "./components/Error";

function App() {
  return (
    <>
      <MyNav />
      <Routes>
        <Route path="/" element={<Dashborad />} />
        <Route path="addProduct" element={<Addproduct />} />
        <Route path="addProduct/:id/edit" element={<Addproduct />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
