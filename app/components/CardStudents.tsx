import Image from 'next/image';
import fakeData from '../fakecards/fakeData';

function CardStudents({ name, img }: any) {
    return (
        <div style={ { backgroundImage: `url(${img})`, backgroundPosition: "center", backgroundRepeat: "no-repeat" } }>
            <div>
                <h2>{name}</h2>

            </div>
        </div>
    );
}

export default CardStudents;