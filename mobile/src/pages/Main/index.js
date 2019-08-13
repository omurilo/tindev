/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, Fragment } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import io from 'socket.io-client';
import Feather from 'react-native-vector-icons/Feather';
import {
  Cards,
  Container,
  Empty,
  Logo,
  Buttons,
  Button,
  Mode,
  Match,
  ItsaMatch,
  MatchAvatar,
  MatchName,
  MatchBio,
  Close,
  Tag,
  TagText,
} from './styles';
import CardAnimated from './components/Card';
import api from '../../services/api';
import logo from '../../assets/logo.png';
import Like from '../../assets/like.png';
import Dislike from '../../assets/dislike.png';
import matchLogo from '../../assets/itsamatch.png';

const { width } = Dimensions.get('window');

const Main = ({ navigation }) => {
  const id = navigation.getParam('id');
  const sliderPosition = new Animated.Value(0);
  const itsAMatchBg = new Animated.Value(0);
  const itsAMatchValue = new Animated.Value(0);
  const itsAMatchAngle = new Animated.Value(0);

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
    navigation.navigate('Login');
  }

  async function handleMode() {
    await AsyncStorage.setItem('mode', JSON.stringify(!mode));
    setMode(!mode);
  }

  async function handleLike() {
    const [user, ...rest] = listDevs;

    Animated.spring(sliderPosition, {
      toValue: width + 35,
      useNativeDriver: true,
    }).start();

    await api.post(`/dev/${user._id}/like`, null, {
      headers: {
        user: id,
      },
    });

    setListDevs(rest);

    sliderPosition.setValue(0);
  }

  async function handleDislike() {
    const [user, ...rest] = listDevs;

    Animated.spring(sliderPosition, {
      toValue: -width - 35,
      useNativeDriver: true,
    }).start();

    await api.post(`/dev/${user._id}/dislike`, null, {
      headers: {
        user: id,
      },
    });

    sliderPosition.setValue(0);

    setListDevs(rest);
  }

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderTerminationRequest: () => true,
    onPanResponderMove: (_, gestureState) => {
      sliderPosition.setValue(gestureState.dx);
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 170) {
        handleLike();
      } else if (gestureState.dx < -170) {
        handleDislike();
      } else {
        Animated.spring(sliderPosition, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const animateMatch = () => {
    if (itsAMatch) {
      Animated.parallel([
        Animated.timing(itsAMatchBg, {
          toValue: 100,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(itsAMatchValue, {
            toValue: 100,
            duration: 1100,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.spring(itsAMatchValue, {
            toValue: 200,
            bounciness: 15,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(itsAMatchAngle, {
          toValue: 100,
          duration: 1300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const firstCardTransform = [
    {
      translateX: sliderPosition,
    },
    {
      rotate: sliderPosition.interpolate({
        inputRange: [-width, width],
        outputRange: ['-20deg', '20deg'],
        extrapolate: 'clamp',
      }),
    },
  ];

  const othersCardTransform = [
    {
      scale: sliderPosition.interpolate({
        inputRange: [-width, 0, width],
        outputRange: [1, 0.8, 1],
        extrapolate: 'clamp',
      }),
    },
  ];

  const nextCardOpacity = sliderPosition.interpolate({
    inputRange: [-width, 0, width],
    outputRange: [1, 0, 1],
    extrapolate: 'clamp',
  });

  const likeMarkOpacity = sliderPosition.interpolate({
    inputRange: [0, 60],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const dislikeMarkOpacity = sliderPosition.interpolate({
    inputRange: [-60, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const itsAMatchScaleIn = itsAMatchValue.interpolate({
    inputRange: [0, 75, 150],
    outputRange: [1, 2, 1],
    extrapolate: 'clamp',
  });

  const itsAMatchScaleBg = itsAMatchBg.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const itsAMatchRotate = itsAMatchAngle.interpolate({
    inputRange: [0, 50, 100],
    outputRange: ['0deg', '-45deg', '0deg'],
    extrapolate: 'clamp',
  });

  const itsAMatchScaleOpacity = itsAMatchValue.interpolate({
    inputRange: [0, 20, 100],
    outputRange: [0, 0.8, 1],
    extrapolate: 'clamp',
  });

  const itsAMatchRadius = itsAMatchValue.interpolate({
    inputRange: [0, 80],
    outputRange: [8, 80],
    extrapolate: 'clamp',
  });

  const itsAMatchTextsOpacity = itsAMatchValue.interpolate({
    inputRange: [180, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const itsAMatchTextsShake = itsAMatchValue.interpolate({
    inputRange: [150, 180, 200],
    outputRange: [1, 1.7, 1],
    extrapolate: 'clamp',
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
              key={dev._id}
              mode={mode}
              dev={dev}
              style={[
                { zIndex: listDevs.length - idx },
                {
                  opacity: idx > 0 ? (idx === 1 ? nextCardOpacity : 0) : 1,
                },
                {
                  transform: idx > 0 ? othersCardTransform : firstCardTransform,
                },
              ]}
              panResponder={panResponder}
            >
              {idx === 0 && (
                <Tag type="like" style={{ opacity: likeMarkOpacity }}>
                  <TagText type="like">LIKE</TagText>
                </Tag>
              )}
              {idx === 0 && (
                <Tag type="dislike" style={{ opacity: dislikeMarkOpacity }}>
                  <TagText type="dislike">NOPE</TagText>
                </Tag>
              )}
            </CardAnimated>
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
        <Fragment>
          {animateMatch()}
          <Animated.View
            style={[
              {
                width: 30,
                height: 30,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                borderRadius: 15,
                position: 'absolute',
                left: 'auto',
                right: 'auto',
                top: '50%',
                zIndex: 998,
              },
              { transform: [{ scale: itsAMatchScaleBg }] },
            ]}
          />
          <Match style={[{ backgroundColor: 'rgba(0, 0, 0, 0)' }]}>
            <ItsaMatch
              source={matchLogo}
              style={[
                { opacity: itsAMatchTextsOpacity },
                { transform: [{ scale: itsAMatchTextsShake }] },
              ]}
            />
            <MatchAvatar
              source={{
                uri: itsAMatch.avatar,
              }}
              style={[
                { borderRadius: itsAMatchRadius },
                {
                  transform: [
                    {
                      scale: itsAMatchScaleIn,
                    },
                    {
                      rotate: itsAMatchRotate,
                    },
                  ],
                },
                { opacity: itsAMatchScaleOpacity },
              ]}
            />
            <MatchName
              style={[
                { opacity: itsAMatchTextsOpacity },
                { transform: [{ scale: itsAMatchTextsShake }] },
              ]}
            >
              {itsAMatch.name}
            </MatchName>
            <MatchBio
              style={[
                { opacity: itsAMatchTextsOpacity },
                { transform: [{ scale: itsAMatchTextsShake }] },
              ]}
            >
              {itsAMatch.bio}
            </MatchBio>
            <TouchableOpacity onPress={() => setItsAMatch(null)}>
              <Close style={[{ opacity: itsAMatchTextsOpacity }]}>Fechar</Close>
            </TouchableOpacity>
          </Match>
        </Fragment>
      )}
    </Container>
  );
};

export default Main;
