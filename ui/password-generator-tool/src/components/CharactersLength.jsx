const CharactersLength = ({ passwordLength, setPasswordLength }) => {
    return (
        <>
            <div className="flex justify-between mb-3 font-bold">
                <label className="text-sm">Characters length:</label>
                <label className="text-4xl">{passwordLength}</label>
            </div>
            <div className="mb-10 md:mb-5">
                <input
                    type="range"
                    min={8}
                    max={24}
                    value={passwordLength}
                    onChange={(e) => setPasswordLength(e.target.value)}
                    className="w-full h-1 accent-green-700 bg-gray-200 rounded-lg appearance-none dark:bg-slate-800"
                />
            </div>
        </>
    )
}

export default CharactersLength;