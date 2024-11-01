import { View, Text, TextInput, StyleSheet, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles'
import MyStatusBar from '../../components/myStatusBar'
import { Header } from '../../components/header'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Touchable } from '../../components/touchable'

const usersList = [
    {
        id: '1',
        image: require('../../assets/images/users/user10.png'),
        name: 'Jane Cooper',
    },
    {
        id: '2',
        image: require('../../assets/images/users/user2.png'),
        name: 'Jayden Green',
    },
    {
        id: '3',
        image: require('../../assets/images/users/user3.png'),
        name: 'Malik Wright',
    },
    {
        id: '4',
        image: require('../../assets/images/users/user4.png'),
        name: 'Sara Mitchell',
    },
    {
        id: '5',
        image: require('../../assets/images/users/user5.png'),
        name: 'Hakeem Robinson',
    },
    {
        id: '6',
        image: require('../../assets/images/users/user7.png'),
        name: 'Malcolm Johnson',
    },
    {
        id: '8',
        image: require('../../assets/images/users/user8.png'),
        name: 'Paula Griffin',
    },
    {
        id: '9',
        image: require('../../assets/images/users/user9.png'),
        name: 'Frances Watson',
    },
    {
        id: '10',
        image: require('../../assets/images/users/user1.png'),
        name: 'Xavier Turner',
    },
];

const NewChatScreen = ({ navigation }) => {

    const [search, setSearch] = useState('');

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                <Header header='New Chat' navigation={navigation} />
                {searchInfo()}
                {usersInfo()}
            </View>
        </View>
    )

    function usersInfo() {
        const renderItem = ({ item, index }) => (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Touchable onPress={() => { navigation.push('PersonalChat', { item }) }} style={{ ...CommonStyles.rowAlignCenter, }}>
                    <Image
                        source={item.image}
                        style={{ width: 50.0, height: 50.0, borderRadius: 25.0 }}
                    />
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor18Bold, flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                        {item.name}
                    </Text>
                </Touchable>
                {
                    index == usersList.length - 1
                        ?
                        null
                        :
                        <View style={styles.divider} />
                }
            </View>
        )
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={usersList}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustKeyboardInsets={true}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
                />
            </View>
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
}

export default NewChatScreen

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
    divider: {
        backgroundColor: Colors.grayColor,
        opacity: 0.1,
        height: 1.0,
        marginVertical: Sizes.fixPadding * 2.0
    },
    searchFieldStyle: {
        padding: 0,
        ...Fonts.blackColor15Regular,
        flex: 1,
        marginLeft: Sizes.fixPadding
    }
});