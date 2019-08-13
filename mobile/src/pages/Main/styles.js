import styled, { css } from 'styled-components/native';
import { StyleSheet, Animated } from 'react-native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => (props.mode ? '#282a36' : '#F5F5F5')};
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.Image`
  margin-top: 30px;
`;

export const Empty = styled.Text`
  font-size: 24px;
  color: ${props => (props.mode ? '#F5F5F5' : '#999')};
  font-weight: bold;
  align-self: center;
`;

export const Cards = styled.View`
  flex: 1;
  align-self: stretch;
  justify-content: center;
  max-height: 500px;
`;

export const Card = styled(Animated.View)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 30px;
  border-width: 1px;
  border-radius: 8px;
  overflow: hidden;
  position: absolute;
  border-color: ${props => (props.mode ? '#44475a' : '#ddd')};
`;

export const Avatar = styled.Image`
  flex: 1;
  height: 300px;
`;

export const Footer = styled.View`
  background-color: ${props => (props.mode ? '#44475a' : '#FFF')};
  padding: 15px 20px;
`;

export const Name = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${props => (props.mode ? '#bd93f9' : '#333')};
`;

export const Bio = styled.Text`
  font-size: 14px;
  color: ${props => (props.mode ? '#6272a4' : '#999')};
  margin-top: 5px;
  line-height: 18px;
`;

export const Buttons = styled.View`
  flex-direction: row;
  margin-bottom: 30px;
  z-index: 1;
`;

export const Button = styled.TouchableOpacity`
  elevation: 1;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin: 0 20px;
  align-items: center;
  background-color: ${props => (props.mode ? '#44475a' : '#FFF')};
  justify-content: center;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.8);
`;

export const Mode = styled.TouchableOpacity`
  position: absolute;
  top: 2px;
  right: 5px;
`;

export const Match = styled.View({
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
});

export const ItsaMatch = styled.Image`
  height: 60px;
  resize-mode: contain;
`;

export const MatchAvatar = styled.Image`
  height: 160px;
  width: 160px;
  border-width: 3px;
  border-radius: 80px;
  border-color: #fff;
  margin: 30px 0;
`;

export const MatchName = styled.Text`
  color: #fff;
  font-size: 26px;
  font-weight: bold;
`;

export const MatchBio = styled.Text`
  font-size: 14px;
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 24px;
  text-align: center;
  padding: 0 30px;
`;

export const Close = styled.Text`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-top: 30px;
  font-weight: bold;
`;
