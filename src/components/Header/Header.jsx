import React, { useState } from 'react'
import { TextField, Box, Button, Typography } from '@material-ui/core'
import './style.css'
import { makeStyles } from '@material-ui/styles'
import { Autocomplete } from '@react-google-maps/api'
import SearchIcon from '@material-ui/icons/Search';
import logo from '../../assets/img/logo.png'
const useStyles = makeStyles({
    // create css object 
    container: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#212121',
        height: '4rem',
        color: 'white !important',
    },
    btn: {
        fontSize: 10,
        '&:hover': {
            backgroundColor: 'white !important',
        }
    },
    title: {
        fontSize: '14px !important',
        marginLeft: '2rem !important'
    },
    field: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        marginLeft: '-5rem'
    }
});

export default function Header({ setCoordinate }) {
    const classes = useStyles();
    const [autocomplete, setAutocomplete] = useState(null);
    const onLoad = (autoC) => { setAutocomplete(autoC) }
    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
        setCoordinate({ lat, lng })
    }
    return (
        <Box className={classes.container} >
            <Typography
                noWrap
                variant='h6'
                className={classes.title}
                color='#ffffff'

            >
                <img src={logo} alt='travel pocket' style={{
                    width: '10%',
                    height: '10%'
                }} /> Travel Pocket
            </Typography>

            <Box className={classes.field}>
                <Typography
                    noWrap
                    variant='h6'
                    className={classes.title}
                    color='#ffffff'
                >
                    Explore City
                </Typography>
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} >
                    <TextField id="outlined-basic"
                        label="Search"
                        color='primary'
                        variant="outlined"
                        size='small'
                        sx={{
                            input: {
                                color: 'white'
                            }
                        }}
                        onChange={(e) => { console.log(e.target.value); }}
                    />
                </Autocomplete>

            </Box>



        </Box>
    )
}
