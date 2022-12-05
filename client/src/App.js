import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Movie from "./components/Movie";
import Actor from "./components/Actor";
import Reviews from "./components/Reviews";
import Ratings from "./components/Ratings";
import Movies from "./components/Movies";
import GlobalStyles from "./GlobalStyles";
import Account from "./components/Account";
import Search from "./components/Search";
import ErrorPage from "./components/ErrorPage";
import CrewDetails from "./components/CrewDetails";
import GenreDetails from "./components/GenreDetails";
import SearchPeople from "./components/SearchPeople";
import Show from "./components/Show";
import ProductionDetails from "./components/ProductionDetails";
import List from "./components/List";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lists" element={<List />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/genre/:genre" element={<GenreDetails />} />
        <Route path="/movies/production/:company" element={<ProductionDetails />} />
        <Route path="/movie/:title" element={<Movie />} />
        <Route path="/show/:title" element={<Show />} />
        <Route path="/actor/:name" element={<Actor />} />
        <Route path="/crew/:name" element={<CrewDetails />} />
        <Route path="/movie/:title/reviews" element={<Reviews />} />
        <Route path="/movie/:title/ratings" element={<Ratings />} />
        <Route path="/search/movies/:movie" element={<Search />} />
        <Route path="/search/people/:person" element={<SearchPeople />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
