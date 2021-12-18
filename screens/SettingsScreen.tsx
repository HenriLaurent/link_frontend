import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Box, Pressable, Divider, Input, Button, Avatar, Modal, Spinner } from 'native-base';

import { LinearGradient } from 'expo-linear-gradient';

import photo from '../assets/images/profil.jpeg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { loggedIn, loggedInWithGoogle, resetState } from '../store/actions/user.action';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';


const GET_INTERESTS = gql`
    query SearchInterest($title: String!) {
        searchInterest(title: $title) {
        title
        id
        }
    }
`;

const ADD_INTEREST = gql`
mutation AddInterestToUser($userId: ID!, $interestId: ID!) {
    addInterestToUser(userId: $userId, interestId: $interestId) {
      first_name
      interests {
        title
      }
    }
  }
`




export default function SettingsScreen() {

    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch();

    const removeLogin = async () => {
        await AsyncStorage.removeItem('@isLogged').then(() => {
            dispatch(resetState());
        })
    }

    const [showInterestModal, setShowInterestModal] = useState(false);
    const [inputSearch, setInputSearch] = useState('');

    function InterestsBySearch(props: any) {
        const id = useSelector((state: RootState) => state.user.user_id)
        const { loading, error, data } = useQuery(GET_INTERESTS, {
            variables: { title: props.title },
        });

        const [addInterest, res] = useMutation(ADD_INTEREST);
        console.log(res.data, 'res')

        if (loading) return <Text>Loading </Text>
        if (error) return <Text>`Error! ${error.message}`</Text>;
        if(res.loading) return <Spinner size="lg" color="black" />
        if (data.searchInterest.length === 0) {
            return (
                <Box>
                    <Text>Aucun résulat ne correspond à ta recherche</Text>
                </Box>
            )
        } else {
            return (
                <ScrollView style={{ height: 300 }}>
                    <SafeAreaView>
                        {
                            data.searchInterest.map((interest: any) => {
                                return (
                                    <Box style={{width:"100%", height:50, justifyContent:"center", borderBottomWidth:2, borderBottomColor:"#eee"}} key={interest.id}>
                                        <Button
                                        _text={{
                                            color: "#1F2937",
                                          }}
                                        style={styles.iButton}
                                         onPress={() => {
                                            console.log(id, interest.id, typeof id, typeof interest.id)
                                            addInterest({
                                            variables: {userId:id, interestId: interest.id }
                                        })}}>{interest.title}</Button>
                                    </Box>
                                )
                            })
                        }
                    </SafeAreaView>
                </ScrollView>
            )
        }
    };


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
                    <Button onPress={() => setShowInterestModal(true)} style={{ backgroundColor: "#EF2D56", borderRadius: 50 }}>Ajouter un intérêt</Button>
                </Box>
            </Box>
            <Button style={{ backgroundColor: "#EF2D56", borderRadius: 50 }}>Modifier le compte</Button>
            <Modal size='xl' isOpen={showInterestModal} onClose={() => setShowInterestModal(false)}>
                <Modal.Content >
                    <Modal.CloseButton />
                    <Modal.Header>Ajouter un intérêt</Modal.Header>
                    <Modal.Body style={{ height: 300 }}>
                        <Input
                            value={inputSearch}
                            onChangeText={(text) => setInputSearch(text)}
                            h={10}
                            placeholder="Ecrivez votre description ici ..."
                            w={{
                                base: "100%",
                                md: "10%",
                            }}
                        />

                        <InterestsBySearch title={inputSearch} />

                    </Modal.Body>
                    
                </Modal.Content>
            </Modal>
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
    },
    iButton:{
        height:"100%",
         width:"100%",
          backgroundColor:'white'
    }



});
