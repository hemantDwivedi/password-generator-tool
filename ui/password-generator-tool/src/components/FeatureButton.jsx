import CopyToClipboard from "react-copy-to-clipboard";

const FeatureButton = ({ title, text, action, onclick, callSuggestPasswordApi }) => {
    return (
        <>
            <CopyToClipboard
                text={text}
                onCopy={action}
            >
                <button className="rounded-full text-sm shadow px-4 py-1 bg-green-700 text-black hover:bg-green-800 uppercase"
                onClick={onclick && callSuggestPasswordApi()}
                >
                    {title}
                </button>
            </CopyToClipboard>
        </>
    )
}

export default FeatureButton;