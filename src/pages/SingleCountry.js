import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Card, Row, Col, Image } from 'react-bootstrap';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const SingleCountry = () => {
    const { name } = useParams();
    const [country, setCountry] = useState(null);
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then((res) => {
                setCountry(res.data[0]);
            })
            .catch((e) => {
                console.error(e);
            });
    }, [name]);

    useEffect(() => {
        if (country) {
            const demonym = country.demonyms.eng.m.toLowerCase();

            // Fetch dishes from the MealDB API based on country demonym
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${demonym}`)
                .then(response => response.json())
                .then(data => {
                    if (data.meals) {
                        setDishes(data.meals);
                    } else {
                        setDishes([]);
                    }
                })
                .catch(error => console.error("Error fetching dishes:", error));
        }
    }, [country]);

    if (!country) {
        return <div>Loading...</div>;
    }

    const { latlng } = country;

    return (
        <Row>
            <Col xs={12} md={6} className="text-center">
                <Image
                    src={country.flags.png}
                    alt={`${country.name.common}'s flag`}
                    fluid
                    className="country-flag"
                />
                <p className="flag-desc">{country.flags.alt}</p>
            </Col>

            <Col xs={12} md={6}>
                <h1>{country.name.common}</h1>
                <h2>Official name: {country.name.official}</h2>
                <p>Languages:</p>
                <ul>
                    {Object.values(country.languages).map((language, index) => (
                        <li key={index}>{language}</li>
                    ))}
                </ul>
            </Col>

            <Col xs={12}>
                <Card className="location-card mb-4 bg-green">
                    <Card.Body>
                        <Row>
                            <Col md={6} className="text-col">
                                <h1>Facts</h1>

                                <p><strong>Native Names:</strong></p>
                                <ul>
                                    {Object.entries(country.name.nativeName).map(([lang, names]) => (
                                        <li key={lang}>
                                            <strong>{lang.toUpperCase()}:</strong> {names.official} ({names.common})
                                        </li>
                                    ))}
                                </ul>

                                <p><strong>Region:</strong> {country.region}</p>
                                <p><strong>Subregion:</strong> {country.subregion || 'N/A'}</p>
                                <p><strong>Population:</strong> {country.population.toLocaleString()}</p>

                                <p><strong>Currency:</strong> {Object.values(country.currencies).map(currency => (
                                    <span key={currency.name}>{currency.name} ({currency.symbol})</span>
                                ))}</p>

                                <p><strong>Capital:</strong> {country.capital[0]}</p>

                                {/* Dishes Section */}
                                <h2>National Dishes</h2>
                                {dishes.length > 0 ? (
                                    <ul>
                                        {dishes.map(dish => (
                                            <li key={dish.idMeal}>
                                                <Link to={`/nationalDish/${dish.strMeal}`}>
                                                    {dish.strMeal}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No national dishes found for this country.</p>
                                )}
                            </Col>

                            <Col md={6} className="map-col">
                                <MapContainer
                                    center={latlng}
                                    zoom={6}
                                    style={{ height: "500px", width: "100%" }}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                </MapContainer>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default SingleCountry;
