import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Title from '../components/Title';
import { normalize } from '../normalizeFont';
import RedButton from '../components/RedButton';
import { useSelector, useDispatch } from 'react-redux';
import { mooveHistory } from '../utils/helpers/api';
import { historyDetails } from '../redux/actions';
import currency from '../currency';
import { BorderlessButton } from 'react-native-gesture-handler';



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  loading: {
    flexGrow: 1,
  },
  noItem: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dashboardButton: {
    alignSelf: "center",
    width: '50%',
    marginVertical: normalize(20),
  },

  content: {
    paddingHorizontal: normalize(18),
    paddingVertical: normalize(10),
    flexGrow: 1,

  },

  itemContainer: {
    backgroundColor: "#efefef",
    borderRadius: normalize(20),
    padding: normalize(20),
    marginVertical: normalize(5),
    marginHorizontal: normalize(10),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  detailContainer: {
    flex: 3,
  },


  itemStatusContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },


  viewText: {
    color: '#FFF',
    fontFamily: 'Roboto_700Bold',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  viewDetails: {
    textAlign: "center",
    alignItems: 'center',
    padding: normalize(4),
    backgroundColor: '#2B4257',
    borderRadius: 15,
    width: '100%',
  },

  viewDetailsActive: {
    backgroundColor: '#CE0303',

  },

  // enrouteDetails: {
  //   backgroundColor: '#C8F2A7',
  //   borderRadius: normalize(20),
  //   textAlignVertical: "top",
  //   paddingVertical: normalize(10),
  //   paddingHorizontal: normalize(15),
  //   height: normalize(85),
  //   marginTop: normalize(15),
  // },

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

});



function HistoryScreen({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.userToken);
  const [ShowErrorMessage, setShowErrorMessage] = useState(true);
  const history = useSelector(state => state.trip.historyDetails);
  const [loading, setLoading] = useState(true);
  // console.log(history);

  useEffect(() => {
    try {
      mooveHistory(token).then(response => {
        if (response.data) {
          console.log('about to dispatch...');
          dispatch(historyDetails(response.data.data));
          console.log('just dispatched');
          setShowErrorMessage(false);
          setLoading(false);

        }
      })
    } catch (error) {
      if (error.response) {
        if (error.response.data.message) {
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
    } finally {
    }
  }, []);

  const toggleDrawerHandler = () => {
    navigation.openDrawer();
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='always'>

      <Title
        title={"past mooves"}
        fontIcon="side_menu"
        headerOptionHandler={toggleDrawerHandler}
        subTitle={"Moove history "}
        subTitleStyle={{ fontSize: normalize(21) }}
        containerStyle={{ paddingHorizontal: normalize(18) }}
      />

      {loading && <ActivityIndicator style={styles.loading} size="small" color="#0000ff" />}

      {(!loading && history.length === 0) && <View style={styles.noItem}>
        <Text>You have not made a moove request yet...</Text>
        <RedButton
          title="Start a moove"
          buttonStyle={styles.dashboardButton}
          onPress={() => {
            navigation.navigate('Home')
          }}></RedButton>
      </View>
      }

      {(!loading && history.length > 0) && <View>
        <RenderMooveItems items={history} />
      </View>
      }



    </ScrollView>
  );
}


function RenderMooveItems({ items }) {
  return <>
    {items.map(
      item => <RenderMooveItem key={item.id} item={item} />
    )}
  </>
}

function RenderMooveItem({ item }) {

  return (
    <View style={styles.itemContainer}>
      <View style={styles.detailContainer}>
        <Text style={styles.mooveId}>Moove - MV{item.moove_id}</Text>
        <Text style={{marginVertical: normalize(5)}}>{item.created_at}</Text>
        <Text style={styles.tripCost}>{currency(item.cost_of_trip)}</Text>
      </View>

      <View style={styles.itemStatusContainer} >
        <Text>{item.trip_status}</Text>
        <RenderActionButton item={item} />
      </View>
    </View>
  )


  function RenderActionButton({ item }) {
    const TrackButton = () =>
      <BorderlessButton style={[styles.viewDetails, styles.viewDetailsActive]} onPress={() => {
        navigation.navigate('TrackActiveMoove', item)
      }}>
        <Text style={styles.viewText}>Track</Text>
      </BorderlessButton>


    const ViewButton = () =>
      <BorderlessButton style={styles.viewDetails} onPress={() => {
        navigation.navigate('HistoryDetails', item)
      }}>
        <Text style={styles.viewText}>View</Text>
      </BorderlessButton>


    return <>
      {item.trip_status === 'IN_PROGRESS' ? <TrackButton item={item} /> : <ViewButton item={item} />}
    </>
  }
}

export default HistoryScreen