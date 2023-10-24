import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { Paper, Typography } from '@material-ui/core';
import { LocationOn } from '@material-ui/icons'
import defaultImg from '../../assets/img/nopics.png'
import { makeStyles } from '@material-ui/styles';
import { Rate } from 'antd';
import { Autocomplete } from '@react-google-maps/api';
import { mapStyles } from './mapStyles';

const useStyles = makeStyles({
    mapPaper: {
        width: '6rem',
        height: '10rem',
        overflow: 'hidden',
        padding: '0.6rem',
    }
})
export default function Map({ setCoordinate, setBounds, coordinate, places, setChildClicked, weatherData }) {
    // const coordinates = { lat: 0, lng: 0 };
    const classes = useStyles();

    const [condition, setCondition] = useState();
    useEffect(() => {
        // const { condition } = weatherData.current;
        console.log('map weatherdata', weatherData);
        //currentsetCondition(condition);
    }, [weatherData])
    return (
        <div style={{
            width: '100%',
            height: '40rem',
            border: '1px solid white'
        }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={coordinate}
                center={coordinate}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                onChange={(e) => {
                    console.log('e=>', e);
                    setCoordinate({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
                }}
                onChildClick={(child) => { setChildClicked(child) }}
                options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
            >
                {weatherData.condition ? <img src={weatherData.condition.icon} />
                    :
                    ''
                }
                {
                    places?.map((place, i) => {
                        return (
                            <div
                                lat={Number(place.latitude)}
                                lng={Number(place.longitude)}
                                key={i}
                            >
                                <Paper elevation={3} className={classes.mapPaper}>
                                    <Typography variant='subtitle' >
                                        <LocationOn sx={{
                                            verticalAlign: 'bottom'
                                        }} fontSize='small' /> {place.name}
                                    </Typography>
                                    <Rate size='small' value={Number(place.rating)} style={{ fontSize: '0.8rem' }}  ></Rate>
                                    <div style={{
                                        width: '86%',
                                        marginLeft: '7%',
                                        height: '70%'
                                    }}>
                                        <img
                                            style={{
                                                width: '100%',
                                                height: '100%',

                                            }}
                                            src={place.photo ? place.photo.images.large.url : defaultImg}
                                            alt={place.name}
                                        />
                                    </div>

                                </Paper>
                            </div>
                        )
                    })
                }


            </GoogleMapReact>
        </div>
    )
}
