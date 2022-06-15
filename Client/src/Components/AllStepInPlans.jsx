import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { GetAllStepInPlanFromServer } from '../Redux/StepInPlan/StepInPlanThunk'
import { useParams, withRouter } from 'react-router-dom';
import { AllSongs } from '../Components/AllSongs';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Timer from './Timer';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BalanceIcon from '@mui/icons-material/Balance';
import { MDBIcon } from 'mdbreact';
import {UploadSong} from "./UploadSong";
import {IfStepInJudge} from '../Redux/Judge/JudgeActions';
// import {GetCurrentStep} from '../Redux/StepInPlan/StepInPlanActions'


const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props) {
  debugger
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    3: <FileUploadIcon />,
    2: <MDBIcon icon="thumbs-up" ></MDBIcon>,
    1: <BalanceIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function CustomizedSteppers(props) {
  console.log("שם הקומפוננטה CustomizedSteppers");
  debugger
  //console.log("props",props.match.params.id);

  const myDispatch = useDispatch();
  const myParams = useParams();
  const classes = useStyles();
  //שליפת כל התוכניות מהסטור
  const AllPlansFromStore = useSelector((store) => {
    console.log("store", store);
    console.log(store.Plans.Plans);
    return store.Plans.Plans;
  });
  //שליפת כל השלבים מהסטור
  const AllStepInPlansFromStore = useSelector((store) => {
    console.log("store", store.StepInPlans.StepInPlans);
    return store.StepInPlans.StepInPlans;
  });
  //התוכנית הנוכחית
  const currentPlan = AllPlansFromStore.filter(m => m.planId == myParams.idPlan);
  console.log("*****************8",currentPlan);
  //השלב הנוכחי
  const currentStep = useSelector((store) => {
    debugger;
    console.log("store", store.StepInPlans.CurrentStepInPlanId);
    return store.StepInPlans.CurrentStepInPlanId;
  })
  //zmaniiiiiiiiiiiiiiiiii
  const CheckIfStepInJudge = useSelector((store) => {
    debugger;
    console.log("store", store);
    console.log(store.Judges.IfStepInJudge);
    return store.Judges.IfStepInJudge;
  })
  //שליפת כל השופטים
  const AllJudges = useSelector((store) => {
    console.log("store", store);
    console.log(store.Judges.Judges);
    return store.Judges.Judges;
  });
   //שליפת כל תוכניות של השופטים-
   const AllJudgForPlanFromServer = useSelector((store) => {
    console.log("store", store);
    console.log(store.JudgForPlan.JudgForPlan);
    return store.JudgForPlan.JudgForPlan;
  });
  //שליפת כל השופטים לתוכנית זו-
// const CurentJudgesForPlan = useSelector((store) => {
//   console.log("11111111111111111",store.JudgForPlan.CurentJudgesForPlan);
//   return store.JudgForPlan.CurentJudgesForPlan;
// });
console.log(currentPlan[0].planId,"333333333333333");
debugger;
// _moodboards.filter(mb => { return mb.tags.filter(t => t.value == name) })
// _moodboards.filter(({ tags }) => (tags.some(({ value }) => value === name)
function CurrentJudes() {
  debugger
  const arr=[]
  AllJudgForPlanFromServer.forEach(element => {
    if(element.planId==Number(currentPlan[0].planId)){
      arr.push(element)
    }
  });
   
  
  return arr;
}
 const [AllJudgForPlan, setAllJudgForPlan] = React.useState(CurrentJudes());
console.log(AllJudgForPlan,"666666666666666666");
  //משתנה שמציג את השלב בעונה הנוכחית
  function StepOfRatings(){
    let StepOfRating =-1
    if (Date.parse(currentStep.stepInPlanStartDate) < Date.parse(Date()) && Date.parse(currentStep.stepInPlanEndDateToUploadSong) > Date.parse(Date()))
      StepOfRating = 0
    else 
        if (Date.parse(currentStep.stepInPlanEndDateToUploadSong) < Date.parse(Date()) && Date.parse(currentStep.stepInPlanEndDateToRating) > Date.parse(Date()))
            StepOfRating = 1
        else{
          debugger
            myDispatch(IfStepInJudge(1))
            StepOfRating = 2
          }
    return  StepOfRating
  }
  const [activeStep, setActiveStep] = React.useState(StepOfRatings());
  
  
  
  //קבלת כל השלבים של עונה זו
  function getSteps() {
    // const arr = ["שלב השפיטה", "שלב דירוג", "שלב העלאת שיר"]
    const arr = ["שלב העלאת שיר", "שלב דירוג", "שלב השפיטה"]
    return arr;
  }





  const steps = getSteps();
  const handleNext = (label) => {
    // console.log("label", label);
    // debugger;
    // let i = -1;
    // const list = getSteps()
    // for (let index = 0; index < list.length || i == index; index++) {
    //   if (list[index] == label)
    //     i = index;
    // }
    //עדכון הפרופס שנשלח לקומפוננטת כל השירים
    // setActiveStep(i);
    // if (label == "שלב השפיטה")
    //   alert("שלב זה עדיין לא החל")
    // if (label == "שלב העלאת שירים")
    //   alert("לא ניתן לחזור לשלב קודם")
  };
  return <>
      <h1 style={{ color: "white" }}>{currentPlan[0].planName}</h1>
    <div className={classes.root}>
      <h3 style={{ color: "white" }}> עונה מספר {currentStep.stepInPlanPart} {steps[activeStep]}</h3>
      
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />} style={{ backgroundColor: "black" }}>
        {steps.map((label) => (
          <Step key={label} onClick={() => handleNext(label)}>
            <StepLabel StepIconComponent={ColorlibStepIcon} >{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <span style={{fontSize:"20px"}}>שלב זה הולך ואוזל!!!!</span>
      {(currentStep!=undefined && activeStep==0)?
        <Timer props={currentStep.stepInPlanEndDateToUploadSong}></Timer>
        :(currentStep!=undefined && activeStep==1)?
        <  Timer props={currentStep.stepInPlanEndDateToRating}></Timer>:
        (currentStep!=undefined && activeStep==2)?
        <  Timer props={currentStep.stepInPlanEndDateToJudg}></Timer>:
        <span></span>
      }

      {/* <RecipeReviewCard props={propsToHead} ></RecipeReviewCard>:  */}
      {/* //only minit */}
{/* {(activeStep==2)?AllJudgForPlan && AllJudgForPlan.map((item) => {
  <div>
    <h1>{item.userFirstName} {item.userLastName}</h1>
    <h5>סגנון-{item.judgeType} </h5>
    <img src={`https://localhost:44324/images/${item.judgePic}`}></img>
    
  </div>
 }):<span></span>} */}
 {AllJudgForPlan && AllJudgForPlan.map((item) => {
   return<>
  <div style={{display:"inline-block"}}>
    <h1>{item.userFirstName} {item.userLastName}</h1>
    <h5>סגנון-{item.judgeType} </h5>
    <img src={`https://localhost:44324/images/${item.judgePic}`} width="20%"></img>
    
  </div></>
 })}


      {
        activeStep==0 ?
        <UploadSong/> : <AllSongs ></AllSongs>
      }
     



    </div>
  </>
}
// }





// export const AllStepInPlans = (props) => {
//     const myDispatch = useDispatch();

//     //בעת טעינת הקומפוננטה- שליפת כל השלבים
//     useEffect(async () => {
//         try {
//             let response = await GetAllStepInPlanFromServer(myDispatch);
//             console.log(response);
//         } catch (error) {
//             console.error(error.message);
//         }
//     }, []);

//     //שליפת כל השלבים מהסטור
//     const AllStepInPlansFromStore = useSelector((store) => {
//         console.log("store", store);
//         console.log(store.StepInPlans.StepInPlans);
//         return store.StepInPlans.StepInPlans;
//     });
//     function funcAllSongs(id){
//         props.history.push({ pathname: "/AllSongs", props: { id } })
//     }
//     return <>
//         <h1>All StepInPlans</h1>

//         <table style={{ marginLeft: "250px" }}>
//             <tr class="w3-white">
//                 <th>stepInPlanId</th>
//                 <th>planId</th>
//                 <th>stepInPlanStartDate</th>
//                 <th>stepInPlanEndDateToUploadSong</th>
//                 <th>stepInPlanEndDateToJudg</th>
//                 <th>stepInPlanEndDateToRating</th>
//                 <th>AllSongs</th>
//             </tr>
//             {/* מיפוי על כל השלבים מהסטור */}
//             {
//                 AllStepInPlansFromStore && AllStepInPlansFromStore.map((item) => {
//                     if(item.planId==props.location.props.id){
//                         return <tr class="w3-hover-gray">
//                             <td>{item.stepInPlanId}</td>
//                             <td>{item.planId}</td>
//                             <td>{item.stepInPlanStartDate}</td>
//                             <td>{item.stepInPlanEndDateToUploadSong}</td>
//                             <td>{item.stepInPlanEndDateToJudg}</td>
//                             <td>{item.stepInPlanEndDateToRating}</td>
//                             <td><input type="button" onClick={()=>funcAllSongs(item.stepInPlanId)}/></td>
//                         </tr>
//                     }
//                 })
//             }
//         </table>
//     </>


