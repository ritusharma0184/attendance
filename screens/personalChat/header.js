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
  export default header

  const styles = StyleSheet.create({


    userImageWrapper: {
      width: 50.0,
      height: 50.0,
      borderRadius: 25.0,
      marginHorizontal: Sizes.fixPadding + 5.0
    },
})
  