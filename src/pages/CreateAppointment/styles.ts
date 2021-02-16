import {FlatList} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {Provider} from './index';

interface StyleProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.ScrollView``;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';

  margin-left: 24px;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;

  margin-left: auto;
`;

export const ProvidersListContainer = styled.View`
  height: 112px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px;
`;

export const ProviderContainer = styled(RectButton)<StyleProps>`
  background: ${({selected}) => (selected ? '#ff9000' : '#3e3b47')};
  flex-direction: row;
  align-items: center;

  padding: 8px 12px;
  margin-right: 16px;
  border-radius: 10px;
`;

export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border-width: 1px;
  border-color: #f4ede8;
`;

export const ProviderName = styled.Text<StyleProps>`
  font-size: 16px;
  color: ${({selected}) => (selected ? '#232129' : '#f4ede8')};
  font-family: 'RobotoSlab-Medium';
  margin-left: 8px;
`;

export const Calendar = styled.View``;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
  margin: 0 24px 24px;
  color: #f4ede8;
`;

export const OpenDatePickerButton = styled(RectButton)`
  height: 46px;
  background: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
`;

export const OpenDatePickerButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #232129;
`;

export const DatePicker = styled(DateTimePicker)``;

export const Schedule = styled.View`
  padding: 24px 0 16px;
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  margin: 0 24px 12px;
  color: #999591;
`;

export const SectionContent = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {paddingHorizontal: 24},
})`
  flex-direction: row;
`;

export const Hour = styled(RectButton)<HourProps>`
  border-radius: 10px;
  margin-right: 8px;
  padding: 12px;

  opacity: ${({available}) => (available ? 1 : 0.3)};
  background: ${({selected}) => (selected ? '#ff9000' : '#3e3b47')};
`;

export const HourText = styled.Text<HourTextProps>`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;

  color: ${({selected}) => (selected ? '#232129' : '#f4ede8')};
`;

export const CreateAppointmentButton = styled(RectButton)`
  height: 52px;
  background: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px 24px;
`;

export const CreateAppointmentButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #232129;
`;
