import './App.css';
import Generate from './components/Generate';
import Header from './components/Header';

function App() {

  return (
    <>
      <div className="bg-slate-950 text-green-700">
        <Header />
        <Generate />
      </div>
    </>
  )
}

export default App