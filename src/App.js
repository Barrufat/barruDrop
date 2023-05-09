
import { useEffect, useState } from 'react';
import './App.css';

import DriveFiles from './components/DriveFiles';
import DriveFilesRes from './components/DriveFilesRes';
import Modal from './components/modal';
import useMediaQuery from './config/useMediaQuery';


function App() {

  const [numeroBox, setNumeroBox] = useState('./iZbox8.png');
  const [numeroBoxRes, setNumeroBoxRes] = useState('./box6res.png');
  const [toggleModal, setToggleModal] = useState(true);
  const [usuario, setUsuario] = useState('');

  const matches = useMediaQuery("(min-width: 800px)");

  const setName = (name) => {
    setUsuario(name);
  }

  const Lanzar = () => {

    let min = 7;
    let max = 11;

    let numero = Math.random() * (max - min) + min;
    let numeroRedondo = Math.floor(numero);

    setNumeroBox('./iZbox' + numeroRedondo + '.png');
  }

  const LanzarRes = () => {

    let min = 1;
    let max = 7;

    let numero = Math.random() * (max - min) + min;
    let numeroRedondo = Math.floor(numero);

    setNumeroBoxRes('./box' + numeroRedondo + 'res.png');
  }

  console.log(numeroBox)
  console.log('boxRes:', numeroBoxRes)

  useEffect(() => {
    const interval = setInterval(() => {
      Lanzar();
      LanzarRes();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const cerrarModal = (estado) => {
    setToggleModal(estado);
  }


  return (
    <div className="App">
      <Modal estado={toggleModal} cambiarEstado={cerrarModal} sendUserName={setName} />
      {matches ?
        <div className="AppCont">
          <img src={numeroBox} alt='box' className='boxImg' />
          <DriveFiles usuario={usuario} />
        </div>
        :
        <div className='AppContRes'>
          <DriveFilesRes usuario={usuario} />
          <img src={numeroBoxRes} alt='box' className='boxImgRes' />
        </div>
      }
    </div>
  );
}

export default App;
