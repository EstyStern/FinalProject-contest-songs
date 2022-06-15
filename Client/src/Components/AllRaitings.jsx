import swal from 'sweetalert';
import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { useDispatch, useSelector } from 'react-redux';

import ReactDOM from 'react-dom';

import ReactStarsRating from 'react-awesome-stars-rating';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { Button } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import { AddRaiting } from '../Redux/Rating/RatingThunk';
import { useEffect } from 'react';




export default function MyComponent() {


    let params = useParams()
    let navigate=useNavigate()
    // params.ifJudes
    //0-לא שופט בשלב שפיטה
    //1-שופט בשלב שפיטה
    const dispatch = useDispatch();
    useEffect(async () => {
        try {

        } catch (error) {
        }
    }, []);
    const [RatingByMatchShow, setRatingByMatchShow] = useState(0)
    const [RatingByMatchSong, setRatingByMatchSong] = useState(0)
    const [RatingByMusical, setRatingByMusical] = useState(0) // initial rating value
    const CurrentSongId = params.idSong;
    console.log("CurrentSongId!!!", CurrentSongId);
    //שליפת כל השירים מהסטור
    const AllSongsFromStore = useSelector((store) => {
        console.log("store", store);
        console.log(store.Songs.Songs);
        return store.Songs.Songs;
    });
    //משתנה עבור השיר הנוכחי לדרוג
    const [CurrentSong, SetCurrentSong] = useState(AllSongsFromStore.filter(x => x.songId == CurrentSongId));
    console.log(CurrentSong, "CurrentSong");
    // function name() {
    //     swal({
    //         title: "Good job!",
    //         text: "You clicked the button!",
    //         icon: "success",
    //         button: "Aww yiss!",
    //     });
    // }
    // Catch Rating value
    const handleRatingByMatchShow = (rate) => {
        debugger;
        setRatingByMatchShow(rate)
        console.log(RatingByMatchShow)
        //other logic
    }
    const handleRatingByMusical = (rate) => {
        debugger;
        setRatingByMusical(rate)
        console.log(RatingByMusical)
        //other logic
    }
    const handleRatingByMatchSong = (rate) => {
        debugger;
        setRatingByMatchSong(rate)
        console.log(RatingByMatchSong)
        //other logic
    }

    //שליפת המשתמש הנוכחי לצורך דירוג
    const CurrentUser = useSelector((store) => {
        console.log("store", store);
        console.log(store.Users.CurrentUser);
        return store.Users.CurrentUser;
    });
    console.log("CurrentUser", CurrentUser.UserId);
    console.log("CurrentUser", CurrentUser.userId);

    const funcAddRaiting = async (e) => {
        debugger
        e.preventDefault()
        const myRaiting = {
            UserId: Number(CurrentUser.userId),
            SongId: Number(params.idSong),
            RatingByMusical: Number(RatingByMusical),
            RatingByMatchSong: Number(RatingByMatchSong),
            RatingByMatchShow: Number(RatingByMatchShow),
            RatingFinal: (Number(RatingByMusical) + Number(RatingByMatchSong) + Number(RatingByMatchShow)),
            RatingExplanation: e.target["reson"].value
        }
        debugger
        if (params.ifJudes == 1 && myRaiting.RatingExplanation == '' || myRaiting.RatingExplanation == null || myRaiting.RatingExplanation == undefined)
            alert("אתה שופט בשלב שפיטה וחייב לתת הערות הארות ופידבקים")
        else {
            let c = await AddRaiting(dispatch, myRaiting);
            await console.log("c", c);
            if (c != undefined || c!="" || c!=null)
                // ${CurrentSong[0].songName}
                alert(` תודה שדרגת את השיר`)
                navigate(`/Nav/AllStepInPlans/${params.idPlan}`)
        }
        // let currentRaiting = await AddRaiting(dispatch, myRaiting);
        // console.log(currentRaiting);
    }


    return (
        <div className='App'>

            {console.log("CurrentSong!!!!!!!!!", CurrentSong)}
            <h1>{CurrentSong[0].songName}</h1>
            <h3>{CurrentSong[0].userFirstName} {CurrentSong[0].userLastName}</h3>
            <div className='pos' >
                {/* width="100%" */}
                <div className='posVideo' >
                    <video width="70%" height="50%" controls>
                        <source src={CurrentSong[0].songFile} type="video/mp4" />
                    </video>
                </div>
            </div>
            {(CurrentSong[0].songComposer) != null ?
                <h3>מלחין: {CurrentSong[0].songComposer}</h3> :
                <span></span>
            }
            <br></br>
            {(CurrentSong[0].songPrecessor) != null ?
                <h3>מעבד: {CurrentSong[0].songPrecessor}</h3> :
                <span></span>
            }
            <br></br>
            <h5>סיבת בחירת השיר: {CurrentSong[0].songChoosingReason}</h5>
            <br></br>
            {(CurrentSong[0].songComment) != null ?
                <h3>הערות הזמר: {CurrentSong[0].songComment}</h3> :
                <span></span>
            }

            <div className='pos'>

                <h4>:הופעת המתמודד</h4>
                <Rating onClick={handleRatingByMatchShow} ratingValue={RatingByMatchShow} />
                <h4>:רמה מוזיקלית</h4>
                <Rating onClick={handleRatingByMusical} ratingValue={RatingByMusical} />
                <h4>:התאמת המילים לשיר</h4>
                <Rating onClick={handleRatingByMatchSong} ratingValue={RatingByMatchSong} />

            </div>
            <h5>סיבת הדרוג-הערות הארות ופידבקים</h5>
            <form onSubmit={(e) => { funcAddRaiting(e) }} >
                {/* onClick={(e)=>{funcAddRaiting(e.target.value)}} */}
                <textarea type="text" id="reson" ></textarea>
                <input type='submit' value="אישור" />
            </form>
            <div className="text-center mt-4">
                {/* <Button onSubmit={funcAddRaiting("")} type='submit' variant="contained" class="BtnSend" endIcon={<SendIcon />}>
                    שלח
                </Button> */}
                {/* <Button type='submit' class='button'>הירשם</Button> */}
            </div>



        </div>
        // </div>
    )
}




