import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "../constants/styles";
import { View, StyleSheet, BackHandler, Platform } from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ExitToast } from "./exitToast";
import MyStatusBar from "./myStatusBar";
import ChatScreen from "../screens/chat/chatScreen";
import CallsScreen from "../screens/calls/callsScreen";
import ProfileScreen from "../screens/profile/profileScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

const BottomTabBar = ({ navigation }) => {
    const backAction = () => {
        if (Platform.OS === "ios") {
            navigation.addListener("beforeRemove", (e) => {
                e.preventDefault();
            });
        } else {
            backClickCount == 1 ? BackHandler.exitApp() : _spring();
            return true;
        }
    };

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            navigation.addListener("gestureEnd", backAction);
            return () => {
                BackHandler.removeEventListener("hardwareBackPress", backAction);
                navigation.removeListener("gestureEnd", backAction);
            };
        }, [backAction])
    );

    function _spring() {
        setBackClickCount(1);
        setTimeout(() => {
            setBackClickCount(0);
        }, 1000);
    }

    const [backClickCount, setBackClickCount] = useState(0);

    return (
        <View style={{ flex: 1, }}>
            <MyStatusBar />
            <Tab.Navigator
                screenOptions={{
                    tabBarHideOnKeyboard: true,
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: styles.tabBarStyle,
                    tabBarItemStyle: { height: 70.0 },
                    tabBarActiveTintColor: Colors.primaryColor,
                    tabBarInactiveTintColor: Colors.lightGrayColor
                }}
            >
                <Tab.Screen
                    name="Chat"
                    component={ChatScreen}
                    options={{
                        tabBarIcon: ({ focused, color }) =>
                            <Ionicons
                                name="chatbox-ellipses"
                                color={color}
                                size={26}
                            />
                    }}
                />
                <Tab.Screen
                    name="Calls"
                    component={CallsScreen}
                    options={{
                        tabBarIcon: ({ focused, color }) =>
                            <Ionicons
                                name="call"
                                color={color}
                                size={26}
                            />
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ focused, color }) =>
                            <Ionicons
                                name="person"
                                color={color}
                                size={26}
                            />
                    }}
                />
            </Tab.Navigator>
            {backClickCount == 1 ? <ExitToast /> : null}
        </View>
    );
};

export default BottomTabBar;

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: Colors.whiteColor,
        height: 70.0,
        shadowColor: Colors.blackColor,
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: -10, },
        shadowRadius: 20,
        borderTopColor: '#ececec60',
        borderTopWidth: Platform.OS == 'ios' ? 0 : 1.0,
        elevation: 20,
    },
});
