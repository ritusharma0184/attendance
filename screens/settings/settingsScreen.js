import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles'
import MyStatusBar from '../../components/myStatusBar'
import { Header } from '../../components/header'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Touchable } from '../../components/touchable'
import { Switch } from '../../components/switch'

const SettingsScreen = ({ navigation }) => {

    const [darkMode, setDarkMode] = useState(false);
    const [activeState, setActiveState] = useState(true);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                <Header header='Settings' navigation={navigation} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {themeInfo()}
                    {statusInfo()}
                    {optionShort({ onPress: () => { navigation.push('Languages') }, color: Colors.pinkColor, iconName: 'public', option: 'Language' })}
                    {optionShort({ onPress: () => { navigation.push('AppUpdate') }, color: Colors.blueColor, iconName: 'sync', option: 'App Updates' })}
                    {optionShort({ onPress: () => { navigation.push('Notifications') }, color: Colors.greenColor, iconName: 'notifications', option: 'Notifications and Sounds' })}
                    {divider()}
                    {optionShort({ onPress: () => { }, color: Colors.orangeColor, iconName: 'edit', option: 'Preferences' })}
                    {optionShort({ onPress: () => { navigation.push('HelpAndSupport') }, color: Colors.cyanColor, iconName: 'help', option: 'Help and Support' })}
                    {optionShort({ onPress: () => { navigation.push('PrivacyPolicy') }, color: Colors.yellowColor, iconName: 'verified-user', option: 'Privacy Policy' })}
                    {optionShort({ onPress: () => { }, color: Colors.wineColor, iconName: 'report', option: 'Report a Bug' })}
                </ScrollView>
            </View>
        </View>
    )

    function divider() {
        return (
            <View style={styles.dividerStyle} />
        )
    }

    function optionShort(props) {
        return (
            <Touchable
                onPress={() => { props.onPress() }}
                style={styles.optionWrapper}
            >
                <View style={{ ...styles.optionIconWrapper, backgroundColor: props.color, }}>
                    <MaterialIcons
                        name={props.iconName}
                        size={20}
                        color={Colors.whiteColor}
                    />
                </View>
                <Text numberOfLines={1} style={{ ...Fonts.grayColor16Regular, marginHorizontal: Sizes.fixPadding + 5.0, flex: 1 }}>
                    {props.option}
                </Text>
                <Ionicons name="chevron-forward" size={20} color={Colors.grayColor} />
            </Touchable>
        )
    }

    function statusInfo() {
        return (
            <View style={styles.optionWrapper}>
                <View style={{ ...styles.optionIconWrapper, backgroundColor: Colors.parrotColor, }}>
                    <Image
                        source={require('../../assets/images/icons/active.png')}
                        style={{ width: 16.0, height: 16.0, resizeMode: 'contain' }}
                    />
                </View>
                <Text numberOfLines={1} style={{ ...Fonts.grayColor16Regular, marginHorizontal: Sizes.fixPadding + 5.0, flex: 1 }}>
                    Active Status
                </Text>
                <Switch value={activeState} setValue={() => { setActiveState(!activeState) }} />
            </View>
        )
    }

    function themeInfo() {
        return (
            <View style={{
                ...CommonStyles.rowAlignCenter,
                marginTop: Sizes.fixPadding,
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginBottom: Sizes.fixPadding * 2.5
            }}>
                <View style={{ ...styles.optionIconWrapper, backgroundColor: Colors.blackColor, }}>
                    <Ionicons
                        name='moon'
                        color={Colors.whiteColor}
                        size={16}
                    />
                </View>
                <Text numberOfLines={1} style={{ ...Fonts.grayColor16Regular, marginHorizontal: Sizes.fixPadding + 5.0, flex: 1 }}>
                    Dark Mode
                </Text>
                <Switch value={darkMode} setValue={() => { setDarkMode(!darkMode) }} />
            </View>
        )
    }
}

export default SettingsScreen

const styles = StyleSheet.create({
    optionIconWrapper: {
        width: 32.0,
        height: 32.0,
        borderRadius: 16.0,
        ...CommonStyles.center,
    },
    optionWrapper: {
        ...CommonStyles.rowAlignCenter,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.5
    },
    dividerStyle: {
        backgroundColor: Colors.grayColor,
        height: 1.0,
        opacity: 0.1,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.5
    }
})