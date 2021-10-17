import React from 'react'
import '../FormStyle/FormStyle.css'
import './css/ForgotPassword.css'


//import componenet
import TitleForm from '../../resource/TitleForm/TitleForm'
import InputText from '../../resource/InputText/InputText'
import ButtonForm from '../../resource/ButtonForm/ButtonForm'
import TextForm from '../../resource/TextForm/TextForm'

function ForgotPassword() {
    const style = {
        flexDirection: 'row',
        paddingTop: 0,
    }
    return(
        <div className='container'>
            <div className='form'>
                <TitleForm title='Forgot your password'/>
                <div class="info">
                    <p>
                        Enter username below and we will send you reset instructions!
                    </p>
                </div>
                <form className='form-content'> 
                    <InputText placeholder='Username'/> 
                    <ButtonForm btnText='Get New Password'/>    
                    <TextForm text='Remembered?' text_link='Sign In' style={style}/>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;