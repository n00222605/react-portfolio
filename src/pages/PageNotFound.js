import { useLocation } from "react-router-dom";

const PageNotFound = () => {
    let location = useLocation();

    return (
        <h2>Sorry, 404 The page {location.pathname} was not found.</h2>
    );
};

export default PageNotFound;