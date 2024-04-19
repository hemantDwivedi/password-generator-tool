const Characters = ({ title, value, setCharacter }) => {
    return (
        <>
            <div className="border-2 p-3 border-gray-800 rounded-full">
                <label className="flex items-center me-5 cursor-pointer justify-between">
                    <span className="text-sm font-bold capitalize">
                        {title}
                    </span>
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        onClick={() => setCharacter(!value)}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-green-800 dark:bg-gray-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                </label>
            </div>
        </>
    )
}

export default Characters;