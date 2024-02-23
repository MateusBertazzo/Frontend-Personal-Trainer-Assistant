import Loading from './Loading';

interface ButtonProps {
    text: string;
    onClick?: () => void;
    style?: string;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

function Button({ text, onClick, style, loading, type }: ButtonProps) {
    return (
        <button type={ type } className={`flex justify-center items-center h-12 rounded-md bg-[var(--orange)] hover:bg-orange-400 transition-all duration-500 ease-in-out font-bold text-white ${style}`} onClick={onClick}>
            { loading ? <Loading /> : text }
        </button>
    );
}

export default Button;