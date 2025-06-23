// eslint-disable-next-line import/no-duplicates
import { Stack, useRouter } from 'expo-router'; // Digunakan untuk stack navigation
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
// import MapComponent from '@/components/MapComponent'; // Komponen untuk menampilkan peta

import { Ionicons } from '@expo/vector-icons'; // Untuk menggunakan icon dari Ionicons

export default function MapScreen() {
  // Fungsi untuk menangani aksi ketika tombol Unduh PDF diklik
  const handleDownloadPDF = () => {
    console.log('Unduh PDF');
    // Implementasikan fungsi untuk mengunduh PDF di sini
  };

  // Inisialisasi router dari expo-router untuk navigasi antar halaman
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Menggunakan Stack.Screen untuk menyembunyikan header */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Tombol Kembali untuk navigasi ke halaman sebelumnya */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Tombol Unduh untuk mengunduh PDF */}
      <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadPDF}>
        <View style={styles.downloadButtonContent}>
          <Text style={styles.downloadText}>Unduh PDF</Text>
          <Ionicons name="download-outline" size={20} color="#595BD4" />
        </View>
      </TouchableOpacity>

      {/* Lokasi Rumah + Map */}
      <View style={styles.section}>
        <Text style={styles.label}>Lokasi Rumah</Text>
        <View style={styles.mapSmallWrapper}>
          {/* <MapComponent
            locations={[]} // Data lokasi kosong untuk peta (mungkin akan diisi dengan data di masa depan)
            onMapLongPress={
              (latitude, longitude) => console.log(latitude, longitude) // Menangani event long press pada peta
            }
            onPoiLongPress={
              (name, latitude, longitude) => console.log(name, latitude, longitude) // Menangani event long press pada POI (point of interest)
            }
          /> */}
        </View>
      </View>

      {/* Foto Rumah + Gambar */}
      <View style={styles.section}>
        <Text style={styles.labels}>Foto Rumah</Text>
        <ImageBackground
          source={require('../../assets/images/perumahan.jpeg')} // Menampilkan gambar latar belakang
          style={styles.imageBackground}
        />
      </View>

      {/* Informasi Pemilik dan Penilaian */}
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Text style={styles.infoText}>Nama Pemilik: Rasta</Text>
          <Text style={styles.infoText}>Kecamatan: Nongsa</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Alamat: Jalan Batu Besar</Text>
          <Text style={styles.infoText}>Kelurahan: Batu Besar</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Jumlah KK: 1</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.infoText}>Nilai Kesehatan: 5</Text>
          <Text style={styles.infoText}>Nilai Komponen</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Nilai Keselamatan: 5</Text>
          <Text style={styles.infoText}>Dan Bahan Bangunan: 3</Text>
        </View>

        <Text style={[styles.infoText, { marginTop: 10 }]}>Nilai Total: 13</Text>

        <View style={styles.divider} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 95, // Padding untuk bagian atas layar
    paddingHorizontal: 20, // Padding untuk kiri dan kanan layar
  },
  section: {
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    marginBottom: 0,
    right: 50, // Mengatur posisi teks
  },
  labels: {
    fontSize: 10,
    marginBottom: 0,
    right: 95, // Mengatur posisi teks
  },
  mapSmallWrapper: {
    width: 180,
    height: 150,
    borderRadius: 20,
    overflow: 'hidden', // Membuat peta berbentuk bulat di sudut
    marginTop: 0,
  },
  downloadButton: {
    position: 'absolute',
    right: 10,
    top: 30,
    backgroundColor: '#FFFF', // Warna latar belakang tombol
    padding: 10,
    borderRadius: 50, // Bentuk tombol bulat
    elevation: 5, // Shadow untuk tombol
    zIndex: 1,
  },
  downloadButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadText: {
    marginRight: 8,
    fontSize: 10,
    fontWeight: '500',
    color: '#000',
  },
  imageBackground: {
    width: 260,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden', // Menyembunyikan bagian gambar yang keluar dari border
    backgroundColor: '#f0f0f0', // Warna latar belakang gambar
  },
  infoContainer: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    // backgroundColor: "#f9f9f9",
    marginTop: 10,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Memberikan jarak antara elemen
    width: '100%',
    marginVertical: 3,
  },
  infoText: {
    fontSize: 10,
    color: '#333',
  },
  divider: {
    borderBottomWidth: 1, // Membuat garis pemisah
    // borderBottomColor: "#aaa",
    width: '100%',
    marginVertical: 10,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 30,
    // backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    // elevation: 5,
    zIndex: 2, // Agar tombol kembali berada di atas tombol lainnya
  },
});
