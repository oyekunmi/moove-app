import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import Title from '../components/Title';
import { normalize } from '../normalizeFont';
import RedButton from '../components/RedButton';
import { useSelector, useDispatch } from 'react-redux';
import { mooveHistory } from '../utils/helpers/api';
import { historyDetails } from '../redux/actions';
import currency from '../currency';



const styles = StyleSheet.create({
  container: {
  },
  content: {
    paddingHorizontal: normalize(18),
    paddingVertical: normalize(10),
    flexGrow: 1,

  },
  historyContainer: {
  },
  historyLabel: {
    marginVertical: normalize(10),
    paddingHorizontal: normalize(15),
    fontFamily: 'Roboto_700Bold',
  },
  historyInput: {
    backgroundColor: "#efefef",
    borderRadius: normalize(20),
    textAlignVertical: "top",
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(15),
    height: normalize(85),
    marginTop: normalize(15),
  },
  enrouteDetails: {
    backgroundColor: '#C8F2A7',
    borderRadius: normalize(20),
    textAlignVertical: "top",
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(15),
    height: normalize(85),
    marginTop: normalize(15),
  },
  button: {
    alignSelf: "center",
    position: "absolute",
    bottom: '0%',
    zIndex:1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  errorMsg: {
    color: '#CE0303',
    fontSize: normalize(14),
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: normalize(50)
  },
  tripCost: {
    fontSize: normalize(17),
    fontWeight: 'bold'
  },
  mooveId: {
    fontSize: normalize(15),
    fontWeight: 'bold'
  },
  viewDetails: {
    backgroundColor: '#2B4257',
    borderRadius: 15,
    width: 55,
    height: 30,
    paddingHorizontal: normalize(7),
    position: "absolute",
    right: '4%',
    bottom: '10%',

  },
  viewText: {
    color: '#DADADA',
    alignSelf: 'center',
    paddingTop:normalize(4)
  },
  enrouteButton: {
    position: "absolute",
    right: '4%',
    bottom: '30%',
    paddingHorizontal: normalize(7),
  },
  enrouteText: {
    color: '#DE2424',
    fontWeight: 'bold',
    fontSize: normalize(12),
    fontFamily: 'Roboto'
  },
  dashboardButton:{ 
    marginTop: normalize(200),
    alignSelf: "center",
    width: '100%',  
  }
});



function HistoryScreen({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.userToken);
  const [ShowErrorMessage, setShowErrorMessage] = useState(true);
  const history = useSelector(state => state.trip.historyDetails);

  // console.log(history);

  useEffect(() => {
    try {
      mooveHistory(token).then(response => {
        if (response.data) {
          console.log('about to dispatch...');
          dispatch(historyDetails(response.data.data));
          console.log('just dispatched');
          setShowErrorMessage(false);
        }
      })
    } catch (error) {
      if (error.response) {
        if(error.response.data.message){
          console.log(error.response.data.message);
          Alert.alert('An error has occurred', error.response.data.message);
        }	
      } else if (error.request) {
        console.log(error.request);
        Alert.alert('An error has occurred', 'Network error, Please try again.');
      } else {
        console.log('Error', error.message);
        Alert.alert('An error has occurred', error.message);
      }
      setShowErrorMessage(true);
    }
  }, []);

  const toggleDrawerHandler = () => {
    // The drawer should be toggled here
    navigation.openDrawer();
    // console.log('Drawer handler');
  }


  return (
    <View>
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, backgroundColor: '#ffffff' }} keyboardShouldPersistTaps='always'>
        <Title
          title={"past mooves"}
          fontIcon="side_menu"
          headerOptionHandler={toggleDrawerHandler}
          subTitle={"Moove history "}
          subTitleStyle={{ fontSize: normalize(21) }}
          containerStyle={{ paddingHorizontal: normalize(18) }} />
        <View style={styles.content}>
        {ShowErrorMessage && 
          <View>
            <Text style={styles.errorMsg}>You have no History Yet.</Text>
            <RedButton
              title="Go to Dashboard"
              buttonStyle={styles.dashboardButton}
              onPress={() => {
                navigation.navigate('Home')
              }}>
            </RedButton>
          </View>
        }

        <View style={styles.historyContainer}>
            
            {!ShowErrorMessage && history.map(x => <View key={x.id}>{
              x.trip_status === "IN_PROGRESS" ? <View style={styles.enrouteDetails}>
                <Text style={styles.mooveId}>Moove - MV{x.moove_id}</Text>
                <Text>{x.created_at}</Text>
                <TouchableOpacity onPress={() => {
                  navigation.navigate("TrackActiveMoove")
                }} style={styles.enrouteButton}><Text style={styles.enrouteText}>En-Route</Text>
                </TouchableOpacity>
                <Text style={styles.tripCost}>{currency(x.cost_of_trip)}</Text>
              </View> : <View style={styles.historyInput}>
                  <Text style={styles.mooveId}>Moove - MV{x.moove_id}</Text>
                  <Text>{x.created_at}</Text><View ><TouchableOpacity onPress={() => {
                    navigation.navigate('HistoryDetails', {
                      moove_id: x.moove_id, pick_up: x.start_location, delivery_location: x.end_location,
                      date: x.created_at, cost: x.cost_of_trip, recipientPhone:x.recipient_phone_number,
                      packageDescription:x.package_description, tripStatus:x.trip_status
                    })
                  }} style={styles.viewDetails}><Text style={styles.viewText}>View</Text></TouchableOpacity></View>
                  <Text style={styles.tripCost}>{currency(x.cost_of_trip)}</Text>
                </View>
            }

            </View>)}
          </View>
        </View>
      </ScrollView>
      {!ShowErrorMessage &&
      <RedButton
      title="Go to Dashboard"
      buttonStyle={styles.button}
      onPress={() => {
        navigation.navigate('Home')
      }}>
      </RedButton>}
    </View>
  );
}

export default HistoryScreen