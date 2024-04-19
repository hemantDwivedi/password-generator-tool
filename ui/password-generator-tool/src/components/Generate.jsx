import '../css/generate.css'
import error from '../assets/error.svg'
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
    const [serverDown, setServerDown] = useState(false)


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
            .catch(() => setServerDown(true))
        console.log('server down: ' + serverDown);
    }

    function strengthVerifier(password) {
        if (password.length != 0) {
            passwordStrengthVerifier({ checkPassword: password })
                .then(response => setStrength(response.data))
                .catch(() => setServerDown(true))
        }
    }

    const onSuggestedPasswordCopy = () => {
        setSuggestedPasswordCopy('copied')
        setTimeout(function () {
            setSuggestedPasswordCopy('suggest')
        }, 1000);
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            {
                (serverDown != true) ?
                    <div className="container">
                        <div className="md:flex justify-center items-center p-5 md:p-0">
                            <div className="lg:w-5/12 mb-10 md:mb-0">
                                <div
                                    className={(darkMode == false) ? "md:text-2xl text-gray-800 uppercase w-full font-bold" : "md:text-2xl text-gray-500 font-bold uppercase"}
                                >
                                    {strength}
                                </div>
                                <div className="mb-3 font-bold text-3xl md:text-5xl w-9/12 truncate">
                                    {generatedPassword}
                                </div>
                                <div className="flex gap-1 md:gap-2 mt-5 font-bold">
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
                            <div className="lg:w-4/12">
                                <CharactersLength passwordLength={passwordLength} setPasswordLength={setPasswordLength} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                                    <Characters title="uppercase letters" value={capitalAlphabet} setCharacter={setCapitalAlphabet} />
                                    <Characters title="lowercase letters" value={smallAlphabet} setCharacter={setSmallAlphabet} />
                                    <Characters title="numbers" value={number} setCharacter={setNumber} />
                                    <Characters title="symbols" value={specialCharacter} setCharacter={setSpecialCharacter} />
                                </div>
                                <SendMail darkMode={darkMode} generatedPassword={generatedPassword} />
                            </div>
                        </div>
                    </div>
                    :
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-4xl font-bold mb-4 text-center">Server Down</h1>
                        <p className="text-lg text-gray-600 mb-8 text-center">We apologize for the inconvenience, but the server is currently down. Please try again later.</p>
                        <img src={error} alt="Server Down Illustration" className="w-32 h-auto max-w-sm mb-8" />
                    </div>
            }
        </div>
    )
}

export default Generate