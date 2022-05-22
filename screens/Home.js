import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
  Alert,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation}) {
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
 
  };

  const [todo, setTodo] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [data, setData] = useState({});
  console.log(todo);

  const handleAddTask = async () => {
    if (!todo) {
      Alert.alert('Please Write What todo ??');
    } else {
      setTaskItems([...taskItems, todo]);
    }

    try {
      await AsyncStorage.setItem(
        'UserDataTask',
        JSON.stringify([...taskItems, todo]),
      );
      setTodo(null);

      console.log('hey async here', taskItems);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    let keys = ['UserDataTask', 'UserData'];
    // await AsyncStorage.removeItem('UserDataTask');
    await AsyncStorage.multiRemove(keys, err => {
      navigation.replace('form');
    });
  };

  return (
    <SafeAreaView style={style.body}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          backgroundColor: '#04AA6D',
          borderBottomRightRadius: 60,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
            fontFamily: 'sans-serif-medium',
            marginRight: 240,
            marginTop: 16,
            textTransform: 'capitalize',
          }}>
          Hello, {data.name} !
        </Text>
        <TouchableOpacity
          style={{
            left: 120,
            justifyContent: 'center',
            width: '20%',
            padding: 5,
            backgroundColor: '#66EE00',
          }}
          onPress={logout}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontFamily: 'sans-serif-medium',
              textAlign: 'center',
            }}>
            Log out
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            left: 30,
            top:-27.5,
            justifyContent: 'center',
            width: '20%',
            padding: 5,
            backgroundColor: '#66EE00',
          }}
          onPress={()=> navigation.navigate('RealtimeSearch')}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontFamily: 'sans-serif-medium',
              textAlign: 'center',
            }}>
            Github
          </Text>
        </TouchableOpacity>

        <Text style={style.text}>Todo App</Text>
        <View style={{margin: 5}} />

        <TextInput
          style={style.input}
          placeholder="Enter What Todo .... 🚀"
          placeholderTextColor={'#474747'}
          onChangeText={text => {
            const numericRegex = /^[A-Za-z\s0-9]*/;
            if (numericRegex.test(text)) {
              setTodo(text);
            }
          }}
          value={todo}
          multiline={true}
          numberOfLines={3}
          maxHeight={60}
        />

        <View style={{width: '80%', marginTop: 20, margin: 15}}>
          <Button
            onPress={handleAddTask}
            title="Submit"
            color="#66EE00"
            disabled={!todo}
          />
        </View>

        <View style={{width: '80%', marginBottom: 40, margin: 15}}>
          <Button
            onPress={() => setTaskItems([])}
            title="Delete All"
            color="#66EE00"
            disabled={taskItems.length === 0}
          />
        </View>
      </View>
      <View style={{margin: 10}} />

      {/* <ScrollView>
        {taskItems.map(item => {
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: '95%',
                margin: 5,
              }}>
              <Text
                style={{
                  flexDirection: 'row',
                  padding: 15,
                  width: '100%',
                  borderRadius: 10,
                  backgroundColor: 'white',
                  color: 'black',
                  borderColor: '#e2e2e2',
                  borderWidth: 1.5,
                }}>
                {item}
              </Text>
            </View>
          );
        })}
      </ScrollView> */}

      <FlatList
        data={taskItems}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              width: '95%',
              margin: 5,
            }}>
            <Text
              style={{
                flexDirection: 'row',
                padding: 15,
                width: '100%',
                borderRadius: 10,
                backgroundColor: 'white',
                color: 'black',
                borderColor: '#e2e2e2',
                borderWidth: 1.5,
              }}>
              {item}
            </Text>
          </View>
        )}
        keyExtractor={item => item}
      />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
  },

  text: {
    fontSize: 45,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
    color: 'white',
    marginTop: 20,
    textAlign: 'center',
  },
  input: {
    margin: 15,
    paddingHorizontal: 10,
    height: 60,
    color: 'black',
    width: '80%',
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white',
  },
});
