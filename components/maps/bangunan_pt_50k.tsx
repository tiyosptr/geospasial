import Mapbox from '@rnmapbox/maps';
import { Stack } from 'expo-router';
import { Button, Modal, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '~/lib/supabase';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

export default function MapBangunanPT() {
  const [geojson, setGeojson] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [selectedFeatureId, setSelectedFeatureId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/streets-v12');
  const [showStyleOptions, setShowStyleOptions] = useState(false);

  const mapStyles = [
    { name: 'Default', url: 'mapbox://styles/mapbox/streets-v12' },
    { name: 'Satellite', url: 'mapbox://styles/mapbox/satellite-v9' },
    { name: 'Satellite + Labels', url: 'mapbox://styles/mapbox/satellite-streets-v12' },
    { name: 'Terrain', url: 'mapbox://styles/mapbox/outdoors-v12' },
  ];

  const cameraRef = useRef(null);

  const fitBoundsToGeojson = (geojson) => {
    if (!cameraRef.current || !geojson || !geojson.features.length) return;

    let minLng = Infinity,
      minLat = Infinity,
      maxLng = -Infinity,
      maxLat = -Infinity;

    geojson.features.forEach((feature) => {
      const [lng, lat] = feature.geometry.coordinates;
      minLng = Math.min(minLng, lng);
      minLat = Math.min(minLat, lat);
      maxLng = Math.max(maxLng, lng);
      maxLat = Math.max(maxLat, lat);
    });

    cameraRef.current.fitBounds([minLng, minLat], [maxLng, maxLat], 100);
  };

  useEffect(() => {
    const fetchGeoData = async () => {
      const { data, error } = await supabase
        .from('bangunan_pt_50k')
        .select('id, namobj, fcode, remark, srs_id, lcode, metadata, geom');

      if (error) {
        console.error('Error fetching point data:', error);
        return;
      }

      const features = data
        .filter((item) => item.geom?.type === 'Point')
        .map((item) => ({
          type: 'Feature',
          geometry: item.geom,
          properties: {
            ...item,
            feature_id: item.id,
          },
          id: item.id,
        }));

      const geo = {
        type: 'FeatureCollection',
        features,
      };

      setGeojson(geo);
      fitBoundsToGeojson(geo);
    };

    fetchGeoData();
  }, []);

  const handleFeaturePress = (event) => {
    const features = event.features;
    if (features && features.length > 0) {
      const feature = features[0];
      setSelectedFeature(feature.properties);
      setSelectedFeatureId(feature.id);
      setModalVisible(true);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Map', headerShown: false }} />

      <View style={{ flex: 1 }}>
        <Mapbox.MapView style={{ flex: 1 }} styleURL={mapStyle}>
          <Mapbox.Camera ref={cameraRef} zoomLevel={12} centerCoordinate={[104.0, 1.1]} />

          {geojson && (
            <Mapbox.ShapeSource id="pointSource" shape={geojson} onPress={handleFeaturePress}>
              <Mapbox.CircleLayer
                id="pointLayer"
                style={{
                  circleColor: 'blue',
                  circleRadius: 6,
                  circleStrokeWidth: 1,
                  circleStrokeColor: '#fff',
                }}
              />
            </Mapbox.ShapeSource>
          )}
        </Mapbox.MapView>

        {/* Map Style FAB */}
        <View style={{ position: 'absolute', bottom: 90, right: 20, alignItems: 'flex-end' }}>
          {showStyleOptions &&
            mapStyles.map((style) => (
              <TouchableOpacity
                key={style.url}
                onPress={() => {
                  setMapStyle(style.url);
                  setShowStyleOptions(false);
                }}
                style={{
                  backgroundColor: 'white',
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 8,
                  marginBottom: 8,
                  elevation: 4,
                  shadowColor: '#000',
                  shadowOpacity: 0.2,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 3,
                }}>
                <Text>{style.name}</Text>
              </TouchableOpacity>
            ))}

          <TouchableOpacity
            onPress={() => setShowStyleOptions(!showStyleOptions)}
            style={{
              backgroundColor: '#e91e63',
              width: 56,
              height: 56,
              borderRadius: 28,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 6,
              shadowColor: '#000',
              shadowOpacity: 0.3,
              shadowOffset: { width: 0, height: 3 },
              shadowRadius: 5,
            }}>
            <Text style={{ color: 'white', fontSize: 24 }}>🗺️</Text>
          </TouchableOpacity>
        </View>

        {/* Modal Detail Titik */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setModalVisible(false)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
            <View
              style={{
                backgroundColor: '#fff',
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                padding: 20,
                maxHeight: '60%',
              }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Detail Titik</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={{ fontSize: 16, color: 'blue' }}>Tutup</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={{ marginTop: 10 }}>
                {selectedFeature &&
                  Object.entries(selectedFeature).map(([key, value]) => (
                    <Text key={key} style={{ marginBottom: 6 }}>
                      {key}: {String(value)}
                    </Text>
                  ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}
