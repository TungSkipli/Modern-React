import { useState } from "react"

import bird from '../assets/bird.svg'
import cat from '../assets/cat.svg'
import dog from '../assets/dog.svg'
import gator from '../assets/gator.svg'
import heart from '../assets/heart.svg'
import horse from '../assets/horse.svg'

import '../Styles/animal/animal.css'
function getRandomAnimal() {
    const animals = [bird, cat, dog, gator, horse];
    return animals[ Math.floor(Math.random() * animals.length)];
}

export default function Animal(){

    const [animals, setAnimals]=useState([]);
    const [clicks, setClicks] = useState([]);

    const handleClick=()=>{
        setAnimals([...animals, getRandomAnimal()]);
        setClicks([...clicks, 0]);
    }

    const handleAnimalClick = (index) => {
        const newClicks = [...clicks];
        newClicks[index] = newClicks[index] + 1;
        setClicks(newClicks);
    };

    return(
        <div>
            <button className="button-animal" onClick={handleClick}>
                add animals
            </button>
            <div>
                {animals.map((animal, index) => (
                    <div key={index} className="animal-container">
                        <div className="image-wrapper">
                            <img
                                src={animal}
                                alt={"animal-" + index}
                                className="img-animals"
                                onClick={() => handleAnimalClick(index)}
                            />
                            <img
                                src={heart}
                                alt={"heart-" + index}
                                className="img-heart"
                                style={{ width: (20 + 10 * clicks[index]) + 'px', cursor: 'pointer' }}
                                onClick={() => handleAnimalClick(index)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}