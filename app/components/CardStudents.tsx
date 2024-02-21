import Image from 'next/image';
import fakeData from '../fakecards/fakeData';

function CardStudents({ name, img }: any) {
    return (
        <div 
        style={ { backgroundImage: `url(${img})`, backgroundPosition: "center", backgroundRepeat: "no-repeat" } }
        className='w-44 h-44 rounded-md'
        >
            <div className='rounded-md flex w-full h-full p-2 items-end justify-center text-white bg-gradient-to-t from-black to-transparent'>
                <h2 className='font-bold'>{name}</h2>
            </div>
        </div>
    );
}

export default CardStudents;