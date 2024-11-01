import { ImageBackground, StatusBar, StyleSheet, Text, View, Image, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes, CommonStyles, screenWidth } from '../../constants/styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Touchable } from '../../components/touchable'

const VideoCallScreen = ({ navigation }) => {

    const [mute, setMute] = useState(false);
    const [speaker, setSpeaker] = useState(true);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent backgroundColor='transparent' barStyle={'light-content'} />
            <ImageBackground
                source={require('../../assets/images/video_bg.png')}
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    paddingTop: Platform.OS == 'ios' ? Sizes.fixPadding * 6.0 : StatusBar.currentHeight
                }}
            >
                {backArrowWithImage()}
                {nameAndTimeInfo()}
            </ImageBackground>
        </View>
    )

    function nameAndTimeInfo() {
        return (
            <View>
                <View style={{ ...CommonStyles.center, margin: Sizes.fixPadding * 3.0 }}>
                    <Text style={{ ...Fonts.whiteColor20Bold, textAlign: 'center' }}>
                        Sara Mitchell
                    </Text>
                    <Text style={{ ...Fonts.whiteColor15Regular, marginTop: Sizes.fixPadding - 5.0 }}>
                        02:35 min
                    </Text>
                </View>
                <View style={styles.callFunctionalitiesWrapper}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { setMute(!mute) }}
                        style={{ ...CommonStyles.center, }}
                    >
                        <Ionicons name={mute ? 'mic-off' : "mic"} size={26} color={Colors.whiteColor} />
                        <Text style={{ ...Fonts.whiteColor16Medium, marginTop: Sizes.fixPadding }}>
                            Mute
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { setSpeaker(!speaker) }}
                        style={{ ...CommonStyles.center }}
                    >
                        <Ionicons name={speaker ? "volume-high" : 'volume-mute'} size={26} color={Colors.whiteColor} />
                        <Text style={{ ...Fonts.whiteColor16Medium, marginTop: Sizes.fixPadding }}>
                            Volume
                        </Text>
                    </TouchableOpacity>
                    <Touchable
                        onPress={() => { navigation.pop() }}
                        style={{ ...CommonStyles.center }}
                    >
                        <MaterialIcons name="call-end" size={26} color={Colors.redColor} />
                        <Text style={{ ...Fonts.whiteColor16Medium, marginTop: Sizes.fixPadding }}>
                            End
                        </Text>
                    </Touchable>
                </View>
            </View>
        )
    }

    function backArrowWithImage() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: Sizes.fixPadding * 2.0
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
                    source={require('../../assets/images/users/user11.png')}
                    style={{ width: screenWidth / 4.0, height: screenWidth / 3.2, borderRadius: Sizes.fixPadding }}
                />
            </View>
        )
    }
}

export default VideoCallScreen

const styles = StyleSheet.create({
    callFunctionalitiesWrapper: {
        ...CommonStyles.rowAlignCenter,
        justifyContent: 'space-evenly',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: Sizes.fixPadding * 2.5
    }
})