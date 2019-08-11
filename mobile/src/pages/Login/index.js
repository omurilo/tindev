/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import Logo from '../../assets/logo.png';

const Login = props => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('user').then(id => {
      if (id) {
        props.navigation.navigate('Main', {
          id,
        });
      }
    });
  }, []);

  async function handleLogin() {
    try {
      const { data } = await api.post('/dev', { username: user });
      await AsyncStorage.setItem('user', data._id);
      console.log(user, data._id);
      props.navigation.navigate('Main', {
        id: data._id,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === 'ios'}
      style={styles.container}
    >
      <Image source={Logo} />
      <TextInput
        value={user}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        onChangeText={username => setUser(username)}
        placeholder="Digite seu usuário no github"
        placeHolderTextColor="#999"
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.textButton}>Entrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  input: {
    height: 46,
    fontSize: 14,
    marginTop: 20,
    color: '#666',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ddd',
    alignSelf: 'stretch',
    paddingHorizontal: 15,
    backgroundColor: '#F2F2F2',
  },
  button: {
    height: 46,
    marginTop: 10,
    borderRadius: 4,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DF4723',
  },
  textButton: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default Login;
