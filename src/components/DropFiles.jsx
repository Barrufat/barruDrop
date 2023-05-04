
import './dropFiles.css';
import React, { useEffect, useState } from 'react';
import ImageConfig from '../config/ImageConfig';
import { SiGoogle, SiGooglecloud } from "react-icons/si";


const DropFiles = ({ sendFiles }) => {

    const [dropClass, setDropClass] = useState("dropOff")
    const [fileList, setFileList] = useState([]);

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

    const handleSubmit = async (e: any) => {
        console.log("subir archivos pulsado")
        e.preventDefault();
        let formData = new FormData();
        formData.append("file", fileList);
        fetch("http://localhost:3000/auth/upload-file", {
            method: "POST",
            body: formData,
        })
            .then((res: any) => res.json())
            .then((response) => console.log(response))
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        console.log(fileList);
        sendFiles(fileList);
    }, [fileList])

    // const MandarFiles = () =>{
    //     sendFiles(fileList);
    // }



    return (
        <form className='dropCont' onSubmit={handleSubmit}>
            <input className={dropClass} type="file" value="" id="miArchivo"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onChange={onFileDrop}
            >
            </input>
            {
                fileList.length > 0 ? (
                    <div className='filesCont'>
                        {/* <p className="drop-file-preview__title">
                            Ready to upload
                        </p> */}
                        <div className="drop-file-preview">
                            {
                                fileList.map((item, index) => (
                                    <div key={index} className="drop-file-preview__item">
                                        <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                        <div className="drop-file-preview__item__info">
                                            <p>{item.name}</p>
                                            <p>{item.size}B</p>
                                        </div>
                                        <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ) : null
            }
            <button type="submit" className='dropButton'>
            <SiGooglecloud/> Subir archivos
            </button>
        </form>
    )
}

export default DropFiles;