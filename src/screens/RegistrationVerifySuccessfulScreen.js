import React from 'react';
import SuccessAlert from '../components/SuccessAlert';




export default function RegistrationVerifySuccessfulScreen(){
    return(
        <SuccessAlert
            title = "user registration | email verification"
            subTitle="You're Verified"
            text = "Grab a coffee! Your account is now verified"
        />
    )
}