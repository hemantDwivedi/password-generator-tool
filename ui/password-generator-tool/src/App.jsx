import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import Generate from './components/Generate';
import Header from './components/Header';

function App() {

  return (
    <>
      <Header />
      <Generate />
    </>
  )
}

export default App