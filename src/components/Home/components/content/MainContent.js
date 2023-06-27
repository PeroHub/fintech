import { useState, useEffect } from "react";
import "../../styles/body.css";
import Footer from "../footer/Footer";
import { icons } from '../../../../assets'
// import { exchangeValue } from "../../../../services/transactions";;
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Spinner } from 'react-bootstrap'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


// import { AccountManager } from '../../../../services/users'
import { CurrencyManager } from '../../../../services/currency'
import { useAuth } from '../../../../contexts/AuthContext'


// const accountManager = new AccountManager();
const currencyManager = new CurrencyManager();


function MainContent() {
 
  const { currentUser } = useAuth();

 

 

  // Initializing animation library
  useEffect(() => {
      AOS.init({ duration: 1500 })
    console.log('first one ')

  }, [])

  const [currencies, setCurrencies] = useState([]);
  // const [payAccount, setPayAccount] = useState({});

  const [baseCurrency, setBaseCurrency] = useState(null);
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  

// Calculating value of dolllar
  const [form, setForm] = useState(1);
  let inputValue = form;
  let dollarValue = exchangeRate;
  let result = dollarValue * inputValue;

  let handleChange = (event) => {
    setForm(event.target.value);
  };
// Calculating value of dolllar top

   // Buttom Below  special convert
   const [btform, setBtForm] = useState(1)
   const btNaira = exchangeRate
   let btConvert = btform * btNaira
 
   let handleBtChange = (event) => {
     setBtForm(event.target.value)
   }
   // Buttom Below special convert

  const [load, setLoad] = useState(false)

  useEffect(() => {
    console.log('is renn')
    const setDefault = async () => {
      try {
        await currencyManager.getCurrencies((data) => {
          setCurrencies(data)
          setFromCurrency(data[0])
        })
        await currencyManager.getBaseCurrency((data)=> {
          setBaseCurrency(data)
          setToCurrency(data)
        })
      } catch (e) {
        console.log(e.message);
      }
      setLoad(true)
    }

    setDefault()
  }, []);

  // const [payment, setPayment] = useState(null);

  // const paymentMode = (event) => {
  //   setPayment(event.target.value);
  // };


  // useEffect(()=>{
  //   if(fromCurrency==null) return 
  //   accountManager.getPaymentAccount(payment,fromCurrency,(data)=>{
  //     setPayAccount(data)
  //   }).catch((e)=>{
  //     // display error
  //     console.log(e)
  //   })
  // },[fromCurrency,payment])

  useEffect(() => {
    const eRate = (baseCurrency?.toBase / toCurrency?.toBase) / (baseCurrency?.toBase / fromCurrency?.toBase)
    setExchangeRate(eRate)
  }, [fromCurrency, toCurrency, baseCurrency])
  

  return (
    <>
    
    <div>
      <a
          className="what-move"
          href="whatsapp://send?text=Hello World!&phone=+2347083106814"
        >
          <img src={icons.correct} className="whatsapp" alt="whatsapp"/>
        </a>
    
      <Box sx={{ background: '#010101', height: 500, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Typography variant="h4" sx={{textAlign: 'center', mb: 2, color: '#fff', fontSize: {xs: 18, sm: 24, md: 30 }}}>SEAMLESS P2P PAYMENTS AND CONVERSIONS</Typography>
        <Typography sx={{textAlign: 'center', color: '#fff', mb: 2,  fontSize: {xs: 13, sm: 16, md: 18 }}}>Convert between local and foreign currencies at market rates with ZERO hidden charges via P2P transactions</Typography>
        { load ? <Card sx={{borderRadius: {xs: '20px', sm: '70px', md: '70px'}, p : 4, pb: {xs: 17, sm: 0, md: 0}, pt: {xs: 13, sm: 0, md: 0}, mt: {xs: 2}, height: {xs: 200}, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          
          <Grid container sx={{}}>
            <Grid item xs={12} sm={3} md={3} >
                <Box sx={{marginBottom: {xs:2, sm: 0, md: 0}}}>
                  <FormControl fullWidth>
                    <InputLabel  variant="standard" htmlFor="uncontrolled-native">
                      
                    </InputLabel>
                    {fromCurrency !== null && (
                       <NativeSelect
                       defaultValue={fromCurrency._id}
                       onChange={(e)=>{ setFromCurrency(currencies.find((item)=> item._id === e.target.value))}}
                     >
                        {
                           Array.from(currencies).map((item,index)=>{
                             return(
                               <option key={index} value={item._id} > {item.name} </option>
                             )
                           })
                         }
                       
                     </NativeSelect>
                    )}
                   
                  </FormControl>
                </Box>
            </Grid>
            <Grid item sx={{ marginTop: 2}} xs={12} sm={6} md={6}>
                <Box sx={{ display: 'flex'}}>
                    <TextField
                    placeholder={form} 
                    onChange={handleChange}
                    fullWidth
                    id="standard-multiline-flexible"
                    variant="standard"
                  />
                  <Box sx={{ background: '#3A3A3A', width: {xs:'55%'}, height: {xs: 60}, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><img src={icons.exchange} alt="exchange" /></Box>
                  <TextField
                    fullWidth
                    value={result.toLocaleString('en-US')}
                    id="standard-multiline-flexible"
                    variant="standard" />
                </Box>
              
            </Grid>
            <Grid item xs={12} sm={3} md={3}>
                <Box sx={{marginTop: {xs:-1, sm: 0, md: 0}}}>
                  <FormControl fullWidth>
                    <InputLabel  variant="standard" htmlFor="uncontrolled-native">
                      
                    </InputLabel>
                    {baseCurrency !== null && (
                       <NativeSelect defaultValue={baseCurrency._id}>
                       <option value={baseCurrency._id}>{baseCurrency.name}</option>
                     </NativeSelect>
                    )}
                   
                  </FormControl>
                </Box>
            </Grid>
          </Grid>
        </Card> : <Spinner style={{position: "relative", top: "0px", left: '0px', color: '#fff', mt: 8, mb: 8}} animation="border" className="spinner"></Spinner>}
        
        <div>
            <Link to={currentUser ? "user": "signup" }>
                <Button variant="contained" sx={{mt: 2}} className="but">Get started</Button>
            </Link>
            </div>
      </Box>
      

      <div className="card-section">
        <Box  data-aos="fade-up" sx={{height: {md: '80%', xs: '190%'}, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Grid container spacing={2} sx={{ width: {xs: '100%', sm: '100%', md: '75%'}, m: 'auto', p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: 250, boxShadow: '0px 1px 30px rgb(175 175 175 / 25%)', width: {md: '80%'}, ml: {md: 10}, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <img src={icons.magnify} alt="magnify" />
                  <Typography sx={{fontSize: '20px', color: 'rgb(148, 143, 143)', mt: 2}}>Transparency</Typography>
                  <Typography sx={{fontSize: '15px', color: 'rgb(148, 143, 143)', mt: 2}}>No hidden charges, our rates and process are very transparent</Typography>
                </CardContent>
              </Card>
              <Card sx={{ height: 250, mt: 5, boxShadow: '0px 1px 30px rgb(175 175 175 / 25%)', width: {md: '80%'}, ml: {md: 10}, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <img src={icons.excoimage} alt="best exchange" />
                  <Typography sx={{fontSize: '20px', color: 'rgb(148, 143, 143)', mt: 2}}>Best Exchange Rate</Typography>
                  <Typography sx={{fontSize: '15px', color: 'rgb(148, 143, 143)', mt: 2}}>Our rates are the market best</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{mt: 15}}>
              <Card sx={{ height: 250, boxShadow: '0px 1px 30px rgb(175 175 175 / 25%)',  width: {md: '80%'}, ml: {md: 5}, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <img src={icons.secure} alt="secure" />
                  <Typography sx={{fontSize: '20px', color: 'rgb(148, 143, 143)', mt: 2}}>Fast</Typography>
                  <Typography sx={{fontSize: '15px', color: 'rgb(148, 143, 143)', mt: 2}}>Speed reinforces trust and we do not take that for granted</Typography>
                </CardContent>
              </Card>
              <Card sx={{ height: 250, mt: 5, boxShadow: '0px 1px 30px rgb(175 175 175 / 25%)', width: {md: '80%'}, ml: {md: 5}, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <img src={icons.shield} alt="shield" />
                  <Typography sx={{fontSize: '20px', color: 'rgb(148, 143, 143)', mt: 2}}>History</Typography>
                  <Typography sx={{fontSize: '15px', color: 'rgb(148, 143, 143)', mt: 2}}>We are the favorite of Freelancers and remote workers</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ border: 'none'}} variant="outlined">
                <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <Typography sx={{fontSize: '20px', color: 'rgb(148, 143, 143)'}}>Why Future Pay</Typography>
                  <Typography sx={{fontSize: '15px', color: 'rgb(148, 143, 143)'}}>We are the stewards of an emerging generation and we do not take our role for granted.</Typography>
                </CardContent>
              </Card>
              
            </Grid>
          </Grid>
        </Box>
        {/* <div className="start" data-aos="fade-up">
          <div className="card-item-con push">
            <div className="card-item">
              <img src={icons.magnify} alt="magnify" />
              <p className="card-title">Transparency</p>
              <p className="card-detail">
                No hidden charges, our rates and process are very transparent{" "}
              </p>
            </div>
            <div className="card-item">
              <img src={icons.excoimage} alt="best exchange" />
              <p className="card-title">Best Exchange Rate</p>
              <p className="card-detail">
                Our rates are the market best{" "}
              </p>
            </div>
          </div>

          <div className="card-item-con pull">
            <div className="card-item">
              <img src={icons.secure} alt="secure" />
              <p className="card-title">Fast</p>
              <p className="card-detail">
                Speed reinforces trust and we do not take that for granted{" "}
              </p>
            </div>
            <div className="card-item">
              <img src={icons.shield} alt="shield" />
              <p className="card-title">History</p>
              <p className="card-detail">
                We are the favorite of Freelancers and remote workers{" "}
              </p>
            </div>
          </div>

          <div className="why-future-pay" >
            <div className="why-pay">
              <h3>Why Future Pay</h3>
              <p>
                We are the stewards of an emerging generation and we do not take our role for granted.
              </p>
            </div>
          </div>
        </div> */}

        <div className="how-it-works" data-aos="fade-up">
          <h3 style={{marginBottom: '55px'}}>How Future Pay Works</h3>
          <div className="work-con">
            <div className="work-item">
              <img src={icons.Choices} alt="choice" />
              <div className="round">1</div>
              <div className="sub-sec">
                <p>Select Currency and Payment Method</p>
                <p>Select Available Currency</p>
              </div>
            </div>
            <div className="work-item">
              <img src={icons.Emailss} alt="email" />
              <div className="round">2</div>
              <div className="sub-sec">
                <p>Get match with a verified P2P user</p>
                <p>Choose preferred payment method</p>
              </div>
            </div>
            <div className="work-item">
              <img src={icons.onlines} alt="payonline" />
              <div className="round">3</div>
              <div className="sub-sec">
                <p className="underline">Get Credited Instantly on confirmation</p>
                <p>Get paid</p>
              </div>
            </div>
          </div>
          <div className="login-get-started">
            <Link to={currentUser ? "user": "signup" }>
              <Button variant="contained" className="">Get started</Button>
            </Link>
          </div>
          
        </div>

        <div className="funds" data-aos="fade-up">
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
           <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 2}}>
             <Typography variant="h5">Converting <span style={{color:"#ff8a00", textAlign: 'center'}}>PAYONEER</span> Funds Just Got Easier With Future Pay</Typography>
            <Typography sx={{mt: 2, mb: 2}}>You Have <span>Choose your currency and how much you want to convert</span></Typography>
          </Box>
          <Card sx={{p: 4}}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={5} sx={{}}>
                   <Box sx={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <TextField
                    type="number"
                      placeholder={btform}
                      onChange={handleBtChange}
                     />
                      <Select>
                        
                        <MenuItem value={"USD"}>USD</MenuItem>
                      </Select>
                   </Box>
                    
                    
                </Grid>
                <Grid item  xs={12} sm={12} md={2} >
                  <Box sx={{width: '100%',display: 'flex', justifyContent: 'center', alignItems: 'center', mt:-1}}>
                  <img
                    src={icons.yellow}
                    style={{
                      width: "5rem",
                      height: "5rem",
                    }}
                    alt="exchange"
                  />
                  </Box>
                    
                </Grid>
                <Grid item  xs={12} sm={12} md={5}>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <TextField 
                      placeholder="24,350" 
                      value={btConvert.toLocaleString('en-US')}
                    />
                      <Select>
                        
                        <MenuItem value={"NGN"}>NGN</MenuItem>
                      </Select>
                   </Box>
                </Grid>
              </Grid>
              <Box sx={{textAlign: 'center', mt: 4}}><Link  to={currentUser ? "user": "signup" }>
              <Button variant="contained"  >Get started</Button>
            </Link></Box>
            </CardContent>
          </Card>
              
          
          </Box>
          
        </div>

        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "100px"}}>
          <h3 style={{color: 'rgb(148, 143, 143)', marginBottom: "20px", textAlign: "center"}}>Our Clients Give Positive Testimonials Always</h3>
          <Box sx={{ width: "80%"}}>
              <Grid container spacing={2}>
                <Grid item  xs={12} sm={6} md={6}>
                  <Card sx={{minHeight: {xs: "0px", md: "270px", sm: "450px"}}}>
                    <CardContent sx={{display: "flex", flexDirection: {xs: "column",sm: "column", md: "row"}, alignItems: "center", justifyContent: "center", p: 4}}>
                      <Box sx={{border: "1px solid #FF842B", width: "150px", height: "150px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px"}}>
                      <img src={icons.punk} alt="girl" style={{ width: "inherit", height: "inherit", borderRadius: "50%"}} />
                      </Box>
                     
                      <Box sx={{ml: 2}}>
                      <Typography sx={{color: 'rgb(148, 143, 143)', fontWeight: "bold", mt: 2}}>Gerard Nesi</Typography>
                      <Typography sx={{ mt: 2}}>Helpful platform with quick transactions and good customer support.</Typography>
                      <Typography sx={{color: 'rgb(148, 143, 143)', fontSize: "14px", fontWeight: "bold", mt: 2}}>Lead Software Engineer</Typography>
                      <Typography sx={{color: 'rgb(148, 143, 143)',fontSize: "14px", fontWeight: "bold"}}>Company: GreySoft</Typography>
                      </Box>           
                    </CardContent>       
                  </Card>
                </Grid>         
                <Grid item xs={12} sm={6} md={6}>
                <Card sx={{minHeight: {xs: "0px", md: "270px", sm: "450px"}}}>
                <CardContent sx={{display: "flex", flexDirection: {xs: "column",sm: "column", md: "row"}, alignItems: "center", justifyContent: "center", p: 4}}>
                      <Box sx={{border: "1px solid #FF842B", width: "150px", height: "150px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px"}}>
                      <img src={icons.bosun} alt="girl" style={{ width: "inherit", height: "inherit", borderRadius: "50%"}} />
                      </Box>    
                     
                      <Box sx={{ml: 2}}>
                      <Typography sx={{color: 'rgb(148, 143, 143)', fontWeight: "bold", mt: 2}}>Bosun Egberinde</Typography>
                      <Typography sx={{ mt: 2}}>FuturePay services has been very reliable and a no-brainer for me when it comes to choosing among providers of similar services.</Typography>
                      <Typography sx={{color: 'rgb(148, 143, 143)', fontSize: "14px", fontWeight: "bold", mt: 2}}>Software Developer</Typography>
                      <Typography sx={{color: 'rgb(148, 143, 143)', fontSize: "16px", fontWeight: "bold"}}>Shopify</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
          </Box>

          {/* <Box sx={{ mt: 2, width: "80%"}}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Card sx={{minHeight: {xs: "0px", md: "250px", sm: "250px"}}}>
                    <CardContent sx={{display: "flex", flexDirection: {xs: "column",sm: "row", md: "row"}, alignItems: "center", p: 4}}>
                      <Box sx={{border: "1px solid #FF842B", width: "150px", height: "150px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px"}}>
                      <img src={icons.glory} alt="girl" style={{ width: "130px", height: "130px", margin: "10px"}} />
                      </Box>
                     
                      <Box sx={{ml: 2}}>
                        <Typography sx={{color: 'rgb(148, 143, 143)', fontWeight: "bold", mt: 2}}>Bosun Egberinde</Typography>
                      <Typography sx={{color: 'rgb(148, 143, 143)', mt: 2}}>Helpful platform with quick transactions and good customer support</Typography>
                      <Typography sx={{color: 'rgb(148, 143, 143)', fontSize: "14px", fontWeight: "bold", mt: 2}}>Software Developer</Typography>
                      <Typography sx={{color: 'rgb(148, 143, 143)',fontSize: "14px", fontWeight: "bold"}}>Company: Shopify</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                <Card sx={{minHeight: {xs: "0px", md: "250px", sm: "250px"}}}>
                    <CardContent sx={{display: "flex", flexDirection: {xs: "column",sm: "row", md: "row"}, alignItems: "center", p: 4}}>
                      <Box sx={{border: "1px solid #FF842B", width: "150px", height: "150px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px"}}>
                      <img src={icons.glory} alt="girl" style={{ width: "130px", height: "130px", margin: "10px"}} />
                      </Box>
                     
                      <Box sx={{ml: 2}}>
                      <Typography sx={{color: 'rgb(148, 143, 143)', fontWeight: "bold", mt: 2}}>Gerard Nesi</Typography>
                      <Typography sx={{color: 'rgb(148, 143, 143)', mt: 2}}>Helpful platform with quick transactions and good customer support</Typography>
                      <Typography sx={{color: 'rgb(148, 143, 143)', fontSize: "14px", fontWeight: "bold", mt: 2}}>Lead Software Engineer</Typography>
                      <Typography sx={{color: 'rgb(148, 143, 143)',fontSize: "14px", fontWeight: "bold"}}>Company: GreySoft</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
          </Box>
           */}
        </Box>
          {/* <a
          className="what-move"
            href="whatsapp://send?text=Hello World!&phone=+2347032400529">
            <img src={icons.whatsapp2} className="whatsapp" alt="whatsapp" />
          </a> */}
        <div className="updates">
          <p>Yet to get an account with futurepay?</p>
          <Link to={currentUser ? "user": "signup" }>
              <Button variant="contained" className="">Get started</Button>
            </Link>
        </div>

        <Footer />
      </div>
    </div> 
    
    </>
  );
}

export default MainContent;
