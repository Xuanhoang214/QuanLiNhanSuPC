import React from 'react'
import '../FormStyle/FormStyle.css'


//import componenet
import TitleForm from '../../resource/TitleForm/TitleForm'
import InputText from '../../resource/InputText/InputText'
import ButtonForm from '../../resource/ButtonForm/ButtonForm'

function ResetPassword() {
    return(
        <div className='container'>
            <div className='form'>
                <TitleForm title='Reset Your Password'/>
                <form className='form-content'> 
                    <InputText placeholder='New Password'/>  
                    <InputText placeholder='Confirm Password'/>  
                    <ButtonForm btnText='Reset Password'/>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;