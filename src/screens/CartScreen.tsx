import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

const CartScreen = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <View>
      <FlatList
        data={cartItems}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({item}: any) => (
          <View>
            <Text>{item.title}</Text>
            <Text>Price: {item.price}</Text>
          </View>
        )}
      />
      <Text>
        Total: {cartItems.reduce((total: any, item: any) => total + item.price, 0)}
      </Text>
    </View>
  );
};

export default CartScreen;
