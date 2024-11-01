import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, } from 'react-native'
import React, { useState } from 'react'
import { Colors, Sizes, Fonts, CommonStyles } from '../../constants/styles'
import MyStatusBar from '../../components/myStatusBar'
import { Header } from '../../components/header'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Button } from '../../components/button'

const GroupInfoScreen = ({ navigation }) => {

    const [showChangePicOptionsSheet, setshowChangePicOptionsSheet] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                <Header header='Group Info' navigation={navigation} />
                <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
                    {groupImageInfo()}
                    {groupNameInfo()}
                    {groupDescriptionInfo()}
                    {continueButton()}
                </ScrollView>
            </View>
            {changeOptionSheet()}
        </View>
    )

    function continueButton() {

        const dummyItem = {
            id: '7',
            image: require('../../assets/images/users/user6.png'),
            name: 'EarlyBirds Crew',
        }

        return (
            <Button
                buttonText='Continue'
                style={{ marginVertical: Sizes.fixPadding * 2.0, }}
                onPress={() => { navigation.push('GroupChat', { item: dummyItem }) }}
            />
        )
    }

    function groupDescriptionInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 3.0 }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Group Description
                </Text>
                <TextInput
                    placeholder='Enter Group Description'
                    placeholderTextColor={Colors.lightGrayColor}
                    value={groupDescription}
                    onChangeText={setGroupDescription}
                    style={{ ...styles.textFieldStyle, paddingTop: 0 }}
                    cursorColor={Colors.primaryColor}
                    selectionColor={Colors.primaryColor}
                    multiline={true}
                />
                <View style={styles.divider} />
            </View>
        )
    }

    function groupNameInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 3.0 }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Group Name
                </Text>
                <TextInput
                    placeholder='Enter Group Name'
                    placeholderTextColor={Colors.lightGrayColor}
                    value={groupName}
                    onChangeText={setGroupName}
                    style={styles.textFieldStyle}
                    cursorColor={Colors.primaryColor}
                    selectionColor={Colors.primaryColor}
                />
                <View style={styles.divider} />
            </View>
        )
    }

    function changeOptionSheet() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showChangePicOptionsSheet}
                onRequestClose={() => { setshowChangePicOptionsSheet(false) }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { setshowChangePicOptionsSheet(false) }}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View style={{ justifyContent: "flex-end", flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                            style={{
                                backgroundColor: Colors.whiteColor,
                                borderTopLeftRadius: Sizes.fixPadding * 3.0,
                                borderTopRightRadius: Sizes.fixPadding * 3.0
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor20Bold, textAlign: 'center', margin: Sizes.fixPadding * 2.5 }}>
                                Choose Option
                            </Text>
                            {changePicOptionShort({ onPress: () => { }, iconName: 'camera', bgColor: '#009688', option: 'Camera' })}
                            {changePicOptionShort({ onPress: () => { }, iconName: 'images', bgColor: '#00A7F7', option: 'Gallery' })}
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    function changePicOptionShort(props) {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { setshowChangePicOptionsSheet(false); props.onPress() }}
                style={{
                    ...CommonStyles.rowAlignCenter,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    marginBottom: Sizes.fixPadding * 2.0
                }}>
                <View style={{
                    ...styles.changePicOptionIconWrapper,
                    backgroundColor: props.bgColor,
                }}>
                    <Ionicons
                        name={props.iconName}
                        color={Colors.whiteColor}
                        size={20}
                    />
                </View>
                <Text numberOfLines={1} style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.grayColor15Regular, flex: 1 }}>
                    {props.option}
                </Text>
            </TouchableOpacity>
        )
    }

    function groupImageInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setshowChangePicOptionsSheet(true)}
                style={{ ...styles.addGroupImageWrapStyle, }}
            >
                <MaterialIcons
                    name="add-a-photo"
                    size={30}
                    color={Colors.primaryColor}
                />
            </TouchableOpacity>
        )
    }
}

export default GroupInfoScreen

const styles = StyleSheet.create({
    addGroupImageWrapStyle: {
        height: 100.0,
        width: 100.0,
        borderRadius: 50.0,
        borderWidth: 1.5,
        borderColor: Colors.primaryColor,
        ...CommonStyles.center,
        alignSelf: 'center',
        marginTop: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 3.0,
    },
    changePicOptionIconWrapper: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        ...CommonStyles.center
    },
    textFieldStyle: {
        ...Fonts.blackColor16Medium,
        padding: 0,
        marginTop: Sizes.fixPadding + 5.0
    },
    divider: {
        marginTop: Sizes.fixPadding,
        backgroundColor: Colors.lightGrayColor,
        height: 1.0
    },
})