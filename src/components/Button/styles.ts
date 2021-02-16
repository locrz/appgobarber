import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: auto;
  height: 60px;

  justify-content: center;
  align-items: center;

  background: #ff9000;
  border-radius: 10px;
  margin-top: 8px;

  padding: 0 32px;
`;
export const TextButton = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
`;
