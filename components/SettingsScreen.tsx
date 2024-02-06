import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { useStyle, useUser } from '../AppContext';
import { StatusBar } from 'expo-status-bar';

interface SettingsScreenProps {
  userToken: any;
  navigation: any;
}

export default function SettingsScreen({userToken, navigation}: SettingsScreenProps) {
  const { updateUserByEmail } = useUser();
  const { appStyles, theme } = useStyle();
  const navigationState = useNavigationState((state) => state);
  const [ isKBActive, setIsKBActive ] = useState(false);
  const [ hidePass, setHidePass ] = useState(true);

  const [ user, setUser ] = useState(
    { Name: userToken.name, email: userToken.email, password: userToken.password, type: userToken.type }
  )

  const togglePasswordVisibility = () => {
    setHidePass((prev) => !prev);
  };

  const handleInputChange = (fieldName: any, value: any) => {
    setUser((prevUser) => ({
      ...prevUser,
      [fieldName]: value,
    }));
  };

  const handleSave = () => {
    updateUserByEmail(userToken.email, user);
    alert("User Data Updated!");
    setTimeout(() => {
      navigation.goBack();
    }, 500);
  };

  const pickerSelectStyles = {
    inputIOS: {
      fontSize: 12,
      paddingVertical: 12,
      paddingHorizontal: 10,
      color: '#909BB1',
      alignItems: 'center',
      borderRadius: 4,
      textAlign: 'right',
    },
    inputAndroid: {
      fontSize: 12,
      paddingVertical: 12,
      paddingHorizontal: 10,
      color: '#909BB1',
      alignItems: 'center',
      borderRadius: 4,
      textAlign: 'right',
    },
  };

  return (
    <View style={[styles.container, appStyles.background, appStyles.top]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={[styles.backBTNContainer, appStyles.colorBackground]}>
            <Text>🔙</Text>
          </View>
        </TouchableOpacity>
        <Text style={[styles.headerText, appStyles.text]}>Settings</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.infoContainer}>
          <Text style={[styles.YPI, appStyles.colorText]}>Your Profile Information</Text>
          <View style={styles.profileImageContainer}>
            <View style={styles.imageContainer}>
              <Image source={require('../assets/Profile.png')} style={styles.image}/>
            </View>
            <View style={[styles.editContainer, theme === 'dark' ? {backgroundColor: '#D9D9D9'} : appStyles.colorBackground]}>
              <Image source={require('../assets/edit.png')} style={styles.edit}/>
            </View>
          </View>
          <Text style={[styles.PI, appStyles.colorText]}>Personal Information</Text>
          <View style={[styles.entityContainer, appStyles.containerBack]}>
            <Text style={[styles.entityName, appStyles.colorText]}>Name</Text>
            <TextInput style={styles.entityValue} placeholderTextColor={appStyles.text} placeholder='Enter Your name' value={user.Name} onChangeText={(text) => handleInputChange('Name', text)}></TextInput>
          </View>
          <View style={[styles.entityContainer, appStyles.containerBack]}>
            <Text style={[styles.entityName, appStyles.colorText]}>Email</Text>
            <TextInput style={styles.entityValue} placeholderTextColor={appStyles.text.color} placeholder='Enter Your email' value={user.email} onChangeText={(text) => handleInputChange('email', text)}></TextInput>
          </View>
          <View style={[styles.entityContainer, appStyles.containerBack]}>
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Text style={[styles.entityName, appStyles.colorText]}>Password</Text>
            </TouchableOpacity>
            <TextInput style={styles.entityValue} placeholderTextColor={appStyles.text.color} placeholder='Enter Your password' secureTextEntry={hidePass} value={user.password} onChangeText={(text) => handleInputChange('password', text)}></TextInput>
          </View>
          <View style={[styles.entityContainer, appStyles.containerBack]}>
            <Text style={[styles.entityName, appStyles.colorText]}>Type</Text>
            {/* {Platform.OS === 'ios' && ( */}
              <RNPickerSelect
              value={user.type}
              items={[
                { label: 'Normal', value: 'normal' },
                { label: 'Special', value: 'special' },
              ]}
              onValueChange={(value) => handleInputChange('type', value)}
              style={pickerSelectStyles}
            />
            {/* )} */}
          </View>
        </View>
        { !isKBActive && (
          <TouchableOpacity style={[styles.saveContainer, appStyles.colorBackground]} onPress={handleSave}>
            <Text style={[styles.save, appStyles.text]}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
      <StatusBar style={theme === 'dark'? 'light' : 'light'}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  backBTNContainer: {
    width: 70,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginLeft: 10,
  },
  headerText: {
    position: 'absolute',
    left: 0,
    width: '105%',
    textAlign: 'center',
    fontSize: 20,
    alignSelf: 'center',
    zIndex: -1
  },
  bodyContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  infoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  YPI: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    marginVertical: 15,
    opacity: 0.7,
  },
  profileImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 170,
    height: 170,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    padding: 5,
    backgroundColor: '#D9D9D9',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  editContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 40,
    height: 40,
    borderRadius: 25,
    borderColor: 'white',
    borderWidth: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  edit: {
    width: 20,
    height: 20,
  },
  PI: {
    fontSize: 17,
    marginBottom: 10,
    lineHeight: 22,
    textAlign: 'left',
    width: '95%',
    padding: 10,
    marginTop: 30,
    opacity: 0.7,
  },
  entityContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    margin: 5,
    backgroundColor: '#F4F4F4',
    padding: 15,
    borderRadius: 10,
    height: 50,
  },
  entityName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  entityValue: {
    fontSize: 12,
    color: '#909BB1',
    textAlign: 'right',
    width: 200,
  },
  saveContainer: {
    height: 60,
    width: 175,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  save: {
    fontSize: 17,
  },
})