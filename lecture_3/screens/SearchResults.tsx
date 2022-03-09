import React, { useState } from "react";
import { useEffect } from "react";
import * as axios from 'axios';
import { Button, Dimensions, SafeAreaView, StyleSheet, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import MapView from 'react-native-maps';
import MapMarkers from "../components/MapMarkers";

const SearchResults = () => {
  const route = useRoute<RouteProps>();
  const { term } = route.params;

  const [country, setCountry] = useState<GeocodeResult>();
  const [_, setViewport] = useState<Region>();

  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  let latitudeDelta, longitudeDelta;
  if (country) {
    latitudeDelta = country.geometry.bounds.northeast.latitude - country.geometry.bounds.northeast.longitude;
    longitudeDelta = latitudeDelta * ASPECT_RATIO;
  }

  useEffect(() => {
    axios.default
      .get(`http://localhost:3000/locations/${term}`)
      .then(({ data }) => {
        if (data) setCountry(data);
      });
  }, []);

  return (
    <SafeAreaView>
      <Button
        onPress={() => console.log('List Univeristies Button')}
        title="List Universities"
        color="#841584"
        accessibilityLabel="Learn more"
      />

      {country && term && latitudeDelta && longitudeDelta &&
        <MapView
          style={styles.map}
          zoomControlEnabled={true}
          provider='google'
          onRegionChange={(region) => setViewport({ region })}
          initialRegion={{
            latitude: country.geometry.location.latitude,
            longitude: country.geometry.location.longitude,
            latitudeDelta, // delta between origin bounds and client viewport
            longitudeDelta, // delta between origin bounds and client viewport
          }}
        >
          <MapMarkers country={term} />
        </MapView>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

type RouteParams = {
  term: string;
};

type RouteProps = {
  params: RouteParams
  name: string;
  key: string;
};

type GeometryCoordinates = {
  latitude: number;
  longitude: number;
}
type GeometryBounds = {
  northeast: GeometryCoordinates;
  southwest: GeometryCoordinates;
}
type GeometryResult = {
  bounds: GeometryBounds;
  location: GeometryCoordinates;
}
type GeocodeResult = {
  geometry: GeometryResult;
}

type RegionCoordinates = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
type Region = {
  region: RegionCoordinates;
}

export default SearchResults