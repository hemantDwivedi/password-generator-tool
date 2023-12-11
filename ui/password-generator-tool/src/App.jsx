import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import Generate from './components/Generate';
import Description from './components/Description';
import Header from './components/Header';

function App() {

  return (
    <>
      <Header />
      <Description />
      <Generate />
    </>
  )
}

export default App