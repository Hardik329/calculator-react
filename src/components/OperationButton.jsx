import React from "react";

export default function Operation({operation,dispatch}){
    // console.log(operation)
    return(
        <button onClick={()=>dispatch({
            type:'choose-operation',
            payload:{operation}
        })}>
            {operation}
        </button>
    )

}