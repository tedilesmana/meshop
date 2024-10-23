import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

const ProductDetailScreen = () => {
  const route = useRoute();
  const navigation: any = useNavigation();
  const {productId} = route.params as {productId: number};
  const product: any = useSelector((state: RootState) =>
    state.products.products.find((p: any) => p.id === productId),
  );

  return (
    <View>
      <Text>{product?.title}</Text>
      <Text>{product?.description}</Text>
      <Text>Price: {product?.price}</Text>
      <Button title="Add to Cart" onPress={() => navigation.navigate('Cart')} />
    </View>
  );
};

export default ProductDetailScreen;
