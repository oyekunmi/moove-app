import React from 'react';
import Message from '../components/Message';

export default function RegistrationVerifySuccessfulScreen({navigation}){
    return(
        <Message
            title={`user signup`}
            subTitle="Registration completed"
            text="Grab a coffee"
            buttonTitle="Go To Dashboard"
            routeTo={() => navigation.navigate('MooveFlow')}
        />
    )
}