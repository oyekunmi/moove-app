import React from 'react';
import SuccessAlert from '../components/SuccessAlert';




export default function PasswordUpdateSuccessfulScreen({navigation}){
    return(
        <SuccessAlert
            title = "password reset"
            subTitle="Password Updated"
            text = "Now your account is safe"
            buttonTitle ="Go To Dashboard"
            routeTo = {() => navigation.navigate('Home') }
        />
    )
}