import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Image, Row, Col } from 'react-bootstrap';

const NationalDish = () => {
    const { mealName } = useParams(); // Get the meal name from the URL
    const [dish, setDish] = useState(null);

    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
            .then((res) => {
                if (res.data.meals) {
                    setDish(res.data.meals[0]);
                } else {
                    setDish(null); // Handle case if no dish is found
                }
            })
            .catch((error) => {
                console.error("Error fetching dish:", error);
            });
    }, [mealName]);

    if (!dish) {
        return <div>Loading...</div>;
    }

    return (
        <Card>
            <Card.Body>
                <Row>
                    {/* Left Column for Image */}
                    <Col md={6}>
                        <Image src={dish.strMealThumb} alt={dish.strMeal} fluid />
                    </Col>

                    {/* Right Column for Ingredients */}
                    <Col md={6}>
                        <h1>{dish.strMeal}</h1>
                        <h2>Ingredients</h2>
                        <ul>
                            {[...Array(20)].map((_, i) => {
                                const ingredient = dish[`strIngredient${i + 1}`];
                                const measure = dish[`strMeasure${i + 1}`];
                                return ingredient ? <li key={i}>{ingredient} - {measure}</li> : null;
                            })}
                        </ul>
                    </Col>
                </Row>

                {/* Instructions Row */}
                <Row>
                    <Col>
                        <h2>Instructions</h2>
                        <p>{dish.strInstructions}</p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default NationalDish;
