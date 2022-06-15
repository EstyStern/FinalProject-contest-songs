
import { Outlet, useHistory, useNavigate, useParams } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllRatingByIdSongFromServer } from "../Redux/Rating/RatingThunk";
export const AllRaitingsForSong=()=>{
    const myDispatch = useDispatch();
    let params = useParams()
    useEffect(async () => {
        try {
            let response = await GetAllRatingByIdSongFromServer(myDispatch,params.idSong);
            console.log(response);
        } catch (error) {
            console.error(error.message);
        }
    }, []);

    //שליפת כל התוכניות מהסטור
    const AllRatingByIdSongFromServer = useSelector((store) => {
        console.log("@@@@@@@@@@@@@@",store.Rating.RatingByIdSong);
        return store.Rating.RatingByIdSong;
    });

    
    return<>
    <h1>כל הדרוגים</h1>
    <table style={{ marginLeft: "250px" }}>
            <tr class="w3-white">
                <th>UserLastName</th>
                <th>UserFirstName</th>
                <th>SongName</th>
                <th>RatingExplanation</th>
                <th>RatingFinal</th>
                <th>RatingByMatchShow</th>
                <th>RatingByMatchSong</th>
                <th>RatingByMusical</th>
            </tr>
            {/* מיפוי על כל ההודעות מהסטור */}
            {
                AllRatingByIdSongFromServer && AllRatingByIdSongFromServer.map((item) => {
                    
                        return <>
                            <tr class="w3-hover-gray">
                                <td>{item.userLastName}</td>
                                <td>{item.userFirstName}</td>
                                <td>{item.songName}</td>
                                <td>{item.ratingExplanation}</td>
                                <td>{item.ratingFinal}</td>
                                <td>{item.ratingByMatchShow}</td>
                                <td>{item.ratingByMatchSong}</td>
                                <td>{item.ratingByMusical}</td>

                            </tr>
                        </>
                    
                })
            }
        </table>
    </>
}