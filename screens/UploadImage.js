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
  TouchableOpacity,
} from 'react-native';

// import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
// var ImagePicker = require('react-native-image-picker');
import * as ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import notification from '../images/notification.png';
import user from '../images/user.png';
import {useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

import Loader from '../images/Loader';

export default function UploadImage({route, navigation}) {
  const [pickImage, setpickImage] = useState();
  const [modeOfCash, setModeOfCash] = useState();

  const {ClientName, ClientPhoneNumber, Amount} = route.params;

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
          } else {
            // const source = {uri: response.uri};
            // You can also display the image using data:
            // const source =  { uri: 'data:image/jpeg;base64,' + response.data };
          }

          setpickImage(response);
          console.log(pickImage);

          console.log(
            '=> 72',
            Platform.OS === 'android'
              ? pickImage?.assets[0]?.uri.replace('file://', '')
              : pickImage?.assets[0]?.uri,
          );

          // const imageData = {
          //   filePath: pickImage,
          //   // fileData: response.data,
          //   // fileUri:
          //     Platform.OS === 'android'
          //       ? response.uri
          //       : response.uri.replace('file://', ''),
          // };

          // setPhoto(imageData);
          // console.log('i am photo', photo);
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
        } else {
          // const source = {uri: response.uri};
          // You can also display the image using data:
          // const source =  { uri: 'data:image/jpeg;base64,' + response.data };
        }

        setpickImage(response);
        console.log(pickImage);

        console.log(
          '=> 72',
          Platform.OS === 'android'
            ? pickImage?.assets[0]?.uri.replace('file://', '')
            : pickImage?.assets[0]?.uri,
        );

        // const imageData = {
        //   filePath: pickImage,
        //   // fileData: response.data,
        //   // fileUri:
        //     Platform.OS === 'android'
        //       ? response.uri
        //       : response.uri.replace('file://', ''),
        // };

        // setPhoto(imageData);
        // console.log('i am photo', photo);
      });
    } catch (err) {
      console.warn(err);
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
          marginTop: -35,
          flexDirection: 'row',
          height: 80,
          alignContent: 'stretch',
          justifyContent: 'center',
        }}>
        {/* <Image
                source={require('../images/mainIcon.png')}
                style={[{width: 130, height: 130}]}
              /> */}
      </View>
      <Text
        style={{
          color: '#63BED3',
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: -10,
        }}>
        Recovery App
      </Text>
      <View style={{width: 40, marginTop: -40, marginLeft: 15}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../images/backIcon.png')}
            style={[{width: 40, height: 40}, {tintColor: '#2F80ED'}]}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: '90%',
          borderColor: '#e2e2e2',
          borderWidth: 1.5,
          marginLeft: '5%',
          marginTop: 35,
        }}></View>
      <View
        style={{
          width: '90%',
          borderColor: '#63BED3',
          borderWidth: 1.5,
          marginLeft: '5%',
          marginTop: -3,
        }}></View>

      {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                // backgroundColor: 'red',
                width: '100%',
              }}> */}
      <Text
        style={{
          color: 'grey',
          fontSize: 30,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 20,
        }}>
        UploadImage
      </Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          // alignItems: 'center',
          color: 'black',
          margin: 20,
          marginTop: -40,
        }}>
        <Text style={{color: 'black', fontSize: 20, marginTop: 10}}>
          ClientName: {ClientName}
        </Text>
        <Text style={{color: 'black', fontSize: 20, marginTop: 10}}>
          ClientPhoneNumber: {ClientPhoneNumber}
        </Text>
        <Text style={{color: 'black', fontSize: 20, marginTop: 10}}>
          Amount: {Amount}
        </Text>
      </View>

      <Text
        style={{
          color: 'black',
          fontSize: 24,
          marginTop: -50,
          margin: 20,
          fontWeight: 'bold',
        }}>
        Mode of Cash
      </Text>

      <View
        style={{margin: 20, marginTop: 0, flexDirection: 'row', width: '70%'}}>
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

      {/* <Text
                style={{
                  fontSize: 24,
                  color: '#474747',
                  fontFamily: 'Montserrat-Bold',
                  textAlign: 'center',
                  marginTop: 40,
    
                  width: '35%',
                }}>
                Upload {'\n'}Photos of Animals
              </Text> */}
      {/* </View> */}

      {modeOfCash === 1 ? (
        <>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              margin: 5,
              // backgroundColor: '#63BED3',
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
            <View
              style={{
                // flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 20,
                }}>
                {/* {this._uploadTextStatus()}{' '} */}
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 20,
                  fontFamily: 'Montserrat-Bold',
                }}>
                {' '}
                {/* ({this.state.to_no}/{this.state.out_of_no}) */}
              </Text>
            </View>
          </View>

          <View style={{flex: 1, justifyContent: 'flex-end'}}>
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
            {pickImage ? (
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
                    Upload To Continue
                  </Text>
                </TouchableOpacity>
              </ImageBackground>
            ) : (
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
              alignItems: 'center',
              margin: 5,
              // backgroundColor: '#63BED3',
            }}>
            {/* <View
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
          </View> */}
            <View
              style={{
                // flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 20,
                }}>
                {/* {this._uploadTextStatus()}{' '} */}
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 20,
                  fontFamily: 'Montserrat-Bold',
                }}>
                {' '}
                {/* ({this.state.to_no}/{this.state.out_of_no}) */}
              </Text>
            </View>
          </View>

          <View style={{flex: 1, justifyContent: 'flex-end'}}>
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

    // <View style={{color: 'black'}}>
    //   <Text style={{color: 'black'}}>UploadImage</Text>
    //   <Text>UploadImage</Text>
    //   <Text style={{color: 'black'}}>ClientName: {JSON.stringify(ClientName)}</Text>
    //   <Text style={{color: 'black'}}>ClientPhoneNumber: {JSON.stringify(ClientPhoneNumber)}</Text>
    //   <Text style={{color: 'black'}}>Amount: {JSON.stringify(Amount)}</Text>
    // </View>
  );
}

// import React, {Component} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Button,
//   Alert,
//   Modal,
//   Pressable,
//   ImageBackground,
//   BackHandler,
//   SafeAreaView,
//   ScrollView, TouchableOpacity
// } from 'react-native';
// // import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
// var ImagePicker = require('react-native-image-picker');
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// // import notification from '../images/notification.png';
// import user from '../images/user.png';
// // import AsyncStorage from '@react-native-community/async-storage';
// // import Icon from 'react-native-vector-icons/FontAwesome5';

// import Loader from '../images/Loader';

// // const createTwoButtonAlert = () =>
// //     Alert.alert(
// //       "Alert Title",
// //       "My Alert Msg",
// //       [
// //         {
// //           text: "Cancel",
// //           onPress: () => console.log("Cancel Pressed"),
// //           style: "cancel"
// //         },
// //         { text: "OK", onPress: () => console.log("OK Pressed") }
// //       ],
// //       { cancelable: false }
// //     );

// let imageList = [];
// let imageData = [];
// // let myN = this.props.route.params.mValu;

// export default class UploadImage extends Component {
//   static navigationOptions = {
//     headerShown: false,
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       u_animalId: this.props.route.params.animalId,
//       to_no: '0',
//       out_of_no: '4',
//       myN: this.props.route.params.mValu,
//       borrowerPhoneNumber: this.props.route.params.borrowerPhoneNumber,
//       tagNo: this.props.route.params.tagNo,
//       color: this.props.route.params.color,
//       breed: this.props.route.params.breed,
//       livestockType: this.props.route.params.livestockType,
//       age: this.props.route.params.age,
//       gender: this.props.route.params.gender,
//       identification: this.props.route.params.identification,
//       u_costOfAnimal: this.props.route.params.costOfAnimal,
//       u_purchasedPlace: this.props.route.params.purchasedPlace,
//       u_animalHealth: this.props.route.params.animalHealth,
//       u_healthReason: this.props.route.params.healthReason,
//       u_vaccinationStatus: this.props.route.params.vaccinationStatus,
//       u_name: '',
//       loading: false,
//       myArray: [],
//       modalVisible: false,
//     };
//     this.Handler = this.Handler.bind(this);
//     // this.logout = this.logout.bind(this);
//     this.backButton = this.backButton.bind(this);
//   }

//   backButton() {
//     this.props.navigation.goBack(null);
//     return true;
//   }

//   componentDidMount() {
//     // AsyncStorage.getItem('name').then((value) =>
//     //   this.setState({u_name: value}),
//     // );

//     BackHandler.addEventListener('hardwareBackPress', this.backButton);
//   }

//   componentWillUnmount() {
//     BackHandler.removeEventListener('hardwareBackPress', this.backButton);
//   }

//   setModalVisible = (visible) => {
//     this.setState({modalVisible: visible});
//   };

//   Handler() {
//     this.props.navigation.push('Notifications');
//   }

//   // logout() {
//   //   let keys = [
//   //     'token',
//   //     'name',
//   //     'veterinary_id',
//   //     'fcmToken',
//   //     'currentLongitude',
//   //     'currentLatitude',
//   //     'locationStatus',
//   //     'city',
//   //     'loginBy',
//   //     'stakeholderName',
//   //     'branchCode',
//   //     'farmerMobileNo',
//   //   ];
//   //   AsyncStorage.multiRemove(keys, (err) => {
//   //     this.props.navigation.replace('FullMainScreen');
//   //   });
//   // }

//   state = {
//     pickedImage: null,
//   };

//   reset = () => {
//     this.setState({
//       pickedImage: null,
//     });
//   };

//   handleClick = (prevState) => {
//     this.setState({to_no: prevState.to_no + 1});
//     console.log(this.state.to_no);
//   };

//   pickImageHandler = () => {
//     ImagePicker.launchCamera(
//       {title: 'Pick an Image', maxWidth: 800, maxHeight: 600},
//       (res) => {
//         if (res.didCancel) {
//           console.log('User cancelled!');
//         } else if (res.error) {
//           console.log('Error', res.error);
//         } else {
//           imageData = [res];
//           if (imageData.length > 0) {
//             // console.log("Myyyyyyyyyyy",imageData);
//           }
//         }

//         for (let i = 0; i < Object.keys(imageData).length; i++) {
//           let data = imageData[String(i)];
//           let image = {
//             name: data.fileName,
//             type: data.type,
//             uri:
//               Platform.OS === 'android'
//                 ? data.uri
//                 : data.uri.replace('file://', ''),
//           };

//           this.state.myN++;
//           let abc = this.state.myArray.push(image);
//           this.setState({pickedImage: data});
//           console.log('DDDDDDDDDDD', this.state.myArray);
//         }

//         this.setState({to_no: this.state.myN});
//       },
//     );
//   };

//   pickImageHandler2 = () => {
//     ImagePicker.launchCamera(
//       {title: 'Pick an Image', maxWidth: 800, maxHeight: 600},
//       (res) => {
//         if (res.didCancel) {
//           console.log('User cancelled!');
//         } else if (res.error) {
//           console.log('Error', res.error);
//         } else {
//           imageData = [res];
//           if (imageData.length > 0) {
//             // console.log("Myyyyyyyyyyy",imageData);
//           }
//         }

//         for (let i = 0; i < Object.keys(imageData).length; i++) {
//           let data = imageData[String(i)];
//           let image = {
//             name: data.fileName,
//             type: data.type,
//             uri:
//               Platform.OS === 'android'
//                 ? data.uri
//                 : data.uri.replace('file://', ''),
//           };

//           //  this.state.myN ++
//           let abc = this.state.myArray.push(image);
//           this.setState({pickedImage: data});
//           console.log('DDDDDDDDDDD', this.state.myArray);
//         }

//         // this.setState({to_no: this.state.myN})
//       },
//     );
//   };

//   sendImage = () => {
//     const dt = new FormData();

//     for (const key of Object.keys(this.state.myArray)) {
//       dt.append('photos', this.state.myArray[key]);
//     }

//     console.log('BBBBBBBBBBB', dt);
//     this.setState({
//       loading: true,
//     });

//     fetch(
//       'http://livestocksmart.com:3000/animal/uploadImages' +
//         this.state.u_animalId,
//       {
//         method: 'PUT',
//         body: dt,
//       },
//     )
//       .then((response) => response.json())
//       .then((response) => {
//         console.log('upload succes', response);
//         Alert.alert('Upload successfully !');
//         this.props.navigation.replace('Animal_Register_Form', {
//           picUpload: 'Done',
//           animalId: this.state.u_animalId,
//           borrowerPhoneNumber: this.state.borrowerPhoneNumber,
//           tagNo: this.state.tagNo,
//           color: this.state.color,
//           breed: this.state.breed,
//           livestockType: this.state.livestockType,
//           age: this.state.age,
//           gender: this.state.gender,
//           identification: this.state.identification,
//           costOfAnimal: this.state.u_costOfAnimal,
//           purchasedPlace: this.state.u_purchasedPlace,
//           animalHealth: this.state.u_animalHealth,
//           healthReason: this.state.u_healthReason,
//           vaccinationStatus: this.state.u_vaccinationStatus,
//         });
//         this.setState({to_no: null});
//         this.closeModal();
//         this.setState({
//           loading: false,
//         });
//       })

//       .catch((error) => {
//         console.log('upload error', error);
//         Alert.alert('Upload failed!');
//       });
//   };

//   changeButtonLogic = () => {
//     if (this.state.to_no == this.state.out_of_no) {
//       this.sendImage();
//     } else if (this.state.to_no > this.state.out_of_no) {
//       Alert.alert('Your are not uploading properly.');
//     } else {
//       this.pickImageHandler();
//     }
//   };

//   retakePhotoButton = () => {
//     if (this.state.to_no > 0) {
//       const changeImage = this.state.myArray.pop();
//       // const abc = parseInt(this.state.myN - 1);
//       // this.setState({to_no: abc});
//       console.log('My Changing Image', changeImage);
//       console.log('Original Images', this.state.myArray);
//       console.log('Counter No', this.state.to_no);
//       this.pickImageHandler2();
//     } else {
//       Alert.alert('Image not selected');
//     }
//   };

//   resetHandler = () => {
//     this.reset();
//   };

//   closeModal() {
//     this.setState({
//       myArray: [],
//     });
//   }

//   _uploadTextStatus() {
//     if (this.state.to_no == '0') {
//       return (
//         <View>
//           <Text
//             style={{
//               fontSize: 21,
//               color: '#474747',
//               fontFamily: 'Montserrat-Semibold',
//             }}>
//             Upload Front Image of Animal
//           </Text>
//         </View>
//       );
//     } else if (this.state.to_no == '1') {
//       return (
//         <View>
//           <Text
//             style={{
//               fontSize: 21,
//               color: '#474747',
//               fontFamily: 'Montserrat-Semibold',
//             }}>
//             Upload Right Image of Animal
//           </Text>
//         </View>
//       );
//     } else if (this.state.to_no == '2') {
//       return (
//         <View>
//           <Text
//             style={{
//               fontSize: 21,
//               color: '#474747',
//               fontWeight: 'Montserrat-Semibold',
//             }}>
//             Upload Left Image of Animal
//           </Text>
//         </View>
//       );
//     } else if (this.state.to_no == '3') {
//       return (
//         <View>
//           <Text
//             style={{
//               fontSize: 20,
//               color: '#474747',
//               fontWeight: 'Montserrat-Semibold',
//             }}>
//             Upload Rear Image of Animal
//           </Text>
//         </View>
//       );
//     } else {
//       return null;
//     }
//   }

//   render() {
//     const {modalVisible} = this.state;
//     return (
//       <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
//         <Loader loading={this.state.loading} />
//         <View
//           style={{
//             marginTop: -20,
//             flexDirection: 'row',
//             height: 80,
//             alignContent: 'stretch',
//             justifyContent: 'center',
//           }}>
//           <Image
//             source={require('../images/mainIcon.png')}
//             style={[{width: 130, height: 130}]}
//           />
//         </View>
//         <View style={{width: 40, marginTop: -40, marginLeft: 15}}>
//           <TouchableOpacity
//             onPress={() => this.props.navigation.navigate('Remaining_Animals')}>
//             <Image
//               source={require('../images/backIcon.png')}
//               style={[{width: 40, height: 40}, {tintColor: '#2F80ED'}]}
//             />
//           </TouchableOpacity>
//         </View>

//         <View
//           style={{
//             width: '90%',
//             borderColor: '#e2e2e2',
//             borderWidth: 1.5,
//             marginLeft: '5%',
//             marginTop: 35,
//           }}></View>
//         <View
//           style={{
//             width: '80%',
//             borderColor: '#63BED3',
//             borderWidth: 1.5,
//             marginLeft: '5%',
//             marginTop: -3,
//           }}></View>

//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'center',
//             // backgroundColor: 'red'
//           }}>
//           <Image
//             source={require('../images/cameraMan.png')}
//             style={{
//               width: '30%',
//               height: 150,
//               marginTop: 5,
//             }}
//           />

//           <Text
//             style={{
//               fontSize: 24,
//               color: '#474747',
//               fontFamily: 'Montserrat-Bold',
//               textAlign: 'center',
//               marginTop: 40,

//               width: '35%',
//             }}>
//             Upload {'\n'}Photos of Animals
//           </Text>
//         </View>

//         <View
//           style={{
//             flex: 1,
//             alignItems: 'center',
//             margin: 5,
//             // backgroundColor: '#63BED3',
//           }}>
//           <View
//             style={{
//               backgroundColor: '#cdcdcdcd',
//               width: '80%',
//               height: '120%',
//             }}>
//             <Image
//               source={this.state.pickedImage}
//               style={{
//                 width: '100%',
//                 height: '100%',
//               }}
//             />
//           </View>
//           <View
//             style={{
//               // flex: 1,
//               flexDirection: 'row',
//               justifyContent: 'center',
//             }}>
//             <Text
//               style={{
//                 marginTop: 10,
//                 fontSize: 20,
//               }}>
//               {this._uploadTextStatus()}{' '}
//             </Text>
//             <Text
//               style={{
//                 marginTop: 10,
//                 fontSize: 20,
//                 fontFamily: 'Montserrat-Bold',
//               }}>
//               {' '}
//               ({this.state.to_no}/{this.state.out_of_no})
//             </Text>
//           </View>
//         </View>

//         <View style={{flex: 1, justifyContent: 'flex-end'}}>
//           <ImageBackground
//             style={{
//               marginLeft: 20,
//               alignItems: 'center',
//               marginBottom: -25,
//               padding: 10,
//               // backgroundColor: '#c4c4c4',
//             }}
//             imageStyle={{
//               height: 50,
//               width: '100%',
//               borderRadius: 10,
//             }}
//             source={require('../images/Btn.png')}>
//             <TouchableOpacity
//               style={{
//                 padding: 10,
//                 width: 300,
//                 alignItems: 'center',
//                 height: 60,
//                 marginTop: 5,
//               }}
//               onPress={this.retakePhotoButton}>
//               <Text
//                 style={{
//                   fontSize: 22,
//                   fontFamily: 'Montserrat-Bold',
//                   marginTop: -15,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   textAlign: 'center',
//                   color: 'white',
//                   marginRight: 20,
//                 }}>
//                 Retake
//               </Text>
//             </TouchableOpacity>
//           </ImageBackground>
//           <ImageBackground
//             style={{
//               marginLeft: 20,
//               alignItems: 'center',
//               marginBottom: -25,
//               padding: 10,
//               // backgroundColor: '#c4c4c4',
//             }}
//             imageStyle={{
//               height: 50,
//               width: '100%',
//               borderRadius: 10,
//             }}
//             source={require('../images/Btn.png')}>
//             <TouchableOpacity
//               style={{
//                 padding: 10,
//                 width: 300,
//                 alignItems: 'center',
//                 height: 60,
//               }}
//               onPress={this.changeButtonLogic}>
//               <Text
//                 style={{
//                   fontSize: 22,
//                   fontFamily: 'Montserrat-Bold',
//                   marginTop: -10,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   textAlign: 'center',
//                   color: 'white',
//                   marginRight: 20,
//                 }}>
//                 Click here to Upload
//               </Text>
//             </TouchableOpacity>
//           </ImageBackground>
//           <View style={{margin: 5}} />
//         </View>
//       </SafeAreaView>
//     );
//   }
// }
