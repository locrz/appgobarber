import React, {useEffect, useRef, useImperativeHandle} from 'react';
import {TextInputProps} from 'react-native';
import {useField} from '@unform/core';

import {Container, TextInput, Icon} from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputReferenceProps {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input = React.forwardRef<InputRef, InputProps>(
  ({name, icon, ...rest}, forwardedRef) => {
    const inputRef = useRef<any>(null);

    const {registerField, error, defaultValue, fieldName} = useField(name);
    const inputValueRef = useRef<InputReferenceProps>({value: defaultValue});

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
      <Container>
        <Icon name={icon} color="#666360" size={20} />
        <TextInput
          ref={inputRef}
          defaultValue={defaultValue}
          placeholderTextColor="#666360"
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
