import React, {useState} from 'react';
import styleForm from './Form.module.css'

const Form = ({addNote}) => {

   const [enterInfo, setEnterInfo] = useState('');

   const changeInfo = (e) => {
      setEnterInfo(e.currentTarget.value)
   }
   const addInfo = (e) => {
      e.preventDefault()
      addNote(enterInfo)
      setEnterInfo("")
   }
   return(
      <>
         <form onSubmit={addInfo}>
            <input 
            className={styleForm.input}
            value={enterInfo}
            onChange={changeInfo}/>
            <button className={styleForm.button}>Добавить</button>
         </form>
      </>
   )
}

export default Form;