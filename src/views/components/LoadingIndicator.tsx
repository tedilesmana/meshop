/* eslint-disable react-native/no-inline-styles */
// src/components/LoadingIndicator.tsx
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {useTheme} from '../../core/theme/ThemeContext'; // Assuming you have a theme context

const LoadingIndicator = () => {
  const {theme} = useTheme(); // Access the current theme

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme === 'light' ? '#fff' : '#000'},
      ]}>
      <ActivityIndicator
        size="large"
        color={theme === 'light' ? '#6200ee' : '#bb86fc'}
      />
      <Text style={[styles.text, {color: theme === 'light' ? '#000' : '#fff'}]}>
        Loading...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoadingIndicator;
