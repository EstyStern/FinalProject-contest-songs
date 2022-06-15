import { blueGrey, red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllMessageFromServer } from '../Redux/Message/MessageThunk'
import { Outlet, useHistory, useNavigate, useParams } from "react-router-dom"
import { SaveAllPlansToShow } from "../Redux/Plan/PlanActions";
import { IfFromArea } from "../Redux/User/UserActions";
export const SingerArea = () => {
    const myDispatch = useDispatch();
    let myNevigate = useNavigate();
    //בעת טעינת הקומפוננטה- שליפת כל ההודעות
    useEffect(async () => {
        try {
            let response = await GetAllMessageFromServer(myDispatch);
            console.log(response);
        } catch (error) {
            console.error(error.message);
        }
    }, []);

    // //שליפת כל ההודעות מהסטור
    const AllMessageFromStore = useSelector((store) => {
        console.log(store.Message.Message);
        return store.Message.Message;
    });
    // המשתמש הנוכחי שליפת
    const CurrentUser = useSelector((store) => {
        console.log("store", store);
        console.log(store.Users.CurrentUser);
        return store.Users.CurrentUser;
    });
    //שליפת כל השירים מהסטור
    const AllSongsFromStore = useSelector((store) => {
        console.log("store", store);
        console.log(store.Songs.Songs);
        return store.Songs.Songs;
    });
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
    //כל השירים של המתמודד הנוכחי
    const SongsToShowPerSinger = AllSongsFromStore.filter(y => y.userId == CurrentUser.userId);
    //כל ההודעות של המשתמש הנוכחי
    const MessagesToShowPerUser = AllMessageFromStore.filter(y => y.userId == CurrentUser.userId);
    //כל התוכניות של המשתמש הנוכחי
    function functAllPlanToShow() {
        debugger
        // const steps=SongsToShowPerSinger.filter(y=>y.stepInPlanId==(AllStepInPlansFromStore.filter(u=>u.stepInPlanId==y.stepInPlanId)).stepInPlanId)
        const plans = []
        //מעבר על כל השירים
        // for (let t = 0; t < SongsToShowPerSinger.length; t++) {
        //     //מעבר על כל השלבים
        //     for (let a = 0; a < AllStepInPlansFromStore.length; a++) {
        //         //אם יש שיר שהוא בשלב מסוים
        //         if (SongsToShowPerSinger[t].stepInPlanId == AllStepInPlansFromStore[a].stepInPlanId &&
        //             plans.filter(r => r.planId == AllStepInPlansFromStore[a].planId).length==0) {
        //             plans.push(AllPlansFromStore.filter(r => r.planId == AllStepInPlansFromStore[a].planId)[0])
        //         }
        //     }
        // }
        const d = new Date()
        AllPlansFromStore.forEach(element => {//תרוץ על כל התוכניות
            console.log(element);
            const f = AllStepInPlansFromStore.filter(t => element.curentStepInPlanId == t.stepInPlanId)//תבדוק באיזה שלב היא
            if (f.length == 1) {//אם היא עכשיו באמצע שלב
                if (Date.parse(f[0].stepInPlanStartDate) <= Date.parse(d) && Date.parse(f[0].stepInPlanEndDateToUploadSong) >= Date.parse(d))//אם השלב בשלב העלאת שיר תתן לו 
                    plans.push(element)
                else {
                    const ifHeHaveSongInThisPlan = SongsToShowPerSinger.filter(u => u.stepInPlanId == f[0].stepInPlanId)//אחרת, תבדוק האם יש לו שירים בשלב זה
                    if (Date.parse(f[0].stepInPlanEndDateToUploadSong) <= Date.parse(d) && Date.parse(f[0].stepInPlanEndDateToRating) >= Date.parse(d) ||//או שהוא בשלב הדרוג
                        Date.parse(f[0].stepInPlanEndDateToRating) <= Date.parse(d) && Date.parse(f[0].stepInPlanEndDateToJudg) >= Date.parse(d) &&//או שהוא בשלב השפיטה
                        ifHeHaveSongInThisPlan.length > 1)//אבל חייב שיש לו שיר
                        plans.push(element)
                }

            }
        });
        return plans
    }

    function FuncToGetAllSong() {
        myNevigate(`/Nav/MySongs/${CurrentUser.userId}`)
    }
    //פונקציה ששמה בסטור את כל התוכניות בהן הוא מתמודד ומציגה אותן
    function FuncToGetAllPlan() {
        const plansToSee = functAllPlanToShow()
        myDispatch(SaveAllPlansToShow(plansToSee))
        myDispatch(IfFromArea(true))
        myNevigate(`/Nav/Plans`)
    }
    return <>
        <div>
            <h1> שלום {CurrentUser.userFirstName}</h1>
            {/* <table style={{ marginLeft: "250px" }}>
                <tr class="w3-white">
                    <th>MessageDate</th>
                    <th>MessageValue</th>
                </tr>
                {
                    MessagesToShowPerUser && MessagesToShowPerUser.map((item) => {
                        return <>
                            <tr class="w3-hover-gray">
                                <td>{item.messageDate}</td>
                                <td>שלום {item.userFirstName} {item.messageValue}</td>
                            </tr>
                        </>
                    }
                    )}
            </table> */}
            <input type="button" value="לכל השירים" onClick={() => { FuncToGetAllSong() }} />
            <input type="button" value="לכל התוכניות" onClick={() => { FuncToGetAllPlan() }} />

            <Outlet></Outlet>
            {/* מיפוי על כל השירים מהסטור */}
            {/* {SongsToShowPerSinger && SongsToShowPerSinger.map((item) => {
                return <>
                    <Card className='Card' sx={{ maxWidth: 345, backgroundColor: 'white' }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red["900"] }} aria-label="recipe"> */} 
                                    {/* <MovieFilterIcon></MovieFilterIcon> */}
            {/* <img src={`https://localhost:44324/images/${item.singerImg}`} width="150%"></img>
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings"> */}
            {/* <MoreVertIcon /> */}
            {/* </IconButton>
                            }
                            title={
                                <h2 className='h3-name-plan'>{item.songName}</h2>
                            }
                            subheader={
                                <h5>{item.userFirstName} {item.userLastName}</h5>

                            }
                        />
                        <CardMedia />
                        <video height="60%" width="100%" controls>
                            <source src={`https://localhost:44324/VideoSong/${item.songFile}`} type="video/mp4" />
                        </video>
                        <CardActions disableSpacing className='CardActions'>
                            <IconButton aria-label="add to favorites">
                            </IconButton>
                            <p>{`"${item.songChoosingReason}"`}</p>
                            <br></br>
                            <p>{item.songComment}</p>
                            <br></br>
                            <p> :בנימה אישית</p>

                        </CardActions>
                    </Card>
                </>
            }
            )
            } */}
            <Outlet></Outlet>
        </div>
    </>

}