import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  Platform,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView, // Import ScrollView
  Dimensions,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';

// import MapComponent from '~/components/MapComponent';
const screenWidth = Dimensions.get('window').width;

// Define the Perumahan type
interface Perumahan {
  id: string;
  kecamatan: string;
  kelurahan: string;
  name: string;
  image: any;
  jumlahKK: number;
}

// Data perumahan sesuai format yang kamu minta
const perumahanData = [
  {
    id: '1',
    kecamatan: 'Nongsa',
    kelurahan: 'Batu Besar',
    name: 'Perumahan ARIRA GARDEN',
    image: require('../../assets/images/perumahan.jpeg'),
    jumlahKK: 30,
  },
  {
    id: '2',
    kecamatan: 'Nongsa',
    kelurahan: 'Batu Besar',
    name: 'Perumahan ARIRA GARDEN',
    image: require('../../assets/images/perumahan.jpeg'),
    jumlahKK: 30,
  },
  {
    id: '3',
    kecamatan: 'Nongsa',
    kelurahan: 'Batu Besar',
    name: 'Perumahan ARIRA GARDEN',
    image: require('../../assets/images/perumahan.jpeg'),
    jumlahKK: 30,
  },
  {
    id: '4',
    kecamatan: 'Batam Kota',
    kelurahan: 'Sungai Panas',
    name: 'Perumahan ARIRA GARDEN',
    image: require('../../assets/images/perumahan.jpeg'),
    jumlahKK: 30,
  },
  {
    id: '5',
    kecamatan: 'Batam Kota',
    kelurahan: 'Sungai Panas',
    name: 'Perumahan ARIRA GARDEN',
    image: require('../../assets/images/perumahan.jpeg'),
    jumlahKK: 30,
  },
  {
    id: '6',
    kecamatan: 'Batam Kota',
    kelurahan: 'Sungai Panas',
    name: 'Perumahan ARIRA GARDEN',
    image: require('../../assets/images/perumahan.jpeg'),
    jumlahKK: 30,
  },
  {
    id: '7',
    kecamatan: 'Sekupang',
    kelurahan: 'Sungai Harapan',
    name: 'Perumahan ARIRA GARDEN',
    image: require('../../assets/images/perumahan.jpeg'),
    jumlahKK: 30,
  },
  {
    id: '8',
    kecamatan: 'Sekupang',
    kelurahan: 'Sungai Harapan',
    name: 'Perumahan ARIRA GARDEN',
    image: require('../../assets/images/perumahan.jpeg'),
    jumlahKK: 30,
  },
  {
    id: '9',
    kecamatan: 'Sekupang',
    kelurahan: 'Sungai Harapan',
    name: 'Perumahan ARIRA GARDEN',
    image: require('../../assets/images/perumahan.jpeg'),
    jumlahKK: 30,
  },
];

export default function JumlahRLH() {
  const [kecamatan, setKecamatan] = useState<string | null>(null);
  const [kelurahan, setKelurahan] = useState<string | null>(null);
  const [numColumns, setNumColumns] = useState(3);
  const router = useRouter();

  const kecamatanData = [...new Set(perumahanData.map((item) => item.kecamatan))].map(
    (kecamatan) => ({ value: kecamatan, label: kecamatan })
  );

  const kelurahanData = kecamatan
    ? [
        ...new Set(
          perumahanData.filter((item) => item.kecamatan === kecamatan).map((item) => item.kelurahan)
        ),
      ].map((kelurahan) => ({ value: kelurahan, label: kelurahan }))
    : [];

  const filteredPerumahan = perumahanData.filter((item) => {
    if (!kecamatan && !kelurahan) {
      return true;
    }
    if (!kecamatan) {
      return item.kelurahan === kelurahan;
    }
    if (!kelurahan) {
      return item.kecamatan === kecamatan;
    }
    return item.kecamatan === kecamatan && item.kelurahan === kelurahan;
  });

  const groupByKecamatan = (data: Perumahan[]) => {
    const result: { kecamatan: string; perumahan: Perumahan[] }[] = [];
    const map = new Map();

    for (const item of data) {
      if (!map.has(item.kecamatan)) {
        map.set(item.kecamatan, []);
      }
      map.get(item.kecamatan).push(item);
    }

    for (const [kecamatan, perumahan] of map.entries()) {
      result.push({ kecamatan, perumahan });
    }

    return result;
  };

  const groupedPerumahan = groupByKecamatan(filteredPerumahan);

  // Combine static and dynamic sections into one data array
  const flatListData = [
    { type: 'dropdowns' },
    ...groupedPerumahan.map((item) => ({ type: 'kecamatan', data: item })),
  ];
  function hasData(item: {
    type: string;
    data?: { kecamatan: string; perumahan: Perumahan[] };
  }): item is {
    type: string;
    data: { kecamatan: string; perumahan: Perumahan[] };
  } {
    return (item as { data: any }).data !== undefined;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>

          <Text style={styles.title}>Jumlah Rumah Layak Huni</Text>
          <Text style={styles.label}>Peta Sebaran Rumah Layak Huni</Text>

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
          <View style={styles.dropdownContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputRowLabel}>Kecamatan:</Text>
              <View style={styles.dropdownWrapper}>
                <Dropdown
                  style={styles.dropdown}
                  selectedTextStyle={styles.selectedTextStyle}
                  placeholderStyle={styles.placeholderStyle}
                  value={kecamatan}
                  data={kecamatanData}
                  valueField="value"
                  labelField="label"
                  placeholder="-"
                  onChange={(e) => {
                    setKecamatan(e.value);
                    setKelurahan(null);
                  }}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputRowLabel}>Kelurahan:</Text>
              <View style={styles.dropdownWrapper}>
                <Dropdown
                  style={styles.dropdown}
                  selectedTextStyle={styles.selectedTextStyle}
                  placeholderStyle={styles.placeholderStyle}
                  value={kelurahan}
                  data={kelurahanData}
                  valueField="value"
                  labelField="label"
                  placeholder="-"
                  onChange={(e) => setKelurahan(e.value)}
                  disable={!kecamatan}
                />
              </View>
            </View>

            <Text style={styles.totalText}>
              Total: {filteredPerumahan.length} Rumah Layak Huni di Seluruh Kota Batam
            </Text>
          </View>

          {groupedPerumahan.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(`/Detail/LokasiRumah`)}
              activeOpacity={1}>
              <Text style={styles.kecamatanHeader}>{item.kecamatan}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {item.perumahan.map((p) => (
                  <View key={p.id} style={styles.perumahanCard}>
                    <Image source={p.image} style={styles.image} resizeMode="cover" />
                    <Text style={styles.housingName}>{p.name}</Text>
                    <Text style={styles.housingInfo}>Kecamatan {p.kecamatan}</Text>
                    <Text style={styles.housingInfo}>Kelurahan {p.kelurahan}</Text>
                    <Text style={styles.housingInfo}>Jumlah KK: {p.jumlahKK}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 30 : 20, // Padding atas untuk perangkat iOS dan Android
    paddingHorizontal: 20, // Padding horizontal
    backgroundColor: '#ffff', // Warna latar belakang putih
  },

  scrollView: {
    flex: 2, // Menentukan ukuran scrollView agar lebih fleksibel
  },

  title: {
    fontSize: 15, // Ukuran font untuk judul
    fontWeight: 'bold', // Menebalkan font judul
    marginBottom: 50, // Jarak bawah untuk memberi ruang
    right: 50, // Pemosisian judul ke kanan
    textAlign: 'center', // Menyelaraskan teks ke tengah
    top: 10, // Memberikan jarak atas
  },

  dropdownContainer: {
    width: 200, // Lebar dropdown container
    height: 120, // Tinggi dropdown container
    backgroundColor: '#FFFFFF', // Warna latar belakang putih
    borderRadius: 10, // Sudut yang melengkung pada container
    padding: 8, // Padding di dalam dropdown container
    justifyContent: 'center', // Menjaga isi tetap di tengah secara vertikal
    shadowColor: '#000', // Warna bayangan
    shadowOffset: { width: 4, height: 4 }, // Offset bayangan
    shadowOpacity: 0.25, // Opasitas bayangan
    shadowRadius: 4, // Jarak blur bayangan
    elevation: 5,
    left: 3, // Menambahkan elevasi agar terlihat sedikit melayang
  },

  inputGroup: {
    flexDirection: 'row', // Menyusun elemen dalam satu baris
    alignItems: 'center', // Menyelaraskan item secara vertikal
    marginBottom: 5, // Memberikan jarak bawah pada grup input
  },

  inputRowLabel: {
    fontSize: 10, // Ukuran font untuk label input
    marginRight: 5, // Jarak kanan untuk memberi ruang antar elemen
    width: 75, // Lebar label tetap
  },

  dropdownWrapper: {
    flex: 1, // Membiarkan dropdown wrapper mengambil sisa ruang
  },

  dropdown: {
    height: 20, // Tinggi dropdown
    backgroundColor: '#ffffff', // Warna latar belakang putih
    borderRadius: 15, // Sudut yang melengkung pada dropdown
    paddingHorizontal: 5, // Padding horizontal dalam dropdown
    borderWidth: 1, // Garis border di sekitar dropdown
    borderColor: '#ccc', // Warna border
    width: 110, // Lebar dropdown
    right: 25,
  },

  placeholderStyle: {
    fontSize: 10, // Ukuran font placeholder
    color: '#999', // Warna font placeholder
  },

  selectedTextStyle: {
    fontSize: 8, // Ukuran font teks yang dipilih
  },

  totalText: {
    fontSize: 10, // Ukuran font untuk total perumahan
    color: '#333', // Warna font total perumahan
    marginTop: 20, // Jarak atas agar tidak terlalu dekat dengan elemen sebelumnya
  },

  backButton: {
    left: 1, // Posisi kiri tombol kembali
    right: 10, // Posisi kanan tombol kembali
    top: 30, // Posisi atas tombol kembali
    zIndex: 1, // Menjaga tombol tetap di atas elemen lainnya
  },

  perumahanCard: {
    width: '30%', // atau 32%, tergantung margin/padding
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    marginHorizontal: 4, // Memberi jarak antar card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 105,
  },
  image: {
    width: '100%', // Lebar gambar sesuai dengan lebar kartu
    height: 60, // Tinggi gambar tetap
    borderRadius: 6, // Sudut melengkung pada gambar
  },

  housingName: {
    fontSize: 8, // Ukuran font untuk nama perumahan
    fontWeight: 'bold', // Menebalkan font nama perumahan
    textAlign: 'center', // Menyelaraskan teks nama ke tengah
    marginBottom: 2, // Memberikan jarak bawah
  },

  housingInfo: {
    fontSize: 6, // Ukuran font untuk informasi perumahan
    textAlign: 'center', // Menyelaraskan teks ke tengah
    color: '#555', // Warna font lebih gelap
    marginBottom: 2, // Memberikan jarak bawah
  },

  kecamatanHeader: {
    fontSize: 12, // Ukuran font untuk header kecamatan
    fontWeight: 'bold', // Menebalkan font header kecamatan
    marginBottom: 10, // Jarak bawah untuk memberi ruang
    marginTop: 20, // Jarak atas agar lebih terpisah
  },
  label: {
    fontSize: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  mapSmallWrapper: {
    width: 320, // Lebar map disesuaikan dari layar
    height: 179,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
});
