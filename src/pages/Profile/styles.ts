import styled from 'styled-components/native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {Platform} from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 24px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
`;

export const UserAvatar = styled.Image`
  height: 186px;
  width: 186px;
  border-radius: 98px;
  align-self: center;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 32px;
`;
