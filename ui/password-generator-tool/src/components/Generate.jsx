import { useState, useEffect } from "react"
import { Container, Row, Col } from 'react-bootstrap';
import { generatePasswordApi, sentMailApi, suggestPasswordApi } from "../service/PasswordGeneratorApi"
import '../css/generate.css'

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
    const [copy, setCopied] = useState('Copy')
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

    return (
        <div className="center-div">
            <Container>
                <Row className="justify-content-center align-items-center">
                    <Col lg={5}>
                        <div className="d-flex justify-content-between gap-2">
                            <div className="d-flex justify-content-between border border-dark border-1 rounded-5 py-2 px-3" style={{ width: "80%" }}>
                                <div className="d-inline-block text-truncate user-select-all" style={settings > 0 ? { fontSize: "18px", maxWidth: "350px" } : { color: "red" }}>{settings > 0 ? generatedPassword : 'One character must be selected'}</div>
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
                                    {settings == 1 && (
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
                        </div>
                        <div className="mt-4">
                            {
                                settings > 0 && settings < 4 &&

                                <div className="d-flex justify-content-start gap-2 my-3">
                                    <label className="fw-bold">Password Suggestion:</label>
                                    <button
                                        className="border-0 rounded-1 shadow px-3 text-dark"
                                        onClick={() => {
                                            navigator.clipboard.writeText(suggestedPassword)
                                            setSuggestedPasswordIsCopy(true)
                                            setTimeout(function () {
                                                setSuggestedPasswordIsCopy(false)
                                            }, 1000);
                                        }}
                                    >
                                        <strong>{suggestedPassword}</strong>
                                    </button>
                                    {
                                        suggestedPasswordIsCopy &&
                                        <div className="text-primary" style={{ fontSize: "13px", fontWeight: "bold" }}>Copied</div>
                                    }
                                </div>
                            }
                            <div className="d-flex justify-content-between fs-5 mb-3 mt-2">
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
                                        className="form-check-input shadow border border-1 border-dark"
                                        type="checkbox"
                                        name="capitalAlphabet"
                                        checked={capitalAlphabet}
                                        onChange={(e) => {
                                            setcapitalAlphabet(e.target.checked)
                                            handleSettings(e.target.checked)
                                        }}
                                    />
                                    <label>
                                        ABC
                                    </label>
                                </div>
                                <div className="d-flex gap-2">
                                    <input
                                        className="form-check-input shadow border border-1 border-dark"
                                        type="checkbox"
                                        name="smallAlphabet"
                                        value={smallAlphabet}
                                        onChange={(e) => {
                                            setSmallAlphaabet(e.target.checked)
                                            handleSettings(e.target.checked)
                                        }}
                                    />
                                    <label>
                                        abc
                                    </label>
                                </div>
                                <div className="d-flex gap-2">
                                    <input
                                        className="form-check-input shadow border border-1 border-dark"
                                        type="checkbox"
                                        name="number"
                                        checked={number}
                                        onChange={(e) => {
                                            setNumber(e.target.checked)
                                            handleSettings(e.target.checked)
                                        }}
                                    />
                                    <label>
                                        123
                                    </label>
                                </div>
                                <div className="d-flex gap-2">
                                    <input
                                        className="form-check-input shadow border border-1 border-dark"
                                        type="checkbox"
                                        name="specialCharacter"
                                        checked={specialCharacter}
                                        onChange={(e) => {
                                            setSpecialCharacter(e.target.checked)
                                            handleSettings(e.target.checked)
                                        }}
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
                                        className="form-check-input shadow border border-1 border-dark"
                                        type="checkbox"
                                        name="sendToEmail"
                                        checked={sendToEmail}
                                        onChange={(e) => setSendToEmail(e.target.checked)}
                                    />
                                </div>
                                {
                                    sendToEmail
                                    &&
                                    <div className="d-flex gap-2 mt-2">
                                        <div>
                                            <input
                                                className='form-control border border-1 border-dark'
                                                type="text"
                                                placeholder='Name...'
                                                name="recipientName"
                                                value={recipientName}
                                                onChange={(e) => setRecipientName(e.target.value)}
                                            />
                                            {
                                                isNameEmpty &&
                                                <label className="d-flex justify-content-end text-danger rounded-2" style={{ fontSize: "11px", fontWeight: "bold" }}>required</label>
                                            }
                                        </div>
                                        <div>
                                            <input
                                                className='form-control border border-1 border-dark'
                                                type="email"
                                                placeholder='Email Address...'
                                                name="recipientEmail"
                                                value={recipientEmail}
                                                onChange={(e) => setRecipientEmail(e.target.value)}
                                            />
                                            {
                                                isEmailEmpty &&
                                                <label className="d-flex justify-content-end text-danger rounded-2" style={{ fontSize: "11px", fontWeight: "bold" }}>required</label>
                                            }
                                        </div>
                                        <div>
                                            <button className='btn btn-primary rounded-2 shadow' onClick={(e) => sentMail(e)}>
                                                Send
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Generate