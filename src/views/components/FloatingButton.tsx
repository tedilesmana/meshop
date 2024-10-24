/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FAB, Badge} from 'react-native-paper';
import {useTheme} from '../../core/theme/ThemeContext'; // Assuming you have a theme context
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../data/redux/store';
import Icon from 'react-native-vector-icons/Ionicons';

interface FloatingButtonProps {}

const FloatingButton = ({}: FloatingButtonProps) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const {theme} = useTheme(); // Access the current theme
  const navigation: any = useNavigation();

  return (
    <>
      {(cartItems ?? []).length > 0 && (
        <View style={styles.container}>
          <FAB
            style={[
              styles.fab,
              {
                backgroundColor: theme === 'light' ? '#6200ee' : '#bb86fc',
              },
            ]}
            icon={() => <Icon name="cart" size={20} color="#fff" />} // Ganti 'home' dengan ikon panah
            color={theme === 'light' ? '#fff' : '#000'}
            onPress={() => navigation.navigate('Cart')}
          />

          {/* Badge for cart count */}
          <Badge style={styles.badge} size={20}>
            {cartItems.length}
          </Badge>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    bottom: 50,
    zIndex: 100,
  },
  fab: {
    borderRadius: 50,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: 'red', // Customize color for visibility
    color: 'white',
  },
});

export default FloatingButton;
