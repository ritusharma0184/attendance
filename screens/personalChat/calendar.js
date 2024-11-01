import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Calendar } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CalendarModal = ({calendarVal}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString); // Convert the date string to a Date object
    let day = date.getDate();
    let month = date.getMonth() + 1; // Months are zero-indexed
    const year = date.getFullYear();

    // Add leading zeros if necessary
    day = day < 10 ? `0${day}` : day;
    month = month < 10 ? `0${month}` : month;

    return `${day}.${month}.${year}`; // Return date in "DD.MM.YYYY" format
  };


  const handleDayPress = (day) => {
    const formattedDate = formatDate(day.dateString)
    setSelectedDate(formattedDate);
    calendarVal(formattedDate)
    toggleModal(); // Close the modal after selecting a date
  };



  return (
    <View style={styles.container}>
      <Ionicons name="calendar-outline" size={20} color="black" onPress={toggleModal} />

      <Text style={styles.selectedDate}>
        Selected Date: {selectedDate || 'None'}
      </Text>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <Calendar
            // Handler which gets executed on day press. Default = undefined
            onDayPress={handleDayPress}
            // Mark the current date
            markedDates={{
              [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' }
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:50
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    margin:30
  },
  selectedDate: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default CalendarModal;
