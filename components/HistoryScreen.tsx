import React from 'react';
import { ImageBackground, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { useStyle } from '../AppContext'

interface HistoryScreenProps {
  userToken: any;
  navigation: any;
}

export default function HistoryScreen({userToken, navigation}: HistoryScreenProps) {
  const { appStyles } = useStyle();

  const renderRecent = () => {
      return (
        <>
        {userToken.recent.map((item: any) => (
          <TouchableOpacity style={[styles.recentContainer, appStyles.containerBack]} key={item.Name} onPress={() => {navigation.navigate('Call', { user: item });}}>
            <View style={styles.recent_img}>
              <Image source={require('../assets/Profile.png')} style={styles.recent_profileImage} />
            </View>
            <View style={styles.recent_data}>
              <Text style={[styles.recent_data_name, appStyles.text]}>{item.Name}</Text>
              <Text style={[styles.recent_data_time, appStyles.text]}>{item.last_call}</Text>
            </View>
            <View style={styles.recent_info}>
              <Text style={styles.recent_info_text}>
                ❗
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        </>
      );
    };

    return(
            <ImageBackground source={require('../assets/background.png')} style={[appStyles.container, appStyles.top]}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {navigation.navigate('Home');}}>
                        <View style={[styles.backContainer, appStyles.colorBackground]}>
                          <Text style={styles.back}>🔙</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>History</Text>
                </View>
                <ScrollView style={styles.bodyContainer}>
                    {renderRecent()}
                </ScrollView>
            </ImageBackground>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    backContainer: {
        width: 70,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginLeft: 10,
    },
    back: {
        color: 'white',
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
        margin: 10,
        height: '100%',
    },
    recentContainer: {
        flexDirection: 'row',
        margin: 10,
        padding: 5,
        borderRadius: 20,
        shadowColor: 'black',
        alignItems: 'center',
    },
    recent_img: {
      width: 60,
      height: 60,
      overflow: 'hidden',
      padding: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
      borderColor: 'black',
      borderWidth: 1,
      backgroundColor: '#D9D9D9',
    },
    recent_profileImage: {
        width: '100%',
        height: '100%',
    },
    recent_data: {
        flex: 4,
        padding: 5,
    },
    recent_data_name: {
        fontSize: 18,
    },
    recent_data_time: {
        fontSize: 10,
        color: '#1E1E1E',
    },
    recent_info: {
        width: 30,
        height: 30,
        overflow: 'hidden',
        padding: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        borderColor: 'black',
        borderWidth: 0.5,
        backgroundColor: '#D9D9D9',
        marginRight: 3,
    },
    recent_info_text: {
        fontSize: 15,
    },
})