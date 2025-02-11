import React, { useState, useEffect } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import MapView, { Marker, MapPressEvent } from "react-native-maps";
import * as Location from "expo-location";

interface Local {
  endereco: string;
  latitude: number;
  longitude: number;
}

interface MapProps {
  onLocationSelected: (local: Local) => void;
}

const Map = ({ onLocationSelected }: MapProps) => {
  const [location, setLocation] = useState<Local | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Local | null>(null);
  const [hasLocationPermission, setHasLocationPermission] = useState<boolean | null>(null);

  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  const getAddressFromCoordinates = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        {
          headers: {
            "User-Agent": "ExpoReactNativeApp/1.0", 
            "Accept-Language": "pt-BR",
          },
        }
      );
      
      if (!response.ok) throw new Error("Erro na resposta da API");
  
      const data = await response.json();
      return data.display_name || "Endereço não encontrado";
    } catch (error) {
      console.log("Erro ao buscar endereço:", error);
      return "Endereço não encontrado";
    }
  };
  

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasLocationPermission(false);
        Alert.alert("Permissão Negada", "Não podemos acessar sua localização.");
        return;
      }
  
      setHasLocationPermission(true);
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const endereco = await getAddressFromCoordinates(latitude, longitude);
  
      setLocation({ latitude, longitude, endereco });
      setSelectedLocation({ latitude, longitude, endereco });
      onLocationSelected({ latitude, longitude, endereco });
    } catch (error) {
      console.error("Erro ao obter localização:", error);
      Alert.alert("Erro", "Não foi possível obter sua localização.");
    }
  };
  

  useEffect(() => {
    getCurrentLocation();
  }, []);

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  const handleMapPress = async (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const endereco = await getAddressFromCoordinates(latitude, longitude);
    
    const newLocation = { latitude, longitude, endereco };
    setSelectedLocation(newLocation);
    onLocationSelected(newLocation);
  };

  return (
    <View style={styles.container}>
      {hasLocationPermission === null ? (
        <Text>Carregando permissões...</Text>
      ) : !hasLocationPermission ? (
        <Text>Permissão de localização negada</Text>
      ) : location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={handleMapPress}
        >
          <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} title="Minha Localização" />
          {selectedLocation && (
            <Marker coordinate={{ latitude: selectedLocation.latitude, longitude: selectedLocation.longitude }} title="Local Selecionado" />
          )}
        </MapView>
      ) : (
        <Text>Carregando localização...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300, 
  },
  map: {
    flex: 1,
  },
});

export default Map;
