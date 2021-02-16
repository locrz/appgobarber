import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {format} from 'date-fns';

import {useAuth} from '../../hooks/auth';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  Content,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  DatePicker,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';
import api from '../../services/api';
import {Platform, Alert} from 'react-native';

interface RouteParams {
  providerId: string;
}

export interface Provider {
  name: string;
  avatar_url: string;
  id: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const {user} = useAuth();
  const {goBack, navigate} = useNavigation();
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const [show, setShow] = useState(false);
  const [dayAvaliability, setDayAvaliability] = useState<AvailabilityItem[]>(
    [],
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  );

  useEffect(() => {
    api.get('/providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        setDayAvaliability(response.data);
      });
  }, [selectedDate, selectedProvider]);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShow((prev) => !prev);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('appointments', {
        provider_id: selectedProvider,
        date,
      });

      navigate('AppointmentCreated', {date: date.getTime()});
    } catch (error) {
      Alert.alert(
        'Erro ao criar agendamento',
        'Ocorreu um erro ao criar o agendamento, tente novamente',
      );
    }
  }, [selectedDate, selectedHour, selectedProvider, navigate]);

  const handleDateChange = useCallback((event: any, date: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }

    if (date) {
      setSelectedDate(date);
    }
  }, []);

  const morningAvailability = useMemo(() => {
    return dayAvaliability
      .filter(({hour}) => hour < 12)
      .map(({hour, available}) => ({
        hour,
        available,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
      }));
  }, [dayAvaliability]);

  const afternoonAvailability = useMemo(() => {
    return dayAvaliability
      .filter(({hour}) => hour >= 12)
      .map(({hour, available}) => ({
        hour,
        available,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
      }));
  }, [dayAvaliability]);

  return (
    <Container>
      <Header>
        <BackButton onPress={goBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{uri: user.avatar_url}} />
      </Header>

      <Content>
        <ProvidersListContainer>
          <ProvidersList
            data={providers}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item: provider}) => (
              <ProviderContainer
                onPress={() => handleSelectProvider(provider.id)}
                selected={provider.id === selectedProvider}>
                <ProviderAvatar source={{uri: provider.avatar_url}} />
                <ProviderName selected={provider.id === selectedProvider}>
                  {provider.name}
                </ProviderName>
              </ProviderContainer>
            )}
          />
        </ProvidersListContainer>
        <Calendar>
          <Title>Escolha a data</Title>
          <OpenDatePickerButton onPress={handleToggleDatePicker}>
            <OpenDatePickerButtonText>
              Selecionar outra data
            </OpenDatePickerButtonText>
          </OpenDatePickerButton>
          {show && (
            <DatePicker
              value={selectedDate}
              display="spinner"
              onChange={handleDateChange}
              textColor="#f4ede8"
            />
          )}
        </Calendar>

        <Schedule>
          <Title>Escolha o horário</Title>
          <Section>
            <SectionTitle>Manhã</SectionTitle>
            <SectionContent>
              {morningAvailability.map(({hourFormatted, hour, available}) => (
                <Hour
                  enabled={available}
                  available={available}
                  selected={hour === selectedHour}
                  key={hourFormatted}
                  onPress={() => handleSelectHour(hour)}>
                  <HourText selected={hour === selectedHour}>
                    {hourFormatted}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>
            <SectionContent>
              {afternoonAvailability.map(({hourFormatted, hour, available}) => (
                <Hour
                  enabled={available}
                  available={available}
                  selected={hour === selectedHour}
                  key={hourFormatted}
                  onPress={() => handleSelectHour(hour)}>
                  <HourText selected={hour === selectedHour}>
                    {hourFormatted}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>
        </Schedule>

        <CreateAppointmentButton onPress={handleCreateAppointment}>
          <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
