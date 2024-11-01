import { StyleSheet, Text, Image, View, FlatList, Modal, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Touchable } from '../../components/touchable';

const chatsList = [
    {
        id: '1',
        image: require('../../assets/images/users/user10.png'),
        name: 'Jane Cooper',
        lastMsg: 'So, what\'s your plan this weekend?',
        time: '02:02 am',
        unreadMsgCount: 3,
    },
    {
        id: '2',
        image: require('../../assets/images/users/user2.png'),
        name: 'Jayden Green',
        lastMsg: 'Hey! Whats up! 🖐',
        time: '11:27 pm',
        unreadMsgCount: 2,
    },
    {
        id: '3',
        image: require('../../assets/images/users/user3.png'),
        name: 'Malik Wright',
        lastMsg: '😍❤️',
        time: '01:09 am',
        unreadMsgCount: 3,
    },
    {
        id: '7',
        image: require('../../assets/images/users/user6.png'),
        name: 'EarlyBirds Crew',
        lastMsg: 'I went there yesterday',
        time: '07:13 pm',
        unreadMsgCount: 19,
        isGroup: true,
    },
    {
        id: '4',
        image: require('../../assets/images/users/user4.png'),
        name: 'Sara Mitchell',
        lastMsg: 'No, I can\'t come tomorrow.',
        time: '07:13 pm',
        unreadMsgCount: 5,
    },
    {
        id: '5',
        image: require('../../assets/images/users/user5.png'),
        name: 'Hakeem Robinson',
        lastMsg: 'IDK what else is there to do',
        time: '06:42 am',
    },
    {
        id: '6',
        image: require('../../assets/images/users/user7.png'),
        name: 'Malcolm Johnson',
        lastMsg: 'What? 😱😱😱',
        time: '01:09 am',
    },
    {
        id: '8',
        image: require('../../assets/images/users/user8.png'),
        name: 'Paula Griffin',
        lastMsg: '🤣🤣🤣🤣🤣🤣🤣🤣',
        time: '06:42 am',
    },
    {
        id: '9',
        image: require('../../assets/images/users/user9.png'),
        name: 'Frances Watson',
        lastMsg: 'Go to hell 😡😡',
        time: '07:38 am',
    },
    {
        id: '10',
        image: require('../../assets/images/users/user1.png'),
        name: 'Xavier Turner',
        lastMsg: 'Yeah! You\'re right.',
        time: '02:34 am',
    },
];

const ChatScreen = ({ navigation }) => {

    const [search, setSearch] = useState('');
    const [showChatOptionSheet, setShowChatOptionSheet] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            {header()}
            {searchInfo()}
            <View style={{ flex: 1 }}>
                {chatsInfo()}
            </View>
            {chatOptionsSheet()}
        </View>
    )

    function chatOptionsSheet() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showChatOptionSheet}
                onRequestClose={() => { setShowChatOptionSheet(false) }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { setShowChatOptionSheet(false) }}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View style={{ justifyContent: "flex-end", flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                            style={styles.sheetStyle}
                        >
                            <Touchable
                                onPress={() => { setShowChatOptionSheet(false); navigation.push('NewChat') }}
                                style={{ ...CommonStyles.rowAlignCenter, marginHorizontal: Sizes.fixPadding * 2.0 }}
                            >
                                <View style={{ width: 24.0, ...CommonStyles.center, }}>
                                    <MaterialIcons
                                        name='chat'
                                        color={Colors.grayColor}
                                        size={22}
                                        style={{ opacity: 0.8, }}
                                    />
                                </View>
                                <Text numberOfLines={1} style={{ ...Fonts.blackColor16Regular, flex: 1, marginLeft: Sizes.fixPadding }}>
                                    New Chat
                                </Text>
                            </Touchable>
                            <View style={{ ...styles.divider, marginVertical: Sizes.fixPadding + 5.0 }} />
                            <Touchable
                                onPress={() => { setShowChatOptionSheet(false), navigation.push('CreateGroup') }}
                                style={{ ...CommonStyles.rowAlignCenter, marginHorizontal: Sizes.fixPadding * 2.0 }}
                            >
                                <MaterialIcons
                                    name='groups'
                                    color={Colors.grayColor}
                                    size={24}
                                    style={{ opacity: 0.8, }}
                                />
                                <Text numberOfLines={1} style={{ ...Fonts.blackColor16Regular, flex: 1, marginLeft: Sizes.fixPadding }}>
                                    New Group
                                </Text>
                            </Touchable>
                            <Text
                                onPress={() => { setShowChatOptionSheet(false) }}
                                style={{
                                    ...Fonts.primaryColor17Bold,
                                    margin: Sizes.fixPadding * 2.0,
                                    alignSelf: 'center',
                                }}
                            >
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    function chatsInfo() {
        const renderItem = ({ item, index }) => (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Touchable
                    onPress={() => {
                        item.isGroup
                            ?
                            navigation.push('GroupChat', { item })
                            :
                            navigation.push('PersonalChat', { item })
                    }}
                    style={{ ...CommonStyles.rowAlignCenter }}
                >
                    <Image
                        source={item.image}
                        style={{
                            width: 50.0, height: 50.0, borderRadius: 25.0,
                            resizeMode: 'cover'
                        }}
                    />
                    <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding + 5.0 }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor18Bold }}>
                            {item.name}
                        </Text>
                        <Text numberOfLines={1} style={{ ...Fonts.grayColor15Regular, marginTop: Sizes.fixPadding - 5.0 }}>
                            {item.lastMsg}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center', alignSelf: 'flex-start', marginTop: Sizes.fixPadding - 7.0 }}>
                        <Text style={{ ...Fonts.grayColor14Regular, }}>
                            {item.time}
                        </Text>
                        {
                            item.unreadMsgCount
                                ?
                                <View style={styles.unreadContCircle}>
                                    <Text numberOfLines={1} style={{ ...Fonts.whiteColor14Medium }}>
                                        {item.unreadMsgCount}
                                    </Text>
                                </View>
                                :
                                null
                        }
                    </View>
                </Touchable>
                {
                    index == chatsList.length - 1
                        ?
                        null
                        :
                        <View style={styles.divider} />
                }
            </View>
        )
        return (
            <FlatList
                data={chatsList}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
                automaticallyAdjustKeyboardInsets={true}
            />
        )
    }

    function searchInfo() {
        return (
            <View style={styles.searchFieldWrapper}>
                <Ionicons
                    name='search'
                    color={search ? Colors.primaryColor : Colors.lightGrayColor}
                    size={20}
                />
                <TextInput
                    placeholder='Search here...'
                    placeholderTextColor={Colors.lightGrayColor}
                    value={search}
                    onChangeText={setSearch}
                    cursorColor={Colors.primaryColor}
                    selectionColor={Colors.primaryColor}
                    style={styles.searchFieldStyle}
                />
            </View>
        )
    }

    function header() {
        return (
            <View style={{ ...CommonStyles.rowAlignCenter, justifyContent: 'space-between', margin: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor22Bold }}>
                    Chats
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { setShowChatOptionSheet(true) }}
                >
                    <Image
                        source={require('../../assets/images/icons/add.png')}
                        style={{ width: 18.0, height: 18.0, resizeMode: 'contain' }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

export default ChatScreen

const styles = StyleSheet.create({
    searchFieldWrapper: {
        ...CommonStyles.rowAlignCenter,
        borderRadius: Sizes.fixPadding * 5.0,
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 3.0
    },
    unreadContCircle: {
        width: 22.0, height: 22.0,
        borderRadius: 11.0,
        backgroundColor: Colors.primaryColor,
        ...CommonStyles.center,
        marginTop: Sizes.fixPadding - 2.0,
        overflow: 'hidden'
    },
    divider: {
        backgroundColor: Colors.grayColor,
        opacity: 0.1,
        height: 1.0,
        marginVertical: Sizes.fixPadding * 2.0
    },
    sheetStyle: {
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding * 3.0,
        borderTopRightRadius: Sizes.fixPadding * 3.0,
        paddingTop: Sizes.fixPadding * 3.0,
    },
    searchFieldStyle: {
        padding: 0,
        ...Fonts.blackColor15Regular,
        flex: 1,
        marginLeft: Sizes.fixPadding
    }
})