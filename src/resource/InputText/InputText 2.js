import React from 'react';
import './css/InputText.css';

function InputText(props) {
    return(
        <div className='input'>
            <input className='input-content' placeholder={props.placeholder}/>
            <span className='focus'></span>
        </div>
    );
}

export default InputText;