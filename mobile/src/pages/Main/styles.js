import styled from 'styled-components/native';
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

export const Bio = styled.Text.attrs({
  numberOfLines: 3,
})`
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

export const Button = styled.TouchableOpacity({
  elevation: 1,
  width: 50,
  height: 50,
  borderRadius: 25,
  margin: '0 20px',
  alignItems: 'center',
  backgroundColor: props => (props.mode ? '#44475a' : '#FFF'),
  justifyContent: 'center',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowRadius: 2,
  shadowOpacity: 0.8,
  shadowColor: '#000',
});

export const Mode = styled.TouchableOpacity`
  position: absolute;
  top: 2px;
  right: 5px;
`;

export const Match = styled(Animated.View)({
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
});

export const ItsaMatch = styled(Animated.Image)({
  height: 60,
  resizeMode: 'contain',
});

export const MatchAvatar = styled(Animated.Image)`
  height: 160px;
  width: 160px;
  border-width: 3px;
  /* border-radius: 80px; */
  border-color: #fff;
  margin: 30px 0;
`;

export const MatchName = styled(Animated.Text)`
  color: #fff;
  font-size: 26px;
  font-weight: bold;
`;

export const MatchBio = styled(Animated.Text)`
  font-size: 14px;
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 24px;
  text-align: center;
  padding: 0 30px;
`;

export const Close = styled(Animated.Text)`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-top: 30px;
  font-weight: bold;
`;

export const Tag = styled(Animated.View)`
  top: 45;
  z-index: 1;
  border-radius: 4;
  border-width: 2;
  transform: ${props =>
    props.type === 'like' ? 'rotate(-35deg)' : 'rotate(35deg)'};
  position: absolute;
  border-color: ${props => (props.type === 'dislike' ? '#DF4723' : '#00C97A')};
  right: ${props => (props.type === 'dislike' ? '35px' : 'auto')};
  left: ${props => (props.type === 'like' ? '35px' : 'auto')};
`;

export const TagText = styled.Text`
  color: ${props => (props.type === 'dislike' ? '#DF4723' : '#00C97A')};
  font-size: 30;
  font-weight: bold;
  padding: 0 15px;
`;
