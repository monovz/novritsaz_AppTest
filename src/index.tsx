import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useGetAllContactQuery } from './services/api';

const Main = () => {
  const { data, isLoading, error } = useGetAllContactQuery()
  return (
    <SafeAreaProvider>
      <Text>Main</Text>
    </SafeAreaProvider>
  )
}

export default Main

const styles = StyleSheet.create({})