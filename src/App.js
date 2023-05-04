
import { useEffect, useState} from 'react';
import './App.css';
import DriveFiles from './components/DriveFiles';


function App() {

  const [numeroBox, setNumeroBox] = useState ('');

  const Lanzar = () => {

    let min = 7;
    let max = 11;

    let numero = Math.random() * (max - min) + min;
    let numeroRedondo = Math.floor(numero);

    setNumeroBox ('./iZbox' + numeroRedondo + '.png');
  }

  // useEffect(() => {
  //   Lanzar();
  // },[])

  console.log(numeroBox)

  useEffect(() => {
    const interval = setInterval(() => {
      Lanzar();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  

  return (
    <div className="App">
    <img src={numeroBox} alt='box' className='boxImg'/>
      <DriveFiles />
    </div>
  );
}

export default App;
