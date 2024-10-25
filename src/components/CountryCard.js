import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../css/countryCard.css';

const CountryCard = (props) => {
    const { name, flag, region } = props;

    return (
        <div className="col-md-4 my-3 d-flex">
            <Card className="country-card h-100 w-100">
                <Card.Img className="card-img" src={flag} variant="top" />
                <Card.Body className="d-flex flex-column">
                    <div className="card-content">
                        <Card.Title>
                            <Link to={`/country/${name}`}>{name}</Link>
                        </Card.Title>
                        <p>Continent: {region}</p>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CountryCard;
