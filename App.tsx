import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';

import store from './store/store';
import { Provider, useDispatch, useSelector } from 'react-redux';


import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { RootState } from './store';
import LoadingScreen from './screens/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loggedIn, setUserInfos, setUserLocalization } from './store/actions/user.action';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { HttpLink } from '@apollo/client';

import { useAsyncStorage } from '@react-native-async-storage/async-storage';





const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://10.0.2.2:4000/graphql'
  }),
  cache: new InMemoryCache()
});

const HandleScreens = () => {
  const dispatch = useDispatch();
  const isUserLogged = useSelector((state: RootState) => state.user.loggedIn);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const { getItem, setItem } = useAsyncStorage('@isLogged');
  const [test, setTest] = useState(false);


  const checkLog = async () => {

    const isLogged = await getItem();
    if (isLogged) {
      console.log(isLogged, 'islogged')
      dispatch(loggedIn(true));
    } else {
      dispatch(loggedIn(false));
    }
  }

  const getLog = async () => {
    try {
      return await AsyncStorage.getItem('@isLogged')
    } catch (e) {
      console.log(e, "error")
    }
  }

  useEffect(() => {
    console.log('reload app', isUserLogged)
    getLog().then((logged) => {
      console.log(logged, 'res');
      if(logged) {
        setTest(true);
      } else setTest(false);

    })
  })

  if (test) {
    return (

      <NativeBaseProvider>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </NativeBaseProvider>
    )
  }
  else {
    return (
      <LoadingScreen />
    )
  }
}


export default function App() {

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <HandleScreens />
      </Provider>
    </ApolloProvider>
  );
}

