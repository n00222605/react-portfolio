import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import Home from './pages/Home.js';
import About from "./pages/About.js";
import Contact from "./pages/Contact.js";
import PageNotFound from "./pages/PageNotFound.js";
import RedirectExample from "./pages/RedirectExample.js";

import Navbar from "./components/Navbar.js";

const App = () => {
    return (
        <Router>
            <Navbar/>
        
        <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/about"} element={<About />} />
            <Route path={"/contact"} element={<Contact />} />
            <Route path={"/redirect-example"} element={<RedirectExample />} />

            <Route path='*' element={<PageNotFound/>}/>
        </Routes>

        </Router>
    );
};

export default App;