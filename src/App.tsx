import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout";
import Movies from "./pages/movies";
import NewMovie from "./pages/NewMovie";
import EditMovie from "./pages/editMovie";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Movies />} />
          <Route path="/new" element={<NewMovie />} />
          <Route path="/movies/:id/edit" element={<EditMovie />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
