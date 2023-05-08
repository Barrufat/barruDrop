

import React, { useEffect, useState } from 'react';
import './driveFilesRes.css'
import DropFilesRes from './DropFilesRes';
import useDrivePicker from 'react-google-drive-picker';
import LoginButton from '../assets/loginButton';

const DriveFilesRes = () => {

    const [openPicker, data, authResponse] = useDrivePicker()

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
            <div className='driveContRes'>
                <div className='titleContRes'>
                    <div className='titleCont2Res'>
                        <h1 className='driveTitleRes'> Bienvenid@</h1>
                        <h1 className='driveTitleRes'> a </h1>
                    </div>
                    <h1 className='driveTitleRes'> BarruDrop</h1>
                </div>
                <h2 className='driveTextRes'> Para subir tus archivos de forma simple a drive, puedes hacer LogIn a través de Google.</h2>
                <div className='aniContRes' onClick={() => handleOpenPicker()}>
                    <LoginButton />
                </div>
            </div>
            <DropFilesRes />
        </>
    )
}

export default DriveFilesRes;