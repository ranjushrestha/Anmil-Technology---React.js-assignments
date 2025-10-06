import Subscribe from './pages/Subscribe';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Subscribe />
    </ThemeProvider>
  );
}

export default App;
