import React from 'react';
import Message from '../components/Message';


const MooveHistoryOrderStatusScreen = ({navigation, route}) => {

    console.log(route.params);
    const { order, backScreen } = route.params;

    // console.log(order.display_status);
    return (
        <Message
            title={`moove request order`}
            subTitle="Order placed successfully"
            text={GetMessage(order.display_status)}
            buttonTitle="View details"
            messageType={GetMessageType(order.display_status)}
            routeTo={() => navigation.navigate('MooveHistoryOrderDetail', {order})}
            headerOptionHandler={() => backScreen ? navigation.navigate(backScreen) : navigation.goBack()}
        />
    );
}

const GetMessageType = (status) => {

    if(status === "DELIVERING" || status === "PENDING" || status === "DELIVERED" || status === "ENDED")
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

    if(status === "DELIVERING")
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