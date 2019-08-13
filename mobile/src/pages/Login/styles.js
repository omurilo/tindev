import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView({
  flex: 1,
  padding: 30,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: props => (props.mode ? '#282a36' : '#F5F5F5'),
});

export const Input = styled.TextInput({
  height: 46,
  fontSize: 14,
  marginTop: 20,
  color: props => (props.mode ? '#6272a4' : '#666'),
  borderWidth: 1,
  borderRadius: 4,
  borderColor: props => (props.mode ? '#6272a4' : '#DDD'),
  alignSelf: 'stretch',
  paddingHorizontal: 15,
  backgroundColor: props => (props.mode ? '#44475a' : '#F2F2F2'),
});

export const Button = styled.TouchableOpacity({
  height: 46,
  marginTop: 10,
  borderRadius: 4,
  alignSelf: 'stretch',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: props => (props.mode ? '#44475a' : '#DF4723'),
});

export const Label = styled.Text({
  fontSize: 16,
  color: props => (props.mode ? '#6272a4' : '#FFF'),
  fontWeight: 'bold',
});

export const Mode = styled.TouchableOpacity({
  top: 2,
  right: 5,
  position: 'absolute',
});
