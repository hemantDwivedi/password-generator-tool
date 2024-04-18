import { useState } from 'react';
import Generate from './components/Generate';
import Header from './components/Header';
import Social from './components/Social';

function App() {

  const [darkMode, setDarkMode] = useState(false);

  function handleOnClick(){
    setDarkMode(!darkMode);
  }

  return (
    <>
      <div
      className=
      {
        (darkMode == false) ? "bg-slate-950 text-gray-300" : "text-gray-800 bg-gray-200"
      }
      >
        <Header handleOnClick={handleOnClick} />
        <Generate darkMode={darkMode} />
        <Social/>
      </div>
    </>
  )
}

export default App;