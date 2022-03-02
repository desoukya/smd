import HomeScreen from './screens/HomeScreen';
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';

const App = () => (
  <TailwindProvider utilities={utilities}>
    <HomeScreen />
  </TailwindProvider>
);

export default App;