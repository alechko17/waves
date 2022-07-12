import React, {useEffect, useState} from 'react';


const Popup = (props) => {

    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [btnText, setBtnText] = useState("")

    useEffect(() => {
        setMessage(props.message);
        setError(props.error);
        setBtnText(props.button || "OK");
    },[props.message, props.error, btnText])

    return (
        <>
            {(message || error) && (
                <div className='mask'>
                    <div className='popupMsg'>
                        <div className='popupBody'>
                            <p>{(message || error)}</p>

                            {error && (
                                <button onClick={(e)=>props.onClick(e)}>{btnText}</button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
    

}

export default Popup;