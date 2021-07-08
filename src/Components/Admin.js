import firebase from "firebase";
import fire from "../Config/Config";
import React, { useState, useEffect } from "react";
import "./Admin.css";
import Prescription from "./Prescription";
import AdminNavbar from "../NavBar/AdminNav";

function Admin() {
  const [data, setData] = useState([]);
  const [popup, setpopup] = useState(false);
  const [useruid, setUseruid] = useState();
  const handleClick = () => {
    setpopup(!popup);
  };

  const toggleButton = (Phoneno) => {
    setpopup(!popup);

    setUseruid(Phoneno);

    fire.firestore().collection("ChatApplication").doc(Phoneno).update({
      active: true,
    });


  };

  window.addEventListener("load", () => {
    Fetchdata();
  });

  const Fetchdata = async () => {
    Boolean(false)
    fire.firestore().collection("ChatApplication")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var data = element.data();
          setData((arr) => [...arr, data]);
        });
      });
  };

  return (
    <div>
      <AdminNavbar/>
      <div class="page" style={{marginTop:"100px"}}>
        <div class="page__demo">
          <div class="main-container page__container">
            <table class="table">
              <thead class="table__thead">
                <tr class="table__head">
                  <th class="table__th">Name</th>
                  <th class="table__th">Email</th>
                  <th class="table__th">Phoneno</th>
                  <th class="table__th">Message</th>
                  <th class="table__th">History</th>
                </tr>
              </thead>
              <tbody class="table__tbody">
                {data &&
                  data.map((item, index) => {
                    return (
                      <tr class="table__tr" key={index}>
                        <td class="table_td table_mobile-title">
                          <span>{item.name}</span>
                        </td>
                        <td class="table__td">
                          <span class="table__mobile-caption">Email</span>
                          <span class="table__value">{item.email}</span>
                        </td>
                        <td class="table__td">
                          <span class="table__mobile-caption">Phoneno</span>
                          <span class="table__value">{item.Phoneno}</span>
                        </td>
                        <td class="table__td">
                          <span class="table__mobile-caption">Message</span>
                          <span class="table__value">{item.message}</span>
                        </td>
                        <td class="table__td">
                          <span class="table__mobile-caption">History</span>
                          <span class="table__value">
                            <button
                              disabled={!item.active ? false : true}
                              onClick={() => toggleButton(item.Phoneno)}
                              class={
                                "button " +
                                (!item.active ? "button1" : "complete")
                              }
                            >
                              {item.active ? "Completed" : "Not Completed"}
                            </button>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Prescription useruid={useruid} event={handleClick} popup={popup} />
    </div>
  );
}

export default Admin;