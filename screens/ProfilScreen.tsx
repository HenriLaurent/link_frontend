import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


import { Box, Icon, IconButton, Avatar } from 'native-base';
import photo from '../assets/images/profil.jpeg';
import { Ionicons } from '@expo/vector-icons';


export default function ProfilScreen({navigation, route}:any) {
    console.log(route.params, 'params')
    const {first_name, age} = route.params;
    return (
        <View style={styles.container}>
            <IconButton
            style={{position:'absolute', top:30, left:10, zIndex:999999999}}
              icon={<Icon as={Ionicons} name="arrow-back" />}
              onPress={() => navigation.goBack(null)}
              _pressed={{borderRadius:50, backgroundColor:'rgba(196,196,196,0.23)'}}

            />
            <Image source={photo} style={{width:"100%", height:350}}/>
            <Text style={styles.name}>{first_name+ ', '+age}</Text>
            <Text style={styles.description}>
            Nantaise depuis deja quelques années et 
            motarde dans l’âme je suis ici pour rencontrer de 
            nouvellespersonnes et me faire de nouveaux amis !
            </Text>
            <Box style={styles.interestContainer}>
                <Box style={styles.interest}>Escalade</Box>
                <Box style={styles.interest}>Cinéma</Box>
                <Box style={styles.interest}>Musique</Box>
                <Box style={styles.interest}>Jeux vidéos ludique</Box>
                <Box style={styles.interest}>Méditation</Box>
            </Box>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    name:{
        marginLeft:10,
        marginTop:20,
        fontSize:22,
        fontWeight:'bold',
    },
    description:{
        paddingHorizontal:10,
        marginTop:20,
        fontSize:16,
        color:'grey',
    },
    interestContainer:{
        marginTop:20,
        width:"90%",
        marginLeft:"5%",
        flexDirection:'row',
        justifyContent:'space-evenly',
        flexWrap:'wrap',
    },
    interest:{
        minWidth:100,
        height:30,
        marginBottom:20,
        borderRadius:50,
        borderColor:"red",
        backgroundColor:"white",
        justifyContent:"center",
        paddingHorizontal:10,
        alignItems:"center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 3,
    }
    

});
