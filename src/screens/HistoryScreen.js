import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';
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
    marginBottom: normalize(10),
    marginTop: normalize(20),
    alignSelf: "center",
    width: '90%',
    // position: "absolute",
    // bottom : "5%",
    // zIndex:1
  },
  errorMsg: {
    color: '#CE0303',
    fontSize: normalize(14),
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontWeight: 'bold'
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
    width: 50,
    paddingHorizontal: normalize(7),
    position: "absolute",
    right: '4%',
    bottom: '10%',

  },
  viewText: {
    color: '#DADADA',
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
  }
});



function HistoryScreen({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.userToken);
  const [ShowErrorMessage, setShowErrorMessage] = useState(true);
  const history = useSelector(state => state.trip.historyDetails);

  console.log(history);

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
      console.log(error)
      setShowErrorMessage(true);
    }
  }, [])






  console.log(token);

  const toggleDrawerHandler = () => {
    // The drawer should be toggled here
    navigation.openDrawer();
    // console.log('Drawer handler');
  }


  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, backgroundColor: '#ffffff' }} keyboardShouldPersistTaps='always'>
      <Title
        title={"past mooves"}
        fontIcon="side_menu"
        headerOptionHandler={toggleDrawerHandler}
        subTitle={"Moove history "}
        subTitleStyle={{ fontSize: normalize(26) }}
        containerStyle={{ paddingHorizontal: normalize(18) }} />
      <View style={styles.content}>

        <View style={styles.historyContainer}>
          {ShowErrorMessage && <View>
            <Text style={styles.errorMsg}>You have no History Yet.</Text>
          </View>}
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
                    date: x.created_at, cost: x.cost_of_trip
                  })
                }} style={styles.viewDetails}><Text style={styles.viewText}>View</Text></TouchableOpacity></View>
                <Text style={styles.tripCost}>{currency(x.cost_of_trip)}</Text>
              </View>
          }

          </View>)}
        </View>
      </View>
      <RedButton
        title="Go to Dashboard"
        buttonStyle={styles.button}
        onPress={() => {
          navigation.navigate('Home')
        }}>
      </RedButton>









    </ScrollView>
  );
}

export default HistoryScreen