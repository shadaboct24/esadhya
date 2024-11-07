import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const cardData = [
  {
    heading: 'CDAC Knowledge Park',
    body: 'The Knowledge Park Centre of C-DAC, Bangalore is the 2nd of C-DAC centres to be established in 1989 and has been concentrating on various aspects of hardware and software development. The range of technologies includes High Performance Computing and Grid Computing with GARUDA, the national grid initiative and as the nodal agency for the ambitious countrywide grid linking all the PARAM platforms as well as other resources from the academia, with a host of applications.'
  },
  {
    heading: 'News In Media:',
    body: '1."Autistic students to benefit from e-learning tool" in Times of India, Pune Edition on Jul 31, 2012, 05.29AM IST Click here to View 2."Surge seen in advanced technology to help people with different abilities" in The Hindu, Science and Technology, September 11, 2011 Click here to View '
  },
  {
    heading: 'Grid Computing with GARUDA',
    body: 'GARUDA, the national grid computing initiative led by C-DAC, aims to connect resources from across academia and industry. It leverages C-DAC’s expertise in software and hardware development, providing an integrated platform for high-speed and high-availability computing services.'
  }
];

export default function CdacInfoCard() {
  return (
    <Box sx={{ flexGrow: 1, padding: '20px' }}>
      <Grid container spacing={3} justifyContent="center">
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                maxWidth: '60vh',
                margin: 'auto',
                minHeight: '40vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                textAlign: 'left',
                padding: '20px',
                borderRadius:'40px'
              }}
              elevation={12}
            >
              <CardContent>
                <Typography sx={{ textAlign: 'center', fontSize: 18, marginBottom: '2vh' }}>
                  {card.heading}
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: 14, marginTop: '1vh' }}>
                  {card.body}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
