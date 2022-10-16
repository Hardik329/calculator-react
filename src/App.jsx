import React, { useEffect } from "react";
import { useReducer } from "react";
import "./style.css"
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state,{type,payload}){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      {
        if(state.currentOperand==="0" && payload.digit!=="."){
          return {
            ...state,
            currentOperand:payload.digit
          }
        }
        if(state.overwrite){
          return{
            ...state,
            currentOperand:payload.digit,
            overwrite:false,
            previousOperand:null
            
          }
        }
        if(payload.digit==="0" && state.currentOperand === "0") return state
        if(payload.digit==="." && state.currentOperand.includes(".")) return state
        
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
      }
    }
    case ACTIONS.CHOOSE:
      {
        if(state.currentOperand==null && state.previousOperand==null) return state

        if(state.previousOperand==null){
          return{
            ...state,
            previousOperand:state.currentOperand,
            currentOperand:null,
            operation:payload.operation
          }

        }
        if(state.currentOperand==null){
          return{
            ...state,
            operation:payload.operation
          }
        }
        return{
          ...state,
          previousOperand:calculate(state),
          currentOperand:null,
          operation:payload.operation
        }
      }
    
    case ACTIONS.CLEAR:
      {
        return{}
      }

    case ACTIONS.EVALUATE:
      {
        if(state.previousOperand==null || state.operation==null || state.currentOperand==null) return state

        return {
          ...state,
          operation:null,
          currentOperand:calculate(state),
          previousOperand:null,
          overwrite:true
        }

      }
    case ACTIONS.DELETE_DIGIT:
      {
        if(state.overwrite){
          return{
            ...state,
            currentOperand:null,
            overwrite:false
          }
        }
        if(state.currentOperand==null) return state
        if(state.currentOperand.length===1){
          return{
            ...state,
            currentOperand:null
          }
        }


        return {
          ...state,
          currentOperand:state.currentOperand.slice(0,-1)

        }
      }
    default : return state
  }



}

function calculate({previousOperand,currentOperand,operation}){
  const prev=parseFloat(previousOperand)
  const curr=parseFloat(currentOperand)
  if(isNaN(prev) || isNaN(curr)) return ""
  let ans
  switch(operation){
    case "+": 
      ans=prev+curr
      break
    case "-": 
      ans=prev-curr
      break
    case "/":
      ans=prev/curr
      break
    case "*":
      ans=prev*curr
      break
  }

  return ans.toString()

}

export default function App(){
  const [{ currentOperand, previousOperand, operation },dispatch] = useReducer(reducer,{})
  
  return(
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={()=>dispatch({
        type:ACTIONS.CLEAR
      })}>AC</button>
      <button onClick={()=>dispatch({type:ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationButton operation="/" dispatch={dispatch}/>
      <DigitButton digit="1" dispatch={dispatch}/>
      <DigitButton digit="2" dispatch={dispatch}/>
      <DigitButton digit="3" dispatch={dispatch}/>
      <OperationButton operation="*" dispatch={dispatch}/>
      <DigitButton digit="4" dispatch={dispatch}/>
      <DigitButton digit="5" dispatch={dispatch}/>
      <DigitButton digit="6" dispatch={dispatch}/>
      <OperationButton operation="+" dispatch={dispatch}/>
      <DigitButton digit="7" dispatch={dispatch}/>
      <DigitButton digit="8" dispatch={dispatch}/>
      <DigitButton digit="9" dispatch={dispatch}/>
      <OperationButton operation="-" dispatch={dispatch}/>
      <DigitButton digit="." dispatch={dispatch}/>
      <DigitButton digit="0" dispatch={dispatch}/>
      <button className="span-two" onClick={()=>dispatch({type:ACTIONS.EVALUATE})}>=</button>



    </div>

  )
}