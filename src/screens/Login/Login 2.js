import React from 'react'
import '../FormStyle/FormStyle.css'


// import components
import TitleForm from '../../resource/TitleForm/TitleForm'
import InputText from '../../resource/InputText/InputText'
import ButtonForm from '../../resource/ButtonForm/ButtonForm'
import TextForm from '../../resource/TextForm/TextForm'


function Login() {

    const styleFlex = {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 0,
    }

    return(
        <div className='container'>
            <div className='form'>
                <TitleForm title='Đăng Nhập'/>
                <form className='form-content'>
                    <InputText placeholder='Username'/>   
                    <InputText placeholder='Password'/>  
                    <TextForm text='Forgot' text_link='Username / Password?' style={styleFlex}/>
                    <ButtonForm btnText='SIGN IN'/>
                    <TextForm text="Don't have an account yet?" text_link='SIGN UP NOW' />
                </form>
            </div>
        </div>
    );
}

export default Login;