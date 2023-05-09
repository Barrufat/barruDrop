
import './driveFiles.css'
import DropFiles from './DropFiles';
import useDrivePicker from 'react-google-drive-picker';
import LoginButton from '../assets/loginButton';

import './driveFiles.css';

const DriveFiles = ({ usuario }) => {

    const [openPicker] = useDrivePicker()

    const handleOpenPicker = () => {

        openPicker({
            clientId: "835955756099-hfetq5v6inbo6dc3ifj9iaig2834l74c.apps.googleusercontent.com",
            developerKey: "AIzaSyCqgbZU0-1hPgNjSmw4qGWqvxvMo8p1PyE",
            viewId: "DOCS",
            token: "",
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: true
        })
    }

    return (
        <>
            <DropFiles />
            <div className='driveCont'>
                <h3 className='driveTitle'>¡Hola {usuario}!</h3>
                <div className='titleCont'>
                    <h1 className='driveTitle'> Bienvenid@</h1>
                    <h1 className='driveTitle'> a </h1>
                    <h1 className='driveTitle'> BarruDrop</h1>
                </div>
                <h2 className='driveText'> Para subir tus archivos de forma simple a drive,
                    puedes hacer LogIn a través de Google.</h2>
                <div className='aniCont' onClick={() => handleOpenPicker()}>
                    <LoginButton />
                </div>
            </div>
        </>
    )
}

export default DriveFiles