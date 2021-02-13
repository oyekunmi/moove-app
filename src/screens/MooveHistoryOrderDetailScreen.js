import React from 'react';
import { View, StyleSheet, Text, TextInput, StatusBar, ScrollView, Linking } from 'react-native';
import RedButton from '../components/RedButton';
import { normalize } from '../normalizeFont';
import Title from '../components/Title';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function MooveHistoryOrderDetailScreen({ navigation, route }) {

  const { order } = route.params;

  // const onContinue = () => {
  //   navigation.navigate("MooveHistoryOrderTrackScreen", { order });
  // }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#132535" />
      <Title
        title="moove details"
        fontIcon="arrow_back_light"
        statusBarStyle="light-content"
        subTitle="Details of your moove request"
        subTitleStyle={{ fontSize: normalize(22) }}
        containerStyle={{ paddingHorizontal: normalize(18) }}
        headerOptionHandler={() => navigation.goBack()}
      />

      <View style={styles.content}>

        <View style={styles.phoneContainer}>
          <Text style={styles.nameLabel}>Champion: {order.rider_name} </Text>
          <Text style={styles.phone}>{order.rider_phone}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${order.rider_phone}`)}>
            <Text style={styles.telLabel}>tap to call or text</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.packageContainer, styles.mb9]}>

          <View style={[styles.DeliveryItemDescription, styles.mb9]}>
            <View style={styles.pickUpandDelivery}>
              <Text style={styles.pickupAndLocationLabel}>Pick-up address</Text>
              <Text style={styles.pickUpAndLocationDetails}>{order.start_location}</Text>
            </View>
          </View>

          <View style={[styles.DeliveryItemDescription, styles.mb9]}>
            <View style={styles.pickUpandDelivery}>
              <Text style={styles.pickupAndLocationLabel}>Delivery address</Text>
              <Text style={styles.pickUpAndLocationDetails}>{order.end_location}</Text>
            </View>
          </View>

          <View style={[styles.DeliveryItemDescription, styles.mb9]}>
            <View style={styles.pickUpandDelivery}>
              <Text style={styles.pickupAndLocationLabel}>Recipient name</Text>
              <Text style={styles.pickUpAndLocationDetails}>{order.recipient_name}</Text>
            </View>
          </View>

          <View style={[styles.DeliveryItemDescription, styles.mb9]}>
            <View style={styles.pickUpandDelivery}>
              <Text style={styles.pickupAndLocationLabel}>Recipient phone Number</Text>
              <Text style={styles.pickUpAndLocationDetails}>{order.recipient_phone_number}</Text>
            </View>
          </View>

          <View style={styles.DeliveryItemDescription}>
            <Text style={styles.packageDescriptionLabel}>Delivery Item(s) Description</Text>
            <TextInput
              multiline={true}
              numberOfLines={3}
              style={styles.packageDescriptionInput}
              value={order.package_description}
              editable={false} />
          </View>
        </View>

        {/* {order.can_track && <RedButton
          title="Track Moove Request"
          buttonStyle={styles.button}
          onPress={onContinue}
        />
        } */}

      </View>

    </ScrollView>
  );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#132535',
  },
  content: {
    paddingHorizontal: normalize(18),
    paddingVertical: normalize(10),
    flexGrow: 1,
  },
  label: {
    marginVertical: normalize(10),
    paddingHorizontal: normalize(15),
    fontFamily: 'Roboto_700Bold',
    color: "#FFF",
  },
  packageInput: {
    backgroundColor: "#e6e6e6",
    borderRadius: normalize(20),
    textAlignVertical: "top",
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(15),
  },
  phoneContainer: {
    alignItems: "center",
    marginTop: normalize(20),
    marginBottom: normalize(30),
  },
  packageContainer: {
    flexGrow: 1
  },
  nameLabel: {
    color: "#908F8F",
    fontFamily: 'Roboto_900Black',
    fontSize: normalize(15),
    lineHeight: normalize(15)
  },
  telLabel: {
    color: '#918F8F',
    fontSize: normalize(13),
    fontFamily: 'Roboto_400Regular',
    lineHeight: normalize(15),
    textDecorationLine: 'underline',
    paddingTop: normalize(4)
  },
  phone: {
    color: "#FFF",
    fontFamily: 'Roboto_700Bold',
    fontSize: normalize(40),
    fontWeight: 'bold',

  },
  button: {
    alignSelf: "center",
    width: '100%',
  },
  cancelButtonStyle: {
    fontFamily: 'Roboto_700Bold',
    color: "#FFF",
  },

  locationDetails: {
    height: normalize(155),
    marginBottom: normalize(7),
    borderRadius: normalize(15),
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#1E3040'
  },
  pickUpandDelivery: {
    height: '50%',
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: normalize(14),
    paddingTop: normalize(30),
    paddingBottom: normalize(35)
  },
  pickupAndLocationLabel: {
    fontSize: normalize(14),
    fontFamily: 'Roboto_500Medium',
    color: '#DADADA',
    marginBottom: normalize(10)
  },
  pickUpAndLocationDetails: {
    fontSize: normalize(13),
    color: '#D1D1D1',
    fontFamily: 'Roboto_400Regular',
    lineHeight: normalize(15)
  },
  DeliveryItemDescription: {
    height: normalize(75),
    backgroundColor: '#1E3040',
    borderRadius: normalize(15),
    paddingTop: normalize(10),
    paddingBottom: normalize(35)
  },
  packageDescriptionLabel: {
    color: '#DADADA',
    fontSize: normalize(14),
    fontFamily: 'Roboto_500Medium',
    paddingHorizontal: normalize(14),
    fontWeight: 'bold',
  },
  packageDescriptionInput: {
    marginHorizontal: normalize(14),
    color: '#D1D1D1',
    fontSize: normalize(13),
    fontWeight: 'normal',
  },
  mb9: {
    marginBottom: normalize(9),
  }
})
