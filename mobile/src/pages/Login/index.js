/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Image, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import { Button, Container, Input, Label, Mode } from './styles';
import api from '../../services/api';
import Logo from '../../assets/logo.png';

const Login = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState(false);

  useEffect(() => {
    async function initApp() {
      await AsyncStorage.getItem('mode').then(modeItem =>
        setMode(JSON.parse(modeItem)),
      );

      await AsyncStorage.getItem('user').then(id => {
        if (id) {
          navigation.navigate('Main', {
            id,
          });
        }
      });
    }

    initApp();
  }, []);

  async function handleMode() {
    await AsyncStorage.setItem('mode', JSON.stringify(!mode));
    setMode(!mode);
  }

  async function handleLogin() {
    try {
      const { data } = await api.post('/dev', { username: user });
      await AsyncStorage.setItem('user', data._id);
      navigation.navigate('Main', {
        id: data._id,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container behavior="padding" enabled={Platform.OS === 'ios'} mode={mode}>
      <Image source={Logo} />
      <Input
        value={user}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={username => setUser(username)}
        placeholder="Digite seu usuário no github"
        placeHolderTextColor="#999"
        mode={mode}
        returnKeyType="send"
        onSubmitEditing={handleLogin}
      />
      <Button onPress={handleLogin} mode={mode}>
        <Label mode={mode}>Entrar</Label>
      </Button>
      <Mode mode={mode} onPress={handleMode}>
        <Feather
          name={mode ? 'sun' : 'moon'}
          size={22}
          color={mode ? '#d7b335' : '#44475a'}
        />
      </Mode>
    </Container>
  );
};

export default Login;
