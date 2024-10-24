import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import RegionFilter from './RegionFilter';
import LetterFilter from './LetterFilter';

const AccordionFilter = ({ fetchCountriesByRegion, fetchCountriesByLetter }) => {
    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="1">
                <Accordion.Header>Filter By Letter</Accordion.Header>
                <Accordion.Body>
                <LetterFilter fetchCountriesByLetter={fetchCountriesByLetter} />
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
                <Accordion.Header>Filter By Region</Accordion.Header>
                <Accordion.Body>
                    <RegionFilter fetchCountriesByRegion={fetchCountriesByRegion} />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default AccordionFilter;
