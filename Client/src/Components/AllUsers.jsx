import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllUsersFromServer } from '../Redux/User/UserThunk';

export const AllUsers = () => {
    //משתנה עבור שינוי בסטור
    const myDispatch = useDispatch();

    //בעת טעינת הקומפוננטה- שליפת כל המשתמשים
    useEffect(async () => {
        try {
            let response = await GetAllUsersFromServer(myDispatch);
            console.log(response);
        } catch (error) {
            console.error(error.message);
        }
    }, []);

    const AllusersFromStore = useSelector((store) => {
        console.log("store", store);
        console.log(store.Users.Users);
        return store.Users.Users;
    });

    return <>
        <h1>All Users</h1>
<div className="container">


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
                AllusersFromStore && AllusersFromStore.map((item) => {
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
        </div>
    </>

}

