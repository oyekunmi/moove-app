import React from 'react';
import Message from '../components/Message';


const MooveHistoryOrderStatusScreen = ({navigation, route}) => {

    const { order } = route.params;

    return (
        <Message
            title={`moove request order`}
            subTitle="Order placed successfully"
            text={GetMessage(order.trip_status)}
            buttonTitle="View details"
            messageType={GetMessageType(order.trip_status)}
            routeTo={() => navigation.navigate('MooveHistoryOrderDetail', {order})}
            headerOptionHandler={() => navigation.goBack()}
        />
    );
}

const GetMessageType = (status) => {

    if(status === "IN_PROGRESS" || status === "PENDING" || status === "DELIVERED" || status === "ENDED")
    {
        return "SUCCESS"
    }

    return "CANCELLED";
}

const GetMessage = (status) => {

    if(status === "PENDING")
    {
        return "Your moove champion is enroute to pick up the package";
    }

    if(status === "IN_PROGRESS")
    {
        return "Your package is on the way to be delivered";
    }

    if(status === "DELIVERED" || status === "ENDED")
    {
        return "Your package was delivered successfully";
    }

    if(status === "CANCELLED")
    {
        return "Your moove request was cancelled";
    }
}

export default MooveHistoryOrderStatusScreen;