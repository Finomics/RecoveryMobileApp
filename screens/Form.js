import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Form({navigation}) {
  useEffect(() => {
    getData();
  }, []);

  const [data, setData] = useState({name: '', gender: '', age: ''});
  console.log(data);

  const getData = () => {
    try {
      AsyncStorage.getItem('UserData').then(value => {
        if (value != null) {
          navigation.replace('home');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleBtn = async () => {
    if (
      data.name.length == 0 ||
      data.gender.length == 0 ||
      data.age.length == 0
    ) {
      Alert.alert('Warning!', 'Please write your data.');
    } else {
      try {
        await AsyncStorage.setItem('UserData', JSON.stringify(data));
        navigation.replace('home');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={style.body}>
      <View style={style.mainContainer}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            backgroundColor: 'white',
            borderBottomRightRadius: 60,
          }}>
          <Text style={style.text}>Todo's App</Text>
        </View>
        <View style={{margin: 10}} />
        <Text style={style.formtext}>Enter Name</Text>
        <TextInput
          style={style.input}
          placeholder=""
          placeholderTextColor={'#474747'}
          onChangeText={text => setData({...data, name: text})}
          value={data.name}
        />
        <View
          style={{
            flexDirection: 'row',
            width: '80%',
            justifyContent: 'space-between',
            marginBottom: -10,
          }}>
          <Text style={style.formtexttwo}>Enter Gender</Text>
          <Text style={style.formtextthree}>Enter Age</Text>
        </View>

        <View style={style.subContainer}>
          <TextInput
            style={style.inputgender}
            placeholderTextColor={'#474747'}
            onChangeText={text => setData({...data, gender: text})}
            value={data.gender}
          />

          <TextInput
            style={style.inputage}
            placeholderTextColor={'#474747'}
            // onChangeText={text => !text[0]==' ' && setData({...data, age: text})}
            onChangeText={text => {
              let age = text.split("")
              if (age[age.length -1] != ' ') {
                setData({...data, age: text});
              }
            }}
            value={data.age}
          />
        </View>
        <View style={{width: '85%', marginTop: 20}}>
          <Button
            onPress={handleBtn}
            title="Submit"
            color="#66EE00"
            disabled={!data.name || !data.age || !data.gender}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#04AA6D',
  },

  subContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
    color: '#04AA6D',
    marginBottom: 70,
    textAlign: 'center',
    marginTop: 50,
  },
  input: {
    margin: 15,
    paddingHorizontal: 10,
    // height: 60,
    color: 'black',
    width: '85%',
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  inputgender: {
    margin: 15,
    paddingHorizontal: 10,
    // height: 60,
    width: '45%',
    color: 'black',
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  inputage: {
    margin: 15,
    paddingHorizontal: 10,
    // height: 60,
    width: '32%',
    color: 'black',
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  formtext: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
    marginRight: 230,
    marginBottom: -10,
  },
  formtexttwo: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
    marginLeft: -2,
  },
  formtextthree: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
    marginRight: 40,
  },
});
