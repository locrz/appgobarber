import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  width: 100%;
  height: 60px;

  background: #232129;
  margin-bottom: 8px;
  border-radius: 10px;

  padding: 0 16px;

  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  height: 54px;
  flex: 1;
  color: #fff;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
