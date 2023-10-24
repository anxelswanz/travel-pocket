import React, { useState, createRef, useEffect } from 'react'
import { yellow } from '@material-ui/core/colors'
import {
    CircularProgress, Grid, Typography, InputLabel,
    MenuItem, FormControl, Select, Item, Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Place } from '@material-ui/icons'
import PlaceDetails from '../PlaceDetails/PlaceDetails'
import { create } from '@material-ui/core/styles/createTransitions'


const useStyles = makeStyles({
    containerList: {
        textAlign: 'center',
        height: '100%',
        backgroundColor: '#84E3A1'
    },
    titleList: {
        fontSize: '16px !important',
        paddingTop: '1.5rem !important',
    },
    selectType: {
        marginTop: '2rem !important',
        marginLeft: '0.5rem !important'
    },
    listlistplaces: {
        marginTop: '1.5rem !important',
        boxSizing: 'border-box',
        overflow: 'auto',
        height: '28rem',
        display: 'flex',
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
            'backgroundColor': '#9CC0F9'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#B4DFC0',
            borderRadius: '10px',
            border: '1px solid white'
        }
    },
    scrollBar: {

    }
})


export default function List({ places, childClicked, isLoading, type, rating, setType, setRating }) {

    console.log({ childClicked });
    const classes = useStyles();
    const [elRef, setElRefs] = useState([]);
    useEffect(() => {
        const refs = Array(places?.length).fill().map((_, i) =>
            elRef[i] || createRef()
        );
        setElRefs(refs);
        console.log('elrefs => ', elRef);
    }, [places])

    return (
        <div className={classes.containerList}>
            <Typography
                className={classes.titleList}
                variant='h4'>
                Restaurants and hotel around you
            </Typography>
            {isLoading ? (<div>
                <CircularProgress size='5rem' />
            </div>) : (
                <>
                    <FormControl className={classes.selectType}>
                        <InputLabel id="demo-simple-select-label" >Type</InputLabel>
                        <Select
                            value={type}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select-label"
                            label="Type"
                            onChange={(e) => { setType(e.target.value) }}
                            sx={{
                                color: 'white'
                            }}
                        >
                            <MenuItem value="restaurants">Restaurants</MenuItem>
                            <MenuItem value="hotels">Hotels</MenuItem>
                            <MenuItem value="attractions">Attractions</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.selectType}>
                        <InputLabel>Rating</InputLabel>
                        <Select
                            value={rating}
                            label="Rating"
                            onChange={(e) => { setRating(e.target.value) }}
                            sx={{
                                color: 'white'
                            }}
                        >
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={3}>Above 3.0 Star</MenuItem>
                            <MenuItem value={4}>Above 4.0 Star</MenuItem>
                            <MenuItem value={4.5}>Above 4.5 Star</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container spacing={3} className={classes.listlistplaces}>
                        {
                            places.map((place, i) => {
                                return (
                                    <Grid ref={elRef[i]} item key={i} xs={12}>
                                        <PlaceDetails
                                            selected={Number(childClicked) == i}
                                            refProp={elRef[i]}
                                            place={place} />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </>
            )}

        </div>
    )
}
