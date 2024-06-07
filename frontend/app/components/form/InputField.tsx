export default function InputField({ name, placeholder, type } : { name: string, placeholder: string, type?: string }) {
    return (
        <input 
            className="border-2 border-gray-300 focus:border-gray-700 focus:outline-none rounded-xl focus:ring-0 py-2 px-2 text-lg w-72 transition"
            name={name}
            placeholder={placeholder}
            type={type}
        />
    )
}