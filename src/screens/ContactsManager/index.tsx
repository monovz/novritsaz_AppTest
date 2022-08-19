import { Image, ListRenderItem, Pressable, RefreshControl, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Contact, useGetAllContactQuery } from '../../services/api'
import globalStyle from '../../constants/style'
import globalVar from '../../constants/variable'
import ContactInput from '../../components/ContactInput'
import { FlatList } from 'react-native-gesture-handler'
import { ModalContext } from '../../contexts/ModalContext'
import { Icon } from 'react-native-elements'

const ContactsManager = () => {
  const [refreshing, setRefreshing] = useState(false)
  const { data, isLoading, error, isFetching, refetch } = useGetAllContactQuery(null)
  const [search, setSearch] = useState<string>('')
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    if (data?.data) {
      setContacts(data.data)
    }
    return () => {}
  }, [data?.data])

  const { setShowModal, setIdDetail, showModal } = useContext(ModalContext)

  useEffect(() => {
    if (!showModal) refetch()
    return () => {}
  }, [showModal])
  
  const onPressContact = (id: string) => {
    setShowModal('detail')
    setIdDetail(id)
  }

  const _renderItem = ({ item, index }) => {
    return (
      <Pressable onPress={() => onPressContact(item.id)} style={{ minHeight: 52, flexDirection: 'row', alignItems: 'center', paddingBottom: 15 }}>
        <View style={{ borderRadius: 50, backgroundColor: globalVar.color.primary, height: 50, width: 50, overflow: 'hidden' }}>
          {item.photo && item.photo !== 'N/A' && <Image source={{ uri: item.photo }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />}
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={[globalStyle.mediumFont, { fontSize: 14, color: globalVar.color.dark }]}>{item.firstName + (item.lastName ? ' ' + item.lastName : '')}</Text>
          <Text style={[globalStyle.mediumFont, { fontSize: 12, color: globalVar.color.gray1 }]}>{item.age} years old</Text>
        </View>
      </Pressable>
    )    
  }

  const pressAdd = () => {
    setShowModal('add')
  }

  useEffect(() => {
    if (search) setContacts((data?.data || []).filter(contact => contact.firstName.includes(search) || contact.lastName.includes(search)))
    else setContacts(data?.data || [])

    return () => {}
  }, [search])
  return (
      <FlatList
        style={{ paddingHorizontal: 20, paddingVertical: 10 }}
        initialNumToRender={5}
        onEndReachedThreshold={0.9}
        nestedScrollEnabled
        contentContainerStyle={{ flexGrow: 1, paddingVertical: 15 }} showsVerticalScrollIndicator={false}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refetch}
          ></RefreshControl>
        )}
        ListHeaderComponent={(
          <>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={[globalStyle.boldFont, { fontSize: 28 }]}>Contacts</Text>
              <Pressable onPress={pressAdd} style={{ backgroundColor: globalVar.color.primary, width: 40, height: 40, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[globalStyle.mediumFont, { color: globalVar.color.white, fontSize: 32, flex: 1, marginTop: -2 }]}>+</Text>
              </Pressable>
            </View>
            <ContactInput leftIcon={(<Icon tvParallaxProperties={undefined} name='search1' type='antdesign' size={14} color={globalVar.color.gray1} />)} placeholder={'Search name...'} placeholderTextColor={globalVar.color.gray1} inputContainerStyle={{ backgroundColor: globalVar.color.gray3, paddingLeft: 20, paddingRight: 20, paddingVertical: 0, marginVertical: 20, marginBottom: 0 }} onChangeText={(text) => setSearch(text)} value={search} />
          </>
        )}
        data={contacts}
        renderItem={_renderItem}
      />
  )
}

export default ContactsManager

const styles = StyleSheet.create({})