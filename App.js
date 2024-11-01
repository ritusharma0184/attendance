import 'react-native-gesture-handler';
import React from 'react'
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import SplashScreen from './screens/splashScreen';
import OnboardingScreen from './screens/onboarding/onboardingScreen';
import SigninScreen from './screens/auth/signinScreen';
import PhoneNoLogin from './screens/auth/phoneNoLogin';
import SignupScreen from './screens/auth/signupScreen';
import VerificationScreen from './screens/auth/verificationScreen';
import BottomTabBar from './components/bottomTabBar';
import PersonalChatScreen from './screens/personalChat/personalChatScreen';
import MarkAttendance from './screens/personalChat/markAttendance';
import SelectPhotoScreen from './screens/selectPhoto/selectPhotoScreen';
import SelectLocationScreen from './screens/selectLocation/selectLocationScreen';
import GroupChatScreen from './screens/groupChat/groupChatScreen';
import VideoCallScreen from './screens/videoCall/videoCallScreen';
import AudioCallScreen from './screens/audioCall/audioCallScreen';
import NewChatScreen from './screens/newChat/newChatScreen';
import CreateGroupScreen from './screens/createGroup/createGroupScreen';
import EditProfileScreen from './screens/editProfile/editProfileScreen';
import SettingsScreen from './screens/settings/settingsScreen';
import GroupInfoScreen from './screens/groupInfo/groupInfoScreen';
import PrivacyPolicyScreen from './screens/privacyPolicy/privacyPolicyScreen';
import HelpAndSupportScreen from './screens/helpAndSupport/helpAndSupportScreen';
import LanguagesScreen from './screens/languages/languagesScreen';
import AppUpdateScreen from './screens/appUpdate/appUpdateScreen';
import DataAndStorageScreen from './screens/dataAndStorage/dataAndStorageScreen';
import NotificationsScreen from './screens/notifications/notificationsScreen';
import StaffAttendance from './screens/personalChat/staffAttendance';
import MarkstaffAttendence from './screens/personalChat/markstaffAttendence';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        initialRouteName="Signin"
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Signin" initialRouteName="Signin" component={SigninScreen} />
        <Stack.Screen name="PhoneNoLogin" component={PhoneNoLogin} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="BottomTabBar" component={BottomTabBar} />
        <Stack.Screen name="PersonalChat" component={PersonalChatScreen} />
        <Stack.Screen name="MarkAttendance" component={MarkAttendance} />
        <Stack.Screen name="StaffAttendance" component={StaffAttendance} />
        <Stack.Screen name="MarkstaffAttendence" component={MarkstaffAttendence} />

        <Stack.Screen name="SelectPhoto" component={SelectPhotoScreen} options={{ ...TransitionPresets.ModalSlideFromBottomIOS }} />
        <Stack.Screen name="SelectLocation" component={SelectLocationScreen} options={{ ...TransitionPresets.ModalSlideFromBottomIOS }} />
        <Stack.Screen name="GroupChat" component={GroupChatScreen} />
        <Stack.Screen name="VideoCall" component={VideoCallScreen} />
        <Stack.Screen name="AudioCall" component={AudioCallScreen} />
        <Stack.Screen name="NewChat" component={NewChatScreen} />
        <Stack.Screen name="CreateGroup" component={CreateGroupScreen} />
        <Stack.Screen name="GroupInfo" component={GroupInfoScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="HelpAndSupport" component={HelpAndSupportScreen} />
        <Stack.Screen name="Languages" component={LanguagesScreen} />
        <Stack.Screen name="AppUpdate" component={AppUpdateScreen} />
        <Stack.Screen name="DataAndStorage" component={DataAndStorageScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}