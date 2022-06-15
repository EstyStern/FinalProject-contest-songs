import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VideoPlayer from 'react-video-js-player';
import { FastForward } from '@material-ui/icons';
import React from 'react'
import ReactPlayer from 'react-player'
import { MDBIcon } from 'mdbreact'
//MUI
// import { CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blueGrey, red } from '@mui/material/colors';
import { border } from '@mui/system';
import swal from 'sweetalert';
//Icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import Add from '@mui/icons-material/Add';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import p1 from '../images/plans/p1.jpg'
//Images
// import {v} from '../Components/v.mp4';
// import p2 from '../images/p2.jpg';
import { Outlet, useHistory, useNavigate, useParams } from "react-router-dom"
import { Button } from '@material-ui/core';
import { useState } from 'react';
import { IfThisUserRatingThisSong } from '../Redux/Rating/RatingThunk'
import {IfThisUserRatingSongs  } from "../Redux/Rating/RatingThunk";
export const AllSongs = (props) => {
  debugger
  console.log("song!!!!!!!!!!!!!!!!!!");
  let navigate = useNavigate()
  let params = useParams()
  const myDispatch = useDispatch();
  const [ifFromArea, setIfFromArea] = useState(false)
  const [ifratingforjudege, setifratingforjudege] = useState()
  
  useEffect(async () => {
    debugger
    try {
      if (params.idUser != undefined)
        setIfFromArea(true)
      ;  
      if((Date.parse(currentStep.stepInPlanEndDateToRating)) < Date.parse(Date()) && Date.parse(currentStep.stepInPlanEndDateToJudg) > Date.parse(Date()) && CurrentUser.typeOfUser == 2 && AllJudgForPlanFromServer.filter(p => p.planId == currentStep.planId && p.userId == CurrentUser.userId).length >= 1)  {
          let AllSongForThisPlan=AllSongsFromStore.filter(u=>u.stepInPlanId==currentStep.stepInPlanId)
          console.log(AllSongForThisPlan,"!!!!!!!!!!");
          let c=await IfThisUserRatingSongs(AllSongForThisPlan,CurrentUser.userId)
          console.log(c,"ljljljljljklkjhgghjklkjhgfddfghjk");
          // 
          setifratingforjudege(c)
          console.log(ifratingforjudege,"afteraffterafter");
          // const ifratingforjudege=c;
      }
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  //שליפת כל השירים מהסטור
  const AllSongsFromStore = useSelector((store) => {
    console.log("store", store);
    console.log(store.Songs.Songs);
    return store.Songs.Songs;
  });
  //שליפת כל תוכניות של השופטים-

  const AllJudgForPlanFromServer = useSelector((store) => {
    console.log("store", store);
    console.log(store.JudgForPlan.JudgForPlan);
    return store.JudgForPlan.JudgForPlan;
  });

  //בדיקה האם עכשיו בשלב השפיטה
  const CheckIfStepInJudge = useSelector((store) => {
    console.log("store", store);
    console.log(store.Judges.IfStepInJudge);
    return store.Judges.IfStepInJudge;
  })
  //שליפת העונה הנוכחית
  const currentStep = useSelector((store) => {
    debugger;
    console.log("storeee", store.StepInPlans.CurrentStepInPlanId);
    return store.StepInPlans.CurrentStepInPlanId;
  })
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", currentStep);

  //שליפת כל הדרוגים
  const AllRatingForPlanFromServer = useSelector((store) => {
    console.log("store", store);
    console.log(store.Rating.Rating);
    return store.Rating.Rating;
  });
  //שליפת המשתמש הנוכחי לצורך דירוג
  const CurrentUser = useSelector((store) => {
    console.log("store", store);
    console.log(store.Users.CurrentUser);
    return store.Users.CurrentUser;
  });
  //פונקציה שבודקת האם המדרג דירג שיר זה כבר
  const IfThisUserCanRatingThisSong = async (IdSong, IdUser) => {
    let response = await IfThisUserRatingThisSong(IdSong, IdUser)
    return response;
  }
  const funcToRating = async (idSong) => {
    debugger;
    console.log("הגעתי לפונקציה של הניתובים");
    console.log(CurrentUser);
    const temp = []

    //נכנסתי מהאזור האישי של זמר ואני יעביר אותו לצפות בכל הדרוגים של השיר הנוכחי
    if (ifFromArea == true) {
      navigate(`/Nav/AllRaitingsForSong/${idSong}`)
    }
    if (CurrentUser.typeOfUser == 2 && AllJudgForPlanFromServer.filter(x => x.planId == params.idPlan && x.userId == CurrentUser.userId).length == 1 && CheckIfStepInJudge == 1)//אם שופט בתוכנית זו בשלב שפיטה
    {
      navigate(`/Nav/AllRaitings/${idSong}/1/${params.idPlan}`)
    }
    else
      //אם הוא אורח או לא נרשם
      // if (CurrentUser.length == 0 && temp.length == 0 || CurrentUser == null) {
      if (CurrentUser.length == 0 || CurrentUser == undefined) {
        debugger
        //אמור להיות הודעה רק לכמה דקות!!1
        alert("הינך מועבר להתחברות למערכת")
        navigate(`/Nav/LoginForm/${idSong}/${params.idPlan}`)
      }
      else {
        let ifOk = await IfThisUserCanRatingThisSong(idSong, CurrentUser.userId)
        await console.log("+++++++++++++++++++++==", ifOk);
        if (CheckIfStepInJudge == 0 && CurrentUser.typeOfUser == 1 && ifOk == false ||
          CheckIfStepInJudge == 0 && CurrentUser.typeOfUser == 2 && AllJudgForPlanFromServer.filter(x => x.planId == params.idPlan && x.userId == CurrentUser.userId).length == 0 //אם שופט בתוכנית אחרת
          || CheckIfStepInJudge == 0 && CurrentUser.typeOfUser == 3 && AllSongsFromStore.filter(x => x.userId == CurrentUser.userId && x.stepInPlanId == currentStep.stepInPlanId) == [])//אם מתמודד בתוכנית אחרת
          navigate(`/Nav/AllRaitings/${idSong}/0/${params.idPlan}`)
        else
          if (CheckIfStepInJudge == 1) {
            alert("אין לך הרשאת גישה לדרג בשלב השפיטה")
            navigate(`/Nav/AllStepInPlans/${params.idPlan}`)
          }
          else
            if (CurrentUser.typeOfUser == 1) {
              // אמור להיות רק כמה שניות על המסך!!!!!!??????????????
              alert("כבר דירגת שיר זה")
              navigate(`/Nav/AllStepInPlans/${params.idPlan}`)
            }
            else
              if (CurrentUser.typeOfUser == 2) {
                // אמור להיות רק כמה שניות על המסך!!!!!!??????????????
                alert("אינך יכול לדרג משום שכעת שלב דרוג ואתה שופט בתוכנית זו")
                navigate(`/Nav/AllStepInPlans/${params.idPlan}`)
              }
              else
                if (CurrentUser.typeOfUser == 3) {
                  //אמור להיות רק כמה שניות על המסך!!!!!!??????????????
                  alert("אינך יכול לדרג משום שאתה מתמודד בשלב זה")
                  navigate(`/Nav/AllStepInPlans/${params.idPlan}`)
                }
                else {
                  //אם מנהל
                  swal("!שגיאה", ":) בתפקיד שלך לא ניתן לדרג ", "error");
                  navigate(`/Nav/HomePageManager`)
                }
      }
  }

  const funcNavigateShowRaiting = (idsong) => {
    if (ifFromArea == true) {//אם מגיע מהאזור האישי
      navigate(`/Nav/ShowRaiting/0/${idsong}`)
    }
    else {
      navigate(`/Nav/ShowRaiting/${params.idPlan}/${idsong}`)
    }

  }
  //משתנה עבור סוג סינון
  //0-עבור בחירת סוג סינון
  //1=עבור סינון לפי שם זמר
  //2-עבור סינון לפי שם שיר
  const [TypeOfFilters, setTypeOfFilters] = useState(0);
  const [AllSongs, setAllSongs] = useState(AllSongsFromStore);
  const [HowManyOpocity, setHowManyOpocity] = useState(0.1);

  //פונקציה בעת בחירת איזה סוג סינון
  function funcToSelect(e) {
    debugger
    // if(TypeOfFilters==0){
    debugger
    if (e.target.value == "שם מתמודד")
      setTypeOfFilters(1)
    else if (e.target.value == "שם שיר")
      setTypeOfFilters(2)
    else{
      setTypeOfFilters(0)
      const a = AllSongsFromStore
      setAllSongs(a)
    }
      
    // }
  }
  //פונקציה בעת הסינון
  function funcTofilter(e) {
    debugger;
    if (TypeOfFilters == 1 && e.code == 'Enter') {
      const a = AllSongsFromStore
      console.log(a, "111111111111111111111");
      setAllSongs(a)
      console.log(AllSongs, "2222222222222222");
      const name = e.target.value.split(" ")
      const fname = name[0]
      const lname = name[1]
      setAllSongs(AllSongs.filter(p => p.userFirstName == fname && p.userLastName == lname))
      console.log(AllSongs, "55555555555555555");
    }
    else if (TypeOfFilters == 2 && e.code == 'Enter') {
      console.log("e.target.value", e.target.value);
      const a = AllSongsFromStore
      setAllSongs(a)
      setAllSongs(AllSongs.filter(p => p.songName == e.target.value))
      console.log("AllSongs", AllSongs);
    }
    else {
      const a = AllSongsFromStore
      setAllSongs(a)
    }
  }
  // const funcToCheckIfJudegeRating = async (idSong) => {
  //   let ifOk = await IfThisUserCanRatingThisSong(idSong, CurrentUser.userId)
  //   return ifOk
  // }
  {/* בדיקה האם התוכנית בשלב שפיטה וגם המשתמש הוא שופט בתוכנית זו וגם הוא דרג או לא דרג שיר זה */}
  // function funcToCheck(item) {
  //   if((currentStep.stepInPlanEndDateToRating) < Date.parse(Date()) && Date.parse(currentStep.stepInPlanEndDateToJudg) > Date.parse(Date()) && CurrentUser.typeOfUser == 2 && AllJudgForPlanFromServer.filter(p => p.planId == currentStep.planId && p.userId == CurrentUser.userId) >= 1 && funcToCheckIfJudegeRating(item.songId) == true) 
  //    setIfJudegeRating(false) 
  //   else
  //   setIfJudegeRating(true)
  // }


  // history.push({ pathname: "/Trylogin" });
  // else
  //אם הוא מדרג

  // if (CurrentUser.typeOfUser == 1 ||
  //   CurrentUser.typeOfUser == 3 && AllSongsFromStore.filter(x => x.userId == CurrentUser.userId && x.stepInPlanId == currentStep) == []
  //   // || CurrentUser.typeOfUser == 2 && AllJudgForPlanFromServer.filter(x => x.planId == planId)
  // )


  //יחד עם שרשור של השיר??????
  // alert(';ccc')
  ////////////////////////////
  // console.log("idSong", idSong);
  // navigate(`/Nav/AllStepInPlans/${params.idPlan}/AllRaitings/${idSong}`)
  // navigate(`/Nav/AllRaitings/${idSong}`)
  // history.push({ pathname: `/AllRaitings${id}` });

  // else
  //   //אם מנהל ננתב לדף הבית שלו
  //   if (CurrentUser.typeOfUser == 4)
  //   alert('dcdd')
  //     ////////////////////////////
  //     // history.push({ pathname: "/HomePageManager" });
  //   else
  //     alert("סורי, לא ניתן לדרג על פי הנהלים")






  // const OnlySongsForThisStep=() =>{
  //   const arr=[]
  //   for (let index = 0; index < AllSongsFromStore.length; index++) {
  //     if(AllSongsFromStore[index].StepInPlanId==props)
  //       arr.push(AllSongsFromStore[index])
  //   }
  // }
  // const Myplayer = {}
  // const state = {
  //         video: {
  //         src: "/ff.mp4",
  //         poster: "/1.png"
  //     }
  // }

  // const onPlayerReady=(player)=>{
  //     Myplayer = player;
  // }

  return <>
    <select onClick={(e) => { funcToSelect(e) }} >
      <option >מייון לפי....</option>
      <option >שם מתמודד</option>
      <option >שם שיר</option>
    </select>
    <input type="text" placeholder="הקלד את השם ולסיום הקש אנטר.." name="nameOfPlan" onKeyPress={(e) => { funcTofilter(e) }}></input>


    {

      (AllSongs.length == 0) ?
        <h1>לא נמצאו שירים התואמים לחיפושך</h1> :
        AllSongs && AllSongs.map((item,i) => {
          if (params.idUser != undefined && item.userId == params.idUser || ifFromArea != true && currentStep != [] && item.stepInPlanId == currentStep.stepInPlanId) {
            return <>
            {/* בדיקה איזה שיר לעשות כלא נשמע */}
              {/* {funcToCheck(item)} */}
              {/* {(ifratingforjudege[i]==true)?setHowManyOpocity(20):setHowManyOpocity(100)} */}
              <Card className='Card'   sx={{ maxWidth: 345, backgroundColor: 'white', opacity:{HowManyOpocity} }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red["900"] }} aria-label="recipe">
                      {/* <MovieFilterIcon></MovieFilterIcon> */}
                      <img src={`https://localhost:44324/images/${item.singerImg}`} width="150%"></img>
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      {/* <MoreVertIcon /> */}
                    </IconButton>
                  }
                  title={
                    <h2 className='h3-name-plan'>{item.songName}</h2>
                  }
                  subheader={
                    <h5>{item.userFirstName} {item.userLastName}</h5>

                  }


                />
                <button onClick={() => funcNavigateShowRaiting(item.songId)}>צפייה בדרוגים</button>

                {/* <button onClick={pushToAllStepInPlan(item.planId)}></button> */}
                {/* //CardMediaאיך מציגים וידאו ב */}
                <CardMedia
                // component="video"
                // height="50%"
                // // Video=""
                // image="video"
                // src='/ff.mp4'
                //image="/static/images/cards/paella.jpg"
                // alt="Paella dish"
                />
                <video height="60%" width="100%" controls={true}>
                  <source src={`https://localhost:44324/VideoSong/${item.songFile}`} type="video/mp4" />

                </video>

                {/* <CardContent>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to cook
                together with your guests. Add 1 cup of frozen peas along with the mussels,
                if you like.
              </Typography>
            </CardContent> */}
                <CardActions disableSpacing className='CardActions'>
                  {/* אם מגיע מהאזור האישי לא יכול לדרג בתור זמר */}
                  {(params.idPlan != -2) ?
                    <IconButton aria-label="add to favorites">
                      {/* <FavoriteIcon></FavoriteIcon> */}
                      
                      <MDBIcon icon="thumbs-up" onClick={() => { funcToRating(item.songId) }} disable="false"></MDBIcon>
                      {/* {(ifFromArea) ? <span onClick={() => { funcToRating(item.songId) }}>לצפייה בכל הדרוגים</span> : <MDBIcon icon="thumbs-up" onClick={() => { funcToRating(item.songId) }}></MDBIcon>} */}
                    </IconButton> : <span></span>}
                  <p >{`"${item.songChoosingReason}"`}</p>
                  <p>{item.songComment}</p>
                  <p> :בנימה אישית</p>



                  {/* פרטים נוספים */}
                  {/* <ExpandMore
                expand={expanded}
                //onClick={handleExpandClick(item.planId)}
                onClick={handleExpandClick}
                aria-expanded={expanded}
              > */}
                  {/* More Details */}
                  {/* <label className='h3-name-plan' >לפרטים נוספים</label> */}
                  {/* <Add></Add> */}
                  {/* </ExpandMore> */}

                </CardActions>

                {/* {expanded && stateIdPlan==item.planId}? */}

                {/* in ={expanded} */}
                {/* <Collapse   timeout="auto" unmountOnExit className='Card' >
              <CardContent className='Collapse'>
                <Typography paragraph>
                  <h5 className='h3-name-plan'> פרטים נוספים אודות {item.planName}  </h5>
                </Typography>
                <Typography paragraph>
                  <label>{item.planStartDate} : תאריך פתיחת התוכנית</label>
                  <label>:שלב נוכחי בתוכנית</label>

                </Typography>

                <Typography>
                  <h5>!בהנאה</h5>
                </Typography>
              </CardContent>
            </Collapse> */}
                {/* :
            <label></label> */}
              </Card>

              <Outlet></Outlet>
            </>
          }
          // onclick()=>setIfJudegeRating(true)
          //)(=<) setIfJudegeRating(true)
        })
    }
  </>
}



{/* <VideoPlayer></VideoPlayer>
        <ReactPlayer></ReactPlayer> */}

{/* <div>
                <VideoPlayer
                    controls={true}
                    src={state.video.src}
                    poster={state.video.poster}
                    width="720"
                    height="420"
                    onReady={onPlayerReady.bind(this)}
                />
            </div> */}
{/* <table style={{ marginLeft: "250px" }}>
            <tr class="w3-white">
                <th>SongId</th>
                <th>UserId</th>
                <th>StepInPlanId</th>
                <th>SongName</th>
                <th>SongFile</th>
                <th>SongChoosingReason</th>
                <th>SongComposer</th>
                <th>SongPrecessor</th>
                <th>SongStatus</th>
                <th>SongComment</th>
            </tr> */}
{/* מיפוי על כל השירים מהסטור */ }
{/* {
                AllSongsFromStore && AllSongsFromStore.map((item) => {
                // if(item.stepInPlanId==props.location.props.id){
                    return <tr class="w3-hover-gray">
                        <td>{item.songId}</td>
                        <td>{item.userId}</td>
                        <td>{item.stepInPlanId}</td>
                        <td>{item.songName}</td>
                        <td>{item.songFile}</td>
                        <td>{item.songChoosingReason}</td>
                        <td>{item.songComposer}</td>
                        <td>{item.songPrecessor}</td>
                        <td>{item.songStatus}</td>
                        <td>{item.songComment}</td>
                    </tr> */}
{/* // }
                })
            } */}
{/* </table>| */ }

