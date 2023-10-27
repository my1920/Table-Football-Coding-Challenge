'use client'
import React, { useState } from "react";
import SelectPlayer from "@/app/_components/forms/fields/SelectPlayer";
import ScoreCounter from "@/app/_components/forms/fields/ScoreCounter";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';

export default function OldGameManagementForm() {
  const [selectedPlayer1Id, setSelectedPlayer1Id] = useState(null);
  const [selectedPlayer2Id, setSelectedPlayer2Id] = useState(null);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [gameDate, setGameDate] = useState(new Date());
  const [resetFlag, setResetFlag] = useState(false);

  const handlePlayer1Change = (player) => {
      setSelectedPlayer1Id(player.id);
  };

  const handlePlayer2Change = (player) => {
    setSelectedPlayer2Id(player.id);
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
      toast.warn("You can't play against yourself");
      return;
    }
    else if(player1Score < 0 || player2Score < 0){
      toast.warn("You can't have a negative score");
      return;
    }
    axios.post("http://localhost:3000/games", {
      "idPlayer1" : selectedPlayer1Id,
      "idPlayer2" : selectedPlayer2Id,
      "datetime" : gameDate,
      "player1score" : player1Score,
      "player2score" : player2Score
    })
      .then((response) => {
          setPlayer1Score(0);
          setPlayer2Score(0);
          setResetFlag(!resetFlag);
          toast.success("The game has been successfully created !", { autoClose: 3000 });
      })
      .catch((error) => {
          console.error("Error while sending data : ", error);
          toast.error("Error while sending data : ", error);
      });
  }

  return (
    <form onSubmit={functionAddGame} className=" flex flex-col justify-center items-center">
        <div className="w-60">
          <label className="block text-sm font-medium leading-6 text-gray-900 text-center mb-2" htmlFor="date">Match date :</label>
          <DatePicker selected={gameDate} onChange={(date) => setGameDate(date)} id="date" dateFormat="dd/MM/yyyy" className="rounded-md ring-1 ring-inset ring-gray-300 text-gray-900 py-1.5 pl-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 w-60"/>
        </div>
        <div className="flex flex-wrap gap-6 mt-10 justify-center">
          <div className="border border-gray-300  rounded-2xl p-8 w-72">
            <SelectPlayer onPlayerChange={handlePlayer1Change} label={"Player 1 :"}/>
            <ScoreCounter label={"Score :"} onScoreChange={handlePlayer1ScoreChange} reset={resetFlag}/>
          </div>

          <div className="border border-gray-300 bg-white rounded-2xl p-8 w-72">
            <SelectPlayer onPlayerChange={handlePlayer2Change} label={"Player 2 :"}/>
            <ScoreCounter label={"Score :"} onScoreChange={handlePlayer2ScoreChange} reset={resetFlag}/>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-center text-white font-bold py-2 px-4 rounded-3xl w-60 mt-10 lg:w-72 "
          >
            Add
          </button>
        </div>


    </form>
  );
}

  