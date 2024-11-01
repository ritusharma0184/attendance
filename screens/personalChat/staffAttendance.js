import { Image, StyleSheet, Modal, Text, TextInput, TouchableOpacity, View, FlatList, Button, PermissionsAndroid, Platform, Linking, Alert } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { Colors, Fonts, Sizes, CommonStyles, screenWidth } from '../../constants/styles'
import MyStatusBar from '../../components/myStatusBar'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Touchable } from '../../components/touchable';
import { launchCamera } from 'react-native-image-picker'
import { GiftedChat } from 'react-native-gifted-chat'
import { ImagesView, LocationView, MessageView } from '../../components/commonMessage';
import { ScrollView } from 'react-native-gesture-handler';
import { Menu } from 'react-native-material-menu';
import Geolocation from 'react-native-geolocation-service';
import { useFocusEffect } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import MarkstaffAttendence from './markstaffAttendence';
//import AntDesign from '@expo/vector-icons/AntDesign';






const loginUserId = 1;

const StaffAttendance = ({ navigation }) => {


  // const item = route.params.item;
  const item = '';

  const [messages, setMessages] = useState()
  const [typeMessage, setTypeMessage] = useState('');
  const [showSendOptionsSheet, setShowSendOptionsSheet] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [location, setLocation] = useState(null)

  const chats = [
    {
      id: '1',
      name: 'Kunal Sir',
      message: 'Hey, how are you?',
      time: '12:00 PM',
      profileImage: 'https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg',
    },
    {
      id: '2',
      name: 'Varsha sharma',
      message: 'Are we meeting tomorrow?',
      time: '11:30 AM',
      profileImage: 'https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg',
    },
    {
      id: '3',
      name: 'Avika Kaushik',
      message: 'we meeting tomorrow?',
      time: '11:30 AM',
      profileImage: 'https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg',
    },
    {
      id: '4',
      name: 'Jiten sharma',
      message: 'yeswe meeting tomorrow?',
      time: '11:30 AM',
      profileImage: 'https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg',
    },
    {
      id: '4',
      name: 'Archana',
      message: 'yeswe meeting tomorrow?',
      time: '11:30 AM',
      profileImage: 'https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg',
    },
    {
      id: '4',
      name: 'Sonam sharma',
      message: 'yeswe meeting tomorrow?',
      time: '11:30 AM',
      profileImage: 'https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg',
    },
    {
      id: '4',
      name: 'Manvi',
      message: 'yeswe meeting tomorrow?',
      time: '11:30 AM',
      profileImage: 'https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg',
    },
    {
      id: '4',
      name: 'Gyanshi',
      message: 'yeswe meeting tomorrow?',
      time: '11:30 AM',
      profileImage: 'https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg',
    },
    {
      id: '4',
      name: 'Aruna Tyagi',
      message: 'yeswe meeting tomorrow?',
      time: '11:30 AM',
      profileImage: 'https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg',
    },
    {
      id: '4',
      name: 'Ayush Kaushik',
      message: 'yeswe meeting tomorrow?',
      time: '11:30 AM',
      profileImage: 'https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg',
    },
    {
      id: '4',
      name: 'Ms. Rashi Mam',
      message: 'yeswe meeting tomorrow?',
      time: '11:30 AM',
      profileImage: 'https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg',
    },
    {
      id: '4',
      name: 'Jiten sharma',
      message: 'yeswe meeting tomorrow?',
      time: '11:30 AM',
      profileImage: 'https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg',
    },

  ];



  const handleMarkAttendance = (abc)=>{
    //console.log('name is',name)

      const staffDetail = {
          name:abc
       
      }

    navigation.navigate('MarkstaffAttendence',staffDetail)
  }
  return (
    <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
      <MyStatusBar />
      {header()}

      <View style={{ flex: 1 }}>
        {staffAttendance()}

      </View>

    </View>
  )

  function staffAttendance() {
    return (

      <View style={styles.messagesWrapper} >
        <ScrollView>
          {chats.map((item, index) => (

            <Touchable onPress={() => handleMarkAttendance(item.name)} style={styles.chatItem}>
              <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
              <View  style={styles.chatDetails}>
                <View style={styles.chatHeader}>
                  <Text style={styles.chatName}>{item.name}</Text>
                  <Text style={styles.chatTime}>{item.time}</Text>
                </View>
                <Text style={styles.chatMessage}>{item.message}</Text>
              </View>
            </Touchable>
          ))}
        </ScrollView>

      </View>

    )
  }
  function header() {
    return (
      <View
        style={{
          ...CommonStyles.rowAlignCenter,
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginVertical: Sizes.fixPadding * 3.0
        }}
      >
        <Touchable onPress={() => { navigation.pop() }}>
          <Ionicons
            name='chevron-back'
            color={Colors.whiteColor}
            size={24}
          />
        </Touchable>
        <Image

          source={{ uri: 'https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg' }}

          style={styles.userImageWrapper}
        />

        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={{ ...Fonts.whiteColor18Bold }}>
            {'User name'}
          </Text>
        </View>



      </View>

    )
  }
}

export default StaffAttendance

const styles = StyleSheet.create({


  userImageWrapper: {
    width: 50.0,
    height: 50.0,
    borderRadius: 25.0,
    marginHorizontal: Sizes.fixPadding + 5.0
  },


  messagesWrapper: {
    flex: 1,
    //alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: Sizes.fixPadding * 4.0,
    borderTopRightRadius: Sizes.fixPadding * 4.0,
    overflow: 'hidden',
    color: "#000"
  },
  menuDivider: {
    backgroundColor: Colors.grayColor,
    opacity: 0.1,
    height: 1.0,
    marginVertical: Sizes.fixPadding + 5.0
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
  },


  chatItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatDetails: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000'
  },
  chatTime: {
    fontSize: 12,
    color: 'gray',
  },
  chatMessage: {
    fontSize: 14,
    color: 'gray',
  },


});

