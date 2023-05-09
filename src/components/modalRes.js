
import { useState } from 'react';
import './modal.css'

const ModalRes = ({ estado, cambiarEstado, sendUserName, matches }) => {

    const [userName , setUserName] = useState ('');
    const [userPass , setUserPass] = useState ('');

    const LogIn = (e) => {

        if (userName && userPass) {
            cambiarEstado(false);
            sendUserName(userName)
        }
    }

    return (
        <>
            {estado && 
                <div className='overlay'>
                    <div className='contModalRes'>
                        <div className='contRegisterRes'>
                            <h1 className='registerTitle'>Registro y acceso</h1>
                            <form>
                                <p className='registerText'>Nombre de usuario</p>
                                <input className="registerInput" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                                <p className='registerText'>Contraseña</p>
                                <input className="registerInput" type="text" value={userPass} onChange={(e) => setUserPass(e.target.value)} />
                            </form>
                            <button className='cerrarModal' type='button' onClick={LogIn}>Acceder</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ModalRes