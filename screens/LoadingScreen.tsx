import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LogoWhite from '../components/LogoWhite';
import { Spinner } from 'native-base';
import { NativeBaseProvider, Button } from 'native-base';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { gql, useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons'; 




import * as Google from 'expo-auth-session/providers/google';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loggedIn, loggedInWithGoogle, setUserId, setUserInfos, setUserLocalization } from '../store/actions/user.action';
import * as Location from 'expo-location';
import { RootState } from '../store';
import { isTSIndexSignature } from '@babel/types';
import { CREATE_USER } from '../utils/mutation';
import { storeLogin, storeUser, storeUserLocation } from '../utils/asyncStorage';
import { useFocusEffect } from '@react-navigation/core';

const GET_USER = gql`
query User($googleId: String!) {
  user(google_id: $googleId) {
    id
    google_id
    first_name
    last_name
    email
    city
    age
    gender
    phone
  }
}
`;


export default function LoadingScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const [isMounted, setIsMounted] = useState(true);
  const googleLogged = useSelector((state: RootState) => state.user.loggedInWithGoogle);
  const id = useSelector((state: RootState) => state.user.user_id);
  const user = useSelector((state: RootState) => state.user.user);


  const { loading, error, data, refetch }: any = useQuery(GET_USER, {
    variables: { googleId: user.google_id },
    skip: !googleLogged,
    pollInterval: 50,
    onError: () => console.log(error, 'error'),
    onCompleted: () => {
      console.log('request completed', user.google_id)
      handleData(data);

    }
  });


  const [createUser, res] = useMutation(CREATE_USER, {
    onCompleted: () => handleLogin(),
    onError: (error) => console.log(error, 'error during create user mutation')
  });

  const handleData = (data: any) => {
    console.log('handle data',data)
    if (data.user === null) {
      console.log('creating user')
      createUser({
        variables: {
          google_id: user.google_id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          age: 27,
          gender: user.gender,
          city: user.city,
          latitude: user.latitude,
          longitude: user.longitude,
          phone: "null",
          nbrFriend: 0
        }
      });
    } else {
      console.log('user already exists')
      dispatch(setUserId(data.user.id));
      handleLogin()
    }
  }

  const handleLogin = () => {
    dispatch(loggedIn(true));
    storeLogin(true);
  }



  // Request to fetch user access Token in google API
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '517806828967-rs0cvng7g3g69tggtmfv6ck9klnk9g6c.apps.googleusercontent.com',
    iosClientId: '517806828967-jeclvj9rog9jrh8v7pb53no4os329t47.apps.googleusercontent.com',
    androidClientId: '517806828967-b0lkqiek2iuvhncm1u4lrseji19fri8p.apps.googleusercontent.com',
    scopes: ['https://www.googleapis.com/auth/user.gender.read', 'https://www.googleapis.com/auth/user.birthday.read', 'https://www.googleapis.com/auth/user.phonenumbers.read']
  });

  useEffect(() => {
    if(user.google_id !== ""){
      console.log('user google id change ', user.google_id);
      dispatch(loggedInWithGoogle(true))
    }
  }, [user.google_id])





  // When response from the Google API, use accessToken to get user infos from Google People API
  useEffect(() => {
    if (response?.type === 'success') {
      WebBrowser.maybeCompleteAuthSession();
      const { authentication } = response;
      let accessToken: string | undefined = authentication?.accessToken;
      getUserInfos(accessToken).then(() => {
        console.log('after getuserinfos ', user.google_id)
      });
    }

    return function cleanup() {
      setIsMounted(false);
    }
  }, [response]);

  async function getUserInfos(accessToken: string | undefined) {
    axios.get('https://people.googleapis.com/v1/people/me?personFields=names,birthdays,emailAddresses,genders,coverPhotos,locations,locales,phoneNumbers', { headers: { "Authorization": `Bearer ${accessToken}` } })
      .then(function (res) {
        if (isMounted) {
          getUserGeoLocalization().then((userLocation) => {
            console.log(userLocation, 'userlocation')
            dispatch(setUserInfos({
              google_id: res.data.emailAddresses[0].metadata.source.id,
              email: res.data.emailAddresses[0].value,
              first_name: res.data.names[0].givenName,
              last_name: res.data.names[0].familyName,
              picture: res.data.coverPhotos[0].url,
              locale: res.data.locales[0].value,
              age: '20',
              gender: res.data.genders[0].value,
              city: userLocation?.city,
              longitude: userLocation?.longitude,
              latitude: userLocation?.latitude
            }));
            console.log(user,'user ')
            
          })
        }
      }).catch(err => console.log(err, 'error'));
  }


  async function getUserData(accessToken: string | undefined) {
    console.log('getuserdata')
    axios.get('https://people.googleapis.com/v1/people/me?personFields=names,birthdays,emailAddresses,genders,coverPhotos,locations,locales,phoneNumbers', { headers: { "Authorization": `Bearer ${accessToken}` } })
      .then(function (res) {
        if (isMounted) {
          getUserGeoLocalization().then((userLocation) => {
            const userDetails = res.data;
            console.log(userDetails.emailAddresses[0].metadata.source.id, 'userdetail')
            const user = {
              google_id: userDetails.emailAddresses[0].metadata.source.id,
              email: userDetails.emailAddresses[0].value,
              first_name: userDetails.names[0].givenName,
              last_name: userDetails.names[0].familyName,
              picture: userDetails.coverPhotos[0].url,
              locale: userDetails.locales[0].value,
              age: '20',
              gender: userDetails.genders[0].value,
              city:userLocation?.city,
              latitude:userLocation?.latitude,
              longitude:userLocation?.longitude
            }
            dispatch(setUserInfos(user));
            storeUser(user);
          }).catch((error) => console.log(error))
        }
      }).catch((error) => console.log(error))
  }




  async function getUserGeoLocalization() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const address = await Location.reverseGeocodeAsync(location.coords);
    return {
      city: address[0].city,
      country: address[0].country,
      address: `${address[0].name} ${address[0].street}`,
      region: address[0].region,
      subRegion: address[0].subregion,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }
    /*  dispatch(setUserLocalization(userLocationData));
     storeUserLocation(userLocationData); */
  }







  const [showSpinner, setShowSpinner] = useState(true);
  setTimeout(() => {
    setShowSpinner(false);
  }, 3000);



  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <LinearGradient
          // Button Linear Gradient
          colors={['rgba(237,125,58,1)', 'rgba(239,45,86, 1)']}
          style={styles.gradient}>
          <LogoWhite />
          {showSpinner && (
            <Spinner style={styles.spinner} size="lg" color="white" />
          )}
          {!showSpinner && (
            <Button
            
            _text={{
              color:'red',
              backgroundColor:'blue',
              fontSize:20
            }}
            style={styles.googleConnect}
            leftIcon={<Ionicons name="logo-google" size={24} color="red" />}
             onPress={() => {
              promptAsync();
            }}>Google</Button>
          )}
        </LinearGradient>
      </View>
    </NativeBaseProvider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    alignItems: "center",
    justifyContent: 'center',
  },
  spinner: {
    marginTop: 50,
  },
  googleConnect: {
    marginTop:50,
    width: 200,
  }
});
