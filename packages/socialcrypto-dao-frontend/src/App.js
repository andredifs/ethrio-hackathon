import './App.css';
import RoutesComponent from './routes'
import NavBar from './components/navbar/index'
import Footer from './components/footer/index'
import { DAppProvider } from '@usedapp/core'

function App() {
  return (
    <DAppProvider>
      <div className="App">
        <NavBar/>
        <RoutesComponent/>
        <Footer/>
      </div>
    </DAppProvider>
  );
}

export default App;