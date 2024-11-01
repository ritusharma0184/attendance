import { ScrollView,  Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles'
import MyStatusBar from '../../components/myStatusBar'
import { Header } from '../../components/header'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Switch } from '../../components/switch'

const DataAndStorageScreen = ({ navigation }) => {

    const [useLessData, setUseLessData] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                <Header header='Data and Storage' navigation={navigation} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {manageStorageInfo()}
                    {divider()}
                    {networkInfo()}
                </ScrollView>
            </View>
        </View>
    )

    function networkInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                {networkUsageInfo()}
                {manageDateOnCalls()}
            </View>
        )
    }

    function divider() {
        return (
            <View style={{
                backgroundColor: Colors.grayColor,
                opacity: 0.1,
                height: 1.0,
                marginVertical: Sizes.fixPadding * 2.0
            }} />
        )
    }

    function networkUsageInfo() {
        return (
            <View style={{ ...CommonStyles.rowAlignCenter }}>
                <View style={{ width: 20.0, height: 20.0, ...CommonStyles.center }}>
                    <MaterialIcons
                        name="data-usage"
                        color={Colors.lightGrayColor}
                        size={20}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium }}>
                        Network usage
                    </Text>
                    <Text style={{ ...Fonts.grayColor14Regular, marginTop: Sizes.fixPadding - 5.0 }}>
                        2.7 GB sent • 18.8 GB received
                    </Text>
                </View>
            </View>
        )
    }

    function manageDateOnCalls() {
        return (
            <View style={{ ...CommonStyles.rowAlignCenter, marginTop: Sizes.fixPadding * 2.0, marginLeft: Sizes.fixPadding * 3.5 }}>
                <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium, flex: 1, marginRight: Sizes.fixPadding + 5.0 }}>
                    Use less data for calls
                </Text>
                <Switch value={useLessData} setValue={() => { setUseLessData(!useLessData) }} />
            </View>
        )
    }

    function manageStorageInfo() {
        return (
            <View style={{ ...CommonStyles.rowAlignCenter, marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding }}>
                <Ionicons
                    name='folder'
                    color={Colors.lightGrayColor}
                    size={20}
                />
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium }}>
                        Manage storage
                    </Text>
                    <Text style={{ ...Fonts.grayColor14Regular, marginTop: Sizes.fixPadding - 5.0 }}>
                        1.2 GB
                    </Text>
                </View>
            </View>
        )
    }
}

export default DataAndStorageScreen