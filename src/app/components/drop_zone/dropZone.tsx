import { ipcRenderer } from 'electron';
import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import { useDropzone } from 'react-dropzone';

//import ContextMenu from './documentContextMenu';

declare global {
  interface Window {
    api: any,
  }
}

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 1,
  border: '1px solid #eaeaea',
  marginBottom: 0,
  marginRight: 0,
  width: 300,
  height: 300,
  padding: 1,
  boxSizing: 'border-box'
} as React.CSSProperties;

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

// https://www.brainbell.com/javascript/ipc-communication.html


// https://ourcodeworld.com/articles/read/537/how-to-execute-a-function-of-the-main-process-inside-the-renderer-process-in-electron-framework

export default function Accept(props) {
  const [files, setFiles] = useState([]);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    fileRejections
  } = useDropzone({
    accept: 'image/jpeg, image/png, application/pdf, application/docx, application/doc, application/txt',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file),
      })));

      for (let i in acceptedFiles) {
        window.api.send('open-second-window', acceptedFiles[i]);
      }
    }
  });

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const _files = acceptedFiles.map(file => <li key={file.type}>{file.type}</li>);

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));

  useEffect(() => () => { // Clean-up function
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <div {...getRootProps({className: "dropzone"})}>
        <input {...getInputProps()} />
        {isDragAccept && (<p>All files will be accepted</p>)}
          {isDragReject && (<p>Some files will be rejected</p>)}
          {!isDragActive && (<p>Drop some files here ...</p>)}
      </div>
      <aside>
        <h4>Accepted files</h4>
          <ul>{_files}</ul>
          {thumbs}
          <button id="open-second-window" onClick={() => {
            window.api.send('open-second-window', _files);
          }}>Open Second Window</button>
        <div className="container">
        </div>
      </aside>
    </section>
  );
}

<Accept />

