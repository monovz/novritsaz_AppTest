import { StyleSheet, Text, TextInputProps, View } from 'react-native'
import React from 'react'
import ContactInput from './ContactInput'
import globalVar from '../constants/variable'
import globalStyle from '../constants/style'

const InputData = ({ label, isAge, ...rest }: TextInputProps & { label: string, isAge?: boolean }) => {
  return <View style={{ marginBottom: 15 }}>
    <Text style={[globalStyle.mediumFont, { fontSize: 12, color: globalVar.color.gray1, textAlign: 'right', marginBottom: 5 }]}>{label}</Text>
    <ContactInput multiline={false} placeholderTextColor={globalVar.color.gray1} containerStyle={isAge ? { width: 80, alignSelf: 'flex-end' } : {}} inputContainerStyle={{ backgroundColor: globalVar.color.gray3, paddingLeft: 5, paddingRight: 5, paddingVertical: 0, marginVertical: 0, marginBottom: -20 }} {...rest} />
  </View>
}

export default InputData

const styles = StyleSheet.create({})