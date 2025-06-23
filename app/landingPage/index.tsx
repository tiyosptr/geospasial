import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function LandingPage() {
  const router = useRouter();

  const handlePress = () => {
    router.push('/auth');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/map.png')}
        style={styles.background}
        resizeMode="cover">
        {/* Overlay dengan opacity */}
        <View style={styles.backgroundOverlay} />

        {/* Konten */}
        <View style={styles.overlay}>
          <Text style={styles.title}>
            GEOSPASIAL <Text style={styles.highlight}>DISPERKIMTAN</Text>
            {'\n'}KOTA BATAM
          </Text>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Daftar / Masuk</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    position: 'relative',
  },

  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // ubah nilai opacity di sini
  },
  overlay: {
    alignItems: 'center',
    paddingBottom: 60,
  },
  title: {
    color: '#555',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  highlight: {
    color: '#3A7BFF',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#3A7BFF',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
