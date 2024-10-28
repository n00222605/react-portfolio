import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components
import Navbar from "./components/Navbar";

// Import pages
import Home from './pages/Home';
import SingleCountry from './pages/SingleCountry';
import CountriesList from './pages/CountriesList';
import NationalDish from './pages/NationalDish'; // Use NationalDish (singular)

import { Container } from 'react-bootstrap';

const App = () => {
    return (
        <Container>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/country/:name' element={<SingleCountry />} />
                    <Route path='/countries' element={<CountriesList />} />
                    {/* Updated route to capture idMeal parameter */}
                    <Route path='/nationalDish/:mealName' element={<NationalDish />} />
                </Routes>
            </Router>
        </Container>
    );
};

export default App;
