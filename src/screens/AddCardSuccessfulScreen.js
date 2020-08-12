import React from 'react';
import SuccessAlert from '../components/SuccessAlert';




export default function AddCardSuccessfulScreen(){
    return(
        <SuccessAlert
            title = "add a card"
            subTitle="Card Added Successfully"
            text = "Awesome! Now you can make payments faster"
        />
    )
}