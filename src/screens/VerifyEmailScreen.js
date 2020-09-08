import React from 'react';
import SuccessAlert from '../components/SuccessAlert';




export default function VerifyEmailScreen({navigation}){
    return(
        <SuccessAlert
            title = "user sign up"
            subTitle="Verification required"
            text = "We have sent a verification email to the provided email address."
            buttonTitle ="Go To Sign In"
            routeTo = {() => navigation.navigate('SignIn') }
        />
        
    )
}