import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Card, Title, Paragraph, useTheme} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../data/redux/store';
import {addToCart} from '../../data/redux/slices/cartSlice';
import FastImage from 'react-native-fast-image';

const ProductDetailScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const {productId} = route.params as {productId: number};
  const product: any = useSelector((state: RootState) =>
    state.products.products.find((p: any) => p.id === productId),
  );
  const {colors}: any = useTheme();

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  return (
    <View style={styles.container}>
      {product && (
        <Card style={styles.card}>
          <FastImage
            source={{uri: product.thumbnail}} // Menggunakan FastImage untuk memuat gambar dari URL
            style={styles.thumbnail}
            resizeMode={FastImage.resizeMode.cover} // Atur mode pengubahan ukuran
          />
          <Card.Content>
            <Title style={[styles.title, {color: colors.text}]}>
              {product.title}
            </Title>
            <Paragraph style={{color: colors.text}}>
              {product.description}
            </Paragraph>
            <Paragraph style={styles.price}>
              Price: ${product.price.toFixed(2)}
            </Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              onPress={handleAddToCart}
              style={styles.button}>
              Add to Cart
            </Button>
          </Card.Actions>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    elevation: 4,
    borderRadius: 8,
    marginBottom: 16,
  },
  thumbnail: {
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 12,
  },
  button: {
    marginLeft: 'auto',
  },
});

export default ProductDetailScreen;
