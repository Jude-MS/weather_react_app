import React from 'react'

function CardWeather(props) {
    const {city_name, state, country, temp_max, temp_min, description} = props.weather;
    console.log(props.weather)
    return (
        <div className="ui card">
          <div className="content">
            <div className="ui teal header">City Name: {city_name}, {state}, {country}</div>
            <div className="meta">Min Temp: {temp_min}º</div>
            <div className="meta">Max Temp: {temp_max}º</div>
            <div className="description">
              {description}
            </div>
          </div>
        </div>
    )
}

export default CardWeather;
