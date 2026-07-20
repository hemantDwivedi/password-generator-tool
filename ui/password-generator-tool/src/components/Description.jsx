const Description = ({ darkMode }) => {
    return (
        <div className="flex justify-center px-4 pt-4 md:pt-28 pb-4 text-center">
            <div className="max-w-2xl">
                <p className="font-mono font-bold text-3xl md:text-5xl mb-4">
                    Random Password Generator
                </p>
                <p className={(darkMode == false) ? "text-gray-400" : "text-gray-600"}>
                    Say goodbye to weak passwords and enhance your online security effortlessly.
                    Customize your passwords with a click, including uppercase letters, lowercase
                    letters, numbers, and special characters.
                </p>
            </div>
        </div>
    )
}

export default Description;
