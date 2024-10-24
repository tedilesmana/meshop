/* eslint-disable react-native/no-inline-styles */
// SettingsScreen.tsx
import React from 'react';
import {View} from 'react-native';
import {Text, Switch, useTheme} from 'react-native-paper';
import {useTheme as useAppTheme} from '../../core/theme/ThemeContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import {useTranslation} from 'react-i18next';

const SettingsScreen = () => {
  const {t} = useTranslation();
  const {theme, toggleTheme} = useAppTheme();
  const paperTheme: any = useTheme();

  return (
    <View style={{flex: 1, backgroundColor: paperTheme.colors.backgroundLight}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: paperTheme.colors.text, fontSize: 20}}>
          {t('settings')}
        </Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <Text style={{color: paperTheme.colors.text}}>Dark Theme</Text>
          <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
        </View>
        <LanguageSwitcher />
      </View>
    </View>
  );
};

export default SettingsScreen;
