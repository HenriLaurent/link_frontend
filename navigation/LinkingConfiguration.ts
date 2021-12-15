/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Settings: {
            screens: {
              SettingsScreen: 'settings',
            },
          },
          Event: {
            screens: {
              EventScreen: 'event',
            },
          },
          Search:{
            screens: {
              SearchScreen: 'search',
            }
          },
          MessageList:{
            screens:{
              MessageListScreen: 'messageList',
            }
          },
        },
      },
      Modal: 'modal',
      Profil:'profil',
      EventDetail:"eventDetail",
      Message: 'message',
      CreateEvent: "createEvent",
      NotFound: '*',
    },
  },
};

export default linking;
