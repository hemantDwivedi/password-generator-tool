import { useState, useEffect } from "react"
import { generatePassword, sentMailApi } from "../service/PasswordGeneratorApi"

const Generate = () => {

    const [capitalAlphabet, setcapitalAlphabet] = useState(true)
    const [smallAlphabet, setSmallAlphaabet] = useState(false)
    const [number, setNumber] = useState(false)
    const [specialCharacter, setSpecialCharacter] = useState(false)
    const [passwordLength, setPasswordLength] = useState(8)
    const [generatedPassword, setGeneratedPassword] = useState('eKs@4]sx3hq]')
    const [sendToEmail, setSendToEmail] = useState(false)
    const [targetEmail, setTargetEmail] = useState('');

    useEffect(() => {
        const characters = { capitalAlphabet, smallAlphabet, number, specialCharacter, passwordLength }
        callGeneratePasswordApi(characters)
    }, [capitalAlphabet, smallAlphabet, number, specialCharacter, passwordLength])

    function callGeneratePasswordApi(characters) {
        generatePassword(characters)
            .then(response => setGeneratedPassword(response.data))
            .catch(error => console.error(error))
    }

    function sentMail() {
        let message = generatedPassword
        const reqData = { targetEmail, message }
        sentMailApi(reqData)
            .then(response => console.log(response))
            .catch(error => console.error(error))
    }

    return (
        <div>
            <div className="container d-flex align-items-center vh-100" data-bs-theme="light">
                <div className="row w-100">
                    <div className="col-lg-7">
                        <p className="display-4">Random Password Generator</p>
                        <p className="text-secondary">
                            Introducing our Random Password Generator – Your Key to Strong, Secure Passwords! Say goodbye to weak passwords and enhance your online security effortlessly. Customize your passwords with a click, including uppercase letters, lowercase letters, numbers, and special characters. Elevate your digital defense with ease and style!
                        </p>
                    </div>
                    <div className="col-lg-4 mx-auto p-5 card card-body shadow-lg">
                        <div className="d-flex justify-content-between mb-4">
                            <div className="fs-4 border-2 text-truncate text-center border-dark rounded-3">{generatedPassword}</div>
                            <button
                                className="btn btn-light"
                                onClick={() => {
                                    navigator.clipboard.writeText(generatedPassword)
                                    alert("Copied!")
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-copy" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
                                </svg>
                            </button>
                        </div>
                        <div className="">
                            <div className="d-flex justify-content-between my-3">
                                <div className="text-capitalize">
                                    <label>password length:</label>
                                </div>
                                <div className="">
                                    <label>{passwordLength}</label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <input
                                    className="w-100 custom-range"
                                    type="range"
                                    min={8}
                                    max={24}
                                    name="passwordLength"
                                    value={passwordLength}
                                    onChange={(e) => setPasswordLength(e.target.value)}
                                />
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex gap-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="capitalAlphabet"
                                        checked={capitalAlphabet}
                                        onChange={(e) => setcapitalAlphabet(e.target.checked)}
                                    />
                                    <label>
                                        ABC
                                    </label>
                                </div>
                                <div className="d-flex gap-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="smallAlphabet"
                                        value={smallAlphabet}
                                        onChange={(e) => setSmallAlphaabet(e.target.checked)}

                                    />
                                    <label>
                                        abc
                                    </label>
                                </div>
                                <div className="d-flex gap-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="number"
                                        checked={number}
                                        onChange={(e) => setNumber(e.target.checked)}
                                    />
                                    <label>
                                        123
                                    </label>
                                </div>
                                <div className="d-flex gap-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="specialCharacter"
                                        checked={specialCharacter}
                                        onChange={(e) => setSpecialCharacter(e.target.checked)}
                                    />
                                    <label>
                                        %&*$
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='d-flex gap-2 mt-4'>
                                <label>Want to send this password to email?</label>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="sendToEmail"
                                    checked={sendToEmail}
                                    onChange={(e) => setSendToEmail(e.target.checked)}
                                />
                            </div>
                            {
                                sendToEmail
                                &&
                                <div className='mt-2 d-flex gap-2'>
                                    <input
                                        className='form-control'
                                        type="email"
                                        placeholder='Email Address...'
                                        name="targetEmail"
                                        value={targetEmail}
                                        onChange={(e) => setTargetEmail(e.target.value)}
                                    />
                                    <button className='btn btn-light' onClick={sentMail}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                                        </svg>
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="container-fluid p-2">
                        <ul className="nav justify-content-end">
                            <li className="nav-item">
                                <a className="nav-link" target="blank" href="https://github.com/hemantDwivedi">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                                    </svg>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" target="blank" href="https://www.linkedin.com/in/hemant-d-318155225/">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401m-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Generate