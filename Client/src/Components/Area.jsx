import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllMessageFromServer } from '../Redux/Message/MessageThunk'
import { Outlet, useHistory, useNavigate, useParams } from "react-router-dom"
import { SaveAllPlansToShow } from "../Redux/Plan/PlanActions";
import { IfFromArea } from "../Redux/User/UserActions";
import Plans from "./Plans";

export const Area = () => {
    const myDispatch = useDispatch();
    let myNevigate = useNavigate();
    let MyParams = useParams()
    //בעת טעינת הקומפוננטה- שליפת כל ההודעות
    useEffect(async () => {
        debugger
        try {
            debugger
            console.log(MyParams, "1212");
            debugger;
            if (Number(MyParams.idUser) == 2) {//אם אני שופט
                const plansToSee = []
                //שליחת כל התוכניות שבשלב שפיטה ואני השופט שלהם לסטור
                const planIJugde = AllJudgForPlanFromServer.filter(p => p.userId == CurrentUser.userId)
                AllPlansFromStore.forEach(element => {
                    const f = AllStepInPlansFromStore.filter(t => element.curentStepInPlanId == t.stepInPlanId)//תבדוק באיזה שלב היא
                    const d = new Date()
                    if (f.length >= 1 && Date.parse(f[0].stepInPlanEndDateToRating) <= Date.parse(d) && Date.parse(f[0].stepInPlanEndDateToJudg) >= Date.parse(d)) {
                        planIJugde.forEach(item => {
                            if (element.planId == item.planId) {
                                plansToSee.push(element)
                            }
                        });
                    }
                });
                myDispatch(SaveAllPlansToShow(plansToSee))
            }
            else if (Number(MyParams.idUser) == 3) {
                //כל השירים של המתמודד הנוכחי
                const SongsToShowPerSinger = AllSongsFromStore.filter(y => y.userId == CurrentUser.userId);
                const plans = []
                const d = new Date()
                AllPlansFromStore.forEach(element => {//תרוץ על כל התוכניות
                    console.log(element);
                    const f = AllStepInPlansFromStore.filter(t => element.curentStepInPlanId == t.stepInPlanId)//תבדוק באיזה שלב היא
                    if (f.length == 1) {//אם היא עכשיו באמצע שלב
                        if (Date.parse(f[0].stepInPlanStartDate) <= Date.parse(d) && Date.parse(f[0].stepInPlanEndDateToUploadSong) >= Date.parse(d))//אם השלב בשלב העלאת שיר תתן לו 
                            plans.push(element)
                        else {
                            const ifHeHaveSongInThisPlan = SongsToShowPerSinger.filter(u => u.stepInPlanId == f[0].stepInPlanId)//אחרת, תבדוק האם יש לו שירים בשלב זה
                            if ((Date.parse(f[0].stepInPlanEndDateToUploadSong) <= Date.parse(d) && Date.parse(f[0].stepInPlanEndDateToRating) >= Date.parse(d) ||//או שהוא בשלב הדרוג
                                Date.parse(f[0].stepInPlanEndDateToRating) <= Date.parse(d) && Date.parse(f[0].stepInPlanEndDateToJudg) >= Date.parse(d)) &&//או שהוא בשלב השפיטה
                                ifHeHaveSongInThisPlan.length >= 1)//אבל חייב שיש לו שיר
                                plans.push(element)
                        }

                    }
                });
                console.log("45464646546546545!!!", plans);
                myDispatch(SaveAllPlansToShow(plans))
            }
            //משתנה שמוכיח שהגעתי ממהאזור האישי
            myDispatch(IfFromArea(true))
        } catch (error) {
            console.error(error.message);
        }
    }, []);
    //שליפת כל השלבים מהסטור
    const AllStepInPlansFromStore = useSelector((store) => {
        console.log("store", store.StepInPlans.StepInPlans);
        return store.StepInPlans.StepInPlans;
    });
    // המשתמש הנוכחי שליפת
    const CurrentUser = useSelector((store) => {
        console.log("store", store);
        console.log(store.Users.CurrentUser);
        return store.Users.CurrentUser;
    });
    //שליפת כל התוכניות מהסטור
    const AllPlansFromStore = useSelector((store) => {
        console.log("store", store);
        console.log(store.Plans.Plans);
        return store.Plans.Plans;
    });
    //שליפת כל תוכניות של השופטים-
    const AllJudgForPlanFromServer = useSelector((store) => {
        console.log("store", store);
        console.log(store.JudgForPlan.JudgForPlan);
        return store.JudgForPlan.JudgForPlan;
    });
    //שליפת כל השירים מהסטור
    const AllSongsFromStore = useSelector((store) => {
        console.log("store", store);
        console.log(store.Songs.Songs);
        return store.Songs.Songs;
    });
    function FuncToGetAllSong() {
        myNevigate(`/Nav/MySongs/${CurrentUser.userId}`)
    }
    return <>
        <h1> שלום {CurrentUser.userFirstName}</h1>
        <Plans></Plans>
        {(Number(MyParams.idUser) == 3) ? <input type="button" value="לכל השירים" onClick={() => { FuncToGetAllSong() }} /> : <span></span>}
    </>
}