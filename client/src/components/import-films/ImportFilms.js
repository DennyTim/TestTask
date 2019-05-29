import React, { useState, useEffect } from 'react';
import { sendDataFile } from '../../actions/films';
import { connect } from 'react-redux';
import Spinner from '../spinner';
import './import-films.css';

const ImportFilms = ({ sendDataFile, data, history }) => {

  const [datafile, setFile] = useState({
    status: true,
    file: "", 
    error: {}
  });

  const { file, status } = datafile;

  useEffect(() => {
    if(data.msg === 'ok') {
      history.push('/menu');
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFile({
      status: false
    })
    sendDataFile(file);
  }

  const handleChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile({
        ...datafile,
        file: file
      });
    }
    reader.readAsText(file)
  }

  return status ? 
    (<div className="container">
      <form className="center" onSubmit={(e)=> handleSubmit(e)}>
        <input className="fileInput" 
          type="file" 
          onChange={(e)=> {
            handleChange(e)
            let elem = document.querySelector('.submitButton');
            elem.removeAttribute("disabled");
          }} />
        <button className="submitButton" 
          type="submit" 
          disabled={datafile.flag}
          onClick={(e)=> {
            setFile({
              file: '',
            });
            handleSubmit(e)
          }}>Upload Films</button>
      </form>
    </div>) : <Spinner />
};

const mapStateToProps = state => ({
  data: state.films.file
});

export default connect(mapStateToProps, { sendDataFile })(ImportFilms);
