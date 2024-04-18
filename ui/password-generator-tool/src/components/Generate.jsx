import '../css/generate.css'
import { generatePasswordApi, passwordStrengthVerifier, suggestPasswordApi } from "../service/PasswordGeneratorApi"
import Characters from './Characters';
import CharactersLength from './CharactersLength';
import SendMail from './SendMail';
import CopyToClipboard from "react-copy-to-clipboard";
import { useState, useEffect } from "react"

const Generate = ({ darkMode }) => {

    const [capitalAlphabet, setCapitalAlphabet] = useState(false)
    const [smallAlphabet, setSmallAlphabet] = useState(false)
    const [number, setNumber] = useState(false)
    const [specialCharacter, setSpecialCharacter] = useState(false)
    const [passwordLength, setPasswordLength] = useState(8)
    const [generatedPassword, setGeneratedPassword] = useState('MyPassword')
    const [suggestedPassword, setSuggestedPassword] = useState("");
    const [passwordToCopy, setPasswordToCopy] = useState('');
    const [copy, setCopy] = useState('COPY')
    const [suggestedPasswordCopy, setSuggestedPasswordCopy] = useState('suggest')
    const [strength, setStrength] = useState('poor')


    useEffect(() => {
        callGeneratePasswordApi({ capitalAlphabet, smallAlphabet, number, specialCharacter, passwordLength })
    }, [capitalAlphabet, smallAlphabet, number, specialCharacter, passwordLength])

    useEffect(() => {
        setPasswordToCopy(generatedPassword)
    }, [generatedPassword])

    useEffect(() => {
        strengthVerifier(generatedPassword)
    }, [generatedPassword])

    useEffect(() => {
        callSuggestPasswordApi()
    }, [])

    const onCopyPassword = () => {
            setCopy('COPIED')
            setTimeout(function () {
                setCopy("Copy")
            }, 1000);
    }

    function refreshPassword() {
        callGeneratePasswordApi({ capitalAlphabet, smallAlphabet, number, specialCharacter, passwordLength })
    }

    function callGeneratePasswordApi(characters) {
        if (characters.capitalAlphabet == true || characters.smallAlphabet == true || characters.number == true || characters.specialCharacter == true) {
            generatePasswordApi(characters)
                .then(response => setGeneratedPassword(response.data))
                .catch(error => console.error(error))
        }
    }

    function callSuggestPasswordApi() {
        suggestPasswordApi()
            .then(response => setSuggestedPassword(response.data))
            .catch(error => console.error(error))
    }

    function strengthVerifier(password) {
        if (password.length != 0) {
            passwordStrengthVerifier({ checkPassword: password })
                .then(response => setStrength(response.data))
                .catch(error => console.error(error))
        }
    }

    const onSuggestedPasswordCopy = () => {
        setSuggestedPasswordCopy('copied')
        setTimeout(function () {
            setSuggestedPasswordCopy('suggest')
        }, 1000);
    }

    return (
        <div className="center-div">
            <div className="container">
                <div className="flex justify-center items-center">
                    <div className="lg:w-5/12">
                        <div
                            className={(darkMode == false) ? "text-2xl text-gray-800 uppercase w-full font-bold" : "text-2xl text-gray-500 font-bold uppercase"}
                        >
                            {strength}
                        </div>
                        <div className="mb-3 font-bold text-5xl w-9/12 truncate">
                            {generatedPassword}
                        </div>
                        <div className="flex gap-3 mt-5 font-bold">
                            <CopyToClipboard
                                text={passwordToCopy}
                                onCopy={onCopyPassword}
                            >
                                <button className="rounded-full text-sm shadow px-4 py-1 bg-green-700 text-black hover:bg-green-800 uppercase"
                                >
                                    {copy}
                                </button>
                            </CopyToClipboard>
                            <button
                                className="rounded-full shadow text-sm px-4 py-1 bg-green-700 text-black hover:bg-green-800"
                                onClick={() => refreshPassword()}
                            >
                                REFRESH
                            </button>
                            <CopyToClipboard
                                text={suggestedPassword}
                                onCopy={onSuggestedPasswordCopy}
                            >
                                <button
                                    className="rounded-full text-sm shadow px-4 py-1 bg-green-700 text-black hover:bg-green-800 uppercase"
                                    onClick={() => callSuggestPasswordApi()}
                                >
                                    {suggestedPasswordCopy}
                                </button>
                            </CopyToClipboard>
                        </div>
                    </div>
                    <div className="lg:w-4/12 mt-4">
                        <CharactersLength passwordLength={passwordLength} setPasswordLength={setPasswordLength} />
                        <div className="text-lg gap-y-3 grid">
                            <Characters title="uppercase letters" value={capitalAlphabet} setCharacter={setCapitalAlphabet} />
                            <Characters title="lowercase letters" value={smallAlphabet} setCharacter={setSmallAlphabet} />
                            <Characters title="numbers" value={number} setCharacter={setNumber} />
                            <Characters title="symbols" value={specialCharacter} setCharacter={setSpecialCharacter} />
                        </div>
                        <SendMail darkMode={darkMode} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Generate