import React from 'react';
import SuccessAlert from '../components/SuccessAlert';




export default function PasswordUpdateSuccessfulScreen({navigation}){
    return(
        <SuccessAlert
            title = "password reset"
            fontIcon=  "arrow_back_light"
            subTitle="Password Updated"
            text = "Password reset completed"
            buttonTitle ="Go To Sign In"
            routeTo = {() => navigation.navigate('SignIn') }
            headerOptionHandler={() => navigation.goBack()}
        />
    )
}