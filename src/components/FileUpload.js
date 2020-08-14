import React, { useState, useEffect} from 'react'

import { uploadFile, fetchFiles } from '../services/FileUploadService'

export default function FileUpload() 
{
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState();
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState('');

    const [fileInfos, setFileInfos] = useState([]);

    const selectFile = e => setSelectedFiles(e.target.files)
    const BASE_FILE_URL = 'http://localhost:5000/media/'

    const onUploadFile = e => {
        e.preventDefault();

        let currentFile = selectedFiles[0]

        setProgress(0)
        setCurrentFile(currentFile)

        uploadFile(currentFile, e => {
            setProgress(Math.round( (100 * e.loaded) / e.total))
            console.log(progress)
        })
        .then( response => {
            setMessage(response.data.message)
            return fetchFiles()
        })
        .then(files => setFileInfos(files.data.files) )
        .catch( error => {
            setProgress(0)
            setMessage('Could not upload the file!')
            setCurrentFile(undefined)
            console.log(error)
        })

        setSelectedFiles(undefined)
    }

    useEffect( () => {

        fetchFiles()
        .then(response => {
            setFileInfos(response.data.files)
        })
        .catch(error => console.log(error))
    }, [])

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-header">
                            <h5>Upload File</h5>
                            {
                                message.length > 0 && (
                                    <div className="alert alert-success" role="alert">
                                        {message}
                                    </div>
                                )
                            }
                        </div>
                        <div className="card-body">
                            <form onSubmit={onUploadFile}>
                                {/* File */}
                                <div className="form-group">
                                    <label>Document</label>
                                    <div className="input-group mb-3">
                                        <div className="custom-file">
                                            <input 
                                                type="file" 
                                                className="custom-file-input" 
                                                id="document" 
                                                name="document"
                                                onChange={selectFile}    
                                                required/>
                                            <label 
                                                className="custom-file-label" 
                                                htmlFor="document">
                                                Choose file    
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {/* Submit */}
                                <div className="form-group">
                                    <button 
                                        className="btn btn-lg btn-primary db-block" 
                                        disabled={!selectedFiles}>
                                        Upload file
                                    </button>
                                </div>
                            </form>
                        </div>
                        {/* Footer */}
                        <div className="card-footer">
                        {currentFile && (
                            <div className="progress">
                                <div
                                    className="progress-bar progress-bar-info progress-bar-striped"
                                    role="progressbar"
                                    aria-valuenow={progress}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                    style={{ width: progress + "%" }}>
                                    {progress}%
                                </div>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Uploaded Files */}
            <div className="row">
            <div className="col-md-6 mx-auto">
                <div className="card">
                    <div className="card-header">List of Files</div>
                    <ul className="list-group list-group-flush"> 
                        {
                            fileInfos.length > 0 && fileInfos.map((file, index) => (
                                <li className="list-group-item" key={index}>
                                    <a href={BASE_FILE_URL + file}>View</a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
        </div>
    )
}