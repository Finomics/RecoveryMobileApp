// import React in our code
import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

// import Torch Component
import Torch from 'react-native-torch';

const Flashlight = () => {
  //Default Keep Awake off
  const [isTorchOn, setIsTorchOn] = useState(false);

  const handlePress = () => {
    Torch.switchState(!isTorchOn);
    setIsTorchOn(!isTorchOn);
    console.log(isTorchOn);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View   style={{
          width: 500,
          height: 500,
          // alignItems: 'center',
          borderRadius: 500 / 2,
          backgroundColor: '#66EE11',
          position:'absolute',
          left:-120,
          top:-20,
          borderTopLeftRadius: 60,
        }}/>  */}
    <Image
            source={require('../images/flash.png')}
            style={{height: 200, width: 200,top:-50,}}
          />
      <View>
        <Text style={styles.titleText}>
          Turn on/off Flashlight to Make a Torch App in React Native
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={ isTorchOn ? styles.buttonStyle : styles.buttonStylefalse}
          onPress={handlePress}>
          <Text style={ styles.buttonTextStyle}>
            {isTorchOn ? 'Turn off the Torch' : 'Turn on the Torch'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Flashlight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
    alignItems:'center',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    top:20,
  },
  buttonStylefalse: {
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#8ad24e',
    marginRight: 2,
    marginLeft: 2,
    
  },
  buttonStyle: {
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: 'red',
    marginRight: 2,
    marginLeft: 2,
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
});