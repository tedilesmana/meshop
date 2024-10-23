import React, {useEffect} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '../redux/slices/productSlice';
import {RootState} from '../redux/store';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const dispatch: any = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const navigation: any = useNavigation();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({item}: any) => (
          <View>
            <Text>{item.title}</Text>
            <Button
              title="View Details"
              onPress={() =>
                navigation.navigate('ProductDetail', {productId: item.id})
              }
            />
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;
