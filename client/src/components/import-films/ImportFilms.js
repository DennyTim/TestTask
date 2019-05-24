import React, { useState } from 'react';
import { sendDataFile } from '../../actions/films';
import { connect } from 'react-redux';
import './import-films.css';

const ImportFilms = ({ sendDataFile, history }) => {

  const [datafile, setFile] = useState({
    file: "", 
    preview: "", 
    error: {}
  });

  const { file } = datafile;

  const handleSubmit = (e) => {
    e.preventDefault();
    sendDataFile(file, history);
  }

  const handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile({
        file: file,
        preview: reader.result
      });
    }

    reader.readAsText(file)
  }

  return (
    <div className="container">
      <form className="center" onSubmit={(e)=> handleSubmit(e)}>
        <input className="fileInput" 
          type="file" 
          onChange={(e)=> handleImageChange(e)} />
        <button className="submitButton" 
          type="submit" 
          onClick={(e)=> handleSubmit(e)}>Upload Image</button>
      </form>
    </div>
  )
};

const mapStateToProps = state => ({
  file: state.films.file
});

export default connect(mapStateToProps, { sendDataFile })(ImportFilms);
