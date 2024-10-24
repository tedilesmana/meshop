import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Title, Text, useTheme} from 'react-native-paper';

const NoProductsFound = () => {
  const {colors}: any = useTheme();

  return (
    <View style={styles.container}>
      <Card style={[styles.card, {backgroundColor: colors.card}]}>
        <Card.Content style={styles.cardContent}>
          <Title style={{color: colors.text}}>No Products Found</Title>
          <Text style={{color: colors.text}}>
            We couldn't find any products matching your search.
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'transparent',
  },
  card: {
    width: '100%',
    borderRadius: 8,
    elevation: 4,
  },
  cardContent: {
    alignItems: 'center',
  },
  retryButton: {
    marginTop: 16,
  },
});

export default NoProductsFound;
