import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../Redux/store';
import { GetAllSingersFromServer, UpdateSingerInServer } from '../Redux/Singer/SingerThunk';

export const AllSingers = () => {
    //משתנה עבור שינוי בסטור
    const myDispatch = useDispatch();

    //בעת טעינת הקומפוננטה- שליפת כל הזמרים
    useEffect(async () => {
        try {
            let response = await GetAllSingersFromServer(myDispatch);
            console.log(response);
        } catch (error) {
            console.error(error.message);
        }
    }, []);


    //שליפת כל הזמרים מהסטור
    const AllSingersFromServer = useSelector((store) => {
        console.log("store", store);
        console.log(store.Singers.Singers);
        return store.Singers.Singers;
    });

    const ChangeStatus = async (item) => {
        debugger
        console.log(item);
        alert("are you sure to change status")
        let updateItem
        if (item.singerStatus == "לא פעיל") {
            updateItem = {
                "singerStatus": "פעיל",
                "singerImg": item.singerImg,
                "singerCancalingReason": item.singerCancalingReason,
                "singerResume": item.singerResume,
                "userGenre": item.userGenre,
                "userGender": item.userGender,
                "userBirthDate": item.userBirthDate,
                "userCity": item.userCity,
                "userEmail": item.userEmail,
                "userPass": item.userPass,
                "userLastName": item.userLastName,
                "userFirstName": item.userFirstName,
                "singerId": item.singerId,
                "userId": item.userId
            }
        }
        else {
            updateItem = {
                "singerStatus": "לא פעיל",
                "singerImg": item.singerImg,
                "singerCancalingReason": item.singerCancalingReason,
                "singerResume": item.singerResume,
                "userGenre": item.userGenre,
                "userGender": item.userGender,
                "userBirthDate": item.userBirthDate,
                "userCity": item.userCity,
                "userEmail": item.userEmail,
                "userPass": item.userPass,
                "userLastName": item.userLastName,
                "userFirstName": item.userFirstName,
                "singerId": item.singerId,
                "userId": item.userId
            }
        }
        console.log("after", updateItem);
        let s = await UpdateSingerInServer(myDispatch, "", updateItem);
        if (s != "")
            alert("שונה בהצלחה")
        else {
            alert("error")

        }

    }
    return <>
        <h1>All Singers</h1>
        <div className='alert-danger'>ssssssssss</div>
        <table className="table" >
            <tr >
                <th>UserId</th>
                <th>SingerId</th>
                <th>UserFirstName</th>
                <th>UserLastName</th>
                <th>UserPass</th>
                <th>UserEmail</th>
                <th>UserCity</th>
                <th>UserBirthDate</th>
                <th>UserGender</th>
                <th>UserGenre</th>
                <th>SingerResume</th>
                <th>SingerCancalingReason</th>
                <th>SingerImg</th>
                <th>SingerStatus</th>

            </tr>
            {/* מיפוי על כל המשתמשים מהסטור */}
            {
                AllSingersFromServer && AllSingersFromServer.map((item) => {
                    return <tr style={{ backgroundColor: item.singerStatus == "לא פעיל" ? "red" : "green" }}>
                        <td>{item.userId}</td>
                        <td>{item.singerId}</td>
                        <td>{item.userFirstName}</td>
                        <td>{item.userLastName}</td>
                        <td>{item.userPass}</td>
                        <td>{item.userEmail}</td>
                        <td>{item.userCity}</td>
                        <td>{item.userBirthDate}</td>
                        <td>{item.userGender}</td>
                        <td>{item.userGenre}</td>
                        <td>{item.singerResume}</td>
                        <td>{item.singerCancalingReason}</td>
                        <td>{item.singerImg}</td>
                        <td><input type="button" value={item.singerStatus} onClick={() => ChangeStatus(item)} /></td>
                    </tr>
                })
            }
        </table>
    </>

}