import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllPlansFromServer } from '../Redux/Plan/PlanThunk'

export const AllPlans = (props) => {
    const myDispatch = useDispatch();
console.log(props);
    //בעת טעינת הקומפוננטה- שליפת כל התוכניות
    useEffect(async () => {
        try {
            let response = await GetAllPlansFromServer(myDispatch);
            console.log(response);
        } catch (error) {
            console.error(error.message);
        }
    }, []);

    //שליפת כל התוכניות מהסטור
    const AllPlansFromStore = useSelector((store) => {
        console.log("store", store);
        console.log(store.Plans.Plans);
        return store.Plans.Plans;
    });

    function funcAllStepInPlan(id){
        props.history.push({ pathname: "/AllStepInPlans", props: { id } })
    }

    return <>
    <div > 
        <h1>All Plans</h1>

        <table style={{ marginLeft: "250px" }}>
            <tr class="w3-white">
                <th>PlanId</th>
                <th>TypePlanId</th>
                <th>PlanName</th>
                <th>PlanStartDate</th>
                <th>Picture</th>
                <th>AllStepInPlan</th>

                <th>StepInPlanId</th>
                <th>StepInPlanEndDateToUploadSong</th>
                <th>StepInPlanStartDate</th>
            </tr>
            {/* מיפוי על כל התוכניות מהסטור */}
            {
                AllPlansFromStore && AllPlansFromStore.map((item) => {
                    //if(item.typePlanId==props.location.props.id){
                        return<tr class="w3-hover-gray">
                                <td>{item.planId}</td>
                                <td>{item.typePlanId}</td>
                                <td>{item.planName}</td>
                                <td>{item.planStartDate}</td>
                                <td>{item.pic}</td>
                                <td>{item.typePlanName}</td>

                                <td>{item.stepInPlanId}</td>
                                <td>{item.stepInPlanEndDateToUploadSong}</td>
                                <td>{item.StepInPlanStartDate}</td>
                                {/* <td><input type="button" onClick={()=>funcAllStepInPlan(item.planId)}/></td> */}
                            </tr>
                    //}
                })
            }
        </table>
        </div>
    </>

}
// <>
                    {/* { item.typePlanId==props? */ }

                    {/* :<label></label>} */ }
                    // </>