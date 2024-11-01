import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors, Fonts, Sizes, CommonStyles, screenWidth, screenHeight } from '../../constants/styles'
import MyStatusBar from '../../components/myStatusBar'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Touchable } from '../../components/touchable'
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Key from '../../constants/key'
import Geocoder from 'react-native-geocoding';

const ASPECT_RATIO = screenWidth / screenHeight;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.3;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const SelectLocationScreen = ({ navigation, route }) => {

    useEffect(() => {
        Geocoder.init(Key.apiKey);
      }, []);

    const sendIn = route.params?.sendIn;

    const [currentmarker, setCurrentMarker] = useState({
        latitude: LATITUDE,
        longitude: LONGITUDE,
    });
    const [search, setSearch] = useState("");

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'height' : null}
            style={{ flex: 1, backgroundColor: Colors.whiteColor }}
        >
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {backArrow()}
                {mapView()}
            </View>
            {locationInfo()}
        </KeyboardAvoidingView>
    )   

    async function setTheMarkerAccordingSearch({address}) {
        Geocoder.from(address)
          .then(json => {
            var location = json.results[0].geometry.location;
            const userSearchLocation = {
              latitude: location.lat,
              longitude: location.lng,
            };
            setCurrentMarker(userSearchLocation);
          })
          .catch(error => console.warn(error));
      }
    
    function locationInfo() {
        return (
            <View style={styles.locationInfoWrapper}>
                <View style={{ ...styles.searchFieldWrapper }}>
                    <Ionicons
                        name="search"
                        color={search ? Colors.primaryColor : Colors.lightGrayColor}
                        size={18}
                        style={{ position: 'absolute', top: 14.0, left: 13.0 }}
                    />
                    <GooglePlacesAutocomplete
                        placeholder="Search for location..."
                        onPress={(data) => {
                            setSearch(data.description);
                            setTheMarkerAccordingSearch({ address: data.description });
                        }}
                        query={{
                            key: Key.apiKey,
                            language: "en",
                        }}
                        styles={{
                            textInputContainer: { height: 46.0, marginLeft: Sizes.fixPadding * 1.5 },
                            description: { ...Fonts.blackColor15Regular },
                            poweredContainer: { height: 0, width: 0, borderTopWidth: 0, },
                            powered: { width: 0, height: 0 },
                            row: { backgroundColor: Colors.whiteColor, padding: Sizes.fixPadding + 5.0 },
                            separator: { height: 1.0, backgroundColor: Colors.extraLightGrayColor, },
                        }}
                        textInputProps={{
                            InputComp: TextInput,
                            value: search,
                            onChangeText: (value) => { setSearch(value) },
                            style: {
                                flex: 1,
                                marginHorizontal: Sizes.fixPadding,
                                ...Fonts.blackColor15Regular,
                            },
                            placeholderTextColor: Colors.lightGrayColor,
                            cursorColor: Colors.primaryColor,
                            selectionColor: Colors.primaryColor,
                        }}
                    />
                </View>
                <Touchable
                    onPress={() => {
                        sendIn == 'personal'
                            ?
                            navigation.navigate({
                                name: "PersonalChat",
                                params: { location: currentmarker },
                                merge: true,
                            })
                            :
                            navigation.navigate({
                                name: "GroupChat",
                                params: { location: currentmarker },
                                merge: true,
                            })
                    }}
                    style={{
                        ...CommonStyles.rowAlignCenter,
                        marginTop: Sizes.fixPadding * 2.0,
                        marginHorizontal: Sizes.fixPadding * 2.0
                    }}
                >
                    <Ionicons
                        name='location'
                        color={Colors.lightGrayColor}
                        size={22}
                    />
                    <Text
                        numberOfLines={1}
                        style={{
                            ...Fonts.blackColor16Regular, flex: 1,
                            marginLeft: Sizes.fixPadding
                        }}>
                        Share your current location
                    </Text>
                </Touchable>
                <View style={styles.divider} />
                <Touchable
                    onPress={() => {
                        sendIn == 'personal'
                            ?
                            navigation.navigate({
                                name: "PersonalChat",
                                params: { location: currentmarker },
                                merge: true,
                            })
                            :
                            navigation.navigate({
                                name: "GroupChat",
                                params: { location: currentmarker },
                                merge: true,
                            })
                    }}
                    style={{ ...CommonStyles.rowAlignCenter, marginHorizontal: Sizes.fixPadding * 2.0 }}
                >
                    <Ionicons
                        name='navigate'
                        color={Colors.lightGrayColor}
                        size={22}
                    />
                    <Text
                        numberOfLines={1}
                        style={{ ...Fonts.blackColor16Regular, flex: 1, marginLeft: Sizes.fixPadding }}
                    >
                        Share live location
                    </Text>
                </Touchable>
            </View>
        )
    }

    function backArrow() {
        return (
            <Touchable
                onPress={() => { navigation.pop() }}
                style={{
                    position: 'absolute',
                    top: 20.0,
                    left: 20.0,
                    zIndex: 1
                }}
            >
                <Ionicons
                    name='chevron-back'
                    color={Colors.blackColor}
                    size={26}
                />
            </Touchable>
        )
    }

    function mapView() {
        return (
            <MapView
                style={{ height: "100%" }}
                region={{
                    latitude: currentmarker.latitude,
                    longitude: currentmarker.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
                showsUserLocation={true}
                followsUserLocation={true}
                provider={PROVIDER_GOOGLE}
            >
                <Marker
                    coordinate={currentmarker}
                    onDragEnd={(e) => { setCurrentMarker(e.nativeEvent.coordinate); }}
                    draggable
                >
                    <Image
                        source={require("../../assets/images/icons/marker.png")}
                        style={{ width: 48.0, height: 48.0, resizeMode: "contain" }}
                    />
                </Marker>
            </MapView>
        );
    }
}

export default SelectLocationScreen

const styles = StyleSheet.create({
    searchFieldWrapper: {
        flexDirection: 'row',
        borderRadius: Sizes.fixPadding * 3.0,
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
        paddingHorizontal: Sizes.fixPadding + 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding - 5.0,
        overflow: 'hidden',
    },
    divider: {
        backgroundColor: Colors.grayColor,
        opacity: 0.1,
        height: 1.0,
        marginVertical: Sizes.fixPadding + 5.0,
    },
    locationInfoWrapper: {
        backgroundColor: Colors.whiteColor,
        position: 'absolute',
        left: 20.0,
        right: 20.0,
        bottom: 20.0,
        borderRadius: Sizes.fixPadding * 3.0,
        paddingVertical: Sizes.fixPadding * 2.5,
        zIndex: 100
    }
})