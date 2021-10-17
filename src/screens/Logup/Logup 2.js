import React from 'react'
import '../FormStyle/FormStyle.css'

//import componenet
import TitleForm from '../../resource/TitleForm/TitleForm'
import InputText from '../../resource/InputText/InputText'
import TextForm from '../../resource/TextForm/TextForm'
import ButtonForm from '../../resource/ButtonForm/ButtonForm'

function Logup() {

    const style = {
        flexDirection: 'row',
        paddingTop: 0,
    }

    return(
        <div className='container'>
            <div className='form'>
                <TitleForm title='Sign Up'/>
                <form className='form-content'> 
                    <InputText placeholder='Username'/> 
                    <InputText placeholder='Email'/>  
                    <InputText placeholder='Number Phone'/>   
                    <InputText placeholder='Password'/>   
                    <InputText placeholder='Repeat Password'/>   
                    <ButtonForm btnText='SIGN UP'/>
                    <TextForm text='Already have an account? ' text_link='Sign In' style={style}/>
                </form>
            </div>
        </div>
    );
}

export default Logup;