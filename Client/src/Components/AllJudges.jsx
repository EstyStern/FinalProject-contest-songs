import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../Redux/store';
import { GetAllJudgesFromServer } from '../Redux/Judge/JudgeThunk';

export const AllJudges = () => {
    //משתנה עבור שינוי בסטור
    const myDispatch = useDispatch();

    //בעת טעינת הקומפוננטה- שליפת כל השופטים
    useEffect(async () => {
        try {
            let response = await GetAllJudgesFromServer(myDispatch);
            console.log(response);
        } catch (error) {
            console.error(error.message);
        }
    }, []);

    //שליפת כל המדרגים מהסטור
    const AllJudgesFromStore = useSelector((store) => {
        console.log("store", store);
        console.log(store.Judges.Judges);
        return store.Judges.Judges;
    });

    return <>
        <h1>All Judges</h1>

        <table style={{ marginLeft: "250px" }}>
            <tr class="w3-white">
                <th>UserId</th>
                <th>UserFirstName</th>
                <th>UserLastName</th>
                <th>UserPass</th>
                <th>UserEmail</th>
                <th>UserCity</th>
                <th>UserBirthDate</th>
                <th>UserGender</th>
                <th>UserGenre</th>
            </tr>
            {/* מיפוי על כל המשתמשים מהסטור */}
            {
                AllJudgesFromStore && AllJudgesFromStore.map((item) => {
                    return <tr class="w3-hover-gray">
                        <td>{item.userId}</td>
                        <td>{item.userFirstName}</td>
                        <td>{item.userLastName}</td>
                        <td>{item.userPass}</td>
                        <td>{item.userEmail}</td>
                        <td>{item.userCity}</td>
                        <td>{item.userBirthDate}</td>
                        <td>{item.userGender}</td>
                        <td>{item.userGenre}</td>
                    </tr>
                })
            }
        </table>
    </>

}

