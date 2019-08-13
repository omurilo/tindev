import React from 'react';
import { Avatar, Bio, Card, Footer, Name } from '../../styles';

const CardAnimated = ({
  mode,
  dev,
  style,
  panResponder,
  likeMarkOpacity,
  dislikeMarkOpacity,
  children,
  ...rest
}) => (
  <Card {...rest} mode={mode} style={style} {...panResponder.panHandlers}>
    {children}
    <Avatar
      source={{
        uri: dev.avatar,
      }}
    />
    <Footer mode={mode}>
      <Name mode={mode}>{dev.name}</Name>
      <Bio mode={mode}>{dev.bio}</Bio>
    </Footer>
  </Card>
);

export default CardAnimated;
