
import './dropFiles.css';
import React, { useEffect, useState } from 'react';
import ImageConfig from '../config/ImageConfig';
import UploadButton from '../assets/uploadButton';
import ToastOk from '../assets/toasterSucces';
import ToastFail from '../assets/toasterFail';




const DropFiles = () => {

    const [dropClass, setDropClass] = useState("dropOff");
    const [removeClass, setRemoveClass] = useState("drop-file-preview__item__del");
    const [fileList, setFileList] = useState([]);
    const [uploadMessage, setUploadMessage] = useState('closed');
    const [aniToggle, setAniToggle] = useState(false);

    const onDragEnter = () => {
        setDropClass("dropOn")
    }
    const onDragLeave = () => {
        setDropClass("dropOff")
    }
    const onDrop = () => {
        setDropClass("dropOff")
    }

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
        }
    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
    }

    useEffect(() => {
        console.log(fileList);
    }, [fileList])


    const uploadFiles = () => {
        setUploadMessage('messageOn');
        setRemoveClass('closed');
        setAniToggle(true);
    }

    const keepUploading = () => {
        setAniToggle(false);
        setUploadMessage('closed');
        setRemoveClass("drop-file-preview__item__del");
        setFileList([]);
    }

    return (
        <div className='dropCont'>
            <div className='inputCont'>
                {
                    fileList.length > 0 ? (
                        <div className={uploadMessage}>
                            {aniToggle && fileList.length > 0 ?
                                (
                                    <ToastOk />
                                ) :
                                null
                            }
                            <div className='messageCont' onClick={keepUploading}>
                                <p className='uploadMessageText'>Tus archivos: </p>
                                {fileList.map((item, index) => (
                                    <p className='uploadMessageFile' key={index}>{item.name},</p>
                                ))}
                                <p className='uploadMessageText'>Se han subido correctamente!</p>
                                <button className='dropButton' onClick={keepUploading} >Subir más archivos</button>
                            </div>
                        </div>

                    ) :
                        <div className={uploadMessage}>
                            {aniToggle && fileList.length === 0 ?
                                (
                                    <ToastFail />
                                ) :
                                null
                            }
                            <div className='messageCont' onClick={keepUploading}>
                                <p className='uploadMessageText'>No se han seleccionado archivos para subir!</p>
                            </div>
                        </div>
                }

                <input className={dropClass} type="file" value="" id="miArchivo"
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    onChange={onFileDrop}
                >
                </input>
            </div>
            {
                fileList.length > 0 ? (
                    <div className='filesCont'>
                        <div className="drop-file-preview">
                            {
                                fileList.map((item, index) => (
                                    <div key={index} className="drop-file-preview__item">
                                        <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                        <div className="drop-file-preview__item__info">
                                            <p>{item.name}</p>
                                            <p>{item.size}B</p>
                                        </div>
                                        <span className={removeClass} onClick={() => fileRemove(item)}>x</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ) : null
            }
            <div className='animationCont' onClick={uploadFiles}>
                <UploadButton />
            </div>

        </div>
    )
}

export default DropFiles;