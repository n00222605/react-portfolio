import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row } from 'react-bootstrap';
import CountryCard from '../components/CountryCard';
import AccordionFilter from '../components/AccordionFilter';

const Home = () => {
    const [countriesList, setCountriesList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [allCountries, setAllCountries] = useState([]);

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountriesList(response.data);
                setAllCountries(response.data);
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
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        // Filter countries based on search term
        const filteredCountries = allCountries.filter(country =>
            country.name.common.toLowerCase().includes(term)
        );
        setCountriesList(filteredCountries);
    };


    return (
        <div>
            <AccordionFilter 
                fetchCountriesByRegion={fetchCountriesByRegion} 
                fetchCountriesByLetter={fetchCountriesByLetter}
            />
            <input 
                placeholder='Search' 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
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
