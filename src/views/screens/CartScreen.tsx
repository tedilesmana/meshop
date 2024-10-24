import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Card, Title, Paragraph, Button, useTheme} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../data/redux/store';
import {
  addToCart,
  reduceFromCart,
  deleteFromCart,
} from '../../data/redux/slices/cartSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native'; // Import the navigation hook
import FastImage from 'react-native-fast-image';

const CartScreen = () => {
  const {colors}: any = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Get navigation object
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Navigate back if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigation.goBack(); // Navigate to the previous screen
    }
  }, [cartItems, navigation]);

  const renderItem = ({item}: any) => {
    const itemTotal = item.price * item.quantity; // Calculate total for the item

    return (
      <Card style={styles.card}>
        <FastImage
          source={{uri: item.thumbnail}} // Menggunakan FastImage untuk memuat gambar dari URL
          style={styles.thumbnail}
          resizeMode={FastImage.resizeMode.cover} // Atur mode pengubahan ukuran
        />
        <Card.Content>
          <Title style={{color: colors.text}}>{item.title}</Title>
          <Paragraph style={{color: colors.text}}>
            Price: ${item.price.toFixed(2)}
          </Paragraph>
          <Paragraph style={{color: colors.text}}>
            Quantity: {item.quantity}
          </Paragraph>
          <Paragraph style={{color: colors.text}}>
            Total: ${itemTotal.toFixed(2)}
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="outlined"
            onPress={() => dispatch(addToCart(item))}
            style={styles.button}>
            <Icon name="add" size={24} color={colors.primary} />
          </Button>
          <Button
            mode="outlined"
            onPress={() => dispatch(reduceFromCart(item.id))}
            style={styles.button}>
            <Icon name="remove" size={24} color={colors.primary} />
          </Button>
          <Button
            mode="contained"
            onPress={() => dispatch(deleteFromCart(item.id))}
            style={styles.deleteButton}>
            <Icon name="delete" size={24} color="#fff" />
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  const grandTotal = cartItems.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0,
  );

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <FlatList
        data={cartItems}
        keyExtractor={(item: any) => item.id.toString() + 'cart'}
        renderItem={renderItem}
      />
      <View style={[styles.totalContainer, {backgroundColor: colors.surface}]}>
        <Title style={{color: colors.text}}>
          Grand Total: ${grandTotal.toFixed(2)}
        </Title>
        <Button
          mode="contained"
          onPress={() => console.log('Proceed to Checkout')}>
          Proceed to Checkout
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  thumbnail: {
    height: 150,
  },
  totalContainer: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  button: {
    marginHorizontal: 4,
  },
  deleteButton: {
    marginHorizontal: 4,
    backgroundColor: '#ff1744', // Optional: Set a red background for delete
  },
});

export default CartScreen;
