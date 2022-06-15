import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllMessageFromServer } from '../Redux/Message/MessageThunk'
import { Outlet, useHistory, useNavigate, useParams } from "react-router-dom"
import { SaveAllPlansToShow } from "../Redux/Plan/PlanActions";
import { IfFromArea } from "../Redux/User/UserActions";
import  Plans  from "./Plans";

export const JudeArea = () => {
    const myDispatch = useDispatch();
    let myNevigate = useNavigate();
    //בעת טעינת הקומפוננטה- שליפת כל ההודעות
    useEffect(async () => {
        try {
            const plansToSee = []
            //שליחת כל התוכניות שבשלב שפיטה ואני השופט שלהם לסטור
            const planIJugde = AllJudgForPlanFromServer.filter(p => p.userId == CurrentUser.userId)
            AllPlansFromStore.forEach(element => {
                const f = AllStepInPlansFromStore.filter(t => element.curentStepInPlanId == t.stepInPlanId)//תבדוק באיזה שלב היא
                const d = new Date()
                if (f.length>1 && Date.parse(f[0].stepInPlanEndDateToRating) <= Date.parse(d) && Date.parse(f[0].stepInPlanEndDateToJudg) >= Date.parse(d)) {
                    planIJugde.forEach(item => {
                        if (element.planId == item.planId)
                            plansToSee.push(element)
                    });
                }
            });
            myDispatch(SaveAllPlansToShow(plansToSee))
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
    return <>
        <Plans></Plans>
    </>
}