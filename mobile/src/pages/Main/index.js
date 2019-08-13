/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import io from 'socket.io-client';
import Feather from 'react-native-vector-icons/Feather';
import {
  Avatar,
  Cards,
  Card,
  Container,
  Empty,
  Logo,
  Footer,
  Name,
  Bio,
  Buttons,
  Button,
  Mode,
  Match,
  ItsaMatch,
  MatchAvatar,
  MatchName,
  MatchBio,
  Close,
} from './styles';
import api from '../../services/api';
import logo from '../../assets/logo.png';
import Like from '../../assets/like.png';
import Dislike from '../../assets/dislike.png';
import matchLogo from '../../assets/itsamatch.png';

const { width } = Dimensions.get('window');

const CardAnimated = ({ mode, dev, style, panResponder }) => (
  <Card mode={mode} key={dev._id} style={style} {...panResponder.panHandlers}>
    <Avatar
      source={{
        uri: dev.avatar,
      }}
    />
    <Footer mode={mode}>
      <Name mode={mode}>{dev.name}</Name>
      <Bio mode={mode} numberOfLines={3}>
        {dev.bio}
      </Bio>
    </Footer>
  </Card>
);

const Main = props => {
  const id = props.navigation.getParam('id');
  const [mode, setMode] = useState(false);
  const [listDevs, setListDevs] = useState([]);
  const [itsAMatch, setItsAMatch] = useState(null);

  useEffect(() => {
    async function getDevs() {
      const { data } = await api.get('/devs', {
        headers: {
          user: id,
        },
      });

      setListDevs(data);
    }

    getDevs();
  }, [id]);

  useEffect(() => {
    AsyncStorage.getItem('mode').then(modeItem =>
      setMode(JSON.parse(modeItem)),
    );
  }, []);

  useEffect(() => {
    const socket = io('http://192.168.1.102:3333', {
      query: { user: id },
    });

    socket.on('match', dev => {
      setItsAMatch(dev);
    });
  }, [id]);

  async function handleLogout() {
    await AsyncStorage.removeItem('user');
    props.navigation.navigate('Login');
  }

  async function handleMode() {
    await AsyncStorage.setItem('mode', JSON.stringify(!mode));
    setMode(!mode);
  }

  async function handleLike() {
    const [user, ...rest] = listDevs;
    console.log('oi', user);
    await api.post(`/dev/${user._id}/like`, null, {
      headers: {
        user: id,
      },
    });

    setListDevs(rest);
  }

  async function handleDislike() {
    console.log('oi');
    const [user, ...rest] = listDevs;
    await api.post(`/dev/${user._id}/dislike`, null, {
      headers: {
        user: id,
      },
    });

    setListDevs(rest);
  }

  const sliderPosition = new Animated.ValueXY({ x: 0, y: 0 });

  // if (itsAMatch) {
  //   return false;
  // }
  // return true;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderTerminationRequest: () => true,
    onPanResponderMove: (evt, gestureState) => {
      sliderPosition.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 170) {
        // handleLike();
        Animated.spring(sliderPosition, {
          toValue: { x: width + 35, y: 0 },
        }).start();
      } else if (gestureState.dx < -170) {
        // handleDislike();
        Animated.spring(sliderPosition, {
          toValue: { x: -width - 35, y: 0 },
        }).start();
      } else {
        Animated.spring(sliderPosition, {
          toValue: { x: 0, y: 0 },
        }).start();
      }
    },
  });

  return (
    <Container mode={mode}>
      <TouchableOpacity onPress={handleLogout}>
        <Logo source={logo} />
      </TouchableOpacity>

      <Cards>
        {listDevs.length > 0 ? (
          listDevs.map((dev, idx) => (
            <CardAnimated
              mode={mode}
              dev={dev}
              style={[
                { zIndex: listDevs.length - idx },
                {
                  opacity:
                    idx > 0
                      ? idx === 1
                        ? sliderPosition.x.interpolate({
                            inputRange: [-width, 0, width],
                            outputRange: [1, 0, 1],
                            extrapolate: 'clamp',
                          })
                        : 0
                      : 1,
                },
                {
                  transform:
                    idx > 0
                      ? [
                          {
                            scale: sliderPosition.x.interpolate({
                              inputRange: [-width, 0, width],
                              outputRange: [1, 0.8, 1],
                              extrapolate: 'clamp',
                            }),
                          },
                        ]
                      : [
                          {
                            translateX: sliderPosition.x,
                          },
                          {
                            rotate: sliderPosition.x.interpolate({
                              inputRange: [-width, width],
                              outputRange: ['-20deg', '20deg'],
                              extrapolate: 'clamp',
                            }),
                          },
                        ],
                },
              ]}
              panResponder={panResponder}
            />
          ))
        ) : (
          <Empty mode={mode}>Acabou :(</Empty>
        )}
      </Cards>
      {listDevs.length > 0 && (
        <Buttons>
          <Button mode={mode} onPress={handleDislike}>
            <Image source={Dislike} />
          </Button>
          <Button mode={mode} onPress={handleLike}>
            <Image source={Like} />
          </Button>
        </Buttons>
      )}
      <Mode onPress={handleMode}>
        <Feather
          name={mode ? 'sun' : 'moon'}
          size={22}
          color={mode ? '#d7b335' : '#44475a'}
        />
      </Mode>
      {itsAMatch && (
        <Match>
          <ItsaMatch source={matchLogo} />
          <MatchAvatar
            source={{
              uri: itsAMatch.avatar,
            }}
          />
          <MatchName>{itsAMatch.name}</MatchName>
          <MatchBio>{itsAMatch.bio}</MatchBio>
          <TouchableOpacity onPress={() => setItsAMatch(null)}>
            <Close>Fechar</Close>
          </TouchableOpacity>
        </Match>
      )}
    </Container>
  );
};

export default Main;
