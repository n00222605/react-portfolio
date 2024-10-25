import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Row, Col, Image } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then((res) => {
                setCountry(res.data[0]);
            })
            .catch((e) => {
                console.error(e);
            });
    }, [name]);

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
            </Col>
            <Col xs={12} md={6}>
                <h1>{country.name.common}</h1>
                <h2>Official name: {country.name.official}</h2>
                <p>Region: {country.region}</p>
                {country.subregion && <p>Sub-Region: {country.subregion}</p>}
                <p>Languages:</p>
                <ul>
                    {Object.values(country.languages).map((language, index) => (
                        <li key={index}>{language}</li>
                    ))}
                </ul>
                <p>Currency: {Object.values(country.currencies)[0].name} ({Object.values(country.currencies)[0].symbol})</p>
            </Col>
            <Col xs={12}>
                <h3>Location</h3>
                <MapContainer center={latlng} zoom={6} style={{ height: "400px", width: "100%" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                </MapContainer>
            </Col>
        </Row>
    );
}

export default SingleCountry;
