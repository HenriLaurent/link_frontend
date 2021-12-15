import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { MaterialIcons, FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { Box, Pressable } from 'native-base';
import photo from '../assets/images/profil.jpeg';

import { useQuery, gql } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { removeUserMatch, setUserMatch } from '../store/actions/user.action';
import { UserMatch } from '../store/types/user.types';

const GET_USER_BY_LOCATION = gql`
query UsersByLocation($user_id: ID!, $latitude: Float!, $longitude: Float!) {
    usersByLocation(user_id: $user_id, latitude: $latitude, longitude: $longitude) {
        user {
            id
            first_name
            city
            gender
            age
            interests {
                title
            }
        }
        distance
    }
  }
`


export default function SearchComponent({ navigation }: any) {
    const city = useSelector((state: RootState) => state.user.localization.city);
    const users = useSelector((state: RootState) => state.user.users);
    const { latitude, longitude } = useSelector((state: RootState) => state.user.user)
    const id = useSelector((state: RootState) => state.user.user_id);
    const dispatch = useDispatch();
    const [isUsers, setIsUsers] = useState(false);


    /*     useEffect(() => {
            async function refetchData(){
                if(users.length === 0){
                    console.log('refetching')
                    await refetch();
                    handleResponse(data);
                }
            }
            refetchData();
        }, [isUsers]); */

    const handleResponse = (data: any) => {
        console.log(data, 'dat')
        if (data) {
            const usersByLocation = data.usersByLocation;
            if (usersByLocation.length === 0) {
                setIsUsers(false);
            } else {
                setIsUsers(true)
                const usersArray = usersByLocation.filter((user: any) => {

                    return {
                        id: user.user.id,
                        first_name: user.user.first_name,
                        locale: user.user.city,
                        age: user.user.age,
                        gender: user.user.gender
                    }

                });
                dispatch(setUserMatch(usersArray));
            }
        }
    }

    const { loading, error, data, refetch } = useQuery(GET_USER_BY_LOCATION,
        {
            variables: {
                user_id: id,
                latitude: latitude,
                longitude: longitude
            },
            skip: id === 0,
            onCompleted: () => { handleResponse(data) }
        });
    const [refreshing, setRefreshing] = useState(false);
    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error! ${error.message}</Text>;



    const UsersTab = () => {
        const users = useSelector((state: RootState) => state.user.users);
        return (
            <Box style={styles.container}>
                {users.map((user: any) => {
                    console.log(user, 'user')
                    return (
                        <Box key={user.user.id} style={styles.card}>
                            <Pressable style={{ width: "100%", height: "80%" }} onPress={() => navigation.navigate("Profil", {
                                first_name: user.user.first_name,
                                age: user.user.age,
                            })}>
                                <Image source={photo} style={{ width: "100%", height: "100%" }} />
                            </Pressable>
                            <Text style={styles.text}>{user.user.first_name + ', ' + user.user.age + ' ans'}</Text>
                            <Box style={styles.options}>
                                <LinearGradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    colors={['rgba(237,125,58,1)', 'rgba(239,45,86, 1)']}
                                    style={styles.rounded}>

                                    <Ionicons name="md-person-add-sharp" size={24} color="white" />
                                </LinearGradient>
                                <Box style={styles.rounded}>
                                    <AntDesign name="filter" size={30} color="black" />
                                </Box>

                                <Box style={styles.rounded}>

                                    <MaterialIcons onPress={() => dispatch(removeUserMatch(user.user.first_name))} name="navigate-next" size={50} color="black" />
                                </Box>

                            </Box>
                        </Box>
                    )
                })}
            </Box>
        )
    }

    return (
        <View style={styles.container}>
            {isUsers ? (
                <UsersTab />
            ) : (
                <Text>NO results</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContainer: {
        flex: 5,
        width: "70%",
        alignItems: "center",
    },
    card: {
        height: "100%",
        width: "100%",
        position: "absolute",
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    text: {
        position: 'absolute',
        textShadowColor: 'black',
        left: 20,
        top: "70%",
        color: "white",
        fontWeight: 'bold',
        fontSize: 24,
    },
    description: {
        fontSize: 12,
        color: 'grey',
        padding: 10,
    },
    options: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 20
    },
    rounded: {
        width: 50,
        height: 50,
        borderColor: 'black',
        borderRadius: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    }

});
