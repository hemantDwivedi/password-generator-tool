import '../css/generate.css'
import { useState, useEffect } from "react"
import { generatePasswordApi, suggestPasswordApi } from "../service/PasswordGeneratorApi"
import Left from './Left';
import Right from './Right';

const Generate = ({ darkMode }) => {

    const [capitalAlphabet, setCapitalAlphabet] = useState(true)
    const [smallAlphabet, setSmallAlphabet] = useState(true)
    const [number, setNumber] = useState(true)
    const [specialCharacter, setSpecialCharacter] = useState(true)
    const [passwordLength, setPasswordLength] = useState(8)
    const [generatedPassword, setGeneratedPassword] = useState('MyPassword')
    const [suggestedPassword, setSuggestedPassword] = useState("");
    const [passwordToCopy, setPasswordToCopy] = useState('');
    
    

    useEffect(() => {
        callGeneratePasswordApi({ capitalAlphabet, smallAlphabet, number, specialCharacter, passwordLength })
    }, [capitalAlphabet, smallAlphabet, number, specialCharacter, passwordLength])

    useEffect(() => {
        setPasswordToCopy(generatedPassword)
    }, [generatedPassword])

    function refreshPassword() {
        callGeneratePasswordApi({ capitalAlphabet, smallAlphabet, number, specialCharacter, passwordLength })
    }

    function callGeneratePasswordApi(characters) {
        generatePasswordApi(characters)
            .then(response => setGeneratedPassword(response.data))
            .catch(error => console.error(error))
    }

    function callSuggestPasswordApi(passwordLength) {
        suggestPasswordApi(passwordLength)
            .then(response => setSuggestedPassword(response.data))
            .catch(error => console.error(error))
    }

    const onSuggestedPasswordCopy = () => {
        if (!generatedPassword.startsWith("Configure")) {
            setSuggestedPassword('copied')
            setTimeout(function () {
                setSuggestedPassword('suggest')
            }, 1000);
        }
    }

    return (
        <div className="center-div">
            <div className="container">
                <div className="flex justify-center items-center">
                    <Left gp={generatedPassword} darkMode={darkMode} suggestedPassword={suggestedPassword} onSuggestedPasswordCopy={onSuggestedPasswordCopy} passwordToCopy={passwordToCopy} callSuggestPasswordApi={callSuggestPasswordApi}  />
                    <Right passwordLength={passwordLength} setPasswordLength={setPasswordLength} setCapitalAlphabet={setCapitalAlphabet} setSmallAlphabet={setSmallAlphabet} setNumber={setNumber} setSpecialCharacter={setSpecialCharacter} darkMode={darkMode} />
                </div>
            </div>
        </div>
    )
}

export default Generate