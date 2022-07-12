import React, {useEffect, useState} from 'react';


const usePopupMessage = ({message, error }) => {

    const [msgState, setMsgState] = useState("")
    const [errorState, setErrorState] = useState("")

    useEffect(()=>{
        setMsgState(() => message);
        setErrorState(() => error);
    }, [message, error ])


    const onClickHandler = () => {
        setMsgState(() => "");
        setErrorState(() => "");
    }

    return {
        popupMessage : (
            <>
                {(msgState || errorState) && (
                    <div className='mask'>
                        <div className='popupMsg'>
                            <div className='popupBody'>
                                <p>{message}</p>

                                {errorState && (
                                    <button onClick={(e)=>onClickHandler(e)}>OK</button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    }

}

export default usePopupMessage;