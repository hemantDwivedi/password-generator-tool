import { useState, useEffect } from "react"
import { generatePassword } from "../service/PasswordGeneratorApi"

const Generate = () => {

    const [capitalAlphabet, setcapitalAlphabet] = useState(true)
    const [smallAlphabet, setSmallAlphaabet] = useState(false)
    const [number, setNumber] = useState(false)
    const [specialCharacter, setSpecialCharacter] = useState(false)
    const [passwordLength, setPasswordLength] = useState(8)
    const [generatedPassword, setGeneratedPassword] = useState('eKs@4]sx3hq]')

    useEffect (() => {
        const characters = { capitalAlphabet, smallAlphabet, number, specialCharacter, passwordLength }
        callGeneratePasswordApi(characters)
    }, [capitalAlphabet, smallAlphabet, number, specialCharacter, passwordLength])

    function callGeneratePasswordApi(characters) {
        generatePassword(characters)
            .then(response => setGeneratedPassword(response.data))
            .catch(error => console.error(error))
    }

    return (
        <div>
            <div className="container d-flex align-items-center vh-100">
                <div className="row w-75">
                    <h1>Random Password Generator</h1>
                    <p>
                    Master Key: Instant Defense for Your Passwords!
                    </p>
                </div>
                <div className="row w-100">
                    <div className="col-md-6 mx-auto">
                        <div className="d-flex justify-content-between mb-4">
                            <div className="fs-4 border-2 text-truncate text-center border-dark rounded-3">{generatedPassword}</div>
                            <button
                                className="btn btn-light"
                                onClick={() => { }}
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
                                    max={50}
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
                            <div className=' mt-4'>
                                <label>Want to send this password to email?</label>
                            </div>
                            <div className='mt-2 d-flex gap-2'>
                                <input
                                    className='form-control'
                                    type="email"
                                    placeholder='Email Address...'
                                    name='email' />
                                <button className='btn btn-light'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                                    </svg>
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