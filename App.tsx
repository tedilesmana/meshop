// App.tsx
import React, {Suspense, useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {store} from './src/data/redux/store';
import {ThemeProvider} from './src/core/theme/ThemeContext';
import i18n from './src/core/locales/i18n';
import {I18nextProvider} from 'react-i18next';
import {Text} from 'react-native-paper';
import LoadingIndicator from './src/views/components/LoadingIndicator';
import CustomSplashScreen from './src/views/components/SplashScreen'; // Import splash screen
import Navigation from './src/views/navigation';

class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(): {hasError: boolean} {
    return {hasError: true};
  }

  componentDidCatch(error: any) {
    console.log('Error caught in ErrorBoundary:', error);
  }

  render() {
    if (this.state.hasError) {
      return <Text>Something went wrong.</Text>;
    }
    return this.props.children;
  }
}

const App = () => {
  const [loading, setLoading] = useState(true); // State untuk mengontrol loading

  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide(); // Sembunyikan splash screen setelah beberapa detik
      setLoading(false); // Set loading ke false
    }, 3000); // Durasi splash screen (3 detik)

    return () => clearTimeout(timer); // Bersihkan timer
  }, []);

  if (loading) {
    return <CustomSplashScreen />; // Tampilkan splash screen selama loading
  }

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <Provider store={store}>
          <ErrorBoundary>
            <Suspense fallback={<LoadingIndicator />}>
              <Navigation />
            </Suspense>
          </ErrorBoundary>
        </Provider>
      </ThemeProvider>
    </I18nextProvider>
  );
};

export default App;
