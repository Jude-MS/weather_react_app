import React, {useState} from 'react';
import CardWeather from './components/CardWeather';
import FormWeather from './components/FormWeather';

const Api_Key = 'a5a47c18197737e8eeca634cd6acb581';

function App() {
  const [valuesOfCity, setValuesOfCity] = useState({});
  const [weatherInfo, setWeatherInfo] = useState([]);

  const handleCity = async ({info, from}) => {
    if (info) {
      const resp = await fetch(
        `https://search.reservamos.mx/api/v2/places?q=${info}&from=${from}`
      )
        .then((response) => response.json())
        .catch((e) => {
          throw new Error(e);
        });
      console.log('resp', resp);
      const dataOfCity = resp[0];
      setValuesOfCity(dataOfCity);
      if (dataOfCity) {
        let {lat, long} = dataOfCity;
        const temperature = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={daily}&units=metric&appid=${Api_Key}`
        )
          .then((response) => response.json())
          .catch((e) => {
            throw new Error(e);
          });
        setWeatherInfo(temperature.daily);
      }
    }
  };



    const max_hum = weatherInfo.reduce((acc, val, i) => {
        if(val.humidity > acc.hum){
          return {i, hum: val.hum}
        }
        return acc;
    }, {i: 0, hum: 0});




  const renderCityInfo = () => {
    if (weatherInfo && weatherInfo.length > 0 && valuesOfCity) {
      return (
        <div className="ui teal centered cards">
          {weatherInfo.map((city, i) => {
            let weatherResObj = {
              city_name: valuesOfCity.city_name,
              state: valuesOfCity.state,
              country: valuesOfCity.country,
              temp_max: city.temp.max,
              temp_min: city.temp.min,
              description: city.weather[0].description,
              max_hum: i === max_hum.i
            };
            return <CardWeather key={city.dt} weather={weatherResObj} />;
          })}
        </div>
      );
    } else if(weatherInfo.length === 0 && !valuesOfCity) {
      return (
        <div className="ui icon message">
          <i aria-hidden="true" className="circle notched loading icon"></i>
          <div className="content">
            <div className="header">Just one second</div>Please enter a valid city, it should be a city in Mexico or USA
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <FormWeather handleSubmit={handleCity} />
      {renderCityInfo()}
    </div>
  );
}

export default App;
