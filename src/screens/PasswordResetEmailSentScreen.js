import React from 'react';
import SuccessAlert from '../components/SuccessAlert';




export default function PasswordResetEmailSentScreen({navigation}){
    return(
        <SuccessAlert
            title = "password reset"
            subTitle="Successful Initiation"
            text = "We have sent an email to your email address. Kindly click and link in the email."
            buttonTitle ="Go To Sign In"
            routeTo = {() => navigation.navigate('SignIn') }
        />
        
    )
}