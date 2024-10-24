import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../data/redux/store';
import {useNavigation} from '@react-navigation/native';
import {useTheme, Text} from 'react-native-paper';
import ProductCard from '../components/ProductCard';

const FavoritesScreen = () => {
  const cartItems: any = useSelector((state: RootState) => state.cart.items);
  const navigation: any = useNavigation();
  const {colors}: any = useTheme();

  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  const getProductQuantityInCart = (productId: number) => {
    const cartItem = cartItems.find((item: any) => item.id === productId);
    return cartItem ? cartItem.quantity : 0; // Return the quantity if exists, else 0
  };

  const renderFavoriteItem = ({item}: any) => {
    const quantity = getProductQuantityInCart(item.id); // Get quantity from cart

    return (
      <ProductCard
        item={item}
        colors={colors}
        quantity={quantity}
        onViewDetails={() => {
          navigation.navigate('ProductDetail', {productId: item.id});
        }}
      />
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundLight}]}>
      {favorites.length === 0 ? (
        <View style={styles.containerEmpty}>
          <Text
            style={[
              styles.message,
              {borderColor: colors.background, color: colors.text},
            ]}>
            No favorites yet
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item: any) => item?.id + 'favorite'}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 4,
  },
  thumbnail: {
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});

export default FavoritesScreen;
