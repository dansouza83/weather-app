import React from 'react';
import './App.css';

import "weather-icons/css/weather-icons.css"
import Weather from './app_component/weather.component';

import "bootstrap/dist/css/bootstrap.min.css";

import Form from './app_component/form.component';



// api call example api.openweathermap.org/data/2.5/weather?q=London,uk
const API_key = "58a3714a7990b6f5bb9711e9ae2c8a10";

class App extends React.Component {
  // default state
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    };

    // this.getWeather();

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  // method to call the icons
  get_WeatherIcon(icon, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: icon.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icon.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({ icon: icon.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icon.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icon.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icon.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icon.Clouds });
        break;
      default:
        this.setState({ icon: icon.Clouds });
    }
  }

  // method to convert F to C
  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15); // Math.floor convert to interger
    return cell;
  }

  // show error 
// showError(error) {
//   return(
//     <div>Algum erro aconteceu</div>
//   );
// }

  // main function that I can choose the properties 
  getWeather = async (e) => {

    // prevent the default button value 
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    

   

    if (city && country) {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);

      // convert all the data in JSON file console
      const response = await api_call.json();

      console.log(response);
      // state that collect the icons
      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        country: response.sys.country,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        // weatherIcon: this.state.icon,
        // icon: this.weatherIcon.Thunderstorm
        error: false
      });
      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
    } else {
      this.setState({ error: true });
    }
  };

  // here where show all elements to html tags
  render() {
    return (
      <div className="App">
        <Weather
          city={this.state.city}
          country={this.state.country}
          temp_celsius={this.state.celsius}
          temp_min={this.state.temp_min}
          temp_max={this.state.temp_max}
          description={this.state.description}
          weatherIcon={this.state.icon}
        />
        {/* form loading using the input form data using -> loadweather */}
        <Form loadweather={this.getWeather} error={this.state.error} />
      </div>
    );
  }
}


export default App;
