import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Home from "../pages/Home";
import MovieDetail from "../pages/MovieDetail";
import SearchResults from "../pages/SearchResults";
import Watchlist from "../pages/Watchlist";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Admin from "../pages/Admin";

const AppRoutes = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/"            element={<Home />} />
      <Route path="/movie/:id"   element={<MovieDetail />} />
      <Route path="/search"      element={<SearchResults />} />
      <Route path="/watchlist"   element={<Watchlist />} />
      <Route path="/login"       element={<Login />} />
      <Route path="/register"    element={<Register />} />
      <Route path="/profile"     element={<Profile />} />
      <Route path="/admin"       element={<Admin />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default AppRoutes;
