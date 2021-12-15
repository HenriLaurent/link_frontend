import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, TouchableHighlight } from 'react-native';
import { Box, Pressable, Divider, Input, Button, Icon, IconButton } from 'native-base';

import { Ionicons } from '@expo/vector-icons'; 


import photo from '../assets/images/profil.jpeg';


export default function MessageDetailComponent() {

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.messagesContainer} >
                <ScrollView>
                    <Box style={styles.messageLeft}>
                        <Text style={styles.messageContent}>Hey, salut ça va ?</Text>
                        <Text style={styles.messageTime}>10h58</Text>
                    </Box>

                    <Box style={styles.messageRight}>
                        <Text style={styles.messageContent}>Hey, salut ça va ?</Text>
                        <Text style={styles.messageTime}>10h58</Text>
                    </Box>
                </ScrollView>
            </SafeAreaView>
            <Box style={styles.sendMessageContainer}>
                <Input
                    variant='rounded'
                    type="text"
                    overflow="visible"
                    w={{
                        base: "75%",
                        md: "25%",
                    }}
                    InputRightElement={
                        <IconButton
                            icon={<Icon as={Ionicons} name="send" size={5}/>}
                            onPress={() => console.log('send')}

                        />
                    }
                    placeholder="Ecris ton message ici ..."
                />
            </Box>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 20,
    },
    messageHeader: {
        flexDirection: 'row',
        height: 120,
        paddingTop: 20,
        alignItems: "center",
        backgroundColor: 'white',
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 8,
    },
    shadow: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 8,
    },
    messagesContainer: {
        flex: 1,
        width: '100%',
        padding: 20

    },
    messageLeft: {
        alignItems: 'flex-start'
    },
    messageRight: {
        alignItems: "flex-end"
    },
    messageContent: {
        fontSize: 14,
    },
    messageTime: {
        fontSize: 6,
        color: 'grey',
    },
    sendMessageContainer: {
        width: '100%',
        height: 100,
        alignItems: "center",
    }


});
