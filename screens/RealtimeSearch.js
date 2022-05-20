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
  Image,
  Linking,
  Modal,
  Pressable,
} from 'react-native';
import React from 'react';
import {useEffect, useState} from 'react';

export default function RealtimeSearch({navigation}) {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [followers, setfollower] = useState([]);

  useEffect(() => {
    fetch('http://client-backend-node.herokuapp.com/client', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
      //   email: email,
      //   password: password,
      //   fcmToken: fcmToken,
      // }),
    })
      .then((res) => res.json())
      .then( (data) => { 
        console.log('all data-->>>', data);
          setData(data);
      })
      .catch(error => console.error(error));
  }, []);

  // useEffect(() => {
  //   console.log('dadadad');
  //   fetch(`https://api.github.com/users/${search}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('specific data-->>>', data);
  //       setSearchData(data);
  //     })
  //     .catch(error => console.error(error));
  // }, [search]);

  // const getFollowers = item => {
  //   fetch(item?.followers_url)
  //     .then(response => response.json())
  //     .then(data => setfollower(data))
  //     .catch(error => console.error(error));
  // };

  // const handleAddTask = async () => {
  //   if (!search) {
  //     Alert.alert('Please Write What search ??');
  //   } else {
  //     await fetch(`https://api.github.com/users/${search}`)
  //       .then(response => response.json())
  //       .then(data => setData(data))
  //       // (prevState => ({...prevState, data})))
  //       .catch(error => console.error(error));
  //   }
  // };

  return (
    <SafeAreaView style={style.body}>
      <View style={style.container}>
        <View style={{margin: 10}} />
        <Text style={style.text}>Recovery App</Text>
        <View style={{margin: 5}} />

        <TextInput
          style={style.input}
          placeholder="Enter Client Name .... "
          placeholderTextColor={'#474747'}
          onChangeText={text => {
            setSearch(text);
          }}
          value={search}
        />

        <View style={{width: '80%', marginTop: 10, margin: 15}}>
          <Button
            // onPress={handleAddTask}
            title="Search"
            color="#3DFAFF"
            disabled={!search}
          />
        </View>
      </View>

      <View style={{margin: 10}} />



      <FlatList
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                // getFollowers(item);
                // setCurrentValue(item);
                // setModalVisible(true);
               navigation.navigate("uploadImage", {
                ClientName: item.ClientName,
                ClientPhoneNumber: item.ClientPhoneNumber,
                Amount: item.Amount,
               });
                
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '95%',
                  margin: 5,
                  
                }}>
                {/* {console.log('hey', item)} */}
                {/* <Image style={style.logo} source={{uri: item.avatar_url}} /> */}
                <Text
                  style={{
                    flexDirection: 'row',
                    padding: 15,
                    width: '90%',
                    //   borderRadius: 10,
                    backgroundColor: 'white',
                    color: 'black',
                    borderColor: '#e2e2e2',
                    borderWidth: 1.5,
                    fontWeight: 'bold',
                  }}>
                   Name : {item.ClientName} {'\n'}
                  {'\n'}
                  Phone Number : {item.ClientPhoneNumber}  {'\n'}  {'\n'}
                  Amount : {item.Amount}  {'\n'}  {'\n'}
                  {/* <Text
                    style={{color: 'blue'}}
                    onPress={() => Linking.openURL(item.html_url)}>
                    Profile Links
                  </Text> */}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.ClientId}
        />

      {/* { !searchData?.message ? (
        <ScrollView>
            <TouchableOpacity
              onPress={() => {
                getFollowers(item);
                setCurrentValue(item);
                setModalVisible(true);
              }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '95%',
              margin: 5,
            }}>
            <Image
              style={style.logo}
              source={
                searchData?.message
                  ? require('../images/user.png')
                  : {uri: searchData?.avatar_url}
              }
            />
            <Text
              style={{
                flexDirection: 'row',
                padding: 15,
                width: '70%',
                  borderRadius: 10,
                backgroundColor: 'white',
                color: 'black',
                borderColor: '#e2e2e2',
                borderWidth: 1.5,
                fontWeight: 'bold',
              }}>
              Profile Name : {searchData?.login} {'\n'}
              {'\n'}
              <Text
                style={{color: 'blue'}}
                onPress={() => Linking.openURL(searchData?.html_url)}>
                Profile Links
              </Text>
            </Text>
          </View></TouchableOpacity>
        </ScrollView>
      ) : (
        <FlatList
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                getFollowers(item);
                setCurrentValue(item);
                setModalVisible(true);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '95%',
                  margin: 5,
                }}>
                {console.log('hey', item)}
                <Image style={style.logo} source={{uri: item.avatar_url}} />
                <Text
                  style={{
                    flexDirection: 'row',
                    padding: 15,
                    width: '70%',
                      borderRadius: 10,
                    backgroundColor: 'white',
                    color: 'black',
                    borderColor: '#e2e2e2',
                    borderWidth: 1.5,
                    fontWeight: 'bold',
                  }}>
                  Profile Name : {item.login} {'\n'}
                  {'\n'}
                  <Text
                    style={{color: 'blue'}}
                    onPress={() => Linking.openURL(item.html_url)}>
                    Profile Links
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      )} */}

      <View style={style.centeredView}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <Text style={style.modalText}>
                Number of followers : {followers.length || searchData?.followers} 
              </Text>

              {/* <Text style={style.modalText}>{currentValue?.status}</Text> */}
              <Pressable
                style={[style.button, style.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={style.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>

      {/* <FlatList
        data={usesearchdata}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '95%',
              margin: 5,
            }}>
            <Image style={style.logo} source={{uri: item.avatar_url}} />
            <Text
              style={{
                flexDirection: 'row',
                padding: 15,
                width: '70%',
                //   borderRadius: 10,
                backgroundColor: 'white',
                color: 'black',
                borderColor: '#e2e2e2',
                borderWidth: 1.5,
                fontWeight: 'bold',
              }}>
              Profile Name : {item.login} {'\n'}
              Links : {item.html_url}
            </Text>
          </View>
        )}
        keyExtractor={item => item.id}
      /> */}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#48BEFF',
    borderBottomRightRadius: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  text: {
    fontSize: 40,
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
  logo: {
    width: 70,
    height: 80,
    right: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
});
