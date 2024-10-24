/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  ActivityIndicator,
  Button,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {
  fetchProducts,
  resetProducts,
} from '../../data/redux/slices/productSlice';
import {RootState} from '../../data/redux/store';
import {useNavigation} from '@react-navigation/native';
import ProductList from '../components/ProductList';
import NoProductsFound from '../components/NoProductsFound';
import {ProductModel} from '../../data/model/product.model';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen: React.FC = () => {
  const dispatch: any = useDispatch();
  const products: ProductModel[] = useSelector(
    (state: RootState) => state.products.products,
    shallowEqual, // Optimize selector
  );
  const selectedCategory: any = useSelector(
    (state: RootState) => state.selectedCategory,
    shallowEqual, // Optimize selector
  );
  const navigation: any = useNavigation();
  const {colors}: any = useTheme();

  const [page, setPage] = useState<number>(0);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const hasMore: boolean = useSelector(
    (state: RootState) => state.products.hasMore,
    shallowEqual, // Optimize selector
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const pageRef = useRef(page);

  useEffect(() => {
    pageRef.current = page; // selalu update pageRef saat page berubah
  }, [page]);

  // Memoize loadProducts with useCallback
  const loadProductsMore = useCallback(
    (currentPage: number, query = '', category = '') => {
      if (loadingMore || !hasMore) {
        return;
      }

      setLoadingMore(true);
      dispatch(fetchProducts({limit: 5, skip: currentPage, query, category}))
        .unwrap()
        .finally(() => {
          setLoadingMore(false);
          setPage(prevPage => prevPage + 1);
        });
    },
    [loadingMore, hasMore, dispatch], // Dependencies for useCallback
  );

  // Memoize loadProducts with useCallback
  const loadProducts = useCallback(
    (currentPage: number, query = '', category = '') => {
      if (loadingMore || !hasMore) {
        return;
      }

      setIsLoading(true);
      dispatch(fetchProducts({limit: 5, skip: currentPage, query, category}))
        .unwrap()
        .finally(() => {
          setIsLoading(false);
          setPage(prevPage => prevPage + 1);
        });
    },
    [loadingMore, hasMore, dispatch], // Dependencies for useCallback
  );

  useEffect(() => {
    const category = selectedCategory?.category?.slug;
    if (!!category && category !== '') {
      dispatch(resetProducts());
      setPage(0); // Reset to first page
      loadProducts(0, '', category);
    }
  }, [selectedCategory?.category?.slug]);

  useEffect(() => {
    loadProducts(page * 5); // Load products for the current page
    return () => {
      dispatch(resetProducts()); // Reset products on unmount
    };
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(resetProducts());
    setPage(0); // Reset page to 0 for new search
    loadProducts(0, searchQuery); // Load products based on search query
  };

  const onEndReached = useCallback(() => {
    loadProductsMore(pageRef.current * 5, searchQuery);
  }, [searchQuery]);

  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundLight}]}>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Category')}
        contentStyle={{flexDirection: 'row-reverse'}}
        icon={() => <Icon name="arrow-forward" size={20} color="#fff" />} // Ganti 'home' dengan ikon panah
        style={{
          width: '100%',
          marginBottom: 15,
        }}>
        {selectedCategory?.category?.name ?? 'Select Category'}
      </Button>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={[
            styles.searchInput,
            {backgroundColor: colors.surface, color: colors.text},
          ]}
          placeholderTextColor={colors.placeholder}
        />
        <Button mode="contained" onPress={handleSearch}>
          Search
        </Button>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <>
          {products.length > 0 ? (
            <ProductList
              products={products}
              loadingMore={loadingMore}
              hasMore={hasMore}
              onEndReached={onEndReached}
            />
          ) : (
            <NoProductsFound />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 8,
  },
});

export default HomeScreen;
