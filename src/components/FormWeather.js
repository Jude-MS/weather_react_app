import React, {useState} from 'react';

function FormWeather(props) {
    const [ info, setInfo ] = useState('');
    
  function handleChange(e) {
    setInfo(e.target.value);
  }
    
  function handleSubmit(e) {
    if(info !== '') {
      props.handleSubmit(info);
      setInfo('');
    }
    e.preventDefault();
  }

    return (
    <div className="ui gray inverted segment form">
        <form className="ui inverted form" onSubmit={handleSubmit}>
          <div className="equal width fields">
            <div className="field">
              <label className="ui teal pointing below basic label">
                Enter a city to compare the weather forecast for the next 7 days
              </label>
              <div className="ui icon input">
                <input type="text" placeholder="City Name" onChange={handleChange} value={info.toLowerCase()}/>
                <i aria-hidden="true" className="search icon"></i>
              </div>
            </div>
            <button type="submit" className="ui small teal button">
              Get Weather
            </button>
          </div>
        </form>
      </div>
    )
}

export default FormWeather;
