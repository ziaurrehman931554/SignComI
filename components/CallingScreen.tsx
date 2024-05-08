import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Platform, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import { StatusBar } from 'expo-status-bar';
import { WebView} from 'react-native-webview';


import { useStyle, useUser } from "AppContext";

interface CallingScreenProps {
  navigation: any;
  userToken: any;
}
export default function CallingScreen({ navigation, userToken }: CallingScreenProps) {
  const { appStyles, theme } = useStyle()
  const { height } = Dimensions.get('screen');

  const [hasPermission, setHasPermission] = useState<any>(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [text, setText] = useState("This is container where the text of the signs are displayed.");
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCallOngoing, setIsCallOngoing] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleEndCall = () => {
    setIsCallOngoing(false);
    navigation.goBack();
  };

  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.front
        ? Camera.Constants.Type.back
        : Camera.Constants.Type.front
    );
  };

  const toggleMic = () => {
    setIsMicMuted(!isMicMuted);
  };

  return (
    <ImageBackground style={[appStyles.container, appStyles.top]} source={require('../assets/background.png')}>
      <View style={{ bottom: 10, position: "absolute", width: '100%', alignSelf: 'center', zIndex: 2 }}>
        <View style={styles.capNCamContainer}>
          <View style={[styles.captionContainer, appStyles.containerBack]}>
            <Text style={[styles.caption, appStyles.text]}>{text}</Text>
          </View>
          <View style={styles.myCamContainer}>
            {isCallOngoing && (<></>
              // <Camera
              //   style={{ flex: 1, borderRadius: 11, zIndex: -1 }}
              //   type={cameraType}
              //   ref={(ref) => setCameraRef(ref)}
              // />
            )}
          </View>
        </View>
        <View style={styles.controlContainer}>
          <TouchableOpacity
            style={styles.controlOptionContainer}
            onPress={toggleCameraType}
            disabled={!isCallOngoing}
          >
            <Text style={styles.controlOption}>🔄</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.controlOptionContainer, { backgroundColor: '#FF0000' }]}
            onPress={handleEndCall}
            disabled={!isCallOngoing}
          >
            <Text style={styles.controlOption}>📞</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlOptionContainer}
            onPress={toggleMic}
            disabled={!isCallOngoing}
          >
            <Text style={styles.controlOption}>{isMicMuted ? '🔇' : '🎤'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.otherCamContainer, appStyles.colorBackground, {height: height - appStyles.top.paddingTop - 192}]}>
        {isCallOngoing && (
        <WebView
          source={{ uri: 'https://tomasgonzalez.github.io/hand-gesture-recognition-using-mediapipe-in-react/' }}
          style={{ marginTop: 0 }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          containerStyle={{ height: '100%', width: '100%' }}
          originWhitelist={['*']}
          injectedJavaScript={`
            document.body.style.overflow = 'hidden';
            document.body.style.height = '110%';
            document.body.style.width = '60%';
            document.body.style.position = 'absolute';
          `}
        />

          // <Camera
          //   style={{ flex: 1, borderRadius: 11, zIndex: -1  }}
          //   type={Camera.Constants.Type.front}
          //   ref={(ref) => setCameraRef(ref)}
          // />
        )}
      </View>
      <StatusBar style="dark" />
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
    capNCamContainer: {
        bottom: 0,
        display: 'flex',
        width: '100%',
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    captionContainer: {
        height: 76,
        width: 198,
        borderRadius: 11, 
        margin: 6,
    },
    caption: {
        padding: 5,
        fontSize: 17,
    },
    myCamContainer: {
        overflow: "hidden",
        height: 191,
        borderWidth: 1,
        width: 115,
        borderRadius: 11,
        margin: 3,
        backgroundColor: 'black',
        borderColor: '#74ACD9',
    },
    controlContainer: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 10,
    },
    controlOptionContainer: {
        height: 80,
        width: 80,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlOption: {
        fontSize: 40,
    },
    otherCamContainer: {
        overflow: "hidden",
        zIndex: 1,
        width: '95%',
        alignSelf: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#74ACD9',
    },
})