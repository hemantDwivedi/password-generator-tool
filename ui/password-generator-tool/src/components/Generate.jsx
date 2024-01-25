import { useState, useEffect } from "react"
import { Container, Row, Col } from 'react-bootstrap';
import { generatePasswordApi, sentMailApi } from "../service/PasswordGeneratorApi"
import '../css/generate.css'

const Generate = () => {

    const [capitalAlphabet, setcapitalAlphabet] = useState(true)
    const [smallAlphabet, setSmallAlphaabet] = useState(false)
    const [number, setNumber] = useState(false)
    const [specialCharacter, setSpecialCharacter] = useState(false)
    const [passwordLength, setPasswordLength] = useState(8)
    const [generatedPassword, setGeneratedPassword] = useState('eKs@4]sx3hq]')
    const [sendToEmail, setSendToEmail] = useState(false)
    const [targetEmail, setTargetEmail] = useState('')

    useEffect(() => {
        const characters = { capitalAlphabet, smallAlphabet, number, specialCharacter, passwordLength }
        callGeneratePasswordApi(characters)
    }, [capitalAlphabet, smallAlphabet, number, specialCharacter, passwordLength])

    function callGeneratePasswordApi(characters) {
        generatePasswordApi(characters)
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
        <div className="center-div">
            <Container>
                <Row className="justify-content-center align-items-center">
                    <Col lg={5}>
                        <div className="d-flex justify-content-between mb-4">
                            <div className="fs-3 border-2 text-truncate text-center border-0">{generatedPassword}</div>
                            <label className="bg-success fw-bold rounded-4 py-2 px-4" style={{fontSize: "12px"}}>VERY STRONG</label>
                        </div>
                        <button
                            className="btn btn-light shadow"
                            onClick={() => {
                                navigator.clipboard.writeText(generatedPassword)
                                alert("Copied!")
                            }}
                        >
                            <strong>COPY</strong>
                        </button>
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
                                className="w-100"
                                type="range"
                                min={8}
                                max={24}
                                name="passwordLength"
                                value={passwordLength}
                                onChange={(e) => setPasswordLength(e.target.value)}
                            />
                        </div>
                        <div className="d-flex justify-content-between">
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