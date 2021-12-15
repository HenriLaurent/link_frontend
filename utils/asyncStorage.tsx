import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeUser = async (value: any) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@user', jsonValue)
    } catch (e) {
        console.log('error :' + e)
    }
}

export const storeUserLocation = async (value: any) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@userLocation', jsonValue)
    } catch (e) {
        console.log('error :' + e)
    }
}

export const storeLogin = async (value: any) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@isLogged', jsonValue);
    } catch (e) {
        console.log('error :' + e)
    }
}