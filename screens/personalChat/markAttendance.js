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
import SigninScreen from '../auth/signinScreen';






const loginUserId = 1;

const MarkAttendance = ({ navigation,route}) => {
   

    // const item = route.params.item;
    // const item = '';

    const [messages, setMessages] = useState()
    const [typeMessage, setTypeMessage] = useState('');
    const [showSendOptionsSheet, setShowSendOptionsSheet] = useState(false);
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [imageUri, setImageUri]     = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        /*   if (route.params?.selectedPhotos) {
              setSelectedPhotos(route.params.selectedPhotos);
          } */

             if (Platform.OS === 'android') {
                ////requestLocationPermission();
              } else {
                getLocation();
              } 
    }, []);


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
        console.log('platform ',Platform.OS)
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


    const staffAttendanceScreen = ()=>{
        navigation.navigate('StaffAttendance')
    }

    const logout = () => {
        navigation.push ('SigninScreen');
    };

    

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
            <MyStatusBar />
            {header()}
            <View style={{ flex: 1 }}>
                {messagesInfo()}
            </View>
            {optionsSheet()}
        </View>
    )

    function optionsSheet() {
      
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showSendOptionsSheet}
                onRequestClose={() => { setShowSendOptionsSheet(false) }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { setShowSendOptionsSheet(false); }}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View style={{ justifyContent: "flex-end", flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                            style={styles.sheetStyle}
                        >
                            {sheetOptionShort({ iconName: 'camera-alt', option: 'Camera', onPress: () => { navigation.push('SelectPhoto', { sendIn: 'personal' }) }, })}
                            <View style={styles.sheetDivider} />
                            {sheetOptionShort({ iconName: 'image', option: 'Gallery', onPress: () => { navigation.push('SelectPhoto', { sendIn: 'personal' }) }, })}
                            <View style={styles.sheetDivider} />
                            {sheetOptionShort({ iconName: 'insert-drive-file', option: 'Document', onPress: () => { }, })}
                            <View style={styles.sheetDivider} />
                            {sheetOptionShort({ iconName: 'location-pin', option: 'Location', onPress: () => { navigation.push('SelectLocation', { sendIn: 'personal' }) }, })}
                            <Text
                                onPress={() => { setShowSendOptionsSheet(false) }}
                                style={{ ...Fonts.primaryColor17Bold, alignSelf: 'center', marginTop: Sizes.fixPadding * 2.0 }}
                            >
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    function sheetOptionShort(props) {

        return (
          
            
            <Touchable
                onPress={() => {
                    setShowSendOptionsSheet(false);
                    props.onPress();
                }}
                style={{ ...CommonStyles.rowAlignCenter, marginHorizontal: Sizes.fixPadding * 2.0 }}
            >
                <MaterialIcons name={props.iconName} size={22} color={Colors.lightGrayColor} />
                <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Regular, marginLeft: Sizes.fixPadding }}>
                    {props.option}
                </Text>
            </Touchable>
           
        )
    }



    function messagesInfo() {
        return (
            
            <View style={styles.messagesWrapper}>


                <View style={styles.markView}>

                    {imageUri?
                    <Image source={{ uri: imageUri }} style={styles2.image} />
                    
                    :
                    <Image

                        source={{ uri: 'https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg' }}

                        style={styles2.image}
                    />

                    }
                    
                   
                </View>

                <View>
                    <Text style={{ color: "#808080", fontSize: 30, fontWeight: "bold", textAlign:"center", }}>Attendance</Text>
                

                    {imageUri?
                    
                        
                    <View>
                         <Text style={styles.text1}>12.08.2024   9:00 AM</Text>

                         <Text>{location ? `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}` : 'Getting Location...'}</Text>
                         </View>
                      
                     :<Text style={styles.text1}>Capture your photo and press mark attendance for the attendance</Text>}

                    
                </View>

                <View style={{ flex: 1, marginTop:30 }}>
                    <TouchableOpacity onPress={openCamera}>
                        <View style={styles.upload}>




                            <Text style={styles.capturetext}>  <Ionicons name="camera-outline" size={20} color="white" />  Capture Photo</Text>



                        </View>
                    </TouchableOpacity>
                

                    <TouchableOpacity /*  onPress={() => { navigation.navigate('StaffAttendance') }}  */> 
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
                {/* <Touchable onPress={() => { navigation.pop() }}>
                    <Ionicons
                        name='chevron-back'
                        color={Colors.whiteColor}
                        size={24}
                    />
                </Touchable> */}
                <Image

                    source={{ uri: 'https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg' }}

                    style={styles.userImageWrapper}
                />

                <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={{ ...Fonts.whiteColor18Bold }}>
                        {route.params.name}
                    </Text>
                </View>


                <Menu
                    visible={showMenu}
                    anchor={<Ionicons
                        name='ellipsis-vertical'
                        color={Colors.whiteColor}
                        size={20}
                        onPress={() => { setShowMenu(true) }}
                    />}
                    onRequestClose={setShowMenu}
                >
                    <View style={{
                        backgroundColor: Colors.whiteColor,
                        borderRadius: Sizes.fixPadding,
                        paddingVertical: Sizes.fixPadding * 2.0
                      
                    }}>
                       {/*  {meuOptionSort({ iconName: 'add', option: 'Staff Attendance', size: 22, onPress: () => {navigation.navigate('StaffAttendance')} })}
                        <View style={styles.menuDivider} />
                        {meuOptionSort({ iconName: 'volume-mute', option: 'Attendance List', onPress: () => { } })}
                        <View style={styles.menuDivider} />
                        {meuOptionSort({ iconName: 'star', option: 'Report', size: 18, onPress: () => { } })}
                        <View style={styles.menuDivider} />
                        {meuOptionSort({ iconName: 'sign-out', option: 'Logout', onPress: () => { } })} */}
                         {/* <View style={styles.menuDivider} />
                        {meuOptionSort({ iconName: 'trash', option: 'Delete Group', onPress: () => { } })}
                        <View style={styles.menuDivider} />
                        {meuOptionSort({ iconName: 'log-out', option: 'Leave Group', onPress: () => { } })}  */}


<TouchableOpacity
                activeOpacity={0.8}
                onPress={()=>staffAttendanceScreen()}
                style={{ ...CommonStyles.rowAlignCenter, marginHorizontal: Sizes.fixPadding * 2.0 }}
            >
                <View style={{ width: 20.0, height: 20.0, ...CommonStyles.center }}>
                    
                </View>
                <Text style={{ ...Fonts.blackColor16Regular, marginLeft: Sizes.fixPadding }}>
                    Staff Attendance
                </Text>
                
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=>logout()}
                style={{ ...CommonStyles.rowAlignCenter, marginHorizontal: Sizes.fixPadding * 2.0 }}
            >
                <View style={{ width: 20.0, height: 20.0, ...CommonStyles.center }}>
                    
                </View>
                <Text style={{ ...Fonts.blackColor16Regular, margin: Sizes.fixPadding }}>
                    Logout
                </Text>
                
            </TouchableOpacity>

                    </View>
           </Menu>
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

export default MarkAttendance

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
        //alignItems:"center",
        flexDirection: "row",
        alignItems: "center"

    },
    text1: {
        color: "#808080",
        fontSize: 16,
        //margin: 50,
        padding: 30,
        textAlign:"center",
    },
    upload: {

        flexDirection: "row",
        backgroundColor: "#29476D",
        borderColor: "#1e81b0",
        borderRadius: 60,
        width: 300,
        marginTop:20

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