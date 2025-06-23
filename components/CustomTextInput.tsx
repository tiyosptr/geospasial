import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  //   placeholder: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ placeholder, style, ...rest }) => {
  return <TextInput placeholder={placeholder} style={[styles.input, style]} {...rest} />;
};

const styles = StyleSheet.create({
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    width: '90%',
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default CustomTextInput;
