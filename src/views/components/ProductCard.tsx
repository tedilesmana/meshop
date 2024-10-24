/* eslint-disable react-native/no-inline-styles */
// ProductCard.tsx
import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Card, Title, Paragraph, Button} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../data/redux/slices/cartSlice';
import {
  addFavorite,
  removeFavorite,
} from '../../data/redux/slices/favoritesSlice';
import {ProductModel} from '../../data/model/product.model';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RootState} from '../../data/redux/store';

interface ProductCardProps {
  item: ProductModel; // Replace 'any' with a proper type if you have a defined structure for your product
  colors: any; // Pass the colors object for styling
  quantity: number;
  onViewDetails: () => void;
}

const ProductCard: React.FC<ProductCardProps> = memo(
  ({item, colors, quantity, onViewDetails}) => {
    const favorites: any[] = useSelector(
      (state: RootState) => state.favorites.favorites,
      shallowEqual, // Optimize selector
    );
    const isFavorite = favorites.find((el: any) => item.id === el.id);
    const dispatch: any = useDispatch();

    const handleAddToCart = (product: any) => {
      if (product) {
        dispatch(addToCart(product));
      }
    };

    const handleToggleFavorite = () => {
      if (isFavorite) {
        dispatch(removeFavorite(item)); // Remove from favorites
      } else {
        dispatch(addFavorite(item)); // Add to favorites
      }
    };

    return (
      <Card style={[styles.card, {backgroundColor: colors.card}]}>
        <FastImage
          source={{uri: item.thumbnail}}
          style={styles.thumbnail}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Card.Content>
          <Title style={{color: colors.text}}>{item.title}</Title>
          <Paragraph style={{color: colors.text}}>
            Price: ${item.price.toFixed(2)}
          </Paragraph>
          {item.description && (
            <Text
              numberOfLines={1}
              style={[styles.description, {color: colors.text}]}>
              {item.description}
            </Text>
          )}
          {(quantity ?? 0) > 0 && (
            <Paragraph style={{color: colors.text}}>
              In Cart: {quantity}
            </Paragraph>
          )}
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => handleAddToCart(item)}>
            Add to Cart
          </Button>
          <TouchableOpacity
            onPress={onViewDetails}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="visibility" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleToggleFavorite}
            style={{alignItems: 'center'}}>
            <Icon
              name={isFavorite ? 'favorite' : 'favorite-border'} // Heart filled or outline
              size={24}
              color={isFavorite ? 'pink' : 'gray'} // Color based on favorite state
            />
          </TouchableOpacity>
        </Card.Actions>
      </Card>
    );
  },
);

const styles = StyleSheet.create({
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
  description: {
    color: 'gray', // Set color for description text
    overflow: 'hidden', // Hide overflow text
  },
});

export default ProductCard;
