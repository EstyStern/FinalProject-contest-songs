import { NestCamWiredStandTwoTone } from '@mui/icons-material';
import { useState } from 'react';
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
import { useDispatch } from 'react-redux';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { AddUser } from '../Redux/User/UserThunk'
import { WaitForOk } from '../Redux/Singer/SingerActions'
import { WaitForOkJudge } from '../Redux/Judge/JudgeActions'
import SendIcon from '@mui/icons-material/Send';
import axios from "axios"

// props אמור להתקבל עבור העדכון וכן עבור משתנה שמגדיר איזה סוג משתמש רוצה להרשם 
export const RgisterOrUpdateForm = () => {
    // מערך שגיאות בסיסי
    const [basicErrors, setbasicErrors] = useState({ UserFirstNameErros: "", UserLastNameErros: "", UserPassErros: "", UserEmailErros: "", UserBirthDateErros: "", UserGenreErros: "" })
    //מערך שגיאות עבור שופט וזמר
    const [SingerAndJudgeErrors, setSingerAndJudgeErrors] = useState({ SingerResume: "", SingerImg: "" });
    //state עבור הצגת טופס 
    const [IsShowForm, setIsShowForm] = useState(false);
    // עבור הצגת העלאת רזומה ותמונה 
    const [IsShowResumeAndPic, setIsShowResumeAndPic] = useState(false);
    //
    const [typeRegister, setTypeRegister] = useState(1);
    //1-מדרג
    //2-שופט
    //3-מתמודד

    const handleShow = (num) => {
        setIsShowForm(true);
        setIsShowResumeAndPic(true)
        if (num == 2)
            setTypeRegister(2)
        else
            setTypeRegister(3)
    }

    const handleShowToRaiting = () => {
        setIsShowResumeAndPic(false)
        setIsShowForm(true);
    }


    const dispatch = useDispatch();
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
                    UserFirstNameErros: "Correct!!"
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
                    UserLastNameErros: "Correct!!"
                })

    }


    const validateCity = (e) => {
        if (e.target.value == "" || e.target.value == "undefined")
            setbasicErrors(
                {
                    ...basicErrors,
                    UserCityErros: "שדה חובה"
                })
        else
            setbasicErrors(
                {
                    ...basicErrors,
                    UserCityErros: "Correct!!"
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
                    UserPassErros: "Correct!!"
                })
    }

    //פונקציה בדיקה עבור המייל של המשתמש
    const validateEmail = (inputtxt) => {

        var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!(inputtxt.target.value.match(email))) {
            setbasicErrors(
                {
                    ...basicErrors,
                    UserEmailErros: "כתובת המייל שהוזנה אינה תקינה"
                });
        }
        else
            setbasicErrors(
                {
                    ...basicErrors,
                    UserEmailErros: "Correct!!"
                })
    }

    //פונקציה בדיקה עבור התאריך לידה של המשתמש
    const validateDate = (e) => {
        const date = e.target.value
        if (date > Date()) {
            setbasicErrors(
                {
                    ...basicErrors,
                    UserBirthDateErros: "תאריך לא תקין"
                });
        }
        else
            setbasicErrors(
                {
                    ...basicErrors,
                    UserBirthDateErros: "Correct!!"
                })
    }

    //פונקציה בדיקה עבור מגזר של המשתמש
    const validateGender = (e) => {
        if (e.target.value == "---בחר---") {
            setbasicErrors(
                {
                    ...basicErrors,
                    UserGenreErros: "לא נבחר מגזר"
                });
        }
        else
            setbasicErrors(
                {
                    ...basicErrors,
                    UserGenreErros: "Correct!!"
                })
    }




    //פונקצייה שמקבלת מידע על כל הטופס 
    //myFuncToAdd שולחת אובייקט לפונקצייה
    const OkForm = event => {
        event.preventDefault();
        debugger
        //myUser שמירת קלט המשתמש באובייקט 
        const myUser = {
            UserFirstName: event.target["Fname"].value,
            UserLastName: event.target["Lname"].value,
            UserPass: event.target["Pass"].value,
            UserEmail: event.target["Email"].value,
            UserCity: event.target["City"].value,
            UserBirthDate: Date(event.target["date"].value),
            UserGender: (event.target["7"].checked) ? 'נקבה' : 'זכר',
            UserGenre: event.target['8'].value,
        }
        if (typeRegister == 3) {
            const mySinger = {
                SingerResume: event.target["Rsume"].files[0].name,
                SingerStatus: "לא פעיל",
                SingerImg: event.target["Img"].files[0].name,
                SingerCancalingReason: "חסר אישור מנהל"
            }
            myFuncToAdd(myUser, mySinger);
            UploadImg(event.target["Img"].files[0])
            UploadRsume(event.target["Rsume"].files[0])
        }
        else
            if (typeRegister == 2) {
                const myJude = {
                    JudgeResume: event.target["Rsume"].files[0].name,
                    JudgeType: event.target['8'].value,
                    JudgeCancalingReason: "חסר אישור מנהל",
                    JudgePic: event.target["Img"].files[0].name
                }
                myFuncToAdd(myUser, myJude);
                UploadImg(event.target["Img"].files[0])
                UploadRsume(event.target["Rsume"].files[0])
            }
            else
                myFuncToAdd(myUser, {});
    }
    //פונקציה שמעלה תמונה לשרת
    const UploadImg = async (img) => {

        const formData = new FormData();
        formData.append('file', img, img.name);
        await axios.post("https://localhost:44324/api/UploadImages/upload", formData, { reportProgress: true, observe: 'events' }).
            then(x => {
                console.log(x);
            })
        alert("המוצר נוסף בהצלחה");
    }
    //פונקציה שמעלה קורות חיים לשרת
    const UploadRsume = async (resume) => {

        const formData = new FormData();
        formData.append('file', resume, resume.name);
        await axios.post("https://localhost:44324/api/UploadResume/upload", formData, { reportProgress: true, observe: 'events' }).
            then(x => {
                console.log(x);
            })
        alert("המוצר נוסף בהצלחה");
    }
    //AddCustomer-פונקציה שניגשת לשרת
    const myFuncToAdd = async (myUser, obj) => {
        debugger;
        console.log("myUser", myUser);
        if (typeRegister == 1 && basicErrors.UserFirstNameErros == 'Correct!!' && basicErrors.UserLastNameErros == "Correct!!" && basicErrors.UserPassErros == "Correct!!" && basicErrors.UserEmailErros == "Correct!!"
            && basicErrors.UserBirthDateErros == "Correct!!" && basicErrors.UserGenreErros == "Correct!!"
        ) {
            debugger;

            //אם מדובר בהרשמת מדרג-נוסיף אותו לטבלת משתמשים
            //מאם מדובר שופט או מדובר במתמודד
            //storeללהכניס את השופטים והמדרגים 
            //מחכים לאישור מנהל
            //אם יש אישור 
            //שופט נכניס לטבלת משתמשים ושופטים
            //מתמודד מנכניס לטבלת משתמשים וזמרים


            let c = await AddUser(dispatch, "", myUser);
            console.log("c", c);
            // //await setMyUser(c)
            // debugger;
            // await console.log("c", c);
            if (c != undefined) {
                alert(` Done successfully`);
            }
            else {
                alert("Invalid Details!!")
            }
        }
        else
            if (typeRegister == 3) {
                const singer = { user: myUser, singer: obj }
                dispatch(WaitForOk(singer))
            }

            else {
                const judge = { user: myUser, judge: obj }

                dispatch(WaitForOkJudge(judge))
            }

    }

    return <>
        {/* <button onClick={()}>dsfds</button> */}

        {/* <div class="modal-dialog modal-fullscreen-sm-down">dfbdf</div> */}

        <div >
            {/* onSubmit={(e) => funcInput(e)} */}

            <div >
                <Button class='button' onClick={handleShowToRaiting}>הרשמה למדרג</Button>
                <Button class='button' onClick={() => handleShow(2)}>הרשמה לשופט</Button>
                <Button class='button' onClick={() => handleShow(3)}>הרשמה למתמודד</Button>
                {
                    (IsShowForm) ?
                        <MDBContainer style={{ width: "50%" }}  >

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
                                                            <h3 className='h3-name-plan'> הרשמה</h3>
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

                                            <form onSubmit={(e) => { OkForm(e) }} >
                                                {/* שם פרטי */}
                                                <label
                                                    htmlFor="defaultFormEmailEx"
                                                    className="grey-text font-weight-light"
                                                ></label>

                                                <h5 htmlFor="defaultFormEmailEx"
                                                    className="grey-text font-weight-light">:הזן שם פרטי
                                                </h5>

                                                <input type="text" name="Fname" onChange={(e) => validateFName(e)} required className="form-control" />
                                                <label>{basicErrors.UserFirstNameErros}</label>

                                                {/* שם משפחה */}
                                                <label
                                                    htmlFor="defaultFormEmailEx"
                                                    className="grey-text font-weight-light"
                                                >
                                                </label>

                                                <h5 htmlFor="defaultFormEmailEx"
                                                    className="grey-text font-weight-light">:הזן שם משפחה</h5>

                                                <input type="text" name="Lname" onChange={(e) => validateLName(e)} required className="form-control" />
                                                <label>{basicErrors.UserLastNameErros}</label>

                                                {/* סיסמא */}
                                                <label
                                                    htmlFor="defaultFormPasswordEx"
                                                    className="grey-text font-weight-light"
                                                >
                                                </label>
                                                <h5 htmlFor="defaultFormEmailEx"
                                                    className="grey-text font-weight-light">:הזן סיסמה
                                                </h5>

                                                <input type="password" name="Pass" onChange={(e) => validatePass(e)} required className="form-control" />
                                                <label>{basicErrors.UserPassErros}</label>

                                                {/* מייל */}
                                                <label
                                                    htmlFor="defaultFormPasswordEx"
                                                    className="grey-text font-weight-light"
                                                >
                                                </label>
                                                <h5 htmlFor="defaultFormEmailEx"
                                                    className="grey-text font-weight-light">:הזן דוא''ל
                                                </h5>

                                                <input type="email" name="Email" onChange={(e) => validateEmail(e)} required className="form-control" />
                                                <label>{basicErrors.UserEmailErros}</label>


                                                {/* עיר */}
                                                <label
                                                    htmlFor="defaultFormPasswordEx"
                                                    className="grey-text font-weight-light"
                                                >
                                                </label>
                                                <h5 htmlFor="defaultFormEmailEx"
                                                    className="grey-text font-weight-light">:הזן עיר
                                                </h5>

                                                <input type="text" name="City" onChange={(e) => validateCity(e)} className="form-control" />
                                                <label>{basicErrors.UserCityErros}</label>
                                                <label
                                                    htmlFor="defaultFormPasswordEx"
                                                    className="grey-text font-weight-light"
                                                >
                                                </label>
                                                {/* תאריך לידה */}
                                                <label
                                                    htmlFor="defaultFormPasswordEx"
                                                    className="grey-text font-weight-light"
                                                >
                                                </label>

                                                <h5 htmlFor="defaultFormEmailEx"
                                                    className="grey-text font-weight-light">:הזן תאריך לידה
                                                </h5>

                                                <input type="date" placeholder="תאריך לידה" name="date" onChange={(e) => validateDate(e)} className="form-control" />
                                                <label>{basicErrors.UserBirthDateErros}</label>

                                                {/*מין*/}
                                                <label
                                                    htmlFor="defaultFormPasswordEx"
                                                    className="grey-text font-weight-light"
                                                >
                                                </label>

                                                <h5 htmlFor="defaultFormEmailEx"
                                                    className="grey-text font-weight-light">:בחר מין
                                                </h5>

                                                <label>זכר</label>
                                                <input type="radio" name="Gender" />
                                                <label>נקבה</label>
                                                <input type="radio" checked="checked" name="Gender" />


                                                {/* מגדר */}

                                                <label
                                                    htmlFor="defaultFormPasswordEx"
                                                    className="grey-text font-weight-light"
                                                >
                                                </label>
                                                <label
                                                    htmlFor="defaultFormPasswordEx"
                                                    className="grey-text font-weight-light"
                                                >
                                                </label>

                                                <h5 htmlFor="defaultFormEmailEx"
                                                    className="grey-text font-weight-light">:בחר מגדר
                                                </h5>

                                                <select onClick={(e) => validateGender(e)} className="form-control">
                                                    <option name="Genre">---בחר---</option>
                                                    <option name="Genre">מזרחי</option>
                                                    <option name="Genre">חסידי</option>
                                                    <option name="Genre" >ישראלי</option>
                                                    <option name="Genre">אחר</option>
                                                </select>
                                                <label>{basicErrors.UserGenreErros}</label>

                                                {
                                                    (IsShowResumeAndPic) ?
                                                        <div >
                                                            {/*רזומה*/}
                                                            <label
                                                                htmlFor="defaultFormPasswordEx"
                                                                className="grey-text font-weight-light"
                                                            >
                                                            </label>

                                                            <h5 htmlFor="defaultFormEmailEx"

                                                                className="grey-text font-weight-light">

                                                                <FileUploadIcon></FileUploadIcon>העלה רזומה
                                                                <input className="form-control" type="file" name="Rsume" />

                                                            </h5>


                                                            {/*העלה תמונה*/}
                                                            <label
                                                                htmlFor="defaultFormPasswordEx"
                                                                className="grey-text font-weight-light"
                                                            >
                                                            </label>

                                                            <h5 htmlFor="defaultFormEmailEx"

                                                                className="grey-text font-weight-light">

                                                                <FileUploadIcon></FileUploadIcon>העלה תמונה
                                                                <input className="form-control" type="file" name="Img" accept=".JPG" accept=".png" />

                                                            </h5>
                                                        </div>
                                                        :
                                                        <span></span>
                                                }

                                                {/* <input type="file" name="file" id="file" class="myclass" />


                                                // <div className="text-center mt-4">
                                                //     <Button type='submit' class='button'>הירשם</Button>
                                                // </div>

                                                <MDBModalFooter>
                                                </MDBModalFooter>



                                            {/* <MDBBtn gradient="peach">Peach</MDBBtn> */}
                                                <div className="text-center mt-4">
                                                    <Button type='submit' variant="contained" class="BtnSend" endIcon={<SendIcon />}>
                                                        שלח
                                                    </Button>
                                                    {/* <Button type='submit' class='button'>הירשם</Button> */}
                                                </div>
                                            </form>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                        :
                        <span></span>
                }
            </div>
        </div>

    </>
}
