
import { StatusBar }  from 'react-native';

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter';
import * as Notifications from 'expo-notifications';
import { Subscription } from 'expo-modules-core';

import { useRef } from 'react';
import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';

import { Background } from './src/components/Background';

import  './src/services/notificationsConfig';
import { getPushNotificationToken } from './src/services/getPushNToken';
import { useEffect } from 'react';




export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  
  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  })

  useEffect(() => {
    getNotificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    })

    return () => {

      if(getNotificationListener.current && responseNotificationListener.current){
        
      Notifications.removeNotificationSubscription(getNotificationListener.current);
      Notifications.removeNotificationSubscription(responseNotificationListener.current);

      }
    }
  }, [])
  return (
    <Background >
      <StatusBar
        barStyle="light-content"  ///status bar branca
        backgroundColor="transparent" // status bar branca 
        translucent //status bar ficar por cima da conteudo
      />
      {fontsLoaded ? <Routes /> : <Loading />} 

    </Background>
  );
}

