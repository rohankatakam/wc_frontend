import { Outlet } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import WCAppBar from './components/WCAppBar';


function App() {
  return (
    <DataProvider>
      <WCAppBar />
      <Outlet />
    </DataProvider>
  );
}

export default App;
