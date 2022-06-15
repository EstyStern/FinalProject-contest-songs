import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllPlansFromServer } from '../Redux/Plan/PlanThunk'
import { withRouter, Route, Outlet } from 'react-router-dom';
// import { useHistory } from "react-router-dom";
import { useState } from 'react'
//MUI
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
import { useHistory, useNavigate } from "react-router-dom"
import { GetAllStepInPlanFromServer } from '../Redux/StepInPlan/StepInPlanThunk'
import { GetCurrentStep } from '../Redux/StepInPlan/StepInPlanActions'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
//Icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import Add from '@mui/icons-material/Add';
import swal from 'sweetalert';

//Images
import p1 from '../images/plans/p1.jpg';
import { Button } from '@material-ui/core';
import Timer from './Timer';
import { AllPlans } from './AllPlans';
import { GetCurentJudgesForPlans } from '../Redux/JudgForPlan/JudgForPlanActions'
import { GetAllTypePlanFromServer } from "../Redux/TypePlan/TypePlanThunk";

import {GetWinsInPlanFromServer} from '../Redux/Plan/PlanThunk'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

//export default withRouter(function Login(props) {
export default function RecipeReviewCard(props) {
  console.log('plannnn');
  ////////////////////////////
  // let history = useHistory()

  // console.log(history,history);
  const [expanded, setExpanded] = React.useState(false);
  const [stepFinal, setstepFinal] = React.useState();
  const [AllJudgForPlan, setAllJudgForPlan] = React.useState();
  // const [stateIdPlan, setStateIdPlan] = useState();

  // let history=useHistory()
  // const handleExpandClick = (idPlan) => {
  //   debugger;
  //   setExpanded(!expanded);
  //    setStateIdPlan(idPlan)
  // };

  const handleExpandClick = (e, item) => {
    debugger;
    setExpanded(!expanded);
    //פונקציה שמכניסה לתוך משצנה עבור תוכנית את תאריך סיום התוכנית
    const Step = AllStepInPlansFromStore.filter(u => u.planId == item.planId && u.stepInPlanPart == 3)

    setstepFinal(Step[0].stepInPlanEndDateToJudg);
    //פונקציה שמחזירה עבור תוכנית את כל השופטים שלה
    const allJudgForPlan = AllJudgForPlanFromServer.filter(y => y.planId == item.planId)
    console.log(allJudgForPlan, "#################");
    setAllJudgForPlan(allJudgForPlan)
    myDispatch(GetCurentJudgesForPlans(allJudgForPlan))
  };

  //שליפת כל השירים מהסטור
  const AllSongsFromStore = useSelector((store) => {
    console.log("store", store);
    console.log(store.Songs.Songs);
    return store.Songs.Songs;
  });


  // const handleExpandClick = (idPlan) => {
  //   setExpanded(!expanded);
  // };

  let navigate = useNavigate()
  const myDispatch = useDispatch();

  // // בעת טעינת הקומפוננטה- שליפת כל סוגי התוכניות //
  useEffect(async () => {
    try {
      let r = await GetAllTypePlanFromServer(myDispatch)
    } catch (error) {
    }
  }, []);
  //שליפת המשתמש הנוכחי לצורך דירוג
  const CurrentUser = useSelector((store) => {
    console.log("store", store);
    console.log(store.Users.CurrentUser);
    return store.Users.CurrentUser;
  });
  //שליפת כל התוכניות מהסטור
  const AllPlansFromStore = useSelector((store) => {
    console.log("AllPlansFromStore", store);
    console.log(store.Plans.Plans);
    return store.Plans.Plans;
  });
  //שליפת כל סוגי התוכניות מהסטור
  const AllTypesPlanFromStore = useSelector((store) => {
    console.log(store.TypesPlan.TypesPlan);
    return store.TypesPlan.TypesPlan;
  });

  //שליפת כל התוכניות של משתמש מיוחד מהסטור
  const AllPlansToShow = useSelector((store) => {
    console.log("AllPlansToShow", store);
    console.log(store.Plans.PlansToShow);
    return store.Plans.PlansToShow;
  });
  //שליפת כל התוכניות של משתמש מיוחד מהסטור
  const IfFromArea = useSelector((store) => {
    console.log("IfFromArea", store);
    console.log(store.Users.IfFromArea);
    return store.Users.IfFromArea;
  });

  //שליפת כל השלבים מהסטור
  const AllStepInPlansFromStore = useSelector((store) => {
    console.log("AllStepInPlansFromStore", store.StepInPlans.StepInPlans);
    return store.StepInPlans.StepInPlans;
  });
  //מעביר לשלבים של התוכנית
  const pushToAllStepInPlan = (idPlan) => {
    debugger
    console.log(idPlan);
    const idCurentStep = AllPlansFromStore.filter(t => t.planId == idPlan)[0].curentStepInPlanId;
    myDispatch(GetCurrentStep(AllStepInPlansFromStore.filter(y => y.stepInPlanId == idCurentStep)[0]))
    console.log(AllStepInPlansFromStore.filter(y => y.stepInPlanId == idCurentStep)[0]);
    navigate(`/Nav/AllStepInPlans/${idPlan}`)
  }
  //פונקציה שמראה את כל התוכניות לפי משתמש נוכחי
  function AllPlanToShow() {
    debugger
    const d = new Date()
    let PlanToShow = []

    if (CurrentUser.typeOfUser == 4) {
      PlanToShow = AllPlansFromStore;
    }

    //אם משתמש מיוחד ומגיע מהאזור האישי שלו 
    if (AllPlansToShow.length != 0 && IfFromArea == true) {
      return AllPlansToShow
    }
    // else {
    //   if (CurrentUser.length == 0 || CurrentUser.typeOfUser == 1) {
    //!בדיקה שתוכנית בשלב הדרוג
    var stepInStepRating = AllStepInPlansFromStore.filter(g => Date.parse(g.stepInPlanEndDateToUploadSong) <= Date.parse(d) && Date.parse(g.stepInPlanEndDateToRating) >= Date.parse(d))
    console.log(stepInStepRating);
    // var PlanToShow = AllPlansFromStore.filter(h => h.curentStepInPlanId == (stepInStepRating.filter(e => e.stepInPlanId == h.curentStepInPlanId)[0]))
    // console.log(PlanToShow);
    for (let index = 0; index < AllPlansFromStore.length; index++) {
      for (let y = 0; y < stepInStepRating.length; y++) {
        if (AllPlansFromStore[index].curentStepInPlanId == stepInStepRating[y].stepInPlanId)
          PlanToShow.push(AllPlansFromStore[index])
      }
      //   }
      //   console.log(PlanToShow);
      // }
      // else {
      //   PlanToShow = AllPlansFromStore.filter(x => x.curentStepInPlanId != null);
      // }

      if (PlanToShow.length != 0 && IfFromArea == false)
        return PlanToShow

      else if (PlanToShow.length == 0) {
        swal("!שגיאה", ":) אין תוכניות זמינות כרגע", "error");
      }
    }
    // AllPlansFromStore.filter(y=>y.curentStepInPlanId==AllStepInPlansFromStore.filter(g=>g.StepInPlanEndDateToUploadSong<Date() && ))
  }
  //משתנה שמציג את כל התוכניות לפי משתמש נוכחי
  const [AllShow, setAllShow] = useState(AllPlanToShow());
  //משתנה עבור סוג סינון
  //0-עבור בחירת סוג סינון
  //1=עבור סינון לפי שם תוכנית
  //2-עבור סינון לפי סוג תוכנית
  const [TypeOfFilters, setTypeOfFilters] = useState(0);
  //פונקציה שמוצאת תוכנית לפי סינונים
  // function funcToSelect(e) {
  //   debugger;
  //   console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",e.target.value)
  // }

  const funcNevigatToAddOrUpdate = (idPlan) => {
    debugger
    // navigate(`/Nav/StepersAddUpdatePlan/${idPlan}/`)
    navigate(`/Nav/StepersAddUpdatePlan/${idPlan}/AddOrUpdatePlan/${idPlan}`)

  }
  const funcDeletePlan = (idPlan) => {
    ///מחיקת תוכנית בשרת
  }

  //שליפת כל תוכניות של השופטים-

  const AllJudgForPlanFromServer = useSelector((store) => {
    console.log("store", store);
    console.log(store.JudgForPlan.JudgForPlan);
    return store.JudgForPlan.JudgForPlan;
  });
  //פונקציה בעת בחירת איזה סוג סינון
  function funcToSelect(e) {
    debugger
    // if(TypeOfFilters==0){
    debugger
    if (e.target.value == "שם תוכנית")
      setTypeOfFilters(1)
    else if (e.target.value == "סוג תוכנית")
      setTypeOfFilters(2)
    else {
      setTypeOfFilters(0)
      const s = AllPlanToShow()
      setAllShow(s)
    }

    // }
  }
  //פונקציה בעת הסינון
  function funcTofilter(e) {
    debugger;
    if (TypeOfFilters == 1 && e.code == 'Enter') {
      const a = AllPlanToShow()
      console.log(a, "111111111111111111111");
      setAllShow(a)
      console.log(AllShow, "2222222222222222");
      setAllShow(AllShow.filter(p => p.planName == e.target.value))
      console.log(AllShow, "55555555555555555");
    }
    else if (TypeOfFilters == 2 && e.target.value != "סוג תוכנית....") {
      console.log("e.target.value", e.target[1].value);
      const a = AllTypesPlanFromStore.filter(y => y.typePlanName == e.target.value);
      console.log(a);
      const s = AllPlanToShow()
      setAllShow(s)
      setAllShow(AllShow.filter(p => p.typePlanId == a[0].typePlanId))
      console.log("AllShow", AllShow);
    }
    else {
      const s = AllPlanToShow()
      setAllShow(s)
    }
  }

  //פונקצייה ששולחת את שירי התוכנית לשרת
  const funcCalcWins = (idPlan) => {
    let StepInPlanIdByPlan = AllPlansFromStore.filter(x => x.planId == idPlan)[0].curentStepInPlanId//שליפת השלב הנוכחי
    console.log("שלב נוכחי",StepInPlanIdByPlan);  
    debugger;   
    let songsPerPlan = AllSongsFromStore.filter(x => x.stepInPlanId == StepInPlanIdByPlan)//שליפת השירים בשלב זה
    console.log("שירים של התוכנית הנוכחית", songsPerPlan);
    //שליחה לשרת את השירים של התוכנית הבחורה
    var p = GetWinsInPlanFromServer(myDispatch, songsPerPlan);
    console.log("p", p);
  }

  return <>
    <div>
      {(CurrentUser.typeOfUser == 4) ?
        //במקרה של הוספה 
        //Params=1
        <AddCircleOutlineIcon fontSize='large' onClick={() => funcNevigatToAddOrUpdate(1)}></AddCircleOutlineIcon>
        // <button onClick={() => funcNevigatToAddOrUpdate(1)}>הוספה</button>
        :
        <span></span>
      }
      {/* onClick={(e)=>{funcToSelect(e)}} */}
      <select onClick={(e) => { funcToSelect(e) }} >
        <option >מייון לפי....</option>
        <option >שם תוכנית</option>
        <option >סוג תוכנית</option>
      </select>
      {(TypeOfFilters == 1) ?
        <input type="text" placeholder="הקלד את שם התוכנית לסיום הקש אנטר.." name="nameOfPlan" onKeyPress={(e) => { funcTofilter(e) }}></input> :
        (TypeOfFilters == 2) ? <select onClick={(e) => { funcTofilter(e) }} >
          <option > סוג תוכנית....</option>
          {AllTypesPlanFromStore && AllTypesPlanFromStore.map((item) => {
            return <>
              <option >{item.typePlanName}</option>
            </>
          })}
        </select> : <span></span>}
      {
        (AllShow != undefined && AllShow.length == 0) ?
          <h1>לא נמצאו תוכניות התואמות לחיפושך</h1> :
          (AllShow == undefined) ?
            <h1>לא נמצאו תוכניות זמינות </h1> :
            AllShow && AllShow.map((item) => {
              console.log("item!!!", item);
              if (item.curentStepInPlanId != null) {
                let nameCurrentstep = ""
                let currentStep = AllStepInPlansFromStore.filter(x => item.curentStepInPlanId != null && x.stepInPlanId == item.curentStepInPlanId)[0]
                console.log("currentStep", currentStep);
                (currentStep != undefined && Date.parse(currentStep.stepInPlanStartDate) < Date.parse(Date()) && Date.parse(currentStep.stepInPlanEndDateToUploadSong) > Date.parse(Date())) ?
                  nameCurrentstep = "שלב העלאת שיר" :
                  (currentStep != undefined && Date.parse(currentStep.stepInPlanEndDateToUploadSong) < Date.parse(Date()) && Date.parse(currentStep.stepInPlanEndDateToRating) > Date.parse(Date())) ?
                    nameCurrentstep = "שלב דרוג " :
                    nameCurrentstep = "שלב שפיטה ";

                return <>

                  <Card className='Card' sx={{ maxWidth: 345, backgroundColor: 'white' }}>
                    {/* onClick={() => pushToAllStepInPlan(item.planId)} */}
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: red["900"] }} aria-label="recipe">
                          {/* {item.typePlanId} */}
                          {nameCurrentstep}
                        </Avatar>
                      }
                      // action={
                      //   <IconButton aria-label="settings">
                      //     {/* <MoreVertIcon /> */}
                      //   </IconButton>
                      // }
                      title={
                        <h3 className='h3-name-plan'>{item.planName}</h3>
                      }
                      subheader={
                        <h5>{item.typePlanName}</h5>
                      }
                    />
                    {/* <button onClick={pushToAllStepInPlan(item.planId)}></button> */}
                    <CardMedia
                      onClick={() => pushToAllStepInPlan(item.planId)}

                      component="img"
                      height="194"
                      // <img src={`https://localhost:44363/Images/Ring/${item.jewelryImage}`} width="280px" />
                      image={`https://localhost:44324/Images/${item.pic}`}
                      // image={p1}
                      //image="/static/images/cards/paella.jpg"
                      alt="Paella dish"
                    />

                    {/* <CardContent>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to cook
                together with your guests. Add 1 cup of frozen peas along with the mussels,
                if you like.
              </Typography>
            </CardContent> */}
                    <CardActions disableSpacing className='CardActions'>

                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon></FavoriteIcon>
                      </IconButton>



                      {(CurrentUser.typeOfUser == 4) ?
                        <ModeEditIcon fontSize='large' onClick={() => funcNevigatToAddOrUpdate(item.planId)}></ModeEditIcon>
                        // <button onClick={() => funcNevigatToAddOrUpdate(item.planId)}>עריכה</button>
                        :
                        <span></span>
                      }


                      {(CurrentUser.typeOfUser == 4 &&
                        Date.parse(currentStep.stepInPlanEndDateToRating) < Date.parse(Date()) && Date.parse(currentStep.stepInPlanEndDateToJudg) > Date.parse(Date())
                      ) ?
                        //ניצחונות בתוכנית-צריך להיות אחרי סיום השלב בעת ארוע כלשהו.
                        <button onClick={() => funcCalcWins(item.planId)}>סיים תוכנית</button>
                        :
                        <span></span>
                      }

                      {/* פרטים נוספים */}
                      <ExpandMore
                        expand={expanded}
                        //onClick={handleExpandClick(item.planId)}
                        onClick={(e) => { handleExpandClick(e, item) }}
                        aria-expanded={expanded}
                      >
                        {/* More Details */}
                        <label className='h3-name-plan' >לפרטים נוספים</label>
                        <Add></Add>

                      </ExpandMore>

                    </CardActions>



                    {/* {expanded && stateIdPlan==item.planId}? */}

                    {/* in= */}
                    <Collapse in={expanded} timeout="auto" unmountOnExit className='Card' >
                      <CardContent className='Collapse'>
                        <Typography paragraph>
                          <h5 className='h3-name-plan'> פרטים נוספים אודות {item.planName}  </h5>
                        </Typography>
                        <Typography paragraph>
                          <label>{item.planStartDate} : תאריך פתיחת התוכנית</label>
                          <label>{stepFinal} : תאריך סיום התוכנית</label>
                          <label>:השופטים בתוכנית זו</label>
                          <ul>
                            {
                              AllJudgForPlan && AllJudgForPlan.map((item) => {
                                return <>
                                  <li> {item.userFirstName} {item.userLastName}</li>
                                </>
                              })}
                          </ul>

                        </Typography>

                        <Typography>
                          <h5>!בהנאה</h5>
                        </Typography>
                      </CardContent>
                    </Collapse>
                    {/* :
            <label></label> */}
                  </Card>
                  {/* {(CurrentUser.typeOfUser == 4) ?
              <button onClick={() => funcNevigatToAddOrUpdate(item.planId)}>עריכה</button>
              :
              <span></span>
            } */}

                  {/* מחיקה */}
                  {/* {(CurrentUser.typeOfUser == 4) ?
              <button onClick={() => funcDeletePlan(item.planId)}>מחיקה</button>
              :
              <span></span>
            } */}
                  <Outlet></Outlet>
                </>}
              })
      }
      {/* {(CurrentUser.typeOfUser == 4) ?
        //במקרה של הוספה 
        //Params=1
        <button onClick={() => funcNevigatToAddOrUpdate(1)}>הוספה</button>
        :
        <span></span>
      } */}
    </div>
  </>

}




