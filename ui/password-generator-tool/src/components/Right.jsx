import Characters from "./Characters";
import SendMail from "./SendMail";
import CharactersLength from './CharactersLength'

const Right = ({passwordLength, setPasswordLength, setCapitalAlphabet, setSmallAlphabet, setNumber, setSpecialCharacter, darkMode}) => {
    return (
        <>
            <div className="lg:w-4/12 mt-4">
                <CharactersLength passwordLength={passwordLength} setPasswordLength={setPasswordLength} />
                <div className="text-lg gap-y-3 grid">
                    <Characters title="uppercase letters" setCharacter={setCapitalAlphabet} />
                    <Characters title="lowercase letters" setCharacter={setSmallAlphabet} />
                    <Characters title="numbers" setCharacter={setNumber} />
                    <Characters title="symbols" setCharacter={setSpecialCharacter} />
                </div>
                <SendMail darkMode={darkMode} />
            </div>
        </>
    )
}

export default Right;