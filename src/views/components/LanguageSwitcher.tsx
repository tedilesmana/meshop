import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

const LanguageSwitcher = () => {
  const {i18n, t} = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>{t('language')}:</Text>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            style={[
              styles.button,
              i18n.language === 'en' && styles.activeButton,
            ]}
            onPress={() => changeLanguage('en')}>
            English
          </Button>
          <Button
            mode="contained"
            style={[
              styles.button,
              i18n.language === 'id' && styles.activeButton,
            ]}
            onPress={() => changeLanguage('id')}>
            Indonesia
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    elevation: 4,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    marginHorizontal: 8,
    borderRadius: 4,
    backgroundColor: 'gray', // Inactive button color
  },
  activeButton: {
    backgroundColor: '#6200ee', // Active button color
  },
});

export default LanguageSwitcher;
