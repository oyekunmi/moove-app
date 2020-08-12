import React from 'react';
import SuccessAlert from '../components/SuccessAlert';




export default function PasswordUpdateSuccessfulScreen(){
    return(
        <SuccessAlert
            title = "password reset"
            subTitle="Password Updated"
            text = "Now your account is safe"
        />
    )
}