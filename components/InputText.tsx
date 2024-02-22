interface InputProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    style?: string;
    error?: { border: string; } | undefined;
}

function InputText({ type, placeholder, value, onChange, style }: InputProps) {
    return (
        <input 
            className={`flex flex-col h-12 rounded-md p-2 bg-gray-100 border border-gray-300 ${style}`}
            type={type} 
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={{ border: style }}
        />
    );
}

export default InputText;