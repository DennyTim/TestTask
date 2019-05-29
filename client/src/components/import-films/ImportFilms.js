import React, { useState } from 'react';
import { sendDataFile } from '../../actions/films';
import { connect } from 'react-redux';
import Spinner from '../spinner';
import './import-films.css';

const ImportFilms = ({ sendDataFile, history }) => {

  const [datafile, setFile] = useState({
    status: false,
    file: "", 
    error: {}
  });

  const { file, status } = datafile;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await sendDataFile(file, history);
    if (!res) {
      setFile({
        ...datafile,
        status: res
      });
    }
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

  return status ? <Spinner /> : 
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
          disabled={status}
          onClick={(e)=> {
            setFile({
              file: '',
              status: true
            });
            handleSubmit(e)
          }}>Upload Films</button>
      </form>
    </div>)
};

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(mapStateToProps, { sendDataFile })(ImportFilms);
