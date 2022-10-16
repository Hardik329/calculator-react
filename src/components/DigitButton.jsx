import React from "react";

export default function DigitButton({digit,dispatch}){
    return (
    <button onClick={()=>dispatch(
        { type:'add-digit',
             payload:{digit}
            }
        )
        }>
            {digit}
    </button>
    )

}