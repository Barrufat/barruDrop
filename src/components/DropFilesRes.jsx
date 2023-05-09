
import './dropFilesRes.css';
import React, { useEffect, useState } from 'react';
import ImageConfig from '../config/ImageConfig';
import UploadButton from '../assets/uploadButton';
import ToastOk from '../assets/toasterSucces';
import ToastFail from '../assets/toasterFail';



const DropFilesRes = () => {

    const [dropClass, setDropClass] = useState("dropOffRes")
    const [removeClass, setRemoveClass] = useState("drop-file-previewRes__item__del");
    const [fileList, setFileList] = useState([]);
    const [uploadMessage, setUploadMessage] = useState('closed');
    const [aniToggle, setAniToggle] = useState(false);

    const onDragEnter = () => {
        setDropClass("dropOnRes")
    }
    const onDragLeave = () => {
        setDropClass("dropOffRes")
    }
    const onDrop = () => {
        setDropClass("dropOffRes")
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
        setUploadMessage('messageOnRes');
        setAniToggle(true);
        setRemoveClass('closed');
    }

    const keepUploading = () => {
        setUploadMessage('closed');
        setRemoveClass("drop-file-previewRes__item__del");
        setFileList([]);
        setAniToggle(false);
    }

    return (
        <div className='dropContRes'>
            <div className='inputContRes'>
                {
                    fileList.length > 0 ? (
                        <div className={uploadMessage}>
                            {aniToggle && fileList.length > 0 ?
                                (
                                    <ToastOk />
                                ) :
                                null
                            }
                            <div className='messageContRes' onClick={keepUploading}>
                                <p className='uploadMessageTextRes'>Tus archivos: </p>
                                {fileList.map((item, index) => (
                                    <p className='uploadMessageFileRes' key={index}>{item.name},</p>
                                ))}
                                <p className='uploadMessageTextRes'>Se han subido correctamente!</p>
                                <button className='dropButtonRes' onClick={keepUploading} >Subir más archivos</button>
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
                            <div className='messageContRes' onClick={keepUploading}>
                                <p className='uploadMessageTextRes'>No se han seleccionado archivos para subir!</p>
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
                    <div className='filesContRes'>
                        <div className="drop-file-previewRes">
                            {
                                fileList.map((item, index) => (
                                    <div key={index} className="drop-file-previewRes__item">
                                        <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                        <div className="drop-file-previewRes__item__info">
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


            <div className='animationContRes' onClick={uploadFiles}>
                <UploadButton />
            </div>

        </div >
    )
}

export default DropFilesRes;