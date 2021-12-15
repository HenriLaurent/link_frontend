/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, Image, Button } from 'react-native';

import { Ionicons } from "@expo/vector-icons";


import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import SearchScreen from '../screens/SearchScreen';
import MessageListScreen from '../screens/MessageListScreen';
import MessageScreen from '../screens/MessageScreen';
import EventScreen from '../screens/EventScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import Logo from '../components/Logo';

import photo from '../assets/images/profil.jpeg';
import logo from '../assets/images/logo.png';
import { Box, IconButton, Icon } from 'native-base';
import ProfilScreen from '../screens/ProfilScreen';
import CreateEventScreen from '../screens/CreateEventScreen';
import LoadingScreen from '../screens/LoadingScreen';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
};

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 30 }}
      source={logo}
    />
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: true, headerTitle: () => <LogoTitle />  }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen options={({ route, navigation }: any) => ({
        title: route.params.name, headerShown: true, headerLeft: () => (
          <Box style={{flexDirection:'row', alignItems:"center"}}>
            <IconButton
              icon={<Icon as={Ionicons} name="arrow-back" />}
              onPress={() => navigation.goBack(null)}
              _pressed={{borderRadius:50, backgroundColor:'rgba(196,196,196,0.23)'}}

            />
            <Image
              style={{ width: 60, height: 60, margin: 20, borderRadius:50 }}
              source={photo}
            />
          </Box>
        ),
      })} name="Message" component={MessageScreen} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen options={{headerShown:false}} name="Profil" component={ProfilScreen} />
      </Stack.Group>
      <Stack.Group  screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen options={{ headerShown: true, headerTitle: () => <LogoTitle />  }}  name="EventDetail" component={EventDetailScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen options={{ headerShown: true, headerTitle: () => <LogoTitle />  }}  name="CreateEvent" component={CreateEventScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Search"
      key='home'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarShowLabel:false,
        tabBarStyle:{paddingBottom:10, paddingTop:10, height:70}
      }}>
        <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search',
          headerShown:false,
          tabBarIcon: ({ color,focused }) =>focused ? <TabBarIcon name="search-sharp" color={"#EF2D56"} /> : <TabBarIcon name="search-outline" color={color} />,
        }}
      />
      
      <BottomTab.Screen
        name="Event"
        component={EventScreen}
        options={{
          title: 'Event',
          headerShown:false,
          tabBarIcon: ({ color,focused }) =>focused ? <TabBarIcon name="calendar-sharp" color={"#EF2D56"} /> : <TabBarIcon name="calendar-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="MessageList"
        component={MessageListScreen}
        options={{
          title: 'Messages',
          headerShown:false,
          tabBarIcon: ({ color, focused }) =>focused ? <TabBarIcon name="chatbubble-ellipses-sharp" color={"#EF2D56"} /> : <TabBarIcon name="chatbubble-ellipses-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={({ navigation }: RootTabScreenProps<'Settings'>) => ({
          title: 'Settings',
          headerShown:false,
          tabBarIcon: ({ color,focused }) => focused ? <TabBarIcon name="settings-sharp" color={"#EF2D56"} /> : <TabBarIcon name="settings-outline" color={color} />,
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
