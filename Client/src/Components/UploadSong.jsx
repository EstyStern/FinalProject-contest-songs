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
import SendIcon from '@mui/icons-material/Send';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import axios from "axios"
import { AddSongFromServer, GetAllSongsFromServer } from '../Redux/Song/SongThunk';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import {  useNavigate } from "react-router-dom"


export const UploadSong = () => {
    let navigate = useNavigate()
    const myDispatch = useDispatch();
    // המשתמש הנוכחי שליפת
    const CurrentUser = useSelector((store) => {
        console.log("store", store);
        console.log(store.Users.CurrentUser);
        return store.Users.CurrentUser;
    });
    //השלב הנוכחי
    const currentStep = useSelector((store) => {
        debugger;
        console.log("store", store.StepInPlans.CurrentStepInPlanId);
        return store.StepInPlans.CurrentStepInPlanId;
    })
    //שליפת כל השירים מהסטור
    const AllSongsFromStore = useSelector((store) => {
        console.log("store", store);
        console.log(store.Songs.Songs);
        return store.Songs.Songs;
    });
    //פונקצייה שמקבלת מידע על כל הטופס 
    //myFuncToAdd שולחת אובייקט לפונקצייה
    const OkForm = (event) => {
        event.preventDefault();
        debugger
        //myUser שמירת קלט המשתמש באובייקט 
        if (event.target["SongFile"].files[0] == undefined )
            swal("!שגיאה", ":)   גודל הקובץ חורג מן הכמות המקסימלי", "error");

        if(AllSongsFromStore.filter(r => r.stepInPlanId == currentStep.stepInPlanId && r.userId == CurrentUser.userId).length != 0){
            swal("!שגיאה", ":)  אתה מתמודד בשלב זה לא ניתן להוסיף שיר זה", "error");
            navigate("/Nav/Plans")
        }
        else {
            const MySong = {
                UserId: CurrentUser.userId,
                StepInPlanId: currentStep.stepInPlanId,
                SongName: event.target["Sname"].value,
                SongFile: event.target["SongFile"].files[0].name,
                SongChoosingReason: event.target["SongChoosingReason"].value,
                SongComposer: event.target["SongComposer"].value,
                SongPrecessor: event.target["SongPrecessor"].value,
                SongStatus: "פעיל",
                SongComment: event.target['SongComment'].value
            }

            myFuncToAdd(MySong);
            UploadVideo(event.target["SongFile"].files[0])
        }
    }
    //פונקציה שמעלה וידאו לשרת
    const UploadVideo = async (Video) => {

        const formData = new FormData();
        formData.append('file', Video, Video.name);
        await axios.post("https://localhost:44324/api/UploadVideo/upload", formData, { reportProgress: true, observe: 'events' }).
            then(x => {
                console.log(x);
            })
        alert("השיר נוסף בהצלחה");
    }

    //AddCustomer-פונקציה שניגשת לשרת
    const myFuncToAdd = async (mySong) => {
        debugger;
        console.log("mySong", mySong);
        let s = await AddSongFromServer(myDispatch, "", mySong);
        // let sFinal=await GetAllSongsFromServer(myDispatch)
        console.log("s", s);
        // console.log("sFinal",sFinal);
        if (s != undefined) {
            alert(`Done successfully`);
        }
        else {
            alert("Invalid Details!!")
        }
    }
    return <>
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
                                        title={
                                            <h3 className='h3-name-plan'></h3>
                                        }
                                        subheader={
                                            <h3 className='h3-name-plan'> העלאת שיר</h3>
                                        }

                                    />
                                </MDBCardHeader>
                            </div>

                            <form onSubmit={(e) => { OkForm(e) }}  >
                                {/* שם השיר */}
                                <label
                                    htmlFor="defaultFormEmailEx"
                                    className="grey-text font-weight-light"
                                ></label>

                                <h5 htmlFor="defaultFormEmailEx"
                                    className="grey-text font-weight-light">:הזן שם השיר
                                </h5>

                                <input type="text" name="Sname" className="form-control" required />
                                <label>{ }</label>


                                {/* מעבד */}
                                <label
                                    htmlFor="defaultFormPasswordEx"
                                    className="grey-text font-weight-light"
                                >
                                </label>
                                <h5 htmlFor="defaultFormEmailEx"
                                    className="grey-text font-weight-light">:מעבד השיר
                                </h5>
                                <input type="text" name="SongPrecessor" className="form-control" required />
                                <label>{ }</label>

                                {/* מלחין */}
                                <label
                                    htmlFor="defaultFormPasswordEx"
                                    className="grey-text font-weight-light"
                                >
                                </label>
                                <h5 htmlFor="defaultFormEmailEx"
                                    className="grey-text font-weight-light">:מלחין השיר
                                </h5>

                                <input type="text" name="SongComposer" className="form-control" required />
                                <label>{ }</label>
                                {/* סיבת בחירת השיר*/}
                                <label
                                    htmlFor="defaultFormEmailEx"
                                    className="grey-text font-weight-light"
                                >
                                </label>

                                <h5 htmlFor="defaultFormEmailEx"
                                    className="grey-text font-weight-light">:הזן סיבת בחירת השיר</h5>

                                <textarea name="SongChoosingReason" className="form-control" required />
                                <label>{ }</label>
                                {/* הערות */}
                                <label
                                    htmlFor="defaultFormPasswordEx"
                                    className="grey-text font-weight-light"
                                >
                                </label>

                                <h5 htmlFor="defaultFormEmailEx"
                                    className="grey-text font-weight-light">:הערות                                 </h5>

                                <textarea name="SongComment" className="form-control" />
                                <label>{ }</label>

                                <div >
                                    {/*השיר*/}
                                    <label
                                        htmlFor="defaultFormPasswordEx"
                                        className="grey-text font-weight-light"
                                    >
                                    </label>

                                    <h5 htmlFor="defaultFormEmailEx"

                                        className="grey-text font-weight-light">

                                        <FileUploadIcon></FileUploadIcon>העלה השיר-וידאו
                                    <input className="form-control" type="file" name="SongFile" accept=".mp4" />

                                    </h5>
                                </div>
                                <div className="text-center mt-4">
                                    <Button type='submit' variant="contained" class="BtnSend" endIcon={<SendIcon />}>
                                        שלח
                                    </Button>
                                </div>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    </>
}