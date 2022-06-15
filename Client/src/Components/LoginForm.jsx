import React from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBModalFooter,
    MDBIcon,
    MDBCardHeader,
    MDBBtn
} from "mdbreact";
import { useDispatch } from 'react-redux';
import { useState } from "react";
//import isIsraeliIdValid from 'israeli-id-validator';
import { GetCurrentUserByNameAndPassFromServer } from "../Redux/User/UserThunk";

export function LoginForm() {

    const dispatch = useDispatch();

    // const funcCheckCurrentUser = async (UserLName, UserFName, UserPassword) => {
    //     debugger
    //     let currentUser = await GetCurrentUserByNameAndPassFromServer(dispatch, "", UserLName, UserFName, UserPassword);
    //     await console.log('current', currentUser);
    //     if (currentUser !== '') {//אם לקוח=לקוח קיים
    //         if (currentUser.typeOfUser == 4)
    //             alert(`hello ${currentUser.userFirstName}!!`);
    //         if (currentUser.typeOfUser == 1)
    //             alert('ppp')
    //             alert(`hello ${currentUser.userFirstName}!!`);

    //     }
    //     else {//לקוח חדש
    //         alert('Invalid Details!!, register!');
    //         //תצוגת טופס הרשמה
    //         //לא עשינו טופס הרשמה
    //     }
    // }
    //שומרת באובייקט את הלקוח
    // const OkForm = event => {
    //     event.preventDefault();
    //     debugger
    //     //myUser שמירת קלט המשתמש באובייקט 
    //     const myUser = {
    //         LName: event.target["Lname"].value,
    //         FName: event.target["Fname"].value,
    //         Pass: event.target["defaultFormPasswordEx"].value
    //     }
    //     debugger
    //     funcCheckCurrentUser(myUser.Lname, myUser.Fname, myUser.Pass);

    // }



    const funcCheckCurrentUser = async (e) => {
        debugger
        e.preventDefault()
        let FirstName=e.target["Fname"].value
        let LastName=e.target["Lname"].value
        let Password=e.target["Pass"].value
        debugger
        let currentUser = await GetCurrentUserByNameAndPassFromServer(dispatch, "",LastName, FirstName, Password);
        debugger
        await console.log('current', currentUser);
        if (currentUser !== '' ) {//אם לקוח=לקוח קיים
            if (currentUser.typeOfUser == 4)
            {
                alert(`hello ${currentUser.userFirstName} מנהלת!!`);
                // console.log(history);
                //props.history.push({ pathname: "/HomePageManager" });

                // funcToHistory()
                // console.log(history);

                //ניתוב לדף הבית של המנהל
                // history.push({ pathname: "/AllUsers" });
            }

        }
        else {//לקוח חדש
            alert('Invalid Details!!, register!');
            //תצוגת טופס הרשמה
            //לא עשינו טופס הרשמה
        }
    }

    return <>
    <div>
        <MDBContainer style={{display:"center"}}>
            <MDBRow >
                <MDBCol md="6">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardHeader className="form-header warm-flame-gradient rounded">
                                <h3 className="my-3">
                                    <MDBIcon icon="lock" /> Login:
                                </h3>
                            </MDBCardHeader>

                            <form onSubmit={(e) => { funcCheckCurrentUser(e) }} >
                                <label
                                    htmlFor="defaultFormEmailEx"
                                    className="grey-text font-weight-light"
                                >
                                    Enter Your Lname
                                </label>
                                <input
                                    type="text"
                                    // id="defaultFormEmailEx"
                                    id="Lname"
                                    className="form-control"
                                />
                                <label
                                    htmlFor="defaultFormEmailEx"
                                    className="grey-text font-weight-light"
                                >
                                    Enter Your Fname
                                </label>
                                <input
                                    type="text"
                                    // id="defaultFormEmailEx"
                                    id="Fname"
                                    className="form-control"
                                />

                                <label
                                    htmlFor="defaultFormPasswordEx"
                                    className="grey-text font-weight-light"
                                >
                                    Enter Your password
                                </label>
                                <input
                                    type="password"
                                    id="defaultFormPasswordEx"
                                    className="form-control"
                                // onChange={(e) => isIsraeliIdValid(e)}
                                />

                                {/* <div className="text-center mt-4">
                                    <MDBBtn  className="mb-3" type="submit">
                                        Login
                                    </MDBBtn>
                                </div> */}

                                <MDBModalFooter>
                                     <button type='submit'>Login</button>
                                    <div className="font-weight-light">
                                        <p>Not a member? Sign Up</p>
                                        <p>Forgot Password?</p>
                                    </div>
                                </MDBModalFooter>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
        </div>
    </>
}

