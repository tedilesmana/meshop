/* eslint-disable react-native/no-inline-styles */
// src/screens/CategoryListScreen.tsx
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  Card,
  Title,
  useTheme,
  ActivityIndicator,
  Button,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../data/redux/store';
import {useNavigation} from '@react-navigation/native';
import {fetchCategories} from '../../data/redux/slices/categoriesSlice';
import {
  clearSelectedCategory,
  setSelectedCategory,
} from '../../data/redux/slices/selectedCategorySlice';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons

const CategoryListScreen = () => {
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();
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
    dispatch(setSelectedCategory(category)); // Save the category in global state
    navigation.goBack(); // Navigate back to the HomeScreen
  };

  const handleClearCategory = () => {
    dispatch(clearSelectedCategory()); // Save the category in global state
    navigation.goBack(); // Navigate back to the HomeScreen
  };

  return (
    <View>
      <Button
        mode="contained"
        onPress={() => {
          handleClearCategory();
        }}
        contentStyle={{flexDirection: 'row-reverse'}}
        icon={'chevron-right'}
        style={{
          width: '100%',
          marginBottom: 15,
        }}>
        {'Clear Category'}
      </Button>
      <FlatList
        data={categories}
        keyExtractor={item => item.slug + 'slug_category'}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleSelectCategory(item)}>
            <Card style={[styles.card, {backgroundColor: colors.card}]}>
              <View style={styles.row}>
                <Title style={{color: colors.text, fontSize: 14}}>
                  {item.name}
                </Title>
                <Icon name="chevron-forward" size={24} color={colors.text} />
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default CategoryListScreen;
