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
    const { cartItems, restaurantId, user_id, updateCart, returnToCheckout } = route.params || {};

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const getCurrentLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied');
                return;
            }
            
            // Get the most accurate location possible
            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest,
                maximumAge: 10000 // Use a location no more than 10 seconds old
            });
            
            const currentRegion = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            };
            
            // Update region and also set as selected location
            setRegion(currentRegion);
            setSelectedLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });
            
            // Get address for the current location
            let reverseGeocode = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });
            
            if (reverseGeocode.length > 0) {
                let locationData = reverseGeocode[0];
                let fullAddress = `${locationData.name || ""}, ${locationData.street || ""}, ${locationData.city || ""}, ${locationData.region || ""}, ${locationData.country || ""}`;
                setAddress(fullAddress.trim());
            }
        } catch (error) {
            console.error("Error getting location:", error);
            alert("Failed to get your current location. Please try again.");
        }
    };

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
        
        // Call location select callback if provided
        if (route.params?.onLocationSelect) {
            route.params.onLocationSelect(address);
        }
        
        // Pass back all parameters with the address
        navigation.navigate('CartPage', { 
            address,
            cartItems,
            restaurantId,
            user_id,
            updateCart,
            openCheckoutModal: true, // Signal to open checkout modal automatically
            ...route.params
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

            {/* Current Location Button */}
            <TouchableOpacity
                onPress={getCurrentLocation}
                style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    backgroundColor: 'white',
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 4,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                }}
            >
                <Text style={{ fontSize: 24 }}>📍</Text>
            </TouchableOpacity>

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