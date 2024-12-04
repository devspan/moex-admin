import { createVuetify } from 'vuetify';

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          primary: '#2962FF',
          secondary: '#6E56CF',
          background: '#0A0B0D',
          surface: '#1A1B1F',
          success: '#00C087',
          error: '#FF396F',
          warning: '#FFB400',
        }
      }
    }
  }
}); 