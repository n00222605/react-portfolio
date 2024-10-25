import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const CountriesList = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        // Fetch the list of countries from the API
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {
                // Extract the names of the countries and sort them
                const countryNames = response.data.map(country => country.name.common);
                countryNames.sort(); // Sort alphabetically
                setCountries(countryNames);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
            });
    }, []);

    // Group countries by their first letter
    const groupedCountries = countries.reduce((acc, country) => {
        const firstLetter = country.charAt(0).toUpperCase(); // Get the first letter
        if (!acc[firstLetter]) {
            acc[firstLetter] = []; // Initialize the array if it doesn't exist
        }
        acc[firstLetter].push(country); // Push the country to the corresponding letter
        return acc;
    }, {});

    return (
        <div>
            {Object.keys(groupedCountries).sort().map(letter => (
                <div key={letter}>
                    <h1>{letter}</h1> {/* Display the letter as an h1 */}
                    <ul>
                        {groupedCountries[letter].map(country => (
                            <li key={country}>
                                <Link to={`/country/${country}`}>{country}</Link> {/* Link to each country */}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default CountriesList;
