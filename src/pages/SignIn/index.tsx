import React, {useCallback, useRef} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FormHandles} from '@unform/core';
import {Form} from '@unform/mobile';
import * as Yup from 'yup';

import {useAuth} from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErros';

import Icon from 'react-native-vector-icons/Feather';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logo from '../../assets/logo.png';

import {
  Container,
  Title,
  ForgotPasswordButton,
  ForgotPasswordButtonText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const {signIn, user} = useAuth();

  const handleFormSubmit = useCallback(async (data: SignInFormData) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {abortEarly: false});

      await signIn(data);
    } catch (e) {
      console.log(e);
      const isValidationError = e instanceof Yup.ValidationError;

      if (isValidationError) {
        const validationErrors = getValidationErrors(e);
        formRef.current?.setErrors(validationErrors);
        return;
      }

      Alert.alert('Aconteceu um erro', 'Não foi possível autenticar');
    }
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={{flex: 1}}
          keyboardShouldPersistTaps="handled">
          <Container>
            <Image source={logo} />
            <View>
              <Title>Faça seu logon</Title>
            </View>

            <Form ref={formRef} onSubmit={handleFormSubmit}>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                returnKeyType="send"
                name="password"
                icon="lock"
                placeholder="Senha"
                textContentType="password"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>

            <ForgotPasswordButton onPress={() => {}}>
              <ForgotPasswordButtonText>
                Esqueci minha senha
              </ForgotPasswordButtonText>
            </ForgotPasswordButton>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#FF9000" />
        <CreateAccountButtonText>Criar conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};
export default SignIn;
