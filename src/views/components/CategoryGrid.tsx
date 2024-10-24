import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {Button, Card, useTheme, ActivityIndicator} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../data/redux/store';
import {fetchCategories} from '../../data/redux/slices/categoriesSlice';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Grid from 'react-native-grid-component';
import {setSelectedCategory} from '../../data/redux/slices/selectedCategorySlice';

const CategoryGrid = () => {
  const dispatch: any = useDispatch();
  const {colors}: any = useTheme();
  const {categories, loading} = useSelector(
    (state: RootState) => state.categories,
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return <ActivityIndicator animating={true} color={colors.primary} />;
  }

  const handleSelectCategory = (category: any) => {
    dispatch(setSelectedCategory(category));
  };

  const cardWidth = Dimensions.get('window').width / 5 - 20; // Dynamic width for 5 items per row

  return (
    <View style={styles.container}>
      <Grid
        style={styles.gridView}
        data={categories.slice(0, 10)} // Adjust for the number of items (10 in this case)
        numColumns={5} // Set 5 items per row
        renderItem={(item: any) => {
          return (
            <TouchableOpacity
              key={item.slug + 'grid_kategori'}
              onPress={() => handleSelectCategory(item)}>
              <Card
                style={[
                  styles.card,
                  {
                    backgroundColor: colors.card,
                    width: cardWidth,
                    margin:
                      (Dimensions.get('window').width - cardWidth * 5 - 30) /
                      10,
                  },
                ]}>
                <Card.Content style={styles.cardContent}>
                  <Text style={[styles.title, {color: colors.text}]}>tes</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          );
        }}
      />
      <Button
        mode="contained"
        onPress={() => {
          /* Navigate to full category list */
        }}
        style={styles.button}>
        More
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridView: {
    flex: 1,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default CategoryGrid;
