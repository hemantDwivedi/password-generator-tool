import { useState, useEffect } from "react"
import { generatePassword } from "../service/PasswordGeneratorApi"

const Generate = () => {

    const [capitalAlphabet, setCapitalAlphabet] = useState(true)
    const [smallAlphabet, setSmallAlphaabet] = useState(true)
    const [numbers, setNumbers] = useState(true)
    const [specialCharacters, setSpecialCharacters] = useState(true)
    const [passwordLength, setPasswordLength] = useState(12)
    const [generatedPassword, setGeneratedPassword] = useState('')

    useEffect (() => {
        callGeneratePasswordApi()
    }, '')

    function callGeneratePasswordApi(){
        const characters = {capitalAlphabet, smallAlphabet, numbers, specialCharacters, passwordLength}

        generatePassword(characters)
        .then(response => setGeneratedPassword(response.data))
        .catch(error => console.error(error))
    }

    return (
        <div>
            <div className="container mt-5">
                <h1 className="text-capitalize text-center text-black-50 mb-3">strong password generator</h1>
                <div className="row p-5">
                    <div className="col-lg-11 border border-1 text-center border-dark rounded-5 p-2">{generatedPassword}</div>
                    <button className="col-lg-1 btn btn-warning rounded-5 text-uppercase"><strong>copy</strong></button>
                </div>
                <div className="row bg-light p-5">
                    <form action="">
                        <div className="form-group mb-3 d-flex">
                            <span className="">Password length:</span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="1-50"
                                value={passwordLength}
                                onChange={e => setPasswordLength(e.target.value)}
                            />
                        </div>
                        {/* <div className="form-group mb-3">
                            <p>characters used:</p>
                            <div className="form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="capitalAlphabet"
                                    value={capitalAlphabet}
                                    onChange={() => setCapitalAlphabet(capitalAlphabet => !capitalAlphabet)}
                                    checked
                                />
                                <label className="form-check-label">
                                    ABC
                                </label>
                            </div>
                            <div className="form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="smallAlphabet"
                                    value={smallAlphabet}
                                    onChange={() => setSmallAlphaabet(smallAlphabet => !smallAlphabet)}
                                />
                                <label className="form-check-label">
                                    abc
                                </label>
                            </div>
                            <div className="form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="numbers"
                                    value={numbers}
                                    onChange={() => setNumbers(numbers => !numbers)}
                                />
                                <label className="form-check-label">
                                    123
                                </label>
                            </div>
                            <div className="form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="specialCharacters"
                                    value={specialCharacters}
                                    onClick={() => setSpecialCharacters(specialCharacters => !setSpecialCharacters)}
                                />
                                <label className="form-check-label">
                                    %&*$
                                </label>
                            </div>
                        </div> */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Generate