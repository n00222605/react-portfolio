import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import '../css/letterFilter.css';

const LetterFilter = ({ fetchCountriesByLetter }) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''); // Create an array with letters A to Z
    const [selectedLetter, setSelectedLetter] = useState(null);

    const handleBadgeClick = (letter) => {
        setSelectedLetter(letter);
        fetchCountriesByLetter(letter);
    };

    return (
        <div className="LetterFilter mb-3">
            {alphabet.map((letter) => (
                <Badge
                    key={letter}
                    pill
                    className={`mx-1 ${selectedLetter === letter ? 'selected' : ''}`}
                    onClick={() => handleBadgeClick(letter)}
                    style={{ cursor: "pointer" }}
                >
                    {letter}
                </Badge>
            ))}
        </div>
    );
};

export default LetterFilter;