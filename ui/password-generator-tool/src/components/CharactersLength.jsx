const CharactersLength = ({ passwordLength, setPasswordLength }) => {
    return (
        <>
            <div className="flex justify-between mb-3 font-bold">
                <label className="text-sm">Characters length:</label>
                <label className="text-4xl">{passwordLength}</label>
            </div>
            <div className="mb-5">
                <input
                    type="range"
                    min="8" max="24" value={passwordLength}
                    className="w-full h-1 accent-green-700 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-800"
                    onChange={(e) => setPasswordLength(e.target.value)}
                />
            </div>
        </>
    )
}

export default CharactersLength;