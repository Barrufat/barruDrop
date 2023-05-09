
import { useState } from 'react';
import './modal.css'

const Modal = ({ estado, cambiarEstado, sendUserName }) => {

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
                    <div className='contModal'>
                        <div className='contRegister'>
                            <h1>Registro y acceso</h1>
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

export default Modal