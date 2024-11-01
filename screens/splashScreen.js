import { Image, StatusBar, Text, View } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes, CommonStyles } from '../constants/styles'

const SplashScreen = ({ navigation }) => {

    setTimeout(() => {
        navigation.push('Onboarding')
    }, 2000);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primaryColor, ...CommonStyles.center }} >
            <StatusBar translucent backgroundColor='transparent' barStyle={"light-content"} />
            {appIconWithLogo()}
        </View>
    )

    function appIconWithLogo() {
        return (
            <View style={{ ...CommonStyles.center }}>
                <Image
                    source={require('../assets/images/app_icon.png')}
                    style={{ width: 50.0, height: 60.0, resizeMode: 'contain' }}
                />
                <Text style={{ ...Fonts.whiteColor20MuktaBold, marginTop: Sizes.fixPadding, letterSpacing: 3.0 }}>
                    CHAT
                    <Text style={{ ...Fonts.whiteColor20MuktaRegular }}>
                        APP
                    </Text>
                </Text>
            </View>
        )
    }
}

export default SplashScreen
