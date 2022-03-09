import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as axios from 'axios';
import { Marker } from 'react-native-maps';

const MapMarkers = (props: MapMarkersProps) => {
  const [universities, setUniversities] = useState<University[]>();
  useEffect(() => {
    axios.default
      .get(`http://localhost:3000/universities/${props.country}`)
      .then(({ data }) => {
        if (data) setUniversities(data);
      });
  }, []);

  return (
    <View>
      {
        universities?.map((marker: University, index: number) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.lat,
              longitude: marker.lng,
            }}
            title={Marker.name}
            description={Marker.name}>

            <Image
              style={styles.image}
              source={require('../assets/favicon.png')}
            />
          </Marker>
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  }
});


type University = {
  name: string;
  lat: number;
  lng: number;
}
type MapMarkersProps = {
  country: string;
}

export default MapMarkers