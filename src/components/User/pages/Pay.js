import { useState, useEffect } from 'react';
 import Grid from '@mui/material/Grid'
 
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import * as React from 'react';
// import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
 import Button from '@mui/material/Button';

import { PayToUserBank } from './dialogs/PayToUserBank';
import { PayToUserOutside } from './dialogs/PayToUserOutside';
import PayToFutureUser from './dialogs/PayToFutureUser'
import { icons } from "../../../assets/index"
import { CurrencyManager } from '../../../services/currency'

const currencyManager = new CurrencyManager();


         
export default function Pay() {

  const [ country ] = useState([
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas (the)",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia (Plurinational State of)",
    "Bonaire, Sint Eustatius and Saba",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory (the)",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cayman Islands (the)",
    "Central African Republic (the)",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands (the)",
    "Colombia",
    "Comoros (the)",
    "Congo (the Democratic Republic of the)",
    "Congo (the)",
    "Cook Islands (the)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czechia",
    "Côte d'Ivoire",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic (the)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Falkland Islands (the) [Malvinas]",
    "Faroe Islands (the)",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories (the)",
    "Gabon",
    "Gambia (the)",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and McDonald Islands",
    "Holy See (the)",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran (Islamic Republic of)",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea (the Democratic People's Republic of)",
    "Korea (the Republic of)",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic (the)",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands (the)",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia (Federated States of)",
    "Moldova (the Republic of)",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands (the)",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger (the)",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Northern Mariana Islands (the)",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine, State of",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines (the)",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Republic of North Macedonia",
    "Romania",
    "Russian Federation (the)",
    "Rwanda",
    "Réunion",
    "Saint Barthélemy",
    "Saint Helena, Ascension and Tristan da Cunha",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin (French part)",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten (Dutch part)",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia and the South Sandwich Islands",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan (the)",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands (the)",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates (the)",
    "United Kingdom of Great Britain and Northern Ireland (the)",
    "United States Minor Outlying Islands (the)",
    "United States of America (the)",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela (Bolivarian Republic of)",
    "Viet Nam",
    "Virgin Islands (British)",
    "Virgin Islands (U.S.)",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe",
    "Åland Islands"
  ])
  
  const [futureUser, setFutureUser] = useState(false);

  const handleFutureUser = () => {
    setFutureUser(true);
  };

  const [userBank, setUserBank] = useState(false);

  const handleUserBank = () => {
    setUserBank(true);
  };

  const [userOutside, setUserOutside] = useState(false);

  const handleUserOutside = () => {
    setUserOutside(true);
  };

  const [ currency, setCurrency] = useState({});
  const [ currencyState, setCurrencyState ] = useState('idle')

  console.log(currencyState)
  useEffect(() => {
    setCurrencyState('loading')
    const getCurrency = async () => {
      try {
        await currencyManager.getAllCurrencies(data => {
          console.log(data)
          setCurrencyState('loaded')
          setCurrency(data)
        })

      }catch(error) {
        setCurrencyState('error')
        console.log(error)
      }
    }

    getCurrency();
  }, [])

  
    return (
      
        <Box  sx={{border: "0px solid red"}} >
            <Grid  container spacing={2}  sx={{  mt: 8}} >
                <Grid   style={{cursor: "pointer"}} item md={6}  xs={12} sm={12}>
                    <Card sx={12}>
                    <CardContent sx={{ textAlign: 'center', m: 1}}>
  
                        <img style={{marginBottom: "1rem"}} src={icons.moon} alt="moon"/>
                        <p style={{fontWeight: "bold", fontSize: "16px"}}>pay to a user with a<br/> futurepay account</p>
                        <Box  style={{color: "#818181", fontSize: "14px"}}  sx={{ textAlign: 'center', mt: 5 }}>                
                          <Button onClick={handleFutureUser} variant="contained">
                            FREE OF CHARGE
                          </Button>
                        </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item style={{cursor: "pointer"}} md={6} xs={12} sm={12}>
                    <Card>
                    <CardContent sx={{ textAlign: 'center', m: 1}}>
                        <img style={{marginBottom: "1rem"}} src={icons.bluemoon} alt="moon"/>
                        <p style={{fontWeight: "bold", fontSize: "16px"}}>Pay directly to user’s bank <br/>account</p>
                        <Box style={{color: "#818181", fontSize: "14px"}} sx={{ textAlign: 'center', mt: 5, fontWeight: 'light' }}> 
                          <Button onClick={handleUserBank} variant="contained">
                            CHARGES APPLY
                          </Button>
                        </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid style={{cursor: "pointer"}} item md={6} xs={12} sm={12}>
                    <Card>
                    <CardContent sx={{ textAlign: 'center', m: 1}}>
                        <img style={{marginBottom: "1rem"}} src={icons.greenmoon} alt="moon"/>
                        <p style={{fontWeight: "bold", fontSize: "16px"}}>Pay to a user outside <br/>the country</p>
                      <Box style={{color: "#818181", fontSize: "14px"}} sx={{ textAlign: 'center', mt: 5, fontWeight: 'light' }}>  
                        <Button onClick={handleUserOutside} variant="contained">
                              CHARGES APPLY
                          </Button>
                      </Box>                       
                    </CardContent>
                    </Card>
                </Grid>
            </Grid>
            
           <PayToFutureUser
            open={futureUser}
            close={() => setFutureUser(false)}
            currency={currency}
            />
          <PayToUserBank 
          open={userBank}
          close={() => setUserBank(false)}
          currency={currency}
          />
          <PayToUserOutside 
           open={userOutside}
           close={() => setUserOutside(false)}
           currency={currency}
           country={country}
          />
           
        </Box>
        
    )
}