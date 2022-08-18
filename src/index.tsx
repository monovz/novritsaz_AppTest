import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import ContactsManager from './screens/ContactsManager';

const Main = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ContactsManager />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Main

const styles = StyleSheet.create({})