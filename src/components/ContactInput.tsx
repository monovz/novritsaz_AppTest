import React, { ReactNode, CSSProperties, InputHTMLAttributes, HTMLAttributes } from 'react'
import { StyleProp, StyleSheet, Text, TextInputProps, TextStyle, View, ViewStyle } from 'react-native'
import { Input } from 'react-native-elements'
import globalStyle from '../constants/style'
import globalVar from '../constants/variable'


interface ContactInputProps extends TextInputProps {
  label?: ReactNode,
  placeholder?: string,
  value?: any,
  onChangeText?: (val: any) => void,
  disabled?: boolean,
  leftIcon?: ReactNode,
  rightIcon?: ReactNode,
  inputTextStyle? : StyleProp<TextStyle>,
  inputContainerStyle?: StyleProp<ViewStyle>,
  containerStyle?: StyleProp<ViewStyle>,
  secureTextEntry?: boolean,
  multiline?: boolean,
  disabledInputStyle?: StyleProp<TextStyle>
}

const ContactInput = ({ onChangeText = (text) => {}, label, value, placeholder, disabled, leftIcon, rightIcon, inputContainerStyle, containerStyle, inputTextStyle, secureTextEntry = false, multiline=true, disabledInputStyle, ...rest }:ContactInputProps) => {
  return (
    <>
      <Input
        autoCompleteType={undefined}
        placeholderTextColor={globalVar.color.gray2}
        selectionColor={globalVar.color.secondary}
        secureTextEntry={secureTextEntry}
        leftIcon = {leftIcon ? <>{leftIcon}</> : <></>}
        rightIcon = {rightIcon ? <>{rightIcon}</> : <></>}
        onChangeText={onChangeText}
        disabled={disabled}
        containerStyle={[styles.container, containerStyle]}
        value={value}
        inputStyle={[globalStyle.mediumFont, { fontSize: value ? 16 : 12, color: globalVar.color.dark }, inputTextStyle]}
        inputContainerStyle={[styles.input, inputContainerStyle]}
        placeholder={placeholder}
        disabledInputStyle={[{
          color: globalVar.color.white,
          opacity: 1,
        }, disabledInputStyle]}
        multiline={multiline}
        {...rest}
        />
    </>
  )
}

export default ContactInput

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  input: {
    borderRadius: 6,
    paddingLeft: 30,
    paddingRight: 20,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderBottomWidth: 0,
  }
})
