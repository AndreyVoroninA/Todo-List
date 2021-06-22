import React from 'react';
import styleList from './List.module.css';

const List = ({notes, deleteNote, yes}) => {
   return(
      <>
         <li className={styleList.place}>
            <div className={styleList.text}>
              {notes.note}
            </div>
            <input type="checkbox" onChange={() => yes(notes.id)}/>
            <button
            className={styleList.button}
            onClick={() => deleteNote(notes.id)}>Удалить</button>
         </li>
      </>
   )
}

export default List;