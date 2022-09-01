import React, { useEffect, useState } from "react";
import {default as axios} from 'axios';
import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import MapView, { Marker } from 'react-native-maps';

const SearchResults = () => {
  const route = useRoute<RouteProps>();
  const { term } = route.params;

  const [country, setCountry] = useState<GeocodeResult>();
  const [universities, setUniversity] = useState<University[]>();

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:3000/locations/${term}`),
      axios.get(`http://localhost:3000/universities/${term}`),
    ])
      .then(([{ data: locationResults }, { data: universitiesResults }]) => {
        if (locationResults) setCountry(locationResults);
        if (universitiesResults) setUniversity(universitiesResults);
      });
  }, []);

  return (
    <SafeAreaView>
      {country && term &&
        <MapView
          style={styles.map}
          provider='google'
          initialRegion={{
            latitude: country.geometry.location.latitude,
            longitude: country.geometry.location.longitude,
            latitudeDelta: country.geometry.location.latitude,
            longitudeDelta: country.geometry.location.longitude,
          }}
        >
          {
            universities?.map((marker: University, index: number) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.lat,
                  longitude: marker.lng,
                }}
                title={marker.name}>
              </Marker>
            ))
          }
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
type University = {
  name: string;
  lat: number;
  lng: number;
}
export default SearchResults