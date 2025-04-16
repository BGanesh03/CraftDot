import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useRoute, useNavigation } from '@react-navigation/native';

const MapScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [region, setRegion] = useState({
        latitude: 13.0827, // Default: Chennai
        longitude: 80.2707,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const [selectedLocation, setSelectedLocation] = useState(null);
    const [address, setAddress] = useState("");

    // Extract all necessary parameters from route 
    const { cartItems, restaurantId, user_id, updateCart } = route.params || {};

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        })();
    }, []);

    const handleMapPress = async (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setSelectedLocation({ latitude, longitude });

        let reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (reverseGeocode.length > 0) {
            let locationData = reverseGeocode[0];
            let fullAddress = `${locationData.name || ""}, ${locationData.street || ""}, ${locationData.city || ""}, ${locationData.region || ""}, ${locationData.country || ""}`;
            setAddress(fullAddress.trim());
        }
    };

    const handleConfirmAddress = () => {
        if (!address) {
            alert("Please select a valid location before confirming.");
            return;
        }

        console.log("Confirmed address:", address);
        
        // Check if there's a callback function from the parent component
        if (route.params?.onLocationSelect) {
            route.params.onLocationSelect(address);
        }
        
        // Pass ALL original parameters back along with the new address
        navigation.navigate('CartPage', { 
            address,
            cartItems, // Return the cart items to preserve state
            restaurantId,
            user_id,
            updateCart, // Return the updateCart function
            ...route.params // Also include any other params that were passed
        });
    };

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                provider="google"
                region={region}
                onPress={handleMapPress}
            >
                {selectedLocation && (
                    <Marker coordinate={selectedLocation} title="Selected Location" />
                )}
            </MapView>

            <View style={{
                position: 'absolute',
                bottom: 80,
                left: 20,
                right: 20,
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 8,
                elevation: 4,
                display: address ? 'flex' : 'none'
            }}>
                <Text style={{ fontSize: 14 }}>Selected Address:</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{address}</Text>
            </View>

            <TouchableOpacity
                onPress={handleConfirmAddress}
                style={{
                    backgroundColor: 'purple',
                    padding: 15,
                    alignItems: 'center',
                    margin: 20,
                    borderRadius: 10,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0
                }}
            >
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Confirm Address</Text>
            </TouchableOpacity>
        </View>
    );
};

export default MapScreen;