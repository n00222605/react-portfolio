import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import '../css/regionFilter.css';

const RegionFilter = ({ fetchCountriesByRegion }) => {
    const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
    const [selectedRegion, setSelectedRegion] = useState(null);

    const handleBadgeClick = (region) => {
        setSelectedRegion(region);
        fetchCountriesByRegion(region);
    };

    return (
        <div className="RegionFilter">
            <div className="mb-3">
                {regions.map((region, index) => (
                    <Badge
                        key={index}
                        pill
                        className={`mx-1 ${selectedRegion === region ? 'selected' : ''}`}
                        onClick={() => handleBadgeClick(region)}
                        style={{ cursor: "pointer", textDecoration: "none" }}
                    >
                        {region}
                    </Badge>
                ))}
            </div>
        </div>
    );
};

export default RegionFilter;
