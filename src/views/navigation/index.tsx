import React, {memo, Suspense} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {
  useTheme,
  customDarkTheme,
  customDefaultTheme,
} from '../../core/theme/ThemeContext';
import LoadingIndicator from '../components/LoadingIndicator';
import Icon from 'react-native-vector-icons/Ionicons';
import FloatingButton from '../components/FloatingButton';
import FavoritesScreen from '../screens/FavoritesScreen';
import CategoryListScreen from '../screens/CategoryListScreen';

// Type definitions for Stack and Tab Navigators
const Stack = createStackNavigator<any>();
const Tab = createBottomTabNavigator<any>();

// Define the icons outside the component
const homeIcon = ({color, size}: any) => (
  <Icon name="home-outline" color={color} size={size} />
);
const settingsIcon = ({color, size}: any) => (
  <Icon name="settings-outline" color={color} size={size} />
);
const favoritesIcon = ({color, size}: any) => (
  <Icon name="heart-outline" color={color} size={size} />
);

// Bottom tab navigator with Home and Settings
const BottomTabNavigator = () => {
  const {theme} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme === 'light' ? '#6200ee' : '#bb86fc',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: theme === 'light' ? '#fff' : '#000',
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: homeIcon,
        }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{
          title: 'Favorites',
          tabBarIcon: favoritesIcon,
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          title: 'Setting',
          tabBarIcon: settingsIcon,
        }}
      />
    </Tab.Navigator>
  );
};

// Main navigation container with the root stack
const Navigation = () => {
  const {theme} = useTheme();
  return (
    <NavigationContainer
      theme={theme === 'light' ? customDefaultTheme : customDarkTheme}>
      <Suspense fallback={<LoadingIndicator />}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Main" component={BottomTabNavigator} />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
            options={{title: 'Product Detail', headerShown: true}}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{title: 'Cart', headerShown: true}}
          />
          <Stack.Screen
            name="Category"
            component={CategoryListScreen}
            options={{title: 'Category', headerShown: true}}
          />
        </Stack.Navigator>
        <FloatingButton />
      </Suspense>
    </NavigationContainer>
  );
};

export default memo(Navigation);
