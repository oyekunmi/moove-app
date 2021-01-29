import React from 'react';
import Message from '../components/Message';

export default function PasswordUpdateSuccessfulScreen({navigation}){
    return(
        <Message
            title = "password reset"
            subTitle="Password Updated"
            // titleStyle={{paddingTop:normalize(15)}}
            text = "Password reset completed"
            buttonTitle ="Go To Sign In"
            routeTo = {() => navigation.navigate('SignIn') }
        />
    )
}