import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  Modal,
  Pressable,
  ImageBackground,
  BackHandler,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import user from '../images/user.png';
import {useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import Loader from '../images/Loader';

export default function UploadImage({route, navigation}) {
  const [pickImage, setpickImage] = useState();
  const [modeOfCash, setModeOfCash] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const {ClientName, ClientPhoneNumber, Amount} = route.params;
  const [amount, setAmount] = useState(Amount);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        let options = {
          title: 'Select Image',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchCamera(options, response => {
          // console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }

          setpickImage(response);
          console.log(pickImage);
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const imageGallery = () => {
    try {
      let options = {
        title: 'Select Image',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.launchImageLibrary(options, response => {
        // console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }

        setpickImage(response);
        console.log('pick image ====> ', pickImage);
      });
    } catch (err) {
      console.warn(err);
    }
  };

  const handleChequeImg = () => {
    console.log('104', pickImage);
    if (pickImage.didCancel == true) {
      Alert.alert('Please Select Image to Upload First');
    } else {
      const imageData = {
        filename: pickImage?.assets[0].fileName,
        type: pickImage?.assets[0].type,
        path:
          Platform.OS === 'android'
            ? pickImage?.assets[0]?.uri.replace('file://', '')
            : pickImage?.assets[0]?.uri,
      };

      const dt = new FormData();

      dt.append('cardimage', {
        uri: pickImage?.assets[0]?.uri,
        type: pickImage?.assets[0]?.type,
        name: pickImage?.assets[0]?.fileName,
      });

      console.log('BBBBBBBBBBB', dt);

      setIsLoading(true);

      fetch('https://client-backend-node.herokuapp.com/image', {
        method: 'POST',
        body: dt,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => response.json())
        .then(response => {
          setIsLoading(false);
          console.log('upload succes', response);
          Alert.alert('Upload success!');
          navigation.navigate('Otp');
        })

        .catch(error => {
          console.log('upload error', error);
          Alert.alert('Upload failed!');
        });

      console.log('====> 170', imageData);
    }
  };

  var radio_props = [
    {label: 'cash', value: 0},
    {label: 'cheque', value: 1},
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          alignContent: 'stretch',
          justifyContent: 'center',
        }}></View>
      <Text
        style={{
          color: '#63BED3',
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          // marginTop: 10,
        }}>
        Recovery App
      </Text>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{width: 40, marginTop: -35, marginLeft: 15}}>
        <Image
          source={require('../images/backIcon.png')}
          style={[{width: 40, height: 40}, {tintColor: '#2F80ED'}]}
        />
      </TouchableOpacity>

      <View
        style={{
          width: '90%',
          borderColor: '#e2e2e2',
          borderWidth: 1.5,
          marginLeft: '5%',
          marginTop: 10,
        }}></View>
      <View
        style={{
          width: '90%',
          borderColor: '#63BED3',
          borderWidth: 1.5,
          marginLeft: '5%',
          marginTop: -3,
        }}></View>

      <View
        style={{
          // flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          // alignItems: 'center',
          color: 'black',
          margin: 20,
          marginTop: -20,
        }}>
        <Text style={{color: 'black', fontSize: 20, marginTop: 30}}>
          Client Name: {ClientName}
        </Text>
        <Text style={{color: 'black', fontSize: 20, marginTop: 10}}>
          Client Phone Number: {ClientPhoneNumber}
        </Text>

        <TextInput
          style={{
            height: 40,
            width: '97%',
            marginTop: 12,
            borderWidth: 1,
            padding: 10,
          }}
          placeholder="Enter Amount Here"
          onChangeText={val => setAmount(val)}
          value={amount}
        />
      </View>

      <Text
        style={{
          color: 'black',
          fontSize: 24,
          marginTop: -10,
          margin: 20,
          fontWeight: 'bold',
        }}>
        Mode
      </Text>

      <View
        style={{margin: 20, marginTop: -10, flexDirection: 'row', width: '70%'}}>
        <RadioForm
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
          radio_props={radio_props}
          initial={0}
          formHorizontal={true}
          labelHorizontal={true}
          buttonColor={'#2196f3'}
          labelStyle={{fontSize: 20, color: 'grey'}}
          animation={true}
          onPress={value => setModeOfCash(value)}
        />
      </View>

      <View>
        {isLoading && <ActivityIndicator color={'#344960'} size="large" />}
      </View>

      {modeOfCash === 1 ? (
        <>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginTop: -15,
              margin: 5,
            }}>
            <View
              style={{
                backgroundColor: '#cdcdcdcd',
                width: '80%',
                height: '120%',
              }}>
              <Image
                source={pickImage?.assets}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </View>
          </View>

          <View
            style={{
              justifyContent: 'flex-end',
            }}>
            <ImageBackground
              style={{
                marginLeft: 20,
                alignItems: 'center',
                marginBottom: -25,
                padding: 10,
              }}
              imageStyle={{
                height: 50,
                width: '100%',
                borderRadius: 10,
              }}
              source={require('../images/Btn.png')}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  width: 300,
                  alignItems: 'center',
                  height: 60,
                  marginTop: 5,
                }}
                onPress={imageGallery}>
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: 'Montserrat-Bold',
                    marginTop: -15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    color: 'white',
                    marginRight: 20,
                  }}>
                  Upload From Gallery
                </Text>
              </TouchableOpacity>
            </ImageBackground>
            {pickImage && !pickImage.didCancel == true ? (
              (console.log('367', pickImage),
              (
                <ImageBackground
                  style={{
                    marginLeft: 20,
                    alignItems: 'center',
                    marginBottom: -25,
                    padding: 10,
                  }}
                  imageStyle={{
                    height: 50,
                    width: '100%',
                    borderRadius: 10,
                  }}
                  source={require('../images/Btn.png')}>
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      width: 300,
                      alignItems: 'center',
                      height: 60,
                    }}
                    onPress={handleChequeImg}>
                    <Text
                      style={{
                        fontSize: 22,
                        fontFamily: 'Montserrat-Bold',
                        marginTop: -10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        color: 'white',
                        marginRight: 20,
                      }}>
                      Upload to Continue
                    </Text>
                  </TouchableOpacity>
                </ImageBackground>
              ))
            ) : (
              <ImageBackground
                style={{
                  marginLeft: 20,
                  alignItems: 'center',
                  marginBottom: -25,
                  padding: 10,
                }}
                imageStyle={{
                  height: 50,
                  width: '100%',
                  borderRadius: 10,
                }}
                source={require('../images/Btn.png')}>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    width: 300,
                    alignItems: 'center',
                    height: 60,
                  }}
                  onPress={requestCameraPermission}>
                  <Text
                    style={{
                      fontSize: 22,
                      fontFamily: 'Montserrat-Bold',
                      marginTop: -10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      color: 'white',
                      marginRight: 20,
                    }}>
                    Take From Camera
                  </Text>
                </TouchableOpacity>
              </ImageBackground>
            )}
            <View style={{margin: 5}} />
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <ImageBackground
              style={{
                marginLeft: 20,
                alignItems: 'center',
                marginBottom: -25,
                padding: 10,
                // backgroundColor: '#c4c4c4',
              }}
              imageStyle={{
                height: 50,
                width: '100%',
                borderRadius: 10,
              }}
              source={require('../images/Btn.png')}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  width: 300,
                  alignItems: 'center',
                  height: 60,
                }}
                // onPress={handleCash()}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: 'Montserrat-Bold',
                    marginTop: -10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    color: 'white',
                    marginRight: 20,
                  }}>
                  Continue
                </Text>
              </TouchableOpacity>
            </ImageBackground>
            <View style={{margin: 5}} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

