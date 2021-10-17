import React from 'react'
import './css/TextForm.css'

function TextForm(props) {
    console.log(props.style)

    return(
            <div className='text-box' style={props.style}>
                <span>
                    {props.text}
                </span>
                <a href='#'>
                    {props.text_link}
                </a>
            </div>
    );
}

export default TextForm;