// src/components/SplashScreen.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const CustomSplashScreen = () => {
  return (
    <View style={styles.container}>
      <FastImage
        source={require('../../core/assets/logo.png')} // Pastikan path ini sesuai
        style={styles.logo}
        resizeMode={FastImage.resizeMode.contain} // Menggunakan FastImage untuk resizeMode
      />
      <Text style={styles.title}>MeShop</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Ganti dengan warna background yang diinginkan
  },
  logo: {
    width: 150, // Atur ukuran logo sesuai kebutuhan
    height: 150,
  },
  title: {
    marginTop: 20, // Jarak antara logo dan teks
    fontSize: 24, // Ukuran font teks
    fontWeight: 'bold', // Tebal
    color: '#333', // Warna teks (ganti sesuai kebutuhan)
  },
});

export default CustomSplashScreen;
