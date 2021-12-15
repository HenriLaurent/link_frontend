import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, TouchableHighlight } from 'react-native';
import { Box, Pressable, Divider, Input, Button, IconButton, Icon } from 'native-base';

import { LinearGradient } from 'expo-linear-gradient';

import photo from '../assets/images/profil.jpeg';
import { Ionicons } from '@expo/vector-icons';


export default function EventDetailScreen({route, navigation}:any) {
    const {title, description, location, date, users} = route.params;
    return (
        <View style={styles.container}>
            <Box style={styles.eventContainer}>
                <Box style={styles.eventHeader}>
                    <Image source={photo} style={styles.eventImage} />
                    <Box style={styles.eventHeaderContent}>
                        <Text style={styles.eventHeaderContentTitle}>{title}</Text>
                        <Divider />
                        <Box style={styles.eventHeaderContentBox}>
                            <Text>Lieu</Text>
                            <Text>{location}</Text>
                        </Box>
                        <Box style={styles.eventHeaderContentBox}>
                            <Text>Participants</Text>
                            <Text>{users.length}</Text>
                        </Box>
                        <Box style={styles.eventHeaderContentBox}>
                            <Text>Date</Text>
                            <Text>{date}</Text>
                        </Box>
                    </Box>
                </Box>
                <Text style={styles.marginLeft}>Description</Text>
                <Text style={styles.descText}>
                   {description}
                </Text>
                <Text style={styles.marginLeft}>S'est deja inscrit</Text>
                <SafeAreaView style={styles.eventParticipant}>
                <ScrollView horizontal={true}>
                    <Image source={photo} style={{marginRight:10, borderRadius: 50, width: 50, height: 50 }} />
                    <Image source={photo} style={{marginRight:10, borderRadius: 50, width: 50, height: 50 }} />
                    <Image source={photo} style={{marginRight:10, borderRadius: 50, width: 50, height: 50 }} />
                    <Image source={photo} style={{marginRight:10, borderRadius: 50, width: 50, height: 50 }} />
                    <Image source={photo} style={{marginRight:10, borderRadius: 50, width: 50, height: 50 }} />
                    <Image source={photo} style={{marginRight:10, borderRadius: 50, width: 50, height: 50 }} />
                    <Image source={photo} style={{marginRight:10, borderRadius: 50, width: 50, height: 50 }} />
                </ScrollView>
                </SafeAreaView>
                <Text style={styles.marginLeft}>Organisateur</Text>
                <LinearGradient
                style={styles.eventManager}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['rgba(237,125,58,1)', 'rgba(239,45,86, 1)']}
                        >
                <Box style={{flexDirection:"row"}}>
                    <Image source={photo} style={{ width: 70, height: 70, borderRadius: 50, marginVertical:10, marginLeft:10 }} />
                    <Box style={{width:"70%", marginLeft:10, paddingVertical:5}}>
                        <Text style={{marginTop:10, color:"white"}}>Marion, 22 ans</Text>
                        <Text style={styles.descProfil}>
                            Nantaise depuis deja quelques années et
                            motarde dans l’âme je suis ici pour rencontrer de nouvellespersonnes et me faire de nouveaux
                            amis !
                        </Text>
                    </Box>
                </Box>
                </LinearGradient>
                <Button style={styles.btn}>Rejoindre le groupe</Button>
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
    eventContainer: {
        height: "100%",
        width: "100%",

    },
    eventHeader: {
        flexDirection: "row",
        justifyContent: 'space-between',
        height: 150,
        marginBottom:20,
    },
    eventImage: {
        width: 150,
        height: 150,
        borderBottomRightRadius: 50,
    },
    eventHeaderContent: {
        width: "60%",
        padding:10,
        alignContent: "flex-start",
    },
    eventHeaderContentTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    eventHeaderContentBox: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
    },
    eventParticipant: {
        flexDirection: 'row',
        width: "100%",
        height:50,
        marginVertical:20,
        paddingHorizontal:20,
    },
    eventManager: {
        width: "80%",
        marginLeft:"10%",
        marginTop:10,
        borderRadius: 100,
        flexDirection: "row",
        backgroundColor:"white",
        shadowColor: "#000",
        alignItems:"center",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 8,
    },
    marginLeft:{
        marginLeft:20,
        fontSize:18,
        marginTop:10
    },
    descText:{
        marginLeft: 20,
        marginRight:50,
        color:"grey",
    },
    descProfil:{
        fontSize:10,
        flex:1,
        color:"white"
    },
    btn:{
        borderRadius:50,
        backgroundColor:"#ED7D3A",
        width:"60%",
        position:"absolute",
        bottom:10,
        left:"20%",
    }





});
