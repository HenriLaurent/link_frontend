import React, { useEffect, useRef, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, TouchableHighlight, Platform } from 'react-native';
import { Box, Modal, FormControl, TextArea, Pressable, Divider, Input, Button, IconButton, Icon } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { LinearGradient } from 'expo-linear-gradient';

import photo from '../assets/images/profil.jpeg';
import { Ionicons } from '@expo/vector-icons';

import {setEventDescription, setEventDate, setEventLocation} from '../store/actions'
import { RootState } from '../store';
import { useMutation, gql } from '@apollo/client';




interface EventProps {
    description: string,
    location:string,
    date:string
}

const CREATE_EVENT = gql`
mutation CreateEvent($title: String!, $description: String!, $picture: String!, $location: String!, $date: String!, $creator: Int!) {
    createEvent(title: $title, description: $description, picture: $picture, location: $location, date: $date, creator: $creator) {
      title
      location
      id
    }
  }`


export default function CreateEventScreen({ navigation }: any) {

    const [showDescriptionModal, setShowDescriptionModal] = useState(false);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [show, setShow] = useState(false);
    const [mode, setMode] =useState('date');
    const dispatch = useDispatch();
    const description = useSelector((state: RootState) => state.event.description);
    const date = useSelector((state:RootState) => state.event.date);
    const userId = useSelector((state:RootState) => state.user.user_id);
    const eventLocation = useSelector((state: RootState) => state.event.location);

    const [ isDescSubmited, setIsDescSubmited] = useState(false);
    const [ isDateSubmited, setIsDateSubmited] = useState(false);

    const [createEvent, res] = useMutation(CREATE_EVENT, {
        onCompleted: () => navigation.navigate('Event'),
        onError: (error) => console.log(error, 'error during create event mutation')
      });

    const onChange = (selectedDate: any) => {
        const currentDate: Date = selectedDate.nativeEvent.timestamp || date;
        setShow(Platform.OS === 'ios');
        console.log('date :',currentDate);
        setMode('time');
    };

    const onChangeTime = (selectedTime: any) => {
        const currentDate: Date = selectedTime.nativeEvent.timestamp;
        setShow(Platform.OS === 'ios');
        console.log( currentDate);
        setMode('date');
        dispatch(setEventDate(currentDate));
        setIsDateSubmited(true);


    };


    const showMode = (currentMode: any) => {
        setShow(true);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const updateDescription = (text:any) => {
        dispatch(setEventDescription(text));
    }



    const LocationModal = () => {
        return (
            <Modal isOpen={showLocationModal} onClose={() => setShowLocationModal(false)}>
                <Modal.Content >
                    <Modal.CloseButton />
                    <Modal.Header>Choississez un lieu</Modal.Header>
                    <Box style={{width:"90%", minHeight:150, marginLeft:"5%", marginTop:10}}>
                                <GooglePlacesAutocomplete
                                    placeholder='Search'
                                    onPress={(data, details = null) => {
                                        // 'details' is provided when fetchDetails = true
                                        console.log(data.description, 'description location');
                                        dispatch(setEventLocation(data.description));
                                    }}
                                    query={{
                                        key: 'AIzaSyB7o1q7chTAjfFW2DXtSTgbIIiFeDn-CYw',
                                        language: 'fr',
                                    }}
                                    currentLocation={true}
                                    currentLocationLabel='Current location'
                                />
                                </Box>

                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button
                                variant="ghost"
                                colorScheme="blueGray"
                                onPress={() => {
                                    setShowLocationModal(false)
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onPress={() => {
                                    setShowLocationModal(false)
                                }}
                            >
                                Save
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        )
    }

    return (
        <View style={styles.container}>
            <Box style={styles.eventContainer}>
                <Image source={photo} style={styles.eventImage} />
                <Box style={styles.buttonContainer}>
                    <Button onPress={() => setShowDescriptionModal(true)} _text={{ color: "black", fontSize: 12, }} style={isDescSubmited ? styles.eventButtonCheck : styles.eventButton}>
                        Ajouter une description
                    </Button>
                    <Button onPress={() => setShowLocationModal(true)} _text={{ color: "black", fontSize: 12, }} style={styles.eventButton}>
                        Ajouter un lieu
                    </Button>
                    <Button onPress={showDatepicker} _text={{ color: "black", fontSize: 12, }} style={isDateSubmited ? styles.eventButtonCheck : styles.eventButton}>
                        Ajouter une date
                    </Button>
                
                </Box>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.createButton}
                    colors={['rgba(237,125,58,1)', 'rgba(239,45,86, 1)']}
                >
                    <Box >
                        <Ionicons onPress={() => {
                            console.log(typeof eventLocation,typeof description,typeof userId, userId, 'data create evnt')
                            createEvent({
                                variables:{
                                    title: "Balade",
                                    location: eventLocation,
                                    description: description,
                                    creator: userId,
                                    picture: "none",
                                    date: "20/11/12"
                                } 
                             })
                        }} name="checkmark" size={40} color="white" />
                    </Box>
                </LinearGradient>
            </Box>
            <Modal isOpen={showDescriptionModal} onClose={() => setShowDescriptionModal(false)}>
                <Modal.Content maxWidth="400px" >
                    <Modal.CloseButton />
                    <Modal.Header>Description</Modal.Header>
                    <Modal.Body>
                            <TextArea
                            value={description}
                            onChangeText={updateDescription}
                                h={20}
                                placeholder="Ecrivez votre description ici ..."
                                w={{
                                    base: "100%",
                                    md: "10%",
                                }}
                            />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button
                            style={{borderRadius:50, width:100}}
                                variant="ghost"
                                colorScheme="blueGray"
                                onPress={() => {
                                    setShowDescriptionModal(false);
                                    
                                }}
                            >
                                Fermer
                            </Button>
                            <Button
                            style={{backgroundColor:"#EF2D56", borderRadius:50, width:100}}
                                onPress={() => {
                                    setShowDescriptionModal(false);
                                    setIsDescSubmited(true);
                                }}
                            >
                                Valider
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <LocationModal />
            {show && (
                <DateTimePicker
                    value={date}
                    dateFormat="dayofweek day month"
                    mode={mode==='date' ? 'date' : 'time'}
                    onChange={onChange}
                    locale="fr-FR" 
                />
            )}
            {mode==='time' && (
                <DateTimePicker
                    dateFormat="dayofweek day month"
                    value={date}
                    mode='time'
                    onChange={onChangeTime}
                    locale="fr-FR" 
                />
            )}
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        width: '100%',
    },
    eventContainer: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        paddingBottom: 20,
    },
    eventImage: {
        width: "100%",
        height: 200,
    },
    eventButton: {
        width: 200,
        height: 60,
        textAlign:'center',
        alignItems: "center",
        marginBottom: 20,
        backgroundColor: "white",
        borderRadius: 50,
        color: "black",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 3,

    },
    buttonContainer: {
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    createButton: {
        width: 70,
        height: 70,
        borderRadius: 50,
        backgroundColor: "white",
        shadowColor: "#000",
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 3,
    },
    map: {
        width: 300,
        height: 300,
    },
    eventButtonCheck:{
        width: "40%",
        height: 50,
        alignItems: "center",
        marginBottom: 20,
        backgroundColor: "#C4C4C4",
        opacity:0.3,
        borderRadius: 50,
        color: "black",
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
