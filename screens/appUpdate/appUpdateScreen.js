import { ScrollView,  Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import MyStatusBar from '../../components/myStatusBar'
import { Header } from '../../components/header'
import { Switch } from '../../components/switch'

const AppUpdateScreen = ({ navigation }) => {

    const [autoUpdate, setAutoUpdate] = useState(true);
    const [notify, setNotify] = useState(true);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                <Header header='App Updates' navigation={navigation} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {autpUpdateInfo()}
                    {notificationInfo()}
                </ScrollView>
            </View>
        </View>
    )

    function notificationInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ flex: 1 }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium }}>
                            App update available
                        </Text>
                        <Text style={{ ...Fonts.grayColor14Regular, marginTop: Sizes.fixPadding - 5.0 }}>
                            Get notified when updates are available
                        </Text>
                    </View>
                    <Switch value={notify} setValue={() => { setNotify(!notify) }} />
                </View>
            </View>
        )
    }

    function autpUpdateInfo() {
        return (
            <View style={{ flexDirection: 'row', marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding }}>
                <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium }}>
                        Auto Update App
                    </Text>
                    <Text style={{ ...Fonts.grayColor14Regular, marginTop: Sizes.fixPadding - 5.0 }}>
                        Automatically update app over WiFi
                    </Text>
                </View>
                <Switch value={autoUpdate} setValue={() => { setAutoUpdate(!autoUpdate) }} />
            </View>
        )
    }
}

export default AppUpdateScreen