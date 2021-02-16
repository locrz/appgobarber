import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import {TextInputProps} from 'react-native';
import {useField} from '@unform/core';

import {Container, TextInput, Icon} from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  containerStyle?: {};
}

interface InputReferenceProps {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input = React.forwardRef<InputRef, InputProps>(
  ({name, icon, containerStyle = {}, ...rest}, forwardedRef) => {
    const inputRef = useRef<any>(null);

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const {registerField, error, defaultValue, fieldName} = useField(name);
    const inputValueRef = useRef<InputReferenceProps>({value: defaultValue});

    const handleInputFocus = useCallback(() => {
      setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
      setIsFocused(false);
      setIsFilled(!!inputValueRef.current.value);
    }, []);

    useImperativeHandle(forwardedRef, () => ({
      focus() {
        inputRef.current.focus();
      },
    }));

    useEffect(() => {
      registerField<string>({
        name: fieldName,
        ref: inputValueRef.current,
        path: 'value',
        setValue(ref: any, value) {
          inputValueRef.current.value = value;
          inputRef.current.setNativeProps({text: value});
        },
        clearValue() {
          inputValueRef.current.value = '';
          inputRef.current.clear();
        },
      });
    }, [fieldName, registerField]);

    return (
      <Container
        style={containerStyle}
        isFocused={isFocused}
        isErrored={!!error}>
        <Icon
          name={icon}
          color={isFocused || isFilled ? '#ff9900' : '#666360'}
          size={20}
        />
        <TextInput
          ref={inputRef}
          defaultValue={defaultValue}
          placeholderTextColor="#666360"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={(value) => {
            inputValueRef.current.value = value;
          }}
          {...rest}
        />
      </Container>
    );
  },
);

export default Input;
