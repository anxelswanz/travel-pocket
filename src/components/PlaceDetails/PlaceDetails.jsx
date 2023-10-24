import React, { useEffect, useState } from 'react'
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core'
import { LocationOn } from '@material-ui/icons'
import { Phone } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import defaultImg from '../../assets/img/nopics.png'
import { Rate } from 'antd'
const useStyles = makeStyles({
    placedetailsLocation: {
        marginTop: '0.6rem !important',
        display: 'flex',
        justifyContent: 'space-between'
    },
    placedetailsCuisineType: {
        margin: '5px 5px 5px 0'
    }
});
export default function PlaceDetails({ place, selected, refProp }) {
    const classes = useStyles();
    const [name, setName] = useState();

    if (selected) {

        refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    useEffect(() => {
        setName(place.name);
    }, [place])
    return (
        <Card elevation={8} sx={{
            width: "80%",
            marginLeft: '10%'
        }}>
            <CardMedia
                style={{
                    height: 300,
                }}
                image={place.photo ? place.photo.images.large.url : defaultImg}
            />
            <CardContent>
                <Typography gutterBottom variant='h4'> {place.name}</Typography>
                <Box display='flex' justifyContent='space-between' >
                    <Rate value={place.rating} />
                    <Typography gutterBottom variant='subtitle1'>Out of {place.num_reviews}</Typography>
                </Box>
                <Box display='flex' justifyContent='space-between' >
                    <Typography variant='subtitle1'>Price</Typography>
                    <Typography gutterBottom variant='subtitle1'>{place.price_level}</Typography>
                </Box>
                <Box display='flex' justifyContent='space-between' >
                    <Typography variant='subtitle1'>Ranking</Typography>
                    <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
                </Box>
                {
                    place?.awards?.map((award) => {
                        // my = margin y(top bottom) axis
                        return (
                            <Box my={1} display='flex' justifyContent='space-between'>
                                <img src={award.image.small} alt={award.display_name} />
                                <Typography variant='subtitle2' color='textSecondary'>{award.display_name}</Typography>
                            </Box>
                        )
                    })
                }

                {
                    place?.address && (
                        <Typography gutterBottom variant='body2' color='textSecondary' className={classes.placedetailsLocation} >
                            <LocationOn /> {place.address}
                        </Typography>
                    )
                }
                {
                    place?.phone && (
                        <Typography gutterBottom variant='body2' color='textSecondary' className={classes.placedetailsLocation} >
                            <Phone /> {place.phone}
                        </Typography>
                    )
                }
                {
                    place?.cuisine?.map(({ name }) => {
                        return (
                            <Chip key={name} size='small' label={name} className={classes.placedetailsCuisineType} />
                        )
                    })
                }
                <CardActions sx={{
                    justifyContent: 'center'
                }}>
                    <Button variant="contained" size='small' onClick={() => { window.open(place.website, '_blank') }} >
                        The Website
                    </Button>
                </CardActions>

            </CardContent>

        </Card>
    )
}
