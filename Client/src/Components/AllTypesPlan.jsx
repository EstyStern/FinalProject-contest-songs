import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {GetAllTypePlanFromServer} from '../Redux/TypePlan/TypePlanThunk';

export const AllTypesPlan = ({history}) => {

    const myDispatch = useDispatch();

    useEffect(async () => {
        try {
            let response = await GetAllTypePlanFromServer(myDispatch);
            console.log(response);
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
function funcAllPlan(id){
    history.push({ pathname: "/AllPlans", props: { id } })
}
    return <>
        <h1>All Types Plan</h1>
        <table style={{ marginLeft: "250px" }}>
            <tr class="w3-white">
                <th>TypePlanId</th>
                <th>TypePlanName</th>
                <th>AllPaln</th>
            </tr>
            {/* מיפוי על כל המשתמשים מהסטור */}
            {
                AllTypesPlanFromStore && AllTypesPlanFromStore.map((item) => {
                    // <input type="button" onClick={()=>funcAllPlan(item.typePlanId)}>
                    return <tr class="w3-hover-gray">
                        <td>{item.typePlanId}</td>
                        <td>{item.typePlanName}</td>
                        <td><input type="button" onClick={()=>funcAllPlan(item.typePlanId)}/></td>
                    </tr>
                    
                })
            }
        </table>
    </>
}