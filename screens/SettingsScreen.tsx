import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Box, Pressable, Divider, Input, Button, Avatar } from 'native-base';

import { LinearGradient } from 'expo-linear-gradient';

import photo from '../assets/images/profil.jpeg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { loggedIn, loggedInWithGoogle, resetState } from '../store/actions/user.action';


export default function SettingsScreen() {

    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch()

    const removeLogin = async () => {
        await AsyncStorage.removeItem('@isLogged').then(() => {
            dispatch(resetState());
        })
    }

    return (
        <View style={styles.container}>
            <Button style={styles.logoutBtn} onPress={() => removeLogin()}>Deconnexion</Button>
            <Box style={styles.header}>
                <Avatar
                    bg="grey"
                    size="2xl"
                    mr="1"
                    source={{
                        uri: user.picture,
                    }}
                >
                    P
                </Avatar>
                <Text style={{ fontSize: 24, marginTop: 20 }}>{user.first_name}</Text>
            </Box>

            <Box style={styles.infoContainer}>
                <Box style={styles.infoItem}>
                    <Text>Amis :</Text>
                    <Text>19</Text>
                </Box>
                <Box style={styles.infoItem}>
                    <Text>Linker depuis :</Text>
                    <Text>10/11/2021</Text>
                </Box>
                <Box style={styles.infoItem}>
                    <Text>Genre :</Text>
                    <Text>{user.gender}</Text>
                </Box>
                <Box /* style={styles.interest} */>
                    <Text>Intérêts :</Text>
                    <Box style={styles.interestContainer}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['rgba(237,125,58,1)', 'rgba(239,45,86, 1)']}
                            style={{ borderRadius: 50 }}
                        >
                            <Text style={styles.badge}>Escalade</Text>
                        </LinearGradient>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['rgba(237,125,58,1)', 'rgba(239,45,86, 1)']}
                            style={{ borderRadius: 50 }}
                        >
                            <Text style={styles.badge}>Musique</Text>
                        </LinearGradient>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['rgba(237,125,58,1)', 'rgba(239,45,86, 1)']}
                            style={{ borderRadius: 50 }}
                        >
                            <Text style={styles.badge}>Cinéma</Text>
                        </LinearGradient>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['rgba(237,125,58,1)', 'rgba(239,45,86, 1)']}
                            style={{ borderRadius: 50 }}
                        >
                            <Text style={styles.badge}>Voyage</Text>
                        </LinearGradient>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['rgba(237,125,58,1)', 'rgba(239,45,86, 1)']}
                            style={{ borderRadius: 50 }}
                        >
                            <Text style={styles.badge}>Méditation</Text>
                        </LinearGradient>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['rgba(237,125,58,1)', 'rgba(239,45,86, 1)']}
                            style={{ borderRadius: 50 }}
                        >
                            <Text style={styles.badge}>Escalade</Text>
                        </LinearGradient>
                    </Box>
                </Box>
            </Box>
            <Button style={{ backgroundColor: "#EF2D56", borderRadius: 50 }}>Modifier le compte</Button>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        flex: 1,
        alignItems: 'center',
        width: '100%',
        justifyContent: "space-between",
        paddingBottom: 20
    },
    logoutBtn: {
        position: 'absolute',
        right: 5,
        top: 2,

    },
    header: {
        width: "100%",
        alignItems: "center",
    },
    infoContainer: {
        marginTop: 50,
        flex: 1,
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 100
    },
    infoItem: {
        flexDirection: 'row',
        width: "100%",
        marginBottom: 10,
        justifyContent: "space-between"
    },
    interestContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        width: "100%",
        marginTop: 10,
    },
    badge: {
        fontSize: 12,
        height: 30,
        textAlign: "center",
        textAlignVertical: "center",
        width: 70,
        paddingHorizontal: 5,
        paddingVertical: 3,
        backgroundColor: "transparent",
        color: "white",
        borderRadius: 50,
    }



});
