import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { GetAllTypePlanFromServer, AddTypePlan } from '../Redux/TypePlan/TypePlanThunk'
import { AddPlan, UpdatePlan } from '../Redux/Plan/PlanThunk'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Button } from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import CardHeader from '@mui/material/CardHeader';
import SendIcon from '@mui/icons-material/Send';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBBtn
} from "mdbreact";

import { LoadAddMyPlanFromStore, LoadUpdateMyPlanFromStore } from '../Redux/Plan/PlanActions'
// import PropTypes from 'prop-types';
// import { styled } from '@mui/material/styles';
// import Stack from '@mui/material/Stack';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import Check from '@mui/icons-material/Check';
// import SettingsIcon from '@mui/icons-material/Settings';
// import GroupAddIcon from '@mui/icons-material/GroupAdd';
// import VideoLabelIcon from '@mui/icons-material/VideoLabel';
// import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import axios from "axios"

export const AddOrUpdatePlan = () => {
  let navigate = useNavigate()

  console.log("dddff");

  const params = useParams()
  const [MyErrors, setMyErrors] = useState({ NameErros: '' });
  var myIdplanToUpdate = params.idPlan
  const myDispatch = useDispatch();



  //טעינת כל סוגי התוכניות מהשרת
  useEffect(async () => {
    try {
      let AllTypePlanFromServer = await GetAllTypePlanFromServer(myDispatch);
      console.log("AllTypePlanFromServer", AllTypePlanFromServer);
      // var myFilter = AllPlansFromStore.filter(x => x.planId == myIdplanToUpdate)

    } catch (error) {
      console.error(error.message);
    }
  }, []);

  //שליפת כל סוגי התוכניות מהסטור
  const AllTypesPlanFromStore = useSelector((store) => {
    console.log("store", store);
    console.log(store.TypesPlan.TypesPlan);
    return store.TypesPlan.TypesPlan;
  });
  console.log("AllTypesPlanFromStore!!!!!!!!!", AllTypesPlanFromStore);


  //שליפת כל התוכניות מהסטור
  const AllPlansFromStore = useSelector((store) => {
    console.log("store", store);
    console.log(store.Plans.Plans);
    return store.Plans.Plans;
  });
  console.log("AllPlansFromStore!!!!",AllPlansFromStore);


  //  -שליפת כל התוכניות מהסטור לעדכון
  const PlansToUpdateFromStoreToUpdate = useSelector((store) => {
    console.log("store", store);
    console.log(store.Plans.PlanToUpdate);
    return store.Plans.PlanToUpdate;
  });
  //  -שליפת כל התוכניות מהסטור להוספה
  const PlansToUpdateFromStoreToAdd = useSelector((store) => {
    console.log("store", store);
    console.log(store.Plans.PlanToAdd);
    return store.Plans.PlanToAdd;
  });







  // const myFilter = AllPlansFromStore.filter(x => x.planId == myIdplanToUpdate)
  // const [myPlanToUpdate, setMyPlanToUpdate] = useState(myFilter?myFilter:{})
  const myPlanToUpdate = AllPlansFromStore.filter(x => x.planId == myIdplanToUpdate)
  // const [myPlanToUpdate, setMyPlanToUpdate] = useState(myFilter?myFilter:{})



  //מציאת תוכנית לפי קוד תוכנית

  //מקבל מידע מהטופס 
  const ApproveFormToEditOrAddPlanOrAddTypePlan = event => {
    debugger;
    event.preventDefault();
    console.log(event.target["othetTypePlan"].value);

    //אובייקט להוספת סוג תוכנית
    const myTypePlan = {
      TypePlanName: event.target["othetTypePlan"].value
    }
    console.log("myTypePlan", myTypePlan);
    debugger
    // שליחה לפונקציה  myFuncAddTypePlan -אם נבחרה סוג תוכנית אחרת
    if (myTypePlan.TypePlanName != '') {
      debugger
      myFuncAddTypePlan(myTypePlan);
    }

    const myTypePlanId = (myTypePlan.TypePlanName != '') ?
      AllTypesPlanFromStore.filter(x => x.typePlanName == myTypePlan.TypePlanName)[0].typePlanId
      : AllTypesPlanFromStore.filter(x => x.typePlanName == event.target['1'].value)[0].typePlanId
    console.log("myTypePlanId!!!!!!!!", myTypePlanId)

    //אובייקט לעריכת והוספת תוכנית
    const myPlanToAdd = {
      // PlanId: (myIdplanToUpdate!=1)?myIdplanToUpdate:,
      TypePlanId: myTypePlanId,
      PlanName: event.target["PlanName"].value,
      PlanStartDate: event.target["Date"].value,
      Pic: event.target["Img"].files[0].name,
      TypePlanName: (myTypePlan.TypePlanName != '') ?
        myTypePlan.TypePlanName :
        event.target['1'].value

    }

    const myPlanToUpdates = {
      PlanId: Number(myIdplanToUpdate),
      TypePlanId: myTypePlanId,
      PlanName: event.target["PlanName"].value,
      PlanStartDate: event.target["Date"].value,
      Pic: event.target["Img"].files[0].name,
      TypePlanName: (myTypePlan.TypePlanName != '') ?
        myTypePlan.TypePlanName :
        event.target['1'].value

    }
    debugger
    UploadImg(event.target["Img"].files[0])

    console.log("myPlanToEdit", myPlanToUpdates);
    console.log("myPlanToAdd", myPlanToAdd);
    //אם נשלח ב 1 =URL 
    //מדובר בהוספה
    //אחרת
    //מדובר בעריכה

    if (Number(myIdplanToUpdate) == 1) {
      debugger
      myFuncAddPlan(myPlanToAdd);
      debugger
      console.log("PlansToUpdateFromStoreToAdd", PlansToUpdateFromStoreToAdd);
      console.log("AllPlansFromStore", AllPlansFromStore);
      //בגלל שמדובר בתוכנית שנוספה כעת
      //נישלוף אותה מהסטור
      //ונשלח להוספת שלבים את קוד התוכנית של התוכנית האחרונה מהסטור
      
      //  1=הוספה
      navigate(`/Nav/StepersAddUpdatePlan/${myIdplanToUpdate}/AddOrUpdateSteps/${AllPlansFromStore[AllPlansFromStore.length - 1].planId}/1`)
    }

    else {
      myFunUpdatePlan(myPlanToUpdates);

      //  0=עדכון
      navigate(`/Nav/StepersAddUpdatePlan/${myIdplanToUpdate}/AddOrUpdateSteps/${myIdplanToUpdate}/0`)
    }

  }


  //פונקציה שמעלה תמונה לשרת
  const UploadImg = async (img) => {
    const formData = new FormData();
    formData.append('file', img, img.name);
    await axios.post("https://localhost:44324/api/UploadImages/upload", formData, { reportProgress: true, observe: 'events' }).
      then(x => {
        console.log(x);
      })
    alert("התמונה נוספה בהצלחה");
  }

  //להוסיף בקומפננטת אישור
  const myFuncAddPlan = async (planToAdd) => {
    debugger
    console.log("planToAdd", planToAdd);
    debugger
    //דחיפה לסטור
    myDispatch(LoadAddMyPlanFromStore(planToAdd))
    // console.log("PlansToUpdateFromStore", PlansToUpdateFromStore);

    //הוספת תוכנית לשרת
    var p = await AddPlan(myDispatch, planToAdd);
    await console.log("p", p);

  }

 
 

  //להוסיף בקומפננטת אישור
  const myFunUpdatePlan = async (planToEdit) => {
    debugger
    console.log("planToEdit", planToEdit);
    debugger
    //דחיפה לסטור
    myDispatch(LoadUpdateMyPlanFromStore(planToEdit))
    // console.log("store-update",store);
    // let p = await UpdatePlan(myDispatch, planToEdit);
    // await console.log("p", p);

    
  }
  console.log(PlansToUpdateFromStoreToUpdate, PlansToUpdateFromStoreToUpdate);
  console.log(PlansToUpdateFromStoreToAdd, PlansToUpdateFromStoreToAdd);


  const myFuncAddTypePlan = async (typePlanToAdd) => {
    debugger
    console.log("typePlanToAdd", typePlanToAdd);
    debugger
    let t = await AddTypePlan(myDispatch, typePlanToAdd);
    await console.log("t", t);
  }

  //בדיקת תקינות 
  //בדיקה שנבחר סוג תוכנית 
  //אם סוג תוכנית שונה מבחר/י
  const validTypePlan = (e) => {
    debugger
    e.preventDefault();
    if (e.target.value == 'בחר/י')
      setMyErrors(
        {
          ...MyErrors,//משרשר לערך הקודם
          NameErros: "!לא נבחרה קטגוריה"
        })
    else {
      setMyErrors(
        {
          ...MyErrors,
          NameErros: "!!נבחרה קטגוריה"
        })
      // setMyUser(
      //     {
      //         ...myUser,
      //         CustomerName: e.target.value
      //     }
      // )
    }
  }

  //code steppers
  // const QontoConnector = styled(StepConnector)(({ theme }) => ({
  //   [`&.${stepConnectorClasses.alternativeLabel}`]: {
  //     top: 10,
  //     left: 'calc(-50% + 16px)',
  //     right: 'calc(50% + 16px)',
  //   },
  //   [`&.${stepConnectorClasses.active}`]: {
  //     [`& .${stepConnectorClasses.line}`]: {
  //       borderColor: '#784af4',
  //     },
  //   },
  //   [`&.${stepConnectorClasses.completed}`]: {
  //     [`& .${stepConnectorClasses.line}`]: {
  //       borderColor: '#784af4',
  //     },
  //   },
  //   [`& .${stepConnectorClasses.line}`]: {
  //     borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
  //     borderTopWidth: 3,
  //     borderRadius: 1,
  //   },
  // }));

  // const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  //   color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  //   display: 'flex',
  //   height: 22,
  //   alignItems: 'center',
  //   ...(ownerState.active && {
  //     color: '#784af4',
  //   }),
  //   '& .QontoStepIcon-completedIcon': {
  //     color: '#784af4',
  //     zIndex: 1,
  //     fontSize: 18,
  //   },
  //   '& .QontoStepIcon-circle': {
  //     width: 8,
  //     height: 8,
  //     borderRadius: '50%',
  //     backgroundColor: 'currentColor',
  //   },
  // }));

  // function QontoStepIcon(props) {
  //   const { active, completed, className } = props;

  //   return (
  //     <QontoStepIconRoot ownerState={{ active }} className={className}>
  //       {completed ? (
  //         <Check className="QontoStepIcon-completedIcon" />
  //       ) : (
  //         <div className="QontoStepIcon-circle" />
  //       )}
  //     </QontoStepIconRoot>
  //   );
  // }

  // QontoStepIcon.propTypes = {
  //   /**
  //    * Whether this step is active.
  //    * @default false
  //    */
  //   active: PropTypes.bool,
  //   className: PropTypes.string,
  //   /**
  //    * Mark the step as completed. Is passed to child components.
  //    * @default false
  //    */
  //   completed: PropTypes.bool,
  // };

  // const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  //   [`&.${stepConnectorClasses.alternativeLabel}`]: {
  //     top: 22,
  //   },
  //   [`&.${stepConnectorClasses.active}`]: {
  //     [`& .${stepConnectorClasses.line}`]: {
  //       backgroundImage:
  //         'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
  //     },
  //   },
  //   [`&.${stepConnectorClasses.completed}`]: {
  //     [`& .${stepConnectorClasses.line}`]: {
  //       backgroundImage:
  //         'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
  //     },
  //   },
  //   [`& .${stepConnectorClasses.line}`]: {
  //     height: 3,
  //     border: 0,
  //     backgroundColor:
  //       theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
  //     borderRadius: 1,
  //   },
  // }));

  // const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  //   backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  //   zIndex: 1,
  //   color: '#fff',
  //   width: 50,
  //   height: 50,
  //   display: 'flex',
  //   borderRadius: '50%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   ...(ownerState.active && {
  //     backgroundImage:
  //       'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  //     boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  //   }),
  //   ...(ownerState.completed && {
  //     backgroundImage:
  //       'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  //   }),
  // }));

  // function ColorlibStepIcon(props) {
  //   const { active, completed, className } = props;

  //   const icons = {
  //     1: <SettingsIcon />,
  //     2: <GroupAddIcon />,
  //     3: <VideoLabelIcon />,
  //   };

  //   return (
  //     <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
  //       {icons[String(props.icon)]}
  //     </ColorlibStepIconRoot>
  //   );
  // }

  // ColorlibStepIcon.propTypes = {
  //   /**
  //    * Whether this step is active.
  //    * @default false
  //    */
  //   active: PropTypes.bool,
  //   className: PropTypes.string,
  //   /**
  //    * Mark the step as completed. Is passed to child components.
  //    * @default false
  //    */
  //   completed: PropTypes.bool,
  //   /**
  //    * The label displayed in the step icon.
  //    */
  //   icon: PropTypes.node,
  // };

  // const addOrUpdate = (myPlanToUpdate.length != 0) ? 'עדכון תוכנית' : 'הוספת תוכנית'
  // const addOrUpdateStep = (myPlanToUpdate.length != 0) ? 'עדכון שלבי תוכנית' : 'הוספת שלבי תוכנית'
  // const steps = [addOrUpdate, addOrUpdateStep, 'אישור'];

  // const nevigateByStep = (lable) => {
  //   if (lable == 'עדכון תוכנית' || lable == 'הוספת תוכנית')
  //     navigate(`/Nav/AddOrUpdatePlan/${idPlan}`)
  // }


  return <>

    <div>
      <MDBContainer style={{ width: "50%" }}>
        <MDBRow >
          <MDBCol md="200">
            <MDBCard>
              <MDBCardBody>
                <div class="Login">

                  <MDBCardHeader className="form-header ">
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: red["900"] }} aria-label="recipe">
                        </Avatar>
                      }
                      // action={
                      //   <IconButton aria-label="settings">
                      //     {/* <MoreVertIcon /> */}
                      //   </IconButton>
                      // }
                      title={
                        <h3 className='h3-name-plan'></h3>
                      }
                      subheader={
                        <h3 className='h3-name-plan'> {(myPlanToUpdate.length != 0) ? 'עדכון תוכנית' : 'הוספת תוכנית'}</h3>
                      }

                    />
                    {/* <h3 >
                                        <MDBIcon />

                                        <Avatar sx={{ bgcolor: red["900"] }} aria-label="recipe">
                                        </Avatar>
                                        title={
                                            <h3 className='h3-name-plan'>:התחברות</h3>
                                        }
                                    </h3> */}
                  </MDBCardHeader>
                </div>

                <form onSubmit={(e) => { ApproveFormToEditOrAddPlanOrAddTypePlan(e) }}  >
                  <label
                    htmlFor="defaultFormEmailEx"
                    className="grey-text font-weight-light"
                  ></label>

                  {/* שם תוכנית */}
                  <h5 htmlFor="defaultFormEmailEx" className="grey-text font-weight-light">!הזן שם תוכנית</h5>
                  <div >
                    <input
                      className="form-control"
                      id="PlanName"
                      type="text"
                      required="true"
                      placeholder={myPlanToUpdate.length != 0 ? myPlanToUpdate[0].planName : ""}
                    >
                    </input>
                  </div>

                  <label
                    htmlFor="defaultFormEmailEx"
                    className="grey-text font-weight-light"
                  >
                  </label>

                  {/* בחירת קטגוריה */}
                  <h5 htmlFor="defaultFormEmailEx"
                    className="grey-text font-weight-light">!בחר קטגורייה</h5>
                  <div >
                    <select id="TypePlan" onClick={(e) => validTypePlan(e)} className="form-control">
                      <option >{myPlanToUpdate.length != 0 ? myPlanToUpdate[0].typePlanName : "בחר/י"}</option>

                      {AllTypesPlanFromStore && AllTypesPlanFromStore.map((item) => {
                        console.log("item", item.typePlanName);
                        return <>
                          {/* {(myPlanToUpdate.length!=0 && item.typePlanName != myPlanToUpdate[0].typePlanName) ? */}
                          <option >{item.typePlanName}</option>
                          {/* : */}
                          {/* <span></span> */}
                          {/* } */}

                        </>
                      })}
                    </select>

                    {/* <div onSubmit={(e) => { funcAddTypePlan(e) }}> */}
                    <input type="text" placeholder='אחר' id="othetTypePlan"></input>
                    {/* <button
                        type="submit"> !הוסף 
                    </button> */}
                    {/* <input value="הוסף סוג תוכנית" type="button" onClick={(e) => funcAddTypePlan(e)}></input> */}
                  </div>
                  <label style={{ color: 'white' }}>{MyErrors.NameErros}</label>


                  <label
                    htmlFor="defaultFormPasswordEx"
                    className="grey-text font-weight-light"
                  >
                  </label>

                  {/* תאריך */}

                  <h5 htmlFor="defaultFormEmailEx"
                    className="grey-text font-weight-light">!בחר תאריך פתיחת התוכנית</h5>
                  <div >
                    <input
                      id="Date"
                      type="datetime-local"
                      required="true"
                      className="form-control"
                    // value={myPlanToUpdate[0].planStartDate}
                    // value={(myPlanToUpdate.length != 0) ? myPlanToUpdate[0].planStartDate : ""}
                    >
                    </input>
                  </div>

                  {/*העלה תמונה*/}
                  <label
                    htmlFor="defaultFormPasswordEx"
                    className="grey-text font-weight-light"
                  >
                  </label>

                  <h5 htmlFor="defaultFormEmailEx"
                    className="grey-text font-weight-light">

                    <FileUploadIcon></FileUploadIcon>העלה תמונה
                    <input className="form-control" type="file" name="Img" accept=".jpg"

                      ////??
                      // placeholder={(myPlanToUpdate.length != 0) ? myPlanToUpdate[0].pic : ""}
                      placeholder={(myPlanToUpdate.length != 0) ? `https://localhost:44324/Images/${myPlanToUpdate[0].pic}` : ""}
                    />
                    {/* <img src={`https://localhost:44324/Images/${myPlanToUpdate[0].pic}`} width="280px" /> */}

                  </h5>


                  <div className="text-center mt-4">
                    {/* <MDBBtn  className="mb-3" type="submit">
                                        Login
                                    </MDBBtn> */}
                    {/* <Button type='submit' class='button'>שלח</Button> */}
                    <div className="text-center mt-4">

                      {/* {(myIdplanToUpdate == 1) ?
                        <button
                          type="submit"> !הוסף תוכנית
                        </button> :
                        <button
                          type="submit"> !עדכן תוכנית
                        </button>
                      } */}
                      <Button type='submit' variant="contained" class="BtnSend" endIcon={<SendIcon />}>
                        אישור
                      </Button>
                      {/* <Button type='submit' class='button'>הירשם</Button> */}
                    </div>
                    {/* <button type='submit'>Login</button> */}

                  </div>

                  <MDBModalFooter>


                    {/* <div className="font-weight-light">
                                        <p>Not a member? Sign Up</p>
                                        <p>Forgot Password?</p>
                                    </div> */}
                  </MDBModalFooter>


                  {/* <MDBBtn gradient="peach">Peach</MDBBtn> */}



                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {/* <form onSubmit={(e) => { ApproveFormToEditOrAddPlanOrAddTypePlan(e) }} style={{ marginTop: '0px', marginLeft: "230px" }}> */}

      {/* <h5>!הזן שם תוכנית</h5>
        <div >
          <input
            id="PlanName"
            type="text"
            required="true"
            placeholder={myPlanToUpdate.length != 0 ? myPlanToUpdate[0].planName : ""}
          >
          </input>
        </div> */}

      {/* <h5>!בחר קטגורייה</h5> */}
      {/* <div > */}
      {/* <select id="TypePlan" onClick={(e) => validTypePlan(e)}> */}
      {/* <option >{myPlanToUpdate.length != 0 ? myPlanToUpdate[0].typePlanName : "בחר/י"}</option> */}

      {/* {AllTypesPlanFromStore && AllTypesPlanFromStore.map((item) => { */}
      {/* // console.log("item", item.typePlanName); */}
      {/* // return <> */}
      {/* {(myPlanToUpdate.length!=0 && item.typePlanName != myPlanToUpdate[0].typePlanName) ? */}
      {/* <option >{item.typePlanName}</option> */}
      {/* : */}
      {/* <span></span> */}
      {/* } */}
      {/* 
              </>
            })}
          </select> */}

      {/* <div onSubmit={(e) => { funcAddTypePlan(e) }}> */}
      {/* <input type="text" placeholder='אחר' id="othetTypePlan"></input> */}
      {/* <button
                        type="submit"> !הוסף 
                    </button> */}
      {/* <input value="הוסף סוג תוכנית" type="button" onClick={(e) => funcAddTypePlan(e)}></input> */}
      {/* </div>

        <label style={{ color: 'white' }}>{MyErrors.NameErros}</label> */}
      {/* </div> */}


      {/* <h5>!בחר תאריך פתיחת התוכנית</h5>
        <div >
          <input
            id="Date"
            type="datetime-local"
            required="true"
            // value={myPlanToUpdate[0].planStartDate}
            value={(myPlanToUpdate.length != 0) ? myPlanToUpdate[0].planStartDate : ""}
          >
          </input>
        </div> */}

      {/*העלה תמונה*/}
      {/* <label
          htmlFor="defaultFormPasswordEx"
          className="grey-text font-weight-light"
        >
        </label>

        <h5 htmlFor="defaultFormEmailEx"

          className="grey-text font-weight-light">

          <FileUploadIcon></FileUploadIcon>העלה תמונה
          <input className="form-control" type="file" name="Img" accept=".jpg"

            ////??
            // placeholder={(myPlanToUpdate.length != 0) ? myPlanToUpdate[0].pic : ""}
            placeholder={(myPlanToUpdate.length != 0) ? `https://localhost:44324/Images/${myPlanToUpdate[0].pic}` : ""}
          />
          <img src={`https://localhost:44324/Images/${myPlanToUpdate[0].pic}`} width="280px" />

        </h5> */}


      {/* {(myIdplanToUpdate == 1) ?
          <button
            type="submit"> !הוסף תוכנית
          </button> :
          <button
            type="submit"> !עדכן תוכנית
          </button>
        } */}

      {/* </form> */}




    </div>

  </>
}
export default AddOrUpdatePlan;