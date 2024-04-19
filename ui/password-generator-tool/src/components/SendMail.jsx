import { useState } from "react"
import { sentMailApi } from "../service/PasswordGeneratorApi"

const SendMail = ({ darkMode, generatedPassword }) => {

    const [recipientEmail, setRecipientEmail] = useState('')
    const [recipientName, setRecipientName] = useState('')
    const [isEmailEmpty, setIsEmailEmpty] = useState(false)
    const [isNameEmpty, setIsNameEmpty] = useState(false)
    const [sendText, setSendText] = useState('send')
    const [status, setStatus] = useState()

    function sentMail(e) {
        e.preventDefault()
        setSendText('validating...')


        if (validateInputs()) {
            setSendText('sending...')
            const reqData = { name: recipientName, email: recipientEmail, password: generatedPassword }
            sentMailApi(reqData)
                .then(response => {
                    if (response.status === 200) {
                        setSendText('done')
                        setTimeout(function () {
                            setSendText("send")
                        }, 2000);
                    }
                })
                .catch(error => console.error(error))
        }

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
        <>
            <div className="mt-4">
                <p className="font-bold border-b w-28 border-green-700 pb-1 mb-4">Send to Email</p>
                <div className="">
                    <input
                        className={
                            (darkMode == false) ? "bg-slate-900 border-0 p-2 rounded-md w-full font-medium" :
                                "bg-gray-300 border-0 p-2 rounded-md w-full text-green-900 font-medium"
                        }
                        type="text"
                        placeholder='Name'
                        name="recipientName"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                    />
                    {
                        isNameEmpty &&
                        <div className="text-red-600 float-end">Invalid</div>
                    }
                </div>
                <div className="">
                    <input
                        className={
                            (darkMode == false) ? "bg-slate-900 border-0 p-2 rounded-md w-full mt-2 font-medium" :
                                "bg-gray-300 border-0 p-2 rounded-md w-full mt-2 text-green-900 font-medium"
                        }
                        type="email"
                        placeholder="Email Address"
                        name="recipientEmail"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                    />
                    {
                        isEmailEmpty &&
                        <label className="text-red-600 float-end">Invalid</label>
                    }
                </div>
                <div>
                    <button
                        className='mt-2 rounded-md shadow px-4 py-2 bg-green-700 text-black font-bold hover:bg-green-800 capitalize'
                        onClick={(e) => sentMail(e)}>
                        {sendText}
                    </button>
                </div>
            </div>
        </>
    )
}

export default SendMail;