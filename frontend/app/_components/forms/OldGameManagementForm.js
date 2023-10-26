'use client'
import React, { useState, FormEvent } from "react";
import SelectPlayer from "@/app/_components/forms/fields/SelectPlayer";
import ScoreCounter from "@/app/_components/forms/fields/ScoreCounter";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function OldGameManagementForm() {
  const [selectedPlayer1Id, setSelectedPlayer1Id] = useState(null);
  const [selectedPlayer2Id, setSelectedPlayer2Id] = useState(null);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [gameDate, setGameDate] = useState(new Date());

  const handlePlayer1Change = (playerId) => {
      setSelectedPlayer1Id(playerId);
  };

  const handlePlayer2Change = (playerId) => {
    setSelectedPlayer2Id(playerId);
  };

  const handlePlayer1ScoreChange = (score) => {
    setPlayer1Score(score);
  };

  const handlePlayer2ScoreChange = (score) => {
    setPlayer2Score(score);
  };

  const functionAddGame = (e) => {
    e.preventDefault();

    if(selectedPlayer1Id === selectedPlayer2Id){
      alert("You can't play against yourself");
      return;
    }
    else if(selectedPlayer1Id === null || player2Score === null){
      alert("You must select players");
      return;
    }
    else if(player1Score < 0 || player2Score < 0){
      alert("You can't have a negative score");
      return;
    }
    else {
      console.log("player1Score : ",player1Score)
      console.log("player2Score : ",player2Score)
      axios.post("http://localhost:3000/games", {
        "idPlayer1" : selectedPlayer1Id,
        "idPlayer2" : selectedPlayer2Id,
        "datetime" : gameDate,
        "player1score" : player1Score,
        "player2score" : player2Score
      })
        .then((response) => {
            alert("sended", response);
            console.log(response);
        })
        .catch((error) => {
            console.error("Error while sending data : ", error);
            alert("Error while sending data : " + error.message);
        });

    }
  }

  return (
    <form onSubmit={functionAddGame} className=" flex flex-col justify-center items-center">
        {/*<h3 className="m-4">old game management form</h3>*/}
        <div className="w-60">
          <label className="block text-sm font-medium leading-6 text-gray-900 text-center mb-2">Date du match :</label>
          <DatePicker selected={gameDate} onChange={(date) => setGameDate(date)} dateFormat="dd/MM/yyyy" className="rounded-md ring-1 ring-inset ring-gray-300 text-gray-900 py-1.5 pl-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 w-60"/>
        </div>
        <div className="flex flex-wrap gap-6 mt-10 justify-center">
          <div className="border border-gray-300  rounded-2xl p-8 w-72">
            <SelectPlayer onPlayerChange={handlePlayer1Change} label={"Player 1 :"}/>
            <ScoreCounter label={"Score :"} onScoreChange={handlePlayer1ScoreChange} initialScore={0}/>
          </div>

          <div className="border border-gray-300 bg-white rounded-2xl p-8 w-72">
            <SelectPlayer onPlayerChange={handlePlayer2Change} label={"Player 2 :"}/>
            <ScoreCounter label={"Score :"} onScoreChange={handlePlayer2ScoreChange} initialScore={0}/>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-center text-white font-bold py-2 px-4 rounded-full w-60 mt-10 lg:w-72 "
          >
            Add
          </button>
        </div>


    </form>
  );
}

  