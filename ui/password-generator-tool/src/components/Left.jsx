import { useState } from "react";
import FeatureButton from "./FeatureButton";

const Left = ({ gp, darkMode, suggestedPassword, onSuggestedPasswordCopy, passwordToCopy, callSuggestPasswordApi }) => {
    const [copy, setCopy] = useState('COPY')
    const [suggestedPasswordCopy, setSuggestedPasswordCopy] = useState('suggest')

    const onCopyPassword = () => {
        if (!gp.startsWith("Configure")) {
            setCopy('COPIED')
            setTimeout(function () {
                setCopy("Copy")
            }, 1000);
        }
    }

    return (
        <>
            <div className="lg:w-5/12">
                <div className="flex gap-4 mb-3 font-bold text-5xl text-ellipsis">
                    {gp}
                    <div
                        className={(darkMode == false) ? "text-2xl text-gray-800 uppercase" : "text-2xl text-gray-500 uppercase"}
                    >
                        very strong
                    </div>
                </div>
                <div className="flex gap-3 mt-5 font-bold">
                    <FeatureButton title={copy} text={passwordToCopy} action={onCopyPassword} />
                    <button
                        className="rounded-full shadow text-sm px-4 py-1 bg-green-700 text-black hover:bg-green-800"
                        onClick={() => refreshPassword()}
                    >
                        REFRESH
                    </button>
                    <FeatureButton
                        title={suggestedPasswordCopy}
                        text={suggestedPassword}
                        action={onSuggestedPasswordCopy}
                        onclick={true}
                        callSuggestPasswordApi={callSuggestPasswordApi}
                    />
                </div>
            </div>
        </>
    )
}

export default Left;