import React from 'react';
import SuccessAlert from '../components/SuccessAlert';




export default function RegistrationVerifySuccessfulScreen({navigation}){
    return(
        <SuccessAlert
            title = "user registration | email verification"
            subTitle="You're Verified"
            text = "Grab a coffee! Your account is now verified"
            buttonTitle ="Go To Dashboard"
            routeTo = {() => navigation.navigate('Home') }
        />
    )
}