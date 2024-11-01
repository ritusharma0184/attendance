import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles'
import MyStatusBar from '../../components/myStatusBar'
import { Header } from '../../components/header'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from '../../components/button'

const usersList = [
    {
        id: '1',
        image: require('../../assets/images/users/user10.png'),
        name: 'Jane Cooper',
        selected: false,
    },
    {
        id: '2',
        image: require('../../assets/images/users/user2.png'),
        name: 'Jayden Green',
        selected: false,
    },
    {
        id: '3',
        image: require('../../assets/images/users/user3.png'),
        name: 'Malik Wright',
        selected: false,
    },
    {
        id: '4',
        image: require('../../assets/images/users/user4.png'),
        name: 'Sara Mitchell',
        selected: false,
    },
    {
        id: '5',
        image: require('../../assets/images/users/user5.png'),
        name: 'Hakeem Robinson',
        selected: false,
    },
    {
        id: '6',
        image: require('../../assets/images/users/user7.png'),
        name: 'Malcolm Johnson',
        selected: false,
    },
    {
        id: '8',
        image: require('../../assets/images/users/user8.png'),
        name: 'Paula Griffin',
        selected: false,
    },
    {
        id: '9',
        image: require('../../assets/images/users/user9.png'),
        name: 'Frances Watson',
        selected: false,
    },
    {
        id: '10',
        image: require('../../assets/images/users/user1.png'),
        name: 'Xavier Turner',
        selected: false,
    },
];

const CreateGroupScreen = ({ navigation }) => {

    const [search, setSearch] = useState('');
    const [users, setUsers] = useState(usersList);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor, }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                <Header header='Create Group' navigation={navigation} />
                {searchInfo()}
                {usersInfo()}
            </View>
            {
                users.filter((item) => item.selected).length !== 0
                    ?
                    <Button
                        buttonText='Continue'
                        onPress={() => { navigation.push('GroupInfo') }}
                        style={{ position: 'absolute', bottom: 20, left: 0, right: 0 }}
                    />
                    :
                    null
            }
        </View>
    )

    function updateSelection({ id }) {
        const updatedList = users.map((item) => {
            if (item.id == id) {
                return { ...item, selected: !item.selected }
            }
            else {
                return item
            }
        })
        setUsers(updatedList);
    }

    function usersInfo() {
        const renderItem = ({ item, index }) => (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => { updateSelection({ id: item.id }) }}
                    style={{ ...CommonStyles.rowAlignCenter, }}
                >
                    <Image
                        source={item.image}
                        style={{ width: 50.0, height: 50.0, borderRadius: 25.0 }}
                    />
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor18Bold, flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                        {item.name}
                    </Text>
                    <View
                        style={{
                            ...styles.radioButtonStyle,
                            borderColor: item.selected ? Colors.primaryColor : Colors.grayColor
                        }}
                    >
                        {
                            item.selected
                                ?
                                <View style={styles.radioButtonInnerCircle} />
                                :
                                null
                        }
                    </View>
                </TouchableOpacity>
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
                    data={users}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustKeyboardInsets={true}
                    contentContainerStyle={{
                        paddingBottom: users.filter((item) => item.selected).length !== 0 ? Sizes.fixPadding * 9.5 : Sizes.fixPadding * 2.0
                    }}
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

export default CreateGroupScreen

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
    radioButtonStyle: {
        ...CommonStyles.center,
        width: 18.0,
        height: 18.0,
        borderRadius: 9.0,
        borderWidth: 1.5,
    },
    radioButtonInnerCircle: {
        width: 9.0,
        height: 9.0,
        borderRadius: 4.5,
        backgroundColor: Colors.primaryColor
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
})