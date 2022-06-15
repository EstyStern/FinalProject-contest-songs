import { useDispatch, useSelector } from 'react-redux';
import { GetCurrentUserByNameAndPassFromServer } from "../Redux/User/UserThunk";
import { useNavigate, Outlet } from 'react-router-dom';
import swal from 'sweetalert';
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
import { Button } from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import CardHeader from '@mui/material/CardHeader';
import { useParams } from "react-router-dom"
import SendIcon from '@mui/icons-material/Send';
import { GetAllPlansFromServer } from '../Redux/Plan/PlanThunk';
import { useState } from "react";
import { IfThisUserRatingThisSong } from '../Redux/Rating/RatingThunk'

{/* <div className="text-center mt-4">
    <Button type='submit' variant="contained" endIcon={<SendIcon />}>
        Send
    </Button>
</div> */}

export default function Trylogin(props) {

    const dispatch = useDispatch();
    let navigate = useNavigate()
    let params = useParams();
    // מערך שגיאות בסיסי
    const [basicErrors, setbasicErrors] = useState({ UserFirstNameErros: "", UserLastNameErros: "", UserPassErros: "" })
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

    //שליפת כל השלבים מהסטור
    const AllStepInPlansFromStore = useSelector((store) => {
        console.log("store", store.StepInPlans.StepInPlans);
        return store.StepInPlans.StepInPlans;
    });

    //שליפת העונה הנוכחית
    const currentStep = useSelector((store) => {
        debugger;
        console.log("storeee", store.StepInPlans.CurrentStepInPlanId);
        return store.StepInPlans.CurrentStepInPlanId;
    })
    //פונקציה שבודקת האם המדרג דירג שיר זה כבר
    const IfThisUserCanRatingThisSong = async (IdSong, IdUser) => {
        let response = await IfThisUserRatingThisSong(IdSong, IdUser)
        return response;
    }
    //בדיקה האם עכשיו בשלב השפיטה
    const CheckIfStepInJudge = useSelector((store) => {
        console.log("store", store);
        console.log(store.Judges.IfStepInJudge);
        return store.Judges.IfStepInJudge;
    })
    let IfJufgeInPlan = AllJudgForPlanFromServer.filter(x => x.PlanId == params.idPlan);
    const funcRaiting = () => {
        navigate(`/Nav/AllStepInPlans/${params.idPlan}/AllRaitings/${params.ifRaiting}`)
    }
    const funcCheckCurrentUser = async (e) => {
        debugger
        e.preventDefault()
        if (basicErrors.UserFirstNameErros != "!!תקין" || basicErrors.UserLastNameErros != "!!תקין" || basicErrors.UserPassErros != "!!תקין")
            alert("פרטים שגויים")
        else {
            let FirstName = e.target["Fname"].value
            let LastName = e.target["Lname"].value
            let Password = e.target["Pass"].value
            let currentUser = await GetCurrentUserByNameAndPassFromServer(dispatch, "", LastName, FirstName, Password);
            debugger
            await console.log('current', currentUser);
            if (currentUser !== '') {//אם לקוח=לקוח קיים
                if (currentUser.typeOfUser == 4) {
                    debugger
                    alert(`hello ${currentUser.userFirstName} מנהלת!!`);
                    navigate(`/Nav/HomePageManager`)

                }

                else {
                    if (params.ifRaiting == 0  && currentUser.typeOfUser==2 || currentUser.typeOfUser==3)
                        navigate(`/Nav/Area/${currentUser.typeOfUser}`)
                    else if(params.ifRaiting == 0) 
                        navigate(`/Nav/Plans`)
                    else
                        if (currentUser.typeOfUser == 2 && AllJudgForPlanFromServer.filter(x => x.planId == params.idPlan && x.userId == currentUser.userId).length == 1 && CheckIfStepInJudge == 1)//אם שופט בתוכנית זו בשלב שפיטה
                        {
                            navigate(`/Nav/AllRaitings/${params.ifRaiting}/1`)
                        }
                        else {
                            let ifOk = await IfThisUserCanRatingThisSong(params.ifRaiting, currentUser.userId)
                            await console.log("+++++++++++++++++++++==", ifOk);
                            if (CheckIfStepInJudge == 0 && currentUser.typeOfUser == 1 && ifOk == false ||
                                CheckIfStepInJudge == 0 && currentUser.typeOfUser == 2 && AllJudgForPlanFromServer.filter(x => x.planId == params.idPlan && x.userId == currentUser.userId).length == 0 //אם שופט בתוכנית אחרת
                                || CheckIfStepInJudge == 0 && currentUser.typeOfUser == 3 && AllSongsFromStore.filter(x => x.userId == currentUser.userId && x.stepInPlanId == currentStep.stepInPlanId) == [])//אם מתמודד בתוכנית אחרת
                            {
                                swal({
                                    title: "!!התחברת בהצלחה",
                                    text: "!אשר התחברות",
                                    icon: "success",
                                    button: "אישור"
                                });
                                navigate(`/Nav/AllRaitings/${params.ifRaiting}/0`)
                            }
                            else
                                if (CheckIfStepInJudge == 1) {
                                    alert("אין לך הרשאת גישה לדרג בשלב השפיטה")
                                    navigate(`/Nav/AllStepInPlans/${params.idPlan}`)
                                }
                                else
                                    if (currentUser.typeOfUser == 1) {
                                        // אמור להיות רק כמה שניות על המסך!!!!!!??????????????
                                        alert("כבר דירגת שיר זה")
                                        navigate(`/Nav/AllStepInPlans/${params.idPlan}`)
                                    }
                                    else
                                        if (currentUser.typeOfUser == 2) {
                                            // אמור להיות רק כמה שניות על המסך!!!!!!??????????????
                                            alert("אינך יכול לדרג משום שכעת שלב דרוג ואתה שופט בתוכנית זו")
                                            navigate(`/Nav/AllStepInPlans/${params.idPlan}`)
                                        }
                                        else
                                            if (currentUser.typeOfUser == 3) {
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
                    // navigate(`/Nav/AllRaitings/${params.ifRaiting}`)
                    // else
                    // {
                    //     navigate(`/Nav/AllRaitings`)
                    // }
                }

            }
            else {//לקוח חדש
                swal("!פרטים שגויים", " הנך מועבר להרשמה ", "error");
                navigate(`/Nav/RgisterOrUpdateForm`)
            }
        }
        //currentUser==null
    }

    //פונקציות עבור בדיקות תקינות של השדות  

    //פונקציות בדיקה של השם משתמש
    const validateFName = (e) => {
        if (e.target.value == "" || e.target.value == "undefined")
            setbasicErrors(
                {
                    ...basicErrors,
                    UserFirstNameErros: "שדה חובה"
                })
        else
            setbasicErrors(
                {
                    ...basicErrors,
                    UserFirstNameErros: "!!תקין"
                })
    }
    const validateLName = (e) => {
        if (e.target.value == "" || e.target.value == "undefined")
            setbasicErrors(
                {
                    ...basicErrors,
                    UserLastNameErros: "שדה חובה"
                })
        else
            setbasicErrors(
                {
                    ...basicErrors,
                    UserLastNameErros: "!!תקין"
                })

    }
    //פונקציה בדיקה עבור הסיסמה של המשתמש
    const validatePass = (inputtxt) => {

        var passw = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,6}$/;
        if (!(inputtxt.target.value.match(passw))) {
            setbasicErrors(
                {
                    ...basicErrors,
                    UserPassErros: "הסיסמה חייבת להכיל גם אותיות באנגלית וגם מספרים מינימום 4 מקסימום 6"
                });
        }
        else
            setbasicErrors(
                {
                    ...basicErrors,
                    UserPassErros: "!!תקין"
                })
    }

    return <>
        <div>
            <MDBContainer style={{ width: "50%" }}>
                <MDBRow >
                    <MDBCol md="80">
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
                                                <h3 className='h3-name-plan'> התחברות</h3>
                                            }
                                        />

                                    </MDBCardHeader>
                                </div>

                                <form onSubmit={(e) => { funcCheckCurrentUser(e) }} >
                                    <label
                                        htmlFor="defaultFormEmailEx"
                                        className="grey-text font-weight-light"
                                    >

                                    </label>
                                    <h5 htmlFor="defaultFormEmailEx"
                                        className="grey-text font-weight-light">:הזן שם משפחה
                                    </h5>
                                    <input
                                        type="text"
                                        // id="defaultFormEmailEx"
                                        id="Lname"
                                        className="form-control"
                                        onChange={(e) => { validateLName(e) }}
                                    />
                                    <label
                                        htmlFor="defaultFormEmailEx"
                                        className="grey-text font-weight-light"
                                    >
                                        {basicErrors.UserLastNameErros}
                                    </label>

                                    <h5 htmlFor="defaultFormEmailEx"
                                        className="grey-text font-weight-light">:הזן שם פרטי</h5>
                                    <input
                                        type="text"
                                        // id="defaultFormEmailEx"
                                        id="Fname"
                                        className="form-control"
                                        onChange={(e) => { validateFName(e) }}
                                    />

                                    <label
                                        htmlFor="defaultFormPasswordEx"
                                        className="grey-text font-weight-light"

                                    >
                                        {basicErrors.UserFirstNameErros}
                                    </label>
                                    <h5 htmlFor="defaultFormEmailEx"
                                        className="grey-text font-weight-light">:הזן סיסמה
                                    </h5>
                                    <input
                                        type="password"
                                        id="Pass"
                                        // id="defaultFormPasswordEx"
                                        className="form-control"
                                        onChange={(e) => { validatePass(e) }}
                                    />
                                    <label
                                        htmlFor="defaultFormPasswordEx"
                                        className="grey-text font-weight-light"
                                    >
                                        {basicErrors.UserPassErros}
                                    </label>
                                    <div className="text-center mt-4">
                                        {/* <MDBBtn  className="mb-3" type="submit">
                                        Login
                                    </MDBBtn> */}
                                        {/* <Button type='submit' class='button'>שלח</Button> */}
                                        <div className="text-center mt-4">
                                            <Button type='submit' variant="contained" class="BtnSend" endIcon={<SendIcon />}>
                                                שלח
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
            <Outlet></Outlet>
        </div>



    </>
}
// )