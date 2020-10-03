import styled, {css} from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;

  background: #232129;
  margin-bottom: 8px;
  border-radius: 10px;
  border-width: 2px;
  border-color: #232129;

  padding: 0 16px;

  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #ff9900;
    `}
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
