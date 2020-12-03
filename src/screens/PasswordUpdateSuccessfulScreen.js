import React from 'react';
import SuccessAlert from '../components/SuccessAlert';
import { normalize } from '../normalizeFont';




export default function PasswordUpdateSuccessfulScreen({navigation}){
    return(
        <SuccessAlert
            title = "password reset"
            subTitle="Password Updated"
            titleStyle={{paddingTop:normalize(15)}}
            text = "Password reset completed"
            buttonTitle ="Go To Sign In"
            routeTo = {() => navigation.navigate('SignIn') }
            headerOptionHandler={() => navigation.goBack()}
        />
    )
}