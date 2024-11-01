import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles'
import { TabView, TabBar } from "react-native-tab-view";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const allCallList = [
    {
        id: '1',
        image: require('../../assets/images/users/user10.png'),
        name: 'Jane Cooper',
        time: 'Yesterday',
        incomig: true,
    },
    {
        id: '2',
        image: require('../../assets/images/users/user1.png'),
        name: 'Jayden Green',
        time: '3 day ago',
        incomig: true,
    },
    {
        id: '3',
        image: require('../../assets/images/users/user3.png'),
        name: 'Sara Mitchell',
        time: '16 Feb 2022',
        incomig: true,
    },
    {
        id: '4',
        image: require('../../assets/images/users/user4.png'),
        name: 'Hakeem Robinson',
        time: '10 Feb 2022',
        incomig: false,
    },
    {
        id: '5',
        image: require('../../assets/images/users/user5.png'),
        name: 'Malcolm Johnson',
        time: '15 Jan 2022',
        incomig: true,
    },
]

const missedCallList = [
    {
        id: '1',
        image: require('../../assets/images/users/user7.png'),
        name: 'Cameron Williamson',
        time: 'Yesterday',
    },
    {
        id: '2',
        image: require('../../assets/images/users/user8.png'),
        name: 'Guy Hawkins',
        time: '3 day ago',
    },
    {
        id: '3',
        image: require('../../assets/images/users/user9.png'),
        name: 'Bessie Cooper',
        time: '16 Feb 2022',
    },
    {
        id: '4',
        image: require('../../assets/images/users/user11.png'),
        name: 'Annette Black',
        time: '10 Feb 2022',
    },
    {
        id: '5',
        image: require('../../assets/images/users/user2.png'),
        name: 'Theresa Webb',
        time: '15 Jan 2022',
    },
]

const CallsScreen = ({ navigation }) => {

    const [index, setIndex] = useState(0);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            {header()}
            {tabInfo()}
        </View>
    )

    function tabInfo() {
        const routes = [
            { key: "first", title: "All" },
            { key: "second", title: "Missed" },
        ];

        const renderScene = ({ route }) => {
            switch (route.key) {
                case "first":
                    return allData()
                case "second":
                    return missedData()
            }
        };

        return (
            <View style={{ flex: 1 }}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    renderTabBar={(props) => (
                        <TabBar
                            {...props}
                            indicatorStyle={styles.indicatorStyle}
                            style={styles.tabWrapper}
                            pressColor={Colors.lightPrimaryColor}
                            renderLabel={({ route, focused }) => (
                                <Text
                                    numberOfLines={1}
                                    style={focused ? { ...Fonts.whiteColor18Bold } : { ...Fonts.primaryColor18Bold }}
                                >
                                    {route.title}
                                </Text>
                            )}
                        />
                    )}
                />
            </View>
        )
    }

    function allData() {
        const renderItem = ({ item, index }) => (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <View style={{ ...CommonStyles.rowAlignCenter }}>
                    <Image
                        source={item.image}
                        style={{ width: 50.0, height: 50.0, borderRadius: 25.0 }}
                    />
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor18Bold }}>
                            {item.name}
                        </Text>
                        <View style={{ ...CommonStyles.rowAlignCenter, marginTop: Sizes.fixPadding - 4.0 }}>
                            <MaterialIcons
                                name="call"
                                size={16}
                                color={item.incomig ? Colors.grayColor : Colors.redColor}
                                style={{ marginRight: Sizes.fixPadding - 5.0 }}
                            />
                            <Text style={item.incomig ? { ...Fonts.grayColor15Regular } : { ...Fonts.redColor15Regular }}>
                                {item.incomig ? 'Incoming call' : 'Outgoing call'}
                            </Text>
                            <Text numberOfLines={1} style={{ ...Fonts.grayColor15Regular, flex: 1 }}>
                                { } • {item.time}
                            </Text>
                        </View>
                    </View>
                </View>
                {
                    index == allCallList.length - 1
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
                    data={allCallList}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }

    function missedData() {
        const renderItem = ({ item, index }) => (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <View style={{ ...CommonStyles.rowAlignCenter }}>
                    <Image
                        source={item.image}
                        style={{ width: 50.0, height: 50.0, borderRadius: 25.0 }}
                    />
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor18Bold }}>
                            {item.name}
                        </Text>
                        <Text style={{ ...Fonts.grayColor15Regular, marginTop: Sizes.fixPadding - 4.0 }}>
                            {item.time}
                        </Text>
                    </View>
                </View>
                {
                    index == missedCallList.length - 1
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
                    data={missedCallList}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }

    function header() {
        return (
            <Text style={{ ...Fonts.blackColor22Bold, margin: Sizes.fixPadding * 2.0 }}>
                Calls
            </Text>
        )
    }
}

export default CallsScreen

const styles = StyleSheet.create({
    indicatorStyle: {
        height: 48,
        margin: Sizes.fixPadding - 8.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.primaryColor,
        ...CommonStyles.buttonShadow
    },
    tabWrapper: {
        backgroundColor: Colors.lightPrimaryColor,
        shadowColor:'transparent',
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.5,
        elevation: 0,
        height: 52,
    },
    divider: {
        backgroundColor: Colors.grayColor,
        opacity: 0.1,
        height: 1.0,
        marginVertical: Sizes.fixPadding * 2.0
    }
})