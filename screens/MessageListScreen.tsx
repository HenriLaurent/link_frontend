import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, TouchableHighlight } from 'react-native';
import { Box, Pressable, Divider } from 'native-base';
import { RootTabScreenProps } from '../types';

import photo from '../assets/images/profil.jpeg';


export default function MessageComponent({ navigation }: any) {

    return (
        <View style={styles.container}>
            <Text style={{marginBottom:10, textAlign: "left", width: "90%", fontSize: 18, color: "grey", marginTop: 20 }}>Amis: 12</Text>
            <SafeAreaView style={styles.matchList}>
                <ScrollView horizontal={true}>
                    <Box style={{alignItems:"center",justifyContent:"center"}}>
                        <Image source={photo} style={{ width: 70, height: 70, borderRadius: 50, marginLeft: 20 }} />
                        <Text style={{fontSize:18, fontWeight:"bold"}}>Théo</Text>
                    </Box>
                    <Box style={{alignItems:"center",justifyContent:"center"}}>
                        <Image source={photo} style={{ width: 70, height: 70, borderRadius: 50, marginLeft: 20 }} />
                        <Text style={{fontSize:18, fontWeight:"bold"}}>Théo</Text>
                    </Box>
                    <Box style={{alignItems:"center",justifyContent:"center"}}>
                        <Image source={photo} style={{ width: 70, height: 70, borderRadius: 50, marginLeft: 20 }} />
                        <Text style={{fontSize:18, fontWeight:"bold"}}>Théo</Text>
                    </Box>
                    <Box style={{alignItems:"center",justifyContent:"center"}}>
                        <Image source={photo} style={{ width: 70, height: 70, borderRadius: 50, marginLeft: 20 }} />
                        <Text style={{fontSize:18, fontWeight:"bold"}}>Théo</Text>
                    </Box>
                    <Box style={{alignItems:"center",justifyContent:"center"}}>
                        <Image source={photo} style={{ width: 70, height: 70, borderRadius: 50, marginLeft: 20 }} />
                        <Text style={{fontSize:18, fontWeight:"bold"}}>Théo</Text>
                    </Box>
                </ScrollView>
            </SafeAreaView>
            <Text style={{ textAlign: "left", width: "90%", fontSize: 18, color: "grey", marginTop: 20 }}>Messages</Text>
            <SafeAreaView style={styles.messagesContainer} >
                <ScrollView>
                    <Divider my="1" />
                    <Pressable
                        onPress={() => {

                            navigation.navigate('Message', { name: 'Théo' });
                        }}
                    >
                        <Box style={styles.messageContainer}>
                            <Image source={photo} style={{ width: 50, height: 50, borderRadius: 70 }} />
                            <Box style={styles.message}>
                                <Text style={styles.name}>Théo</Text>
                                <Text style={styles.lastMessage}>Hey comment ça va ?</Text>
                            </Box>
                        </Box>
                        <Divider my="1" />
                    </Pressable>

                    <Box style={styles.messageContainer}>
                        <Image source={photo} style={{ width: 50, height: 50, borderRadius: 70 }} />
                        <Box style={styles.message}>
                            <Text style={styles.name}>Théo</Text>
                            <Text style={styles.lastMessage}>Hey comment ça va ?</Text>
                        </Box>
                    </Box>
                    <Divider my="1" />

                    <Box style={styles.messageContainer}>
                        <Image source={photo} style={{ width: 50, height: 50, borderRadius: 70 }} />
                        <Box style={styles.message}>
                            <Text style={styles.name}>Théo</Text>
                            <Text style={styles.lastMessage}>Hey comment ça va ?</Text>
                        </Box>
                    </Box>
                    <Divider my="1" />

                    <Box style={styles.messageContainer}>
                        <Image source={photo} style={{ width: 50, height: 50, borderRadius: 70 }} />
                        <Box style={styles.message}>
                            <Text style={styles.name}>Théo</Text>
                            <Text style={styles.lastMessage}>Hey comment ça va ?</Text>
                        </Box>
                    </Box>
                    <Divider my="1" />

                    <Box style={styles.messageContainer}>
                        <Image source={photo} style={{ width: 50, height: 50, borderRadius: 70 }} />
                        <Box style={styles.message}>
                            <Text style={styles.name}>Théo</Text>
                            <Text style={styles.lastMessage}>Hey comment ça va ?</Text>
                        </Box>
                    </Box>
                    <Divider my="1" />

                    <Box style={styles.messageContainer}>
                        <Image source={photo} style={{ width: 50, height: 50, borderRadius: 70 }} />
                        <Box style={styles.message}>
                            <Text style={styles.name}>Théo</Text>
                            <Text style={styles.lastMessage}>Hey comment ça va ?</Text>
                        </Box>
                    </Box>
                    <Divider my="1" />

                    <Box style={styles.messageContainer}>
                        <Image source={photo} style={{ width: 50, height: 50, borderRadius: 70 }} />
                        <Box style={styles.message}>
                            <Text style={styles.name}>Théo</Text>
                            <Text style={styles.lastMessage}>Hey comment ça va ?</Text>
                        </Box>
                    </Box>
                    <Divider my="1" />

                    <Box style={styles.messageContainer}>
                        <Image source={photo} style={{ width: 50, height: 50, borderRadius: 70 }} />
                        <Box style={styles.message}>
                            <Text style={styles.name}>Théo</Text>
                            <Text style={styles.lastMessage}>Hey comment ça va ?</Text>
                        </Box>
                    </Box>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    matchList: {
        width: "100%",
        height: 100,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",

    },
    messageContainer: {
        width: "100%",
        paddingHorizontal: 50,
        flexDirection: "row",
        height: 100,
        alignItems: "center",
        justifyContent: 'space-between',
        borderColor: "black",


    },
    message: {
        width: "80%",
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
    },
    lastMessage: {
        fontSize: 12,
        color: "grey"
    },
    messagesContainer: {
        flex: 1,
    }

});
