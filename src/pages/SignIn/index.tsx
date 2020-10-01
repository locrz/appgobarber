import React from 'react';
import {Image, Text} from 'react-native';

import logo from '../../assets/logo.png';

import {Container, Title} from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Image source={logo} />
    <Title>Faça seu logon</Title>
  </Container>
);

export default SignIn;
