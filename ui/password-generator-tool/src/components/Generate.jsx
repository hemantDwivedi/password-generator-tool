import { useState, useEffect } from "react"
import { Container, Row, Col } from 'react-bootstrap';
import { generatePasswordApi, sentMailApi, suggestPasswordApi } from "../service/PasswordGeneratorApi"
import '../css/generate.css'

const Generate = () => {

    const [capitalAlphabet, setcapitalAlphabet] = useState(true)
    const [smallAlphabet, setSmallAlphaabet] = useState(false)
    const [number, setNumber] = useState(false)
    const [specialCharacter, setSpecialCharacter] = useState(false)
    const [passwordLength, setPasswordLength] = useState(8)
    const [generatedPassword, setGeneratedPassword] = useState('Configure your password')
    const [suggestedPassword,setSuggestedPassword] = useState("");
    const [sendToEmail, setSendToEmail] = useState(false)
    const [targetEmail, setTargetEmail] = useState('')
    const [copy, setCopied] = useState('Copy')
    const [settings, setSettings] = useState(0)

    useEffect(() => {
        var count = 0
        if (capitalAlphabet) {
            count += 1
        }
        if (smallAlphabet) {
            count += 1
        }
        if (number) {
            count += 1
        }
        if (specialCharacter) {
            count += 1
        }
        setSettings(count)
        callGeneratePasswordApi({ capitalAlphabet, smallAlphabet, number, specialCharacter, passwordLength })
    }, [capitalAlphabet, smallAlphabet, number, specialCharacter, passwordLength])

    function refreshPassword(){
        callGeneratePasswordApi({ capitalAlphabet, smallAlphabet, number, specialCharacter, passwordLength })
    }

    function callGeneratePasswordApi(characters) {
        generatePasswordApi(characters)
            .then(response => setGeneratedPassword(response.data))
            .catch(error => console.error(error))
    }

    function callSuggestPasswordApi(passwordLength) {
        suggestPasswordApi(passwordLength)
          .then((response) => setSuggestedPassword(response.data))
          .catch((error) => console.error(error));
    
        return suggestedPassword;
      }

    function sentMail() {
        let message = generatedPassword
        const reqData = { targetEmail, message }
        sentMailApi(reqData)
            .then(response => console.log(response))
            .catch(error => console.error(error))
    }

    return (
        <div className="center-div">
            <Container>
                <Row className="justify-content-center align-items-center">
                    <Col lg={5}>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex justify-content-between border border-dark border-1 rounded-5 py-2 px-3" style={{ width: "80%" }}>
                                <div className="d-inline-block text-truncate user-select-all" style={{ fontSize: "18px", maxWidth: "350px" }}>{generatedPassword}</div>
                                <div className="d-flex gap-3">
                                    {settings == 4 && (
                                        <label className="my-auto fw-bold bg-success px-2 py-1 rounded-3 text-light" style={{ fontSize: "10px" }}>VERY STRONG</label>
                                    )}
                                    {settings == 3 && (
                                        <label className="my-auto fw-bold bg-success bg-opacity-75 px-2 py-1 rounded-3 text-light" style={{ fontSize: "10px" }}>STRONG</label>
                                    )}
                                    {settings == 2 && (
                                        <label className="my-auto fw-bold bg-warning px-2 py-1 rounded-3 text-light" style={{ fontSize: "10px" }}>GOOD</label>
                                    )}
                                    {settings <= 1 && (
                                        <label className="my-auto bg-danger px-2 py-1 rounded-3 fw-bold" style={{ fontSize: "10px", color: "white" }}>POOR</label>
                                    )}
                                    <button
                                    className="my-auto bg-white border-0"
                                    onClick={() => refreshPassword()}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z" />
                                            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <button
                                className="bg-primary border-0 rounded-5 shadow px-4 text-light"
                                onClick={() => {
                                    if (!generatedPassword.startsWith("Configure")) {
                                        navigator.clipboard.writeText(generatedPassword)
                                        setCopied("Copied")
                                        setTimeout(function () {
                                            setCopied("Copy")
                                        }, 1000);
                                    }
                                }}
                            >
                                <strong>{copy}</strong>
                            </button>
                            {  settings < 4 && (
                            <button
                            className="bg-secondary border-0 rounded-5 shadow px-4 text-light"
                            onClick={() => {
                                navigator.clipboard.writeText(callSuggestPasswordApi(passwordLength));
                            }}
                            >
                            <strong>Suggested Password</strong>
                            </button> )}
                        </div>
                        <div className="d-flex justify-content-between fs-5 my-3">
                                <label>Password length:</label>
                                <label>{passwordLength}</label>
                        </div>
                        <div className="mb-4">
                            <input
                                className="w-100"
                                type="range"
                                min={8}
                                max={24}
                                name="passwordLength"
                                value={passwordLength}
                                onChange={(e) => setPasswordLength(e.target.value)}
                            />
                        </div>
                        <div className="d-flex justify-content-between fs-5">
                            <div className="text-capitalize">
                                <label>Include:</label>
                            </div>
                            <div className="d-flex gap-2">
                                <input
                                    className="form-check-input shadow"
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
                                    className="form-check-input shadow"
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
                                    className="form-check-input shadow"
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
                                    className="form-check-input shadow"
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
                        <div className="mt-4">
                            <div className='d-flex gap-2'>
                                <label>Send to an email?</label>
                                <input
                                    className="form-check-input shadow"
                                    type="checkbox"
                                    name="sendToEmail"
                                    checked={sendToEmail}
                                    onChange={(e) => setSendToEmail(e.target.checked)}
                                />
                            </div>
                            {
                                sendToEmail
                                &&
                                <div className='d-flex gap-2 mt-4 w-75 mx-auto p-0'>
                                    <input
                                        className='form-control'
                                        type="email"
                                        placeholder='Email Address...'
                                        name="targetEmail"
                                        value={targetEmail}
                                        onChange={(e) => setTargetEmail(e.target.value)}
                                    />
                                    <button className='btn btn-light shadow' onClick={sentMail}>
                                        Send
                                    </button>
                                </div>
                            }
                        </div>
                    </Col></Row></Container>
        </div>
    )
}

export default Generate