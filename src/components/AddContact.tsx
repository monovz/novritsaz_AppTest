import { Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useAddContactMutation } from '../services/api'
import globalVar from '../constants/variable'
import { Icon } from 'react-native-elements'
import InputData from './InputData'
import globalStyle from '../constants/style'

const AddContact = ({ dataDetail, onCancel, onSubmit }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState(null)

  const [addContact, { isLoading, error: errorAdd }] = useAddContactMutation()

  useEffect(() => { return () => { setAge(null); setFirstName(''); setLastName('')}}, [])

  const submitContact = async () => {
    try {
      await addContact({ firstName, lastName, age }).unwrap()
      ToastAndroid.show(
        'New contact created', 1000
      );
      onSubmit()
    } catch (err) {
      console.log(err)
    }
  }

  const isDisabled = useMemo(() => (!firstName || !lastName || !age) || isLoading, [firstName, lastName, age])
  return (
    <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: 1 }}>
        <View style={{ borderRadius: 50, backgroundColor: globalVar.color.primary, height: 75, width: 75, overflow: 'hidden', marginBottom: 8 }}>
          {dataDetail && dataDetail.data?.photo !== 'N/A' && <Image source={{ uri: dataDetail.data?.photo }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />}
        </View>
        <Text style={[globalStyle.boldFont, { fontSize: 20, color: globalVar.color.dark }]}>{firstName || lastName ? (firstName ?? '') + (lastName ? ' ' + lastName : '') : '-'}</Text>
        <View style={{ flexDirection: 'row', marginVertical: 15 }}>
          <TouchableOpacity onPress={() => onCancel()} style={{ padding: 10, borderRadius: 10, backgroundColor: globalVar.color.white, borderColor: globalVar.color.unsuccess, borderWidth: 1, marginRight: 10 }}>
            <Icon tvParallaxProperties={undefined} name='close' type='antdesign' color={globalVar.color.unsuccess} size={16} />
          </TouchableOpacity>
          <TouchableOpacity disabled={isDisabled} onPress={() => submitContact()} style={{ padding: 10, borderRadius: 10, backgroundColor: isDisabled ? globalVar.color.gray1 : globalVar.color.success }}>
            <Icon tvParallaxProperties={undefined} name='check' type='antdesign' color={globalVar.color.white} size={16} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <InputData label='FIRST NAME' value={firstName} onChangeText={setFirstName} />
        <InputData label='LAST NAME' value={lastName} onChangeText={setLastName} />
        <InputData label='AGE' value={age} onChangeText={(text) => setAge(text)} keyboardType='numeric' isAge />
      </View>
    </View>
  )
}

export default AddContact

const styles = StyleSheet.create({})