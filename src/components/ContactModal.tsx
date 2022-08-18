import { Image, TouchableOpacity, StyleSheet, Text, TextInputProps, View, ToastAndroid } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import BottomSheet, { BottomSheetBackdrop, BottomSheetView, useBottomSheetDynamicSnapPoints } from '@gorhom/bottom-sheet';
import globalVar from '../constants/variable';
import globalStyle from '../constants/style';
import { Contact, Response, useAddContactMutation, useDeleteContactMutation, useGetContactQuery, useLazyGetContactQuery, useUpdateContactMutation } from '../services/api';
import { Icon } from 'react-native-elements';
import ContactInput from './ContactInput';
import AddContact from './AddContact';
import InputData from './InputData';

const DetailContact = ({ dataDetail, onDelete, onEdit }: { dataDetail: Response<Contact>, onDelete: () => void, onEdit?: () => void  }) => {
  const [deleteContact, { isLoading, error }] = useDeleteContactMutation()
  const onDeleteContact = async () => {
    try {
      if (dataDetail?.data?.id) await deleteContact(dataDetail?.data?.id).unwrap()
      ToastAndroid.show(
        'Contact deleted', 1000
      );
      onDelete()
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: 1 }}>
        <View style={{ borderRadius: 50, backgroundColor: globalVar.color.primary, height: 75, width: 75, overflow: 'hidden', marginBottom: 8 }}>
          {dataDetail && dataDetail.data?.photo !== 'N/A' && <Image source={{ uri: dataDetail.data?.photo }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />}
        </View>
        <Text style={[globalStyle.boldFont, { fontSize: 20, color: globalVar.color.dark }]}>{dataDetail ? dataDetail.data?.firstName + (dataDetail.data?.lastName ? ' ' + dataDetail.data?.lastName : '') : '-'}</Text>
        <View style={{ flexDirection: 'row', marginVertical: 15 }}>
          <TouchableOpacity onPress={onEdit} style={{ padding: 10, borderRadius: 10, backgroundColor: globalVar.color.gray2, marginRight: 10 }}>
            <Icon tvParallaxProperties={undefined} name='edit' type='antdesign' color={globalVar.color.dark} size={16} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDeleteContact()} style={{ padding: 10, borderRadius: 10, backgroundColor: globalVar.color.white, borderColor: globalVar.color.unsuccess, borderWidth: 1 }}>
            <Icon tvParallaxProperties={undefined} name='delete' type='antdesign' color={globalVar.color.unsuccess} size={16} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <TextLabel text={dataDetail?.data?.firstName ?? '-'} label='FIRST NAME' />
        <TextLabel text={dataDetail?.data?.lastName ?? '-'} label='LAST NAME' />
        <TextLabel text={dataDetail?.data.age >= 0 ? `${dataDetail.data.age} years old` : '-'} label='AGE' />
      </View>
    </View>
  )
}

const TextLabel = ({ text, label }) => {
  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={[globalStyle.mediumFont, { fontSize: 12, color: globalVar.color.gray1, textAlign: 'right', marginBottom: 5 }]}>{label}</Text>
      <Text style={[globalStyle.mediumFont, { fontSize: 15, color: globalVar.color.dark, textAlign: 'right' }]}>{text}</Text>
    </View>
  )
}

const EditContact = ({ dataDetail, onCancel, onSubmit }: { dataDetail: Response<Contact>, onCancel: () => void, onSubmit: () => void }) => {
  const [firstName, setFirstName] = useState(dataDetail?.data.firstName || '')
  const [lastName, setLastName] = useState(dataDetail?.data.lastName || '')
  const [age, setAge] = useState(String(dataDetail?.data.age))

  const [updateContact, { isLoading, error }] = useUpdateContactMutation()

  useEffect(() => { return () => { setAge(null); setFirstName(''); setLastName('')}}, [])

  const submitContact = async () => {
    try {
      await updateContact({ firstName, lastName, age: Number(age), id: dataDetail?.data.id }).unwrap()
      ToastAndroid.show(
        'Contact edited', 1000
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

const ContactModal = ({ type = 'detail', onClose = () => {}, idDetail }) => {
  const bottomSheetRef = useRef<BottomSheet>(null)

  const { data: dataDetail, error } = useGetContactQuery(idDetail, { skip: !Boolean(idDetail) })

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        style={{ backgroundColor: globalVar.color.dark }}
        opacity={0.1}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
      />
    ),
    []
  );

  const snapPoints = useMemo(() => ['CONTENT_HEIGHT', 'CONTENT_HEIGHT'], []);

  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(snapPoints)

  const closeModal = () => {
    bottomSheetRef?.current?.close()
    onClose()
  }

  const submitContact = async () => {
    try {
      closeModal()
    } catch (err) {
      console.log(err)
    }
  }

  const [isEdit, setIsEdit] = useState(false)


  return (
    <View style={[StyleSheet.absoluteFillObject]}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        enablePanDownToClose
        onClose={closeModal}
        handleIndicatorStyle={styles.indicatorModal}
      >
        <BottomSheetView onLayout={handleContentLayout} style={{ flex: 1, paddingBottom: 10, paddingHorizontal: 30 }}>
          {type === 'add' && <AddContact onSubmit={submitContact} onCancel={closeModal} dataDetail={dataDetail} />}
          {type === 'detail' && (
            <>
              {isEdit ? <EditContact onSubmit={submitContact} onCancel={() => { setIsEdit(false) }} dataDetail={dataDetail} /> : <DetailContact dataDetail={dataDetail} onDelete={closeModal} onEdit={() => { setIsEdit(true) }} />}
            </>
          )}
        </BottomSheetView>
      </BottomSheet>
    </View>
  )
}

export default ContactModal

const styles = StyleSheet.create({
  indicatorModal: { width: '30%', backgroundColor: globalVar.color.gray1, height: 3 },
})