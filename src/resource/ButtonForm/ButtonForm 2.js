import React from 'react'

import './css/ButtonForm.css';

function ButtonForm(props) {
    return(
        <input type='submit' value={props.btnText} className='btn-submit' onClick={(e) => {
            e.preventDefault(); //Chặn chuyển trang mặc định của browser
            console.log("Test on click " + props.btnText);
        }}/>
    ); 
}

export default ButtonForm;