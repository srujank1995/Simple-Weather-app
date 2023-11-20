import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBInputGroup,
  MDBRadio,
  MDBCard,
  MDBCardBody,
  MDBIcon,
} from "mdb-react-ui-kit";
import React from "react";
import { Button } from "react-bootstrap";

interface WeatherAPIComponentProps {}

interface WeatherAPIComponentState {
  lat: string;
  lon: string;
  Cname: string;
  country: string;
  temp: string;
  realTemp: string;
  humid: string;
  wind: string;
  icon:string;
  atmosphere: string;
  weather: any[];
}

class WeatherAPIComponent extends React.Component<
  WeatherAPIComponentProps,
  WeatherAPIComponentState
> {
  constructor(props: WeatherAPIComponentProps) {
    super(props);
    this.state = {
      Cname: "",
      country: "",
      lat: "",
      lon: "",
      temp: "",
      realTemp: "",
      humid: "",
      wind: "",
      atmosphere:"",
      icon:"",
      weather: [],
    };
  }
  // async componentDidMount() {
  //   this.PushAPIFunction();
  // }

  PushAPIFunction = async () => {
    const KEY = "9f257ac422804557bc4133831231411";
    const params = this.state.Cname;
    const API_URL = `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${params}&aqi=yes`;

    const requestOptions = {
      method: "GET",
    };
    const getWeather = await fetch(API_URL, requestOptions);
    const getResultWeather = await getWeather.json();
    console.log("API Response:", getResultWeather);

    this.setState({
      Cname: getResultWeather.location.name,
      country: getResultWeather.location.country,
      lat: getResultWeather.location.lat,
      lon: getResultWeather.location.lon,
      temp: getResultWeather.current.temp_c,
      realTemp: getResultWeather.current.feelslike_c,
      humid: getResultWeather.current.humidity,
      wind: getResultWeather.current.wind_kph,
      atmosphere: getResultWeather.current.text,
      icon: getResultWeather.current.icon,

      
    });
  };

  HandleCity = (e: any) => {
    this.setState({ Cname: e.target.value });
  };

  submitCity = (e: any) => {
     e.preventDefault();
    this.PushAPIFunction();
    
  };

  render() {
    return (
      <section className="vh-100" style={{margin:'1%', padding:'1%'}}>
        <MDBContainer className="h-100 py-5">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol md="8" lg="6" xl="4">
              <MDBTypography tag="h2" className="mb-4 pb-2 fw-normal ">
                WEATHER FORECAST
              </MDBTypography>

              <MDBInputGroup className="mb-4">
                <input
                  className="form-control rounded"
                  type="text"
                  placeholder="City"
                 onChange={this.HandleCity}
                />

                <Button
                  className="input-group-text border-0 fw-bold"
                  id="search-addon"
                 onClick={this.submitCity}
                >
                  SEARCH
                </Button>
              </MDBInputGroup>

              <div className="mb-4 p-2">
                <MDBRadio
                  inline
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  label="Celcius"
                  defaultChecked
                />
                <MDBRadio
                  inline
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  label="Farenheit"
                />
              </div>

              <MDBCard className="shadow-0 border">
                <MDBCardBody className="p-4">
                  <MDBTypography tag="h4" className="mb-1 sfw-normal">
                    <p><strong>{this.state.Cname},{this.state.country}</strong></p>
                  </MDBTypography>
                  <p>
                    Latitude:<strong>{this.state.lat}°</strong>
                  </p>
                  <p>
                    Longitude:<strong>{this.state.lon}°</strong>
                  </p>
                  <p className="mb-2">
                    Current Temperature:<strong>{this.state.temp}°C</strong>
                  </p>
                  <p>
                    Feels like: <strong>{this.state.realTemp}°C</strong>
                  </p>
                  <p>
                    Humidity: <strong>{this.state.humid}gm/cm</strong>
                  </p>
                  <p>
                    Wind: <strong>{this.state.wind}Kmph</strong>
                  </p>
                  <div className="d-flex flex-row align-items-center">
                    <p className="mb-0 me-4">{this.state.atmosphere}</p>
                    <MDBIcon
                      fas
                      icon={this.state.icon}
                      size="3x"
                      style={{ color: "#eee" }}
                    />
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    );
  }
}

export default WeatherAPIComponent;
