import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;

  justify-content: center;
  align-items: center;

  background: #ff9900;
  border-radius: 10px;
  margin-top: 8px;
`;
export const TextButton = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
`;
