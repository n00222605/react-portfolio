import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Alert } from 'react-bootstrap'; // Import Alert from react-bootstrap
import CountryCard from '../components/CountryCard';
import AccordionFilter from '../components/AccordionFilter';

const Home = () => {
    const [countriesList, setCountriesList] = useState([]);
    const [allCountries, setAllCountries] = useState([]);
    const [displayedCount, setDisplayedCount] = useState(0); // State to keep track of displayed country count

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountriesList(response.data);
                setAllCountries(response.data);
                setDisplayedCount(response.data.length); // Initialize displayed count
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    // Filter countries by region
    const fetchCountriesByRegion = (region) => {
        axios.get(`https://restcountries.com/v3.1/region/${region}`)
            .then(response => {
                setCountriesList(response.data);
                setDisplayedCount(response.data.length); // Update displayed count
            })
            .catch(error => {
                console.error(error);
            });
    };

    // Fetch countries based on the selected letter
    const fetchCountriesByLetter = (letter) => {
        const filtered = allCountries.filter(country => 
            country.name.common.startsWith(letter)
        );
        setCountriesList(filtered);
        setDisplayedCount(filtered.length); // Update displayed count
    };

    return (
        <div>
            <AccordionFilter 
                fetchCountriesByRegion={fetchCountriesByRegion} 
                fetchCountriesByLetter={fetchCountriesByLetter}
            />
            {/* Displaying results message */}
            {displayedCount > 0 && (
                <Alert variant="info" className="mb-3">
                    Displaying results for {displayedCount} countries
                </Alert>
            )}
            <Row md={3} xs={1}>
                {countriesList.map(country => (
                    <CountryCard 
                        key={country.ccn3} 
                        flag={country.flags.png} 
                        name={country.name.common} 
                        region={country.region} 
                    />
                ))}
            </Row>
        </div>
    );
};

export default Home;
