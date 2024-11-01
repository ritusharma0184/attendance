//import React, { Component } from 'react';
import { Image, StyleSheet, Modal, Text, TextInput, TouchableOpacity, View, FlatList, Button, PermissionsAndroid, Platform, Linking, Alert } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { Colors, Fonts, Sizes, CommonStyles, screenWidth } from '../../constants/styles'
import MyStatusBar from '../../components/myStatusBar'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Touchable } from '../../components/touchable';
import { launchCamera } from 'react-native-image-picker'
import { GiftedChat } from 'react-native-gifted-chat'
import { ImagesView, LocationView, MessageView } from '../../components/commonMessage';
import { ScrollView } from 'react-native-gesture-handler';
import { Menu } from 'react-native-material-menu';
import Geolocation from 'react-native-geolocation-service';
import StaffAttendance from './staffAttendance';
import CalendarModal from './calendar';


const loginUserId = 1;
const MarkstaffAttendence = ({ navigation, route }) => {

  const [messages, setMessages] = useState()
  const [typeMessage, setTypeMessage] = useState('');
  const [showSendOptionsSheet, setShowSendOptionsSheet] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [location, setLocation] = useState(null);

  const [showModal, setShowModal] = useState(false)


  ///console.log('test ',route)

  const name = route.params.name
  const [displayDate, setDisplayDate] = useState("")
  const [currentDate, setCurrentDate] = useState("")




  useEffect(() => {
    
    

    /*   if (route.params?.selectedPhotos) {
          setSelectedPhotos(route.params.selectedPhotos);
      } */

    if (Platform.OS === 'android') {
      ////requestLocationPermission();
    } else {
      ///getLocation();
    }
  }, []);


  const GetCurrentDate = () => {
    const currentDate = new Date(); // Get the current date
  
    // Format the date as needed, e.g., "DD.MM.YYYY"
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are zero-based
    const year = currentDate.getFullYear();
  
    // Add leading zeroes for day and month if necessary
    const formattedDate = `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}.${year}`;
  
    return formattedDate
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "This app needs access to your location.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );

      // console.log('test ',granted)
      // console.log('test2 ',PermissionsAndroid.RESULTS.GRANTED)
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //  console.log("You can use the location");
        getLocation()
      } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
        //console.log("Location permission denied");
        Alert.alert("Permission Denied", "You denied location access. To use this feature, please enable location permission in the settings.");
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        //console.log("Location permission denied with 'Don't ask again'");
        Alert.alert(
          "Permission Required",
          "Location permission is required for this app to work. Please enable it in the app settings.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => openAppSettings() }
          ]
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };


  const openAppSettings = () => {
    Linking.openSettings();
  };

  const getLocation = async () => {
    console.log('platform ', Platform.OS)
    if (Platform.OS === 'android') {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        console.log('Position: ', position);
      },
      (error) => {
        console.log('Error getting location: ', error);
        Alert.alert('Error', `Failed to get location: ${error.message}`);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
  const openCamera = () => {
    console.log('hello')
    const options = {
      mediaType: 'photo',
      cameraType: 'back',
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        const uri = response.assets[0].uri;

        setImageUri(uri);
      }
    });
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
      <MyStatusBar />
      {header()}
      <View style={{ flex: 1 }}>
        {messagesInfo()}
      </View>

    </View>
  )





  function messagesInfo() {

    const getCalendarVal = (date) => {

      setDisplayDate(date);
    }

    return (

      <View style={styles.messagesWrapper}>
        <Text style={{ color: "#808080", fontSize: 30, fontWeight: "bold", margin: 20 }}>Staff Attendance</Text>


        <View style={styles.markView}>


          {imageUri ?
            <Image source={{ uri: imageUri }} style={styles2.image} />

            :
            <View>
              <Image

                source={{ uri: 'https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg' }}

                style={styles2.image}
              />

              <Text style={styles.text2}>{name}</Text>
            </View>

          }


        </View>

        <View>

          {/*  <View>


              <Text style={styles.text1}>12.08.2024  <CalendarModal calendarVal={getCalendarVal}/> </Text> 

            <Text>{location ? `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}` : 'Getting Location...'}</Text>
          </View> */}

          <View>
            {/* First Row: Date Text and CalendarModal */}
            <View style={styles.rowContainer}>
              <Text style={styles.text1}> {displayDate?displayDate:GetCurrentDate()} </Text>
              <CalendarModal calendarVal={getCalendarVal} />
            </View>

            {/* Second Row: Location Text */}
            <Text style={styles.locationText}>
              {location ? `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}` : 'Getting Location...'}
            </Text>
          </View>


        </View>
        <View style={{ flex: 1, marginTop: 30 }}>
          <TouchableOpacity>
            <View style={styles.upload} >
              <Text style={styles.capturetext}><Ionicons name="calendar-outline" size={20} color="white" />  Mark Attendance</Text>
            </View>
          </TouchableOpacity>

        </View>

      </View>

    )
  }
  function header() {
    return (
      <View
        style={{
          ...CommonStyles.rowAlignCenter,
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginVertical: Sizes.fixPadding * 3.0
        }}
      >
        <Touchable onPress={() => { navigation.pop() }}>
          <Ionicons
            name='chevron-back'
            color={Colors.whiteColor}
            size={24}
          />
        </Touchable>
        <Image

          source={{ uri: 'https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg' }}

          style={styles.userImageWrapper}
        />

        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={{ ...Fonts.whiteColor18Bold }}>
            {'User name'}
          </Text>
        </View>
      </View>

    )
  }
  function meuOptionSort(props) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setShowMenu(false)}
        style={{ ...CommonStyles.rowAlignCenter, marginHorizontal: Sizes.fixPadding * 2.0 }}
      >
        <View style={{ width: 20.0, height: 20.0, ...CommonStyles.center }}>
          <Ionicons
            name={props.iconName}
            color={Colors.lightGrayColor}
            size={props.size ? props.size : 20}
          />
        </View>
        <Text style={{ ...Fonts.blackColor16Regular, marginLeft: Sizes.fixPadding }}>
          {props.option}
        </Text>
      </TouchableOpacity>
    )
  }

}

export default MarkstaffAttendence;

const styles = StyleSheet.create({

  markView: {
    // flex:1,
    margin: 40,
    opecity: 5,
    height: 170,
    width: 170,
    borderRadius: 150,
    backgroundColor: "#ccc",
    borderColor: "#29476D",
    borderWidth: 5,
  },

  dateTime: {
    flex: 1,

    flexDirection: "row",
    alignItems: "center"

  },
  /*  text1: {
     color: "#808080",
     fontSize: 20,
     margin: 20,
     padding: 20,
     flexDirection: "row"
   }, */
  text2: {
    color: "#808080",
    fontSize: 20,
    // margin: 20,
    paddingTop: 40,
    textAlign: "center"

  },

  upload: {

    flexDirection: "row",
    backgroundColor: "#29476D",
    borderColor: "#1e81b0",
    borderRadius: 60,
    width: 300,
    marginTop: 20

  },
  capturetext: {
    flex: 1,
    fontSize: 20,
    color: "#fff",
    padding: 15,
    textAlign: "center",


  },

  userImageWrapper: {
    width: 50.0,
    height: 50.0,
    borderRadius: 25.0,
    marginHorizontal: Sizes.fixPadding + 5.0
  },


  messagesWrapper: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: Sizes.fixPadding * 4.0,
    borderTopRightRadius: Sizes.fixPadding * 4.0,
    overflow: 'hidden',
  },
  menuDivider: {
    backgroundColor: Colors.grayColor,
    opacity: 0.1,
    height: 1.0,
    marginVertical: Sizes.fixPadding + 5.0
  },


  rowContainer: {
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Vertically center the text and icon
    justifyContent: 'center',
    marginLeft: 210

  },
  text1: {
    fontSize: 16, // Adjust font size as needed
    marginRight: 10, // Add spacing between Text and CalendarModal
    color: 'black',
    flexDirection: 'row',
    marginTop: 50

  },
  locationText: {
    marginTop: 10, // Add some spacing between the rows
    fontSize: 14, // Adjust this as per design
  },

});

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 160,
    width: 160,
    borderRadius: 160,
    // margin: 40,
  },
});