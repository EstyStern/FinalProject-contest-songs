import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllPlansFromServer } from '../Redux/Plan/PlanThunk';

export const HomePage = () => {

    const myDispatch = useDispatch();

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

    return <>
   

            <h1>Home Page</h1>
            <h1>All Plans</h1>

            <table style={{ marginLeft: "250px" }}>
                <tr class="w3-white">
                    <th>PlanId</th>
                    <th>TypePlanId</th>
                    <th>PlanStartDate</th>
                </tr>
                {/* מיפוי על כל המשתמשים מהסטור */}
                {
                    AllPlansFromStore && AllPlansFromStore.map((item) => {
                        return <tr class="w3-hover-gray">
                            <td>{item.planId}</td>
                            <td>{item.typePlanId}</td>
                            <td>{item.planName}</td>
                            <td>{item.planStartDate}</td>
                        </tr>
                    })
                }
            </table>
    </>
}