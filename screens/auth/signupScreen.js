import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import MyStatusBar from '../../components/myStatusBar';
import { Colors, Sizes, Fonts, CommonStyles } from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from '../../components/button';
import { Touchable } from '../../components/touchable';
import SigninScreen from './signinScreen';

const SignupScreen = ({ navigation }) => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [securePassword, setSecurePassword] = useState(true);
    const [secureConfirmPwd, setSecureConfirmPwd] = useState(true);

    const [fullnameError, setFullnameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [mobileError, setMobileError] = useState(false);
    const [createPassError, setCreatePassError] = useState(false);
    const [confirmPasserror, setConfirmPassError] = useState(false);

    const [nameErrorText, setNameErrorText] = useState('');
    const [mobileErrorText, setMobileErrorText] = useState('');
    const [passwordErrorText, setPasswordErrorText] = useState('');
    const [confirmErrorText, setConfirmErrorText] = useState('');
   

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation regex
        return emailRegex.test(email);
      };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
            <View style={styles.signupInfoWrapper}>
                <Touchable
                    onPress={() => { navigation.pop('Signin') }}
                    style={{ marginTop: Sizes.fixPadding - 8.0, }}
                >
                    <Ionicons
                        name='chevron-back'
                        color={Colors.blackColor}
                        size={24}
                    />
                </Touchable>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding * 1.5 }}>
                    <Text style={{ ...Fonts.blackColor22Bold }}>
                        Getting Started
                    </Text>
                    <Text style={{ ...Fonts.grayColor15Regular, marginTop: Sizes.fixPadding }}>
                        Create an account to continue!
                    </Text>
                </View>
            </View>

                <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
                    
            <View style={{ margin: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Full Name
                </Text>
                <View style={{ ...CommonStyles.rowAlignCenter, marginTop: Sizes.fixPadding + 5.0 }}>
                    <Ionicons
                        name="person"
                        size={18}
                        color={Colors.blackColor}
                    />
                    <TextInput
                        placeholder='Enter Full Name'
                        placeholderTextColor={Colors.lightGrayColor}
                        value={fullName}
                        onChangeText={setFullName}
                        style={styles.textFieldStyle}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                    />
                     {nameErrorText ? <Text style={styles.errorText}>{nameErrorText}</Text> : null}
                </View>
                
                <View style={fullnameError?styles.dividerError:styles.divider}/>
                
            </View>

            

            
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Email
                </Text>
                <View style={{ ...CommonStyles.rowAlignCenter, marginTop: Sizes.fixPadding + 5.0 }}>
                    <Ionicons
                        name="mail"
                        size={18}
                        color={Colors.blackColor}
                    />
                    <TextInput
                        placeholder='Enter Email'
                        placeholderTextColor={Colors.lightGrayColor}
                        value={email}
                        onChangeText={setEmail}
                        style={styles.textFieldStyle}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        keyboardType='email-address'
                    />
                      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                </View>

                <View style={emailError?styles.dividerError: styles.divider} />
            </View>

            
            
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 3.0 }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Mobile Number
                </Text>
                <View style={{ ...CommonStyles.rowAlignCenter, marginTop: Sizes.fixPadding + 5.0 }}>
                    <Ionicons
                        name="phone-portrait"
                        size={18}
                        color={Colors.blackColor}
                    />
                    <TextInput
                        placeholder='Enter Mobile Number'
                        placeholderTextColor={Colors.lightGrayColor}
                        value={mobileNo}
                        onChangeText={setMobileNo}
                        style={styles.textFieldStyle}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        keyboardType='phone-pad'
                    />
                    {mobileErrorText ? <Text style={styles.errorText}>{mobileErrorText}</Text> : null}
                </View>
                <View style={mobileError? styles.dividerError: styles.divider} />
            </View>


            
                   
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 3.0 }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Create Password
                </Text>
                <View style={{ ...CommonStyles.rowAlignCenter, marginTop: Sizes.fixPadding + 5.0 }}>
                    <Ionicons
                        name="lock-open"
                        size={18}
                        color={Colors.blackColor}
                    />
                    <TextInput
                        placeholder='Enter Password'
                        placeholderTextColor={Colors.lightGrayColor}
                        value={password}
                        onChangeText={setPassword}
                        style={styles.textFieldStyle}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        secureTextEntry={securePassword}
                        textContentType='oneTimeCode'
                    />
                     {passwordErrorText ? <Text style={styles.errorText}>{passwordErrorText}</Text> : null}
                    <MaterialIcons
                        name={securePassword ? 'visibility' : "visibility-off"}
                        size={16}
                        color={Colors.blackColor}
                        onPress={() => { setSecurePassword(!securePassword) }}
                        style={{ marginLeft: Sizes.fixPadding + 2.90 }}
                    />
                </View>
                <View style={createPassError? styles.dividerError: styles.divider} />
            </View>



           
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 3.0 }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Confirm Password
                </Text>
                <View style={{ ...CommonStyles.rowAlignCenter, marginTop: Sizes.fixPadding + 5.0 }}>
                    <Ionicons
                        name="lock-open"
                        size={18}
                        color={Colors.blackColor}
                    />
                    <TextInput
                        placeholder='Enter Confirm Password'
                        placeholderTextColor={Colors.lightGrayColor}
                        value={confirmPwd}
                        onChangeText={setConfirmPwd}
                        style={styles.textFieldStyle}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        secureTextEntry={secureConfirmPwd}
                        textContentType='oneTimeCode'
                    />
                       {confirmErrorText ? <Text style={styles.errorText}>{confirmErrorText}</Text> : null}
                    <MaterialIcons
                        name={secureConfirmPwd ? 'visibility' : "visibility-off"}
                        size={16}
                        color={Colors.blackColor}
                        onPress={() => { setSecureConfirmPwd(!secureConfirmPwd) }}
                        style={{ marginLeft: Sizes.fixPadding + 2.90 }}
                    />
                </View>
                <View style={confirmPasserror? styles.dividerError:styles.divider} />
            </View>

                 
            <Button
                onPress={() => doSignup()}
                buttonText='Sign Up'
                style={{ marginVertical: Sizes.fixPadding * 4.0, }}
            />
                </ScrollView>


                <View style={{ ...CommonStyles.rowAlignCenter, ...CommonStyles.center, margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor15Regular }}>
                    Already have an account? { }
                </Text>
                <Touchable onPress={() => { navigation.push('Signin') }} >
                    <Text style={{ ...Fonts.primaryColor15Medium }}>
                        Sign In
                    </Text>
                </Touchable>
            </View>

            </View>
        </View>
    )


    

    async function doSignup(){

       // console.warn('hello')

     let isValid = true;
    
    if (fullName.trim() === '') {
      setFullnameError(true); 
      setNameErrorText('Please enter full name')
      
      isValid = false;
    } else {
        setFullnameError(false); 
        setNameErrorText('')
    }

    if (email.trim() === '') {
        setEmailError('Please enter valid email');
        isValid = false;
      } else if (!validateEmail(email)) {
        setEmailError('Please enter a valid email address');
        isValid = false;
      } else {
        setEmailError(''); // Clear the error if the email is valid
      }
  
      
   
/* 
      if (email.trim() === ""){
        setEmailError(true);

        isValid = false;
      } else{
        setEmailError(false);
      } */
     

      if (mobileNo.trim() ===""){
        setMobileError(true);
        setMobileErrorText('Please enter mobile no.')
        isValid = false;
      } else{
       //console.warn(mobileNo.length)
       if(mobileNo.length==10){
        setMobileError(false);
        setMobileErrorText('')
       }else{
        setMobileError(true);
        setMobileErrorText('')
       }
       
      } 
     

      /* if (password.trim() ===""){
        setCreatePassError(true);
        setPasswordErrorText('Please create password.')
        isValid = false;
      } else {
        if(password.length>=8 && password.length<=16){
            setCreatePassError(false);
            
        }else{
            setCreatePassError(true);
            setPasswordErrorText('pasword length should be 8-16 character.')



            const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
            const uppercaseRegex = /[A-Z]/;

            if(!specialCharRegex.test(password)){
                setCreatePassError(true);
                setPasswordErrorText('pleae enter valid password')
                console.warn('a')
            }
            else if(!uppercaseRegex.test(password)){
                setCreatePassError(true);
                
                console.warn('b')
            }
            else{
               console.warn('c')
                setCreatePassError(false);
                setPasswordErrorText('')
            }
           
        }
       
      } */

     /*  if (confirmPwd.trim()===""){
        setConfirmPassError(true); 
        setConfirmErrorText('Please enter confirm password')
        isValid = false;
      } else{
        setConfirmPassError(false);
        setConfirmErrorText('')
      }
      if(confirmPwd !==password){
        setConfirmPassError(true);
        setConfirmErrorText("Password mismatch")
        isValid=false;
      }
      else{
        setConfirmPassError(false);
        setConfirmErrorText("")
      } */

        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        const uppercaseRegex = /[A-Z]/;

        if (password.trim() === '') {
            //setErrorMessage('Password is required');
            setCreatePassError(true);
            setPasswordErrorText("Password is required")
            isValid = false
          } else if(password.length<=8 && password.length>=16) {
           // setErrorMessage('Password must be between 8-16characters long');
           setCreatePassError(true);
            setPasswordErrorText("Password must be between 8-16characters long")
            isValid = false
          }
          
            else if(!specialCharRegex.test(password)){
                setCreatePassError(true);
                setPasswordErrorText('Please include special character')
                isValid = false
               // console.warn('a')
            }
            else if(!uppercaseRegex.test(password)){
                setCreatePassError(true);
                setPasswordErrorText('Please use uppercase')
                isValid = false
               // console.warn('b')
            }

          else if (password !== confirmPwd) {
           // setErrorMessage('Passwords do not match');
            setConfirmPassError(true);
            setConfirmErrorText("Passwords do not match")
            setPasswordErrorText('')
            isValid = false
          } else {
            setConfirmPassError(false);
            setConfirmErrorText("")
            setPasswordErrorText('')
            setCreatePassError(false);
            isValid = true
          }

      if (isValid) {

   
      let name =  fullName.split(' ');

      console.warn(name.length)

      let firstname=''
      let lastname=''

      if(name.length=='2'){
        firstname = name[0];
        lastname = name[1];
      }else{
        firstname = name[0];
        lastname = '';
      }
      

    // return false;
        try {
            const response = await fetch('https://www.hdsoftwares.com/attendance/welcome/addUser', {
              method: 'POST', // Specify POST method
              headers: {
                'Content-Type': 'application/json', // Set content type to JSON
              },
              body: JSON.stringify({
                firstname: firstname, // Sending the name
                lastname: lastname, // Sending the email
                email:email,
                password:password,
                role:'1',
                mobile:mobileNo
              }),
            });
      
            const data = await response.json(); // Parse the response to JSON
            console.warn(data.message)

            Alert.alert(
                "Alert", // Title of the alert
                data.message, // Message in the alert
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel" // Optional 'cancel' style
                  },
                  {
                    text: "OK", 
                    onPress: () => navigation.push('Signin')
                  }
                ],
                { cancelable: true } // Optional: controls whether the alert can be dismissed by tapping outside of it
              );



          } catch (error) {
           // setResponseMessage('Failed to send data');
            console.error('Error:', error);
          }
        

        ///navigation.push('Signin')
        // Add your form submission logic here
      }

    
      

    }
   

  
    
}

export default SignupScreen

const styles = StyleSheet.create({
    signupInfoWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 3.0,
        marginBottom: Sizes.fixPadding * 2.0
    },
    textFieldStyle: {
        ...Fonts.blackColor16Medium,
        padding: 0,
        flex: 1,
        marginLeft: Sizes.fixPadding + 2.0
    },
     divider: {
        marginTop: Sizes.fixPadding,
        backgroundColor: Colors.lightGrayColor,
        height: 1.0
    },
 
    dividerError: {
        marginTop: Sizes.fixPadding,
        backgroundColor: Colors.redColor,
        height: 1.5,
        
    },

    errorText: {
        color: 'red',
        marginbottom: 20,
        //paddingBottom: 10
      },

    checkBoxStyle: {
        width: 18.0,
        height: 18.0,
        borderRadius: Sizes.fixPadding - 5.0,
        ...CommonStyles.center,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
    }
})