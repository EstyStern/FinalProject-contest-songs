import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { AllUsers } from './AllUsers';
import { AllPlans } from './AllPlans';
import { color } from '@mui/system';
import RecipeReviewCard from '../Components/Plans';
import Alert from './Alert';
import { LoginForm } from './LoginForm';
import Trylogin from './Trylogin';
import { Link, Outlet, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';


import { GetAllSongsFromServer } from '../Redux/Song/SongThunk';
import { GetAllPlansFromServer } from '../Redux/Plan/PlanThunk'
import { GetAllStepInPlanFromServer } from '../Redux/StepInPlan/StepInPlanThunk'
import { useEffect,useState } from 'react';
import { GetAllJudgForPlanFromServer } from "../Redux/JudgForPlan/JudgForPlanThunk";
import { GetAllJudgesFromServer } from "../Redux/Judge/JudgeThunk";
import {LoadGetCurrentUser  } from "../Redux/User/UserActions";
import { GetAllSingersFromServer } from '../Redux/Singer/SingerThunk';
import { SaveAllPlansToShow } from "../Redux/Plan/PlanActions";
//import RgisterOrUpdateForm from './RgisterOrUpdateForm'

// import CustomizedSteppers from './AllStepInPlans'

function TabPanel(props) {

  
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 0,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));
export default function ScrollableTabsButtonForce(props) {

  let myDispatch = useDispatch();
  useEffect(async () => {
    try {
      let responsePlans = await GetAllPlansFromServer(myDispatch);
      let responseStepInPlan = await GetAllStepInPlanFromServer(myDispatch);
      let response1 = await GetAllSongsFromServer(myDispatch);
      let response2 = await GetAllJudgForPlanFromServer(myDispatch);
      let response3 = await GetAllJudgesFromServer(myDispatch);
      let allSingers = await GetAllSingersFromServer(myDispatch);
    } catch (error) {
      console.error(error.message);
    }
  }, []);
  let navigate = useNavigate()
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [CurrentUserName, setCurrentUserName] = useState("אורח");
  //שליפת המשתמש הנוכחי לצורך דירוג
  const CurrentUser = useSelector((store) => {
    console.log("store", store);
    console.log("uuuuuuuuuuuuu",store.Users.CurrentUser);
    
    return store.Users.CurrentUser;
  });

  const AllSingersFromStoer = useSelector((store) => {
    console.log(store.Singers.Singers);
    return store.Singers.Singers;
  });

  //שליפת כל המדרגים מהסטור
  const AllJudgesFromStore = useSelector((store) => {
    console.log("store", store);
    console.log(store.Judges.Judges);
    return store.Judges.Judges;
  });
  
  function funcToNameOfCurrentUser() {
    let CCurrentUserName="אורח"
    if (CurrentUser != [] && CurrentUser.typeOfUser == 1){
    // setCurrentUserName(`${CurrentUser.userFirstName}-מדרג`)
      CCurrentUserName=`${CurrentUser.userFirstName}-מדרג`
  }
  else
    if (CurrentUser != [] && CurrentUser.typeOfUser == 2){
      // setCurrentUserName(`${CurrentUser.userFirstName}-שופט`)
      CCurrentUserName=`${CurrentUser.userFirstName}-שופט`
    }
    else
      if (CurrentUser != [] && CurrentUser.typeOfUser == 3){
        // setCurrentUserName(`${CurrentUser.userFirstName}-זמר`)
        CCurrentUserName=`${CurrentUser.userFirstName}-מתמודד-זמר`
      }
      if (CurrentUser != [] && CurrentUser.typeOfUser == 4){
        // setCurrentUserName(`${CurrentUser.userFirstName}-זמר`)
        CCurrentUserName=`${CurrentUser.userFirstName}-מנהל`
      }
        return  CCurrentUserName ;  
  }
function funToLogOut() {
  myDispatch(LoadGetCurrentUser([]));
  myDispatch(SaveAllPlansToShow([]))
  alert("תודה שהשתמשת באתר שלנו!")
  navigate(`/Nav/Plans`)
}
  
function funcToImgOfCurrentUser() {
  debugger
  console.log(CurrentUser.typeOfUser, "CurrentUser.typeOfUser2");
  let src = ""
  if (CurrentUser.typeOfUser == 0 || CurrentUser.typeOfUser == undefined ||
    CurrentUser.typeOfUser == 1)
    src = "anonymous.jpg"
  else{
    if (CurrentUser != [] && CurrentUser.typeOfUser == 2) {  //שופט
      debugger
      src = AllJudgesFromStore.filter(x => x.userId == CurrentUser.userId)[0].judgePic;
      console.log("src", src);
    }
    else
      if (CurrentUser != [] && CurrentUser.typeOfUser == 3) {//זמר
        debugger
        src = AllSingersFromStoer.filter(x => x.userId == CurrentUser.userId)[0].singerImg;
        console.log("src", src);
      }
      else {//מנהל
        src = "manager.jpg"
        //src = "1.JPG"

      }
    }
  return src;
}

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let toLogin = 0;
  return (
    <div>


      <AppBar position="static" color="default">
        <Tabs className='tabs'
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="כל התוכניות" icon={<AudiotrackIcon className='t' />} {...a11yProps(0)} />
          <Tab label="תוכניות ישנות" icon={<FavoriteIcon className='t' />} {...a11yProps(1)} />
          <Tab label="כניסה" icon={<PersonPinIcon className='t' />} {...a11yProps(2)} />
          <Tab label="אודותנו" icon={<HelpIcon className='t' />} {...a11yProps(3)} />
          {(CurrentUser.typeOfUser>=2)?<Tab label="אזור אישי" icon={<HelpIcon className='t' />} {...a11yProps(4)} />:<label></label>}
          {(CurrentUser.length!=0)?<input type="button" value="יציאה" onClick={()=>{funToLogOut()}}></input>:<span></span>}
          
          <h1>{funcToNameOfCurrentUser()}</h1>
          <img width="5%" height="5%" class='profilImg' src={`https://localhost:44324/Images/${funcToImgOfCurrentUser()}`}></img>
          {/* <Tab label="Item Five" icon={<ShoppingBasket />} {...a11yProps(4)} />
          <Tab label="Item Six" icon={<ThumbDown />} {...a11yProps(5)} />
          <Tab label="Item Seven" icon={<ThumbUp />} {...a11yProps(6)} /> */}
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        {/* {navigate(`/Nav/Plans`)} */}
        <Link to={"/Nav/Plans"}>Plans</Link>
        {/* {navigate("/Nav/Plans")} */}
        {/* <RecipeReviewCard></RecipeReviewCard> */}
      </TabPanel>


      <TabPanel value={value} index={1}>
        {/* <CustomizedSteppers></CustomizedSteppers> */}
      </TabPanel>


      <TabPanel value={value} index={2}>

        <Link to={`/Nav/LoginForm/${toLogin}/${toLogin}`}>Login</Link>
        {/* <Trylogin></Trylogin> */}
        {/* <LoginForm></LoginForm> */}
        {/* <RgisterOrUpdateForm></RgisterOrUpdateForm> */}
      </TabPanel>

      <TabPanel value={value} index={3}>
      </TabPanel>

      {(CurrentUser.typeOfUser>=2)?
      <TabPanel value={value} index={4}>
      {(CurrentUser.typeOfUser==3)?<Link to={`/Nav/Area/${CurrentUser.typeOfUser}`}>אזור אישי</Link>:(CurrentUser.typeOfUser==2)?
      <Link to={`/Nav/Area/${CurrentUser.typeOfUser}`}>אזור אישי</Link>:<span></span>}
      </TabPanel>:<label></label>}
     

      <Outlet></Outlet>
    </div >

  );
}
