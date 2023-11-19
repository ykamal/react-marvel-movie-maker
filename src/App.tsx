import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout";
import Movies from "./pages/movies";
import NewMovie from "./pages/newMovie";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Movies />} />
          <Route path="/new" element={<NewMovie />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
