import { createStore, combineReducers } from 'redux';
import { UsersReducer } from './User/UserReducer';
import { JudgesReducer } from './Judge/JudgeReducer';
import { SingerReducer } from "./Singer/SingerReducer";
import { PlanReducer } from './Plan/PlanReducer';
import { songReducer } from './Song/SongReducer';
import { TypePlanReducer } from './TypePlan/TypePlanReducer';
import { MessageReducer } from './Message/MessageReducer';
import { StepInPlanReducer } from './StepInPlan/StepInPlanReducer';
import {JudgForPlanReducer }from './JudgForPlan/JudgForPlanReducer';
import {RatingReducer} from './Rating/RatingReducer'

//איחוד הרדוסרים
const reducers = combineReducers(
    {
        Users: UsersReducer,
        Judges: JudgesReducer,
        Singers: SingerReducer,
        Plans: PlanReducer,
        Songs: songReducer,
        TypesPlan: TypePlanReducer,
        Message: MessageReducer,
        StepInPlans: StepInPlanReducer,
        JudgForPlan:JudgForPlanReducer,
        Rating:RatingReducer
    }
)

//יצירת סטור
export const store = createStore(reducers);

//על מנת לצפות בסטור דרך הדפדפן
window.store = store;
console.log(store);