import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, RefreshControl, Text, View, Image, ScrollView, SafeAreaView, TouchableHighlight } from 'react-native';
import { Box, Pressable, Divider, Input, Button } from 'native-base';
import { gql, useLazyQuery, useQuery } from '@apollo/client';

import { LinearGradient } from 'expo-linear-gradient';

import photo from '../assets/images/profil.jpeg';

const GET_EVENTS = gql`
query Events {
    events {
      title
      description
      location
      date
      picture
      users {
        first_name
        last_name
        city
        gender
        interests {
          title
        }
      }
    }
  }
`;

export default function EventComponent({ navigation }: any) {

    const { loading, error, data, refetch } = useQuery(GET_EVENTS);
    const [refreshing, setRefreshing] = useState(false);
    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error! ${error.message}</Text>;

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }

    const DisplayEvents = () => {
        return (
            data.events.map((event: any) => {
                return (
                    <Pressable key={event.id} onPress={() => navigation.navigate("EventDetail", {
                        title: event.title,
                        description: event.description,
                        location: event.location,
                        users: event.users,
                        date: event.date
                    })}>
                    <Box style={styles.eventItem}>
                        <Image source={photo} style={{ width: "40%", height: "100%" }} />
                        <Box style={styles.eventContent}>
                            <Text style={styles.eventTitle}>{event.title}</Text>
                            <Divider my="1" />
                            <Box style={styles.eventDetail}>
                                <Text style={styles.eventDetailTitle}>Lieu :</Text>
                                <Text style={styles.eventDetailDescription}>{event.location}</Text>
                            </Box>
                            <Box style={styles.eventDetail}>
                                <Text style={styles.eventDetailTitle}>Participants :</Text>
                                <Text style={styles.eventDetailDescription}>{event.users.length}</Text>
                            </Box>
                            <Box style={styles.eventDetail}>
                                <Text style={styles.eventDetailTitle}>Date :</Text>
                                <Text style={styles.eventDetailDescription}>{event.date}</Text>
                            </Box>
                            <Box style={styles.eventDetail}>
                                <Text style={styles.eventDetailTitle}>Description :</Text>
                            </Box>
                            <Text style={styles.eventDescription}>
                                {event.description}
                            </Text>
                        </Box>
                    </Box>
                </Pressable>
                )
            })
        )
    }


    return (
        <View style={styles.container}>
            <Box style={styles.eventHeader}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['rgba(237,125,58,1)', 'rgba(239,45,86, 1)']}
                    style={{ borderRadius: 50 }}
                >
                    <Button style={{ backgroundColor: "transparent", borderRadius: 50 }}>Filtrer la recherche</Button>
                </LinearGradient>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['rgba(237,125,58,1)', 'rgba(239,45,86, 1)']}
                    style={{ borderRadius: 50 }}
                >
                    <Button onPress={() => navigation.navigate("CreateEvent")} style={{ backgroundColor: "transparent", borderRadius: 50 }}>Créer un évènement</Button>
                </LinearGradient>
            </Box>
            <SafeAreaView style={styles.eventContainer} >
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    
                {data.events.length !== 0 ? (
                    <DisplayEvents/>
                ): (
                    <Text>No results</Text>
                )}
                </ScrollView>
            </SafeAreaView>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    eventContainer: {
        flex: 1,
        width: "100%",
        alignItems: "center",
    },
    scrollView: {
        width: "100%",
    },
    eventHeader: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-evenly",
        marginBottom: 20,
    },

    eventItem: {
        height: 170,
        width: "100%",
        flexDirection: 'row',
        justifyContent: "space-between",
        backgroundColor: 'white',
        borderBottomWidth: 2,
        borderColor: "#ccc",
    },
    eventContent: {
        height: "100%",
        width: "55%",
        padding: 10,

    },
    eventTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    eventDetail: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    eventDetailTitle: {
        fontSize: 12,
    },
    eventDetailDescription: {
        fontSize: 16,
        color: "#EF2D56",
    },
    eventDescription: {
        color: "grey",
        fontSize: 10,
    }



});
