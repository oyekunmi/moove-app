import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert, ActivityIndicator, StatusBar } from 'react-native';
import Title from '../components/Title';
import { normalize } from '../normalizeFont';
import RedButton from '../components/RedButton';
import { useSelector, useDispatch } from 'react-redux';
import { mooveHistory } from '../utils/helpers/api';
import { tripsUpdated } from '../redux/actions';
import currency from '../currency';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';


function MooveHistoryListScreen({ navigation }) {
  
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.userToken);
  const history = useSelector(state => state.trips.list);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      mooveHistory(token).then(response => {
        dispatch(tripsUpdated(response.data.data));
        setLoading(false);
      },
      error => {
        var errorMessage = error?.response?.data?.message ? error.response.data.message: 'Network error, Please try again.';
        Alert.alert('Cannot complete', errorMessage);
        setLoading(false);
      }
      );
    }, [])
  )
  
  const toggleDrawerHandler = () => {
    navigation.openDrawer();
  }

  console.log(history);

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='always'>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Title
        title={"past mooves"}
        fontIcon="side_menu"
        headerOptionHandler={toggleDrawerHandler}
        subTitle={"Moove history "}
        subTitleStyle={{ fontSize: normalize(21) }}
        containerStyle={{ paddingHorizontal: normalize(18) }}
      />

      {loading && <ActivityIndicator style={styles.loading} size="small" color="#0000ff" />}

      {(!loading && (!history || history.length === 0)) && <View style={styles.noItem}>
        <Text>You have not made a moove request yet...</Text>
        <RedButton
          title="Start a moove"
          buttonStyle={styles.dashboardButton}
          onPress={() => {
            navigation.navigate('Home')
          }}></RedButton>
      </View>
      }

      {(!loading && (history && history.length > 0)) && <View>
        <RenderMooveItems navigation={navigation} items={history} />
      </View>
      }

    </ScrollView>
  );
}

function RenderMooveItems({ navigation, items }) {

  const onActionPressed = (item) => {
    navigation.navigate('MooveHistoryOrderStatus', {order: item});
  };

  return <>
    {items.map(
      item => <RenderMooveItem key={item.id} item={item} action={onActionPressed} />
    )}
  </>
}

function RenderMooveItem({ item, action }) {
  console.log(item);
  return (
    <View style={styles.itemContainer}>
      <View style={styles.detailContainer}>
        <Text style={styles.mooveId}>Moove - {item.moove_name}</Text>
        <Text style={styles.tripDate}>{item.created_at}</Text>
        <Text style={styles.tripCost}>{currency(item.cost_of_trip)}</Text>
      </View>

      <View style={styles.itemStatusContainer} >
        <Text style={styles.statusText}>{item.display_status}</Text>
        <RenderActionButton onViewClicked={action} item={item} />
      </View>
    </View>
  )

}

function RenderActionButton({ item, onViewClicked }) {

  return(
    <BorderlessButton style={[styles.viewDetails, item.can_track ? styles.viewDetailsActive:{}]} onPress={() => onViewClicked(item)}>
      <Text style={styles.viewText}>Track</Text>
    </BorderlessButton>
  )
}

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
    color: "#DADADA"
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
  statusText: {
    color: "#545252"

  },

  tripCost: {
    fontSize: normalize(17),
    fontWeight: 'bold',
    color: "#181818"
  },
  tripDate: {
    color: "#545252",
    marginVertical: normalize(5),
  },
  mooveId: {
    fontSize: normalize(15),
    fontWeight: 'bold',
    color: "#181818"

  },

  errorMsg: {
    color: '#CE0303',
    fontSize: normalize(14),
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: normalize(50)
  },
});

export default MooveHistoryListScreen