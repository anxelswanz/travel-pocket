
import './App.css'
import Map from './components/Map/Map';
import Header from './components/Header/Header';
import { ThemeProvider, Typography, createTheme } from '@material-ui/core';
import { cyan } from '@material-ui/core/colors';
import List from './components/List/List';
import { getPlaceData, getWeatherData } from './api';
import { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './router';
const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff'
    },
    secondary: cyan
  },
  typography: {
    fontFamily: 'Playpen+Sans',
    fontWeightLight: 400
  }
})




function App() {

  console.log('env', process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY);

  const element = useRoutes(routes);
  const [places, setPlaces] = useState([]);
  const [coordinate, setCoordinate] = useState({})
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState(0);
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [weatherData, setWeatherData] = useState({});
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinate({ lat: latitude, lng: longitude });
      console.log('App: fetch current coordinate =>', coordinate);
    })
  }, [])

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating >= rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating])

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      getPlaceData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setIsLoading(true);
          console.log('type=>', type);
          console.log('data data', data.data);
          setPlaces(data.data?.filter((place) => place.name && place.num_reviews > 0));
          setIsLoading(false);
        })

      getWeatherData(coordinate.lat, coordinate.lng)
        .then((data) => {
          console.log('weather=>', data);
          setWeatherData(data.current);
        })

    }

    // setPlaces([
    //   {
    //     name: 'kfc1111111111111111111111',
    //     price_level: '123',
    //     ranking: '14 ',
    //     cuisine: [
    //       {
    //         name: 'chinese food',
    //       },
    //       {
    //         name: 'western food'
    //       }
    //     ],
    //     awards: [
    //       {
    //         display_name: 'award 1',
    //         image: {
    //           small: '123'
    //         }
    //       }
    //     ],
    //     address: 'Newcastle Upon Tyne',
    //     phone: '+44 7123819123',
    //     rating: '3.0',
    //   },
    //   {
    //     name: 'kfc11111111qweqwee111',
    //     price_level: '123',
    //     ranking: '14 ',
    //     cuisine: [
    //       {
    //         name: 'chinese food',
    //       },
    //       {
    //         name: 'western food'
    //       }
    //     ],
    //     awards: [
    //       {
    //         display_name: 'award 1',
    //         image: {
    //           small: '123'
    //         }
    //       }
    //     ],
    //     address: 'Newcastle Upon Tyne',
    //     phone: '+44 7123819123',
    //     rating: '4.0',
    //   },
    //   {
    //     name: 'kfc',
    //     price_level: '123',
    //     ranking: '14 ',
    //     cuisine: [
    //       {
    //         name: 'chinese food',
    //       },
    //       {
    //         name: 'western food'
    //       }
    //     ],
    //     awards: [
    //       {
    //         display_name: 'award 1',
    //         image: {
    //           small: '123'
    //         }
    //       }
    //     ],
    //     address: 'Newcastle Upon Tyne',
    //     phone: '+44 7123819123',
    //     rating: '5.0',
    //   }
    // ])
    console.log('App: coordinate=>', coordinate);
    console.log('App: bounds=>', bounds);
  }, [bounds, type])


  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className='header'>
          <Header
            setCoordinate={setCoordinate}
          />
        </div>
        <div className="content-container">
          <div>
            <List
              isLoading={isLoading}
              childClicked={childClicked}
              places={filteredPlaces.length > 0 ? filteredPlaces : places}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
          </div>
          <Map
            weatherData={weatherData}
            setBounds={setBounds}
            coordinate={coordinate}
            setCoordinate={setCoordinate}
            places={filteredPlaces.length > 0 ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </div>

      </div>
    </ThemeProvider>

  );
}

export default App;
