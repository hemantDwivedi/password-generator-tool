import { useState, useEffect } from "react"
import { Container, Row, Col } from 'react-bootstrap';
import { generatePasswordApi, sentMailApi, suggestPasswordApi } from "../service/PasswordGeneratorApi"
import '../css/generate.css'
import CopyToClipboard from "react-copy-to-clipboard";

const Generate = ({ darkMode }) => {

    const [capitalAlphabet, setcapitalAlphabet] = useState(false)
    const [smallAlphabet, setSmallAlphaabet] = useState(false)
    const [number, setNumber] = useState(false)
    const [specialCharacter, setSpecialCharacter] = useState(false)
    const [passwordLength, setPasswordLength] = useState(8)
    const [generatedPassword, setGeneratedPassword] = useState('MyPassword')
    const [suggestedPassword, setSuggestedPassword] = useState("");
    const [sendToEmail, setSendToEmail] = useState(false)
    const [recipientEmail, setRecipientEmail] = useState('')
    const [recipientName, setRecipientName] = useState('')
    const [passwordToCopy, setPasswordToCopy] = useState('');
    const [copy, setCopy] = useState('COPY')
    const [suggestedPasswordIsCopy, setSuggestedPasswordIsCopy] = useState(false)
    const [settings, setSettings] = useState(0)
    const [isEmailEmpty, setIsEmailEmpty] = useState(false)
    const [isNameEmpty, setIsNameEmpty] = useState(false)
    const [errors, setErrors] = useState({
        name: '',
        email: ''
    })

    useEffect(() => {
        if (settings > 0) callGeneratePasswordApi({ capitalAlphabet, smallAlphabet, number, specialCharacter, passwordLength })
    }, [capitalAlphabet, smallAlphabet, number, specialCharacter, passwordLength])

    useEffect(() => {
        if (settings < 4 && settings > 0) callSuggestPasswordApi(passwordLength)
    }, [passwordLength, settings])

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

    function sentMail(e) {
        e.preventDefault()


        if (validateInputs()) {

            const reqData = { recipientName, recipientEmail, password: generatedPassword }
            sentMailApi(reqData)
                .then(response => console.log(response))
                .catch(error => console.error(error))
        }
    }

    function handleSettings(check) {
        var num = settings
        if (check) setSettings(++num)
        else setSettings(--num)
    }

    function validateInputs() {
        let valid = true

        if (recipientEmail.trim()) {
            setIsEmailEmpty(false)
        } else {
            setIsEmailEmpty(true)
            valid = false
        }

        if (recipientName.trim()) {
            setIsNameEmpty(false)
        } else {
            setIsNameEmpty(true)
            valid = false
        }

        return valid
    }

    const onCopyPassword = () => {
        if (!generatedPassword.startsWith("Configure")) {
            setCopy('COPIED')
            setTimeout(function () {
                setCopy("Copy")
            }, 1000);
        }
    }

    const onSuggestedPasswordCopy = () => {
        if (!generatedPassword.startsWith("Configure")) {
            setSuggestedPasswordIsCopy(true)
            setTimeout(function () {
                setSuggestedPasswordIsCopy(false)
            }, 1000);
        }
    }

    return (
        <div className="center-div">
            <div className="container">
                <div className="flex justify-center items-center">
                    <div className="lg:w-5/12">
                        <div className="flex gap-4 mb-3 font-bold text-5xl text-ellipsis">
                            {generatedPassword}
                            <div
                            className={(darkMode == false) ? "text-2xl text-gray-800 uppercase" :  "text-2xl text-gray-500 uppercase"}
                            >
                                very strong
                            </div>
                        </div>
                        <div className="flex gap-3 mt-5 font-bold">
                            <CopyToClipboard
                                text={passwordToCopy}
                                onCopy={onCopyPassword}
                            >
                                <button className="rounded-full text-sm shadow px-4 py-1 bg-green-700 text-black hover:bg-green-800">
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
                                <button className="border-1 rounded-5 shadow px-4 bg-green-700 text-black rounded-full hover:bg-green-800">
                                    Suggest
                                </button>
                            </CopyToClipboard>
                            {
                                suggestedPasswordIsCopy &&
                                <div className="text-primary" style="font-size: 13px; font-weight: bold;">Copied</div>
                            }
                        </div>
                    </div>
                    <div className="lg:w-4/12 mt-4">

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
                        <div className="text-lg gap-y-3 grid">
                            <div className="border-2 p-3 border-gray-800 rounded-3xl">
                                <label className="flex items-center me-5 cursor-pointer justify-between">
                                    <span className="text-sm font-bold">Uppercase Letters</span>
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-green-800 dark:bg-gray-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                </label>
                            </div>
                            <div className="border-2 p-3 border-gray-800 rounded-3xl">
                                <label className="flex items-center me-5 cursor-pointer justify-between">
                                    <span className="text-sm font-bold">Lowercase Letters</span>
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-green-800 dark:bg-gray-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                </label>
                            </div>
                            <div className="border-2 p-3 border-gray-800 rounded-3xl">
                                <label className="flex items-center me-5 cursor-pointer justify-between">
                                    <span className="text-sm font-bold">Numbers</span>
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-green-800 dark:bg-gray-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                </label>
                            </div>
                            <div className="border-2 p-3 border-gray-800 rounded-3xl">
                                <label className="flex items-center me-5 cursor-pointer justify-between">
                                    <span className="text-sm font-bold">Symbols</span>
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-green-800 dark:bg-gray-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                </label>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="font-bold border-b w-28 border-green-700 pb-1 mb-4">Send to Email</p>
                            <div className="">
                                <input
                                    className={
                                        (darkMode == false) ? "bg-slate-900 border-0 p-2 rounded-md w-full mb-4 font-medium" :
                                            "bg-gray-300 border-0 p-2 rounded-md w-full mb-4 text-green-900 font-medium"
                                    }
                                    type="text"
                                    placeholder='Name'
                                    name="recipientName"
                                    value={recipientName}
                                    onChange={(e) => setRecipientName(e.target.value)}
                                />
                                {
                                    isNameEmpty &&
                                    <label className="flex justify-end text-danger rounded-2" style="font-size: 11px; font-weight: bold;">required</label>
                                }
                            </div>
                            <div>
                                <input
                                    className={
                                        (darkMode == false) ? "bg-slate-900 border-0 p-2 rounded-md w-full mb-4 font-medium" :
                                            "bg-gray-300 border-0 p-2 rounded-md w-full mb-4 text-green-900 font-medium"
                                    }
                                    type="email"
                                    placeholder="Email Address"
                                    name="recipientEmail"
                                    value={recipientEmail}
                                    onChange={(e) => setRecipientEmail(e.target.value)}
                                />
                                {
                                    isEmailEmpty &&
                                    <label className="flex justify-end text-danger rounded-2" style="font-size: 11px; font-weight: bold;">required</label>
                                }
                            </div>
                            <div>
                                <button
                                    className='rounded-md shadow px-4 py-2 bg-green-700 text-black font-bold hover:bg-green-800'
                                    onClick={() => sendToEmail()}>
                                    SEND
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Generate