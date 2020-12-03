import React from 'react';
import SuccessAlert from '../components/SuccessAlert';




export default function RegistrationVerifySuccessfulScreen({navigation}){
    return(
        <SuccessAlert
            title = "user signup"
            subTitle="Registration completed"
            text = "Grab a coffee"
            buttonTitle ="Go To Dashboard"
            routeTo = {() => navigation.navigate('Home') }
        />
    )
}