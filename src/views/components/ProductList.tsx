import React from 'react';
import {FlatList, ActivityIndicator, View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import ProductCard from './ProductCard';
import {useNavigation} from '@react-navigation/native';
import {useSelector, shallowEqual} from 'react-redux';
import {RootState} from '../../data/redux/store';
import {ProductModel} from '../../data/model/product.model';

interface ProductListProps {
  products: ProductModel[];
  loadingMore: boolean;
  hasMore: boolean;
  onEndReached: () => void;
}

const ProductList: React.FC<ProductListProps> = ({
  onEndReached,
  products,
  loadingMore,
  hasMore,
}) => {
  const {colors} = useTheme();
  const navigation: any = useNavigation();
  const cartItems: any[] = useSelector(
    (state: RootState) => state.cart.items,
    shallowEqual, // Optimize selector
  );

  const renderProduct = ({item}: {item: ProductModel}) => {
    const quantity = getProductQuantityInCart(item.id);

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

  const getProductQuantityInCart = (productId: number) => {
    const cartItem = cartItems.find((item: any) => item.id === productId);
    return cartItem ? cartItem.quantity : 0; // Return the quantity if exists, else 0
  };

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={products}
        keyExtractor={(item: any) => item.id.toString() + 'home_product'}
        renderItem={renderProduct}
        onEndReached={hasMore ? onEndReached : null}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 16,
  },
});

// Custom comparison function for React.memo
function areEqual(prevProps: ProductListProps, nextProps: ProductListProps) {
  // Compare each prop to avoid unnecessary re-renders
  return (
    prevProps?.products?.[0]?.id === nextProps?.products?.[0]?.id &&
    prevProps.products.length === nextProps.products.length
  );
}

// Wrap component with React.memo and custom comparison function
export default React.memo(ProductList, areEqual);
