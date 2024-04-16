import { useState, useEffect } from "react"
import { Container, Row, Col } from 'react-bootstrap';
import { generatePasswordApi, sentMailApi, suggestPasswordApi } from "../service/PasswordGeneratorApi"
import '../css/generate.css'
import CopyToClipboard from "react-copy-to-clipboard";

const Generate = () => {

    const [capitalAlphabet, setcapitalAlphabet] = useState(false)
    const [smallAlphabet, setSmallAlphaabet] = useState(false)
    const [number, setNumber] = useState(false)
    const [specialCharacter, setSpecialCharacter] = useState(false)
    const [passwordLength, setPasswordLength] = useState(8)
    const [generatedPassword, setGeneratedPassword] = useState('')
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
                        <div className="flex justify-between py-2 px-3" style={{ "width": "80%" }}>
                            <div className="truncate select-all" style={settings > 0 ? { fontSize: "18px", maxWidth: "350px" } : { color: "red" }}>{settings > 0 ? generatedPassword : 'One character must be selected'}</div>
                            <div className="flex gap-3">
                                {settings == 4 && (
                                    <label className="my-auto font-bold bg-success px-2 py-1 rounded-3 text-white" style="font-size: 10px;">VERY STRONG</label>
                                )}
                                {settings == 3 && (
                                    <label className="my-auto font-bold bg-success bg-opacity-75 px-2 py-1 rounded-3 text-white" style="font-size: 10px;">STRONG</label>
                                )}
                                {settings == 2 && (
                                    <label className="my-auto font-bold bg-warning px-2 py-1 rounded-3 text-white" style="font-size: 10px;">GOOD</label>
                                )}
                                {settings == 1 && (
                                    <label className="my-auto bg-danger px-2 py-1 rounded-3 font-bold" style="font-size: 10px; color: white;">POOR</label>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <CopyToClipboard
                                text={passwordToCopy}
                                onCopy={onCopyPassword}
                            >
                                <button className="rounded-full shadow px-4 py-1 bg-green-700 text-black">
                                    <strong>{copy}</strong>
                                </button>
                            </CopyToClipboard>
                            <button
                                className="rounded-full shadow px-4 py-1 bg-green-700 text-black"
                                onClick={() => refreshPassword()}
                            >
                                <strong>REFRESH</strong>
                            </button>
                        </div>
                    </div>
                    <div className="mt-4">
                        {
                            settings > 0 && settings < 4 &&
                            <div className="flex justify-start gap-2 my-3">
                                <label className="font-bold">Password Suggestion:</label>
                                <CopyToClipboard
                                    text={suggestedPassword}
                                    onCopy={onSuggestedPasswordCopy}
                                >
                                    <button className="border-1 rounded-5 shadow px-4">
                                        <strong>{suggestedPassword}</strong>
                                    </button>
                                </CopyToClipboard>
                                {
                                    suggestedPasswordIsCopy &&
                                    <div className="text-primary" style="font-size: 13px; font-weight: bold;">Copied</div>
                                }
                            </div>
                        }
                        <div className="flex justify-between text-lg mb-3 mt-2">
                            <label>Password length:</label>
                            <label>{passwordLength}</label>
                        </div>
                        <div className="mb-4">
                            <input
                                className="w-full"
                                type="range"
                                min="8"
                                max="24"
                                name="passwordLength"
                                value={passwordLength}
                                onChange={(e) => setPasswordLength(e.target.value)}
                            />
                        </div>
                        <div className="text-lg gap-y-3 grid">
                            <div className="border-2 p-3 border-gray-800 rounded-3xl">
                                <label className="flex items-center me-5 cursor-pointer justify-between">
                                    <span className="text-sm font-medium">Uppercase Letters</span>
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-green-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                </label>
                            </div>
                            <div className="border-2 p-3 border-gray-800 rounded-3xl">
                                <label className="flex items-center me-5 cursor-pointer justify-between">
                                    <span className="text-sm font-medium">Lowercase Letters</span>
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-green-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                </label>
                            </div>
                            <div className="border-2 p-3 border-gray-800 rounded-3xl">
                                <label className="flex items-center me-5 cursor-pointer justify-between">
                                    <span className="text-sm font-medium">Numbers</span>
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-green-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                </label>
                            </div>
                            <div className="border-2 p-3 border-gray-800 rounded-3xl">
                                {/* <input
                                    className="form-checkbox shadow border border-1 border-black"
                                    type="checkbox"
                                    name="specialCharacter"
                                    checked={specialCharacter}
                                    onChange={(e) => {
                                        setSpecialCharacter(e.target.checked)
                                        handleSettings(e.target.checked)
                                    }}
                                />
                                <label>%&*&#36;</label> */}
                                <label className="flex items-center me-5 cursor-pointer justify-between">
                                    <span className="text-sm font-medium">Symbols</span>
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-green-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                </label>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="border-b w-28 border-green-700 pb-1 mb-4">Send to Email</p>
                            <div className="">
                                <input
                                    className="bg-slate-900 border-0 p-2 rounded-md w-full"
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
                                    className="bg-slate-900 border-0 p-2 rounded-md "
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
                                    className='rounded-md shadow px-4 py-2 bg-green-700 text-black font-bold'
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