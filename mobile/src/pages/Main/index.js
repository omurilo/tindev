import React from 'react';

import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Logo from '../../assets/logo.png';

const Main = props => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
        <Image source={Logo} />
      </TouchableOpacity>
      <View styles={styles.cardsContainer}>
        <View style={styles.card}>
          <Image
            source={{
              uri: 'https://avatars0.githubusercontent.com/u/4248081?v=4',
            }}
            style={styles.avatar}
          />
          <View style={styles.footer}>
            <Text style={styles.name}>Filipe Deschamps</Text>
            <Text style={styles.bio}>A nice guy</Text>
          </View>
        </View>
      </View>
      <View />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
  },
  cardsContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    maxHeight: 500,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    margin: 30,
    overflow: 'hidden',
  },
  avatar: {
    height: 250,
    width: 250,
  },
  footer: {
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#585858',
  },
  bio: {
    color: 'rgba(0, 0, 0, 0.25)',
    fontSize: 14,
  },
});

export default Main;
