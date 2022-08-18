import * as React from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Main from './src';
import { Provider } from 'react-redux';
import stores from './src/stores';
import { useFonts } from 'expo-font';
import globalVar from './src/constants/variable';
import { ModalProvider } from './src/contexts/ModalContext';


export default function App() {

  const [loaded] = useFonts({
    'Montserrat_900': require('./assets/fonts/Montserrat-Black.ttf'),
    'Montserrat_700': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat_500': require('./assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat_400': require('./assets/fonts/Montserrat-Regular.ttf'),
  })

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Provider store={stores}>
          <ModalProvider>
            <StatusBar backgroundColor={globalVar.color.white} barStyle='dark-content' />
            <Main />
          </ModalProvider>
        </Provider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
