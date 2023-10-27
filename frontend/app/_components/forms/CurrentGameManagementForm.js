
'use client'
import React, { useState } from "react";
import SelectPlayer from "@/app/_components/forms/fields/SelectPlayer";
import ScoreCounter from "@/app/_components/forms/fields/ScoreCounter";
import axios from 'axios';
import  Link  from 'next/link'
import { toast } from 'react-toastify';

export default function CurrentGameManagementForm() {
    const [selectedPlayer1, setSelectedPlayer1] = useState(null);
    const [selectedPlayer2, setSelectedPlayer2] = useState(null);
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);
    const [currentStep, setCurrentStep] = useState(1);
    const [currentGameId, setCurrentGameId] = useState(null);
    const [currentGameDate, setCurrentGameDate] = useState(null);


    const handlePlayer1Change = (player) => {
      setSelectedPlayer1(player);
    };

    const handlePlayer2Change = (player) => {
      setSelectedPlayer2(player);
    };

    const handlePlayer1ScoreChange = (score) => {
      setPlayer1Score(score);
      functionUpdateScore(score, selectedPlayer1.id)
    };

    const handlePlayer2ScoreChange = (score) => {
      setPlayer2Score(score);
      functionUpdateScore(score, selectedPlayer2.id);
    };

    const functionAddGame = (e) => {
      e.preventDefault();
    }

    const goStep2 = () => {
      if(selectedPlayer1.id === selectedPlayer2.id){
        toast.warn("You can't play against yourself");
        return;
      }
      else if(selectedPlayer1 === null || selectedPlayer2 === null){
        toast.warn("You must select players");
        return;
      }
      axios.post("http://localhost:3000/games", {
        "idPlayer1" : selectedPlayer1.id,
        "idPlayer2" : selectedPlayer2.id
      })
        .then((response) => {
            setCurrentGameId(response.data.id);
            setCurrentGameDate(
                new Date(response.data.date).toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
              })
            );
            setCurrentStep(2);
            toast.success("The game has been successfully created ! Now manage the score", { autoClose: 2000 });
        })
        .catch((error) => {
            console.error("Error while sending data : ", error);
            toast.error("Error while sending data : " + error.message);
        });
    }

    const functionUpdateScore = (score, player) => {

      axios.put("http://localhost:3000/games/" + currentGameId , {
        "playerid" : player,
        "score" : score
      })
        .then((response) => {
            toast.success("Game score updated !", { autoClose: 1000 });
        })
        .catch((error) => {
            console.error("Error while sending data : ", error);
            toast.error("Error while sending data : " + error.message);
        });
    }

    return (
      <>
        {currentStep === 1 ? (
          
          <form onSubmit={functionAddGame} className="flex flex-col justify-center items-center">
            <div className="flex flex-wrap gap-6 mt-10 justify-center">

              <div className="border border-gray-300  rounded-2xl p-8 w-72">
                <SelectPlayer onPlayerChange={handlePlayer1Change} label={"Player 1 :"}/>
              </div>
              <div className="border border-gray-300 bg-white rounded-2xl p-8 w-72">
                <SelectPlayer onPlayerChange={handlePlayer2Change} label={"Player 2 :"}/>
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={() => goStep2()} type="button" className="bg-indigo-500 hover:bg-indigo-700 text-center text-white font-bold py-2 px-4 rounded-full w-60 mt-10 lg:w-72 ">Next</button>
            </div>
          </form>
        ) : (
          <form className="flex flex-col justify-center items-center">
            <div>Current match date : {currentGameDate}</div>
            <div className="flex flex-wrap gap-6 mt-10 justify-center">
              <div className="border border-gray-300  rounded-2xl p-8 w-72">
                <ScoreCounter label={selectedPlayer1.name + " Score :"} onScoreChange={handlePlayer1ScoreChange} initialScore={0}/>
              </div>
              <div className="border border-gray-300 bg-white rounded-2xl p-8 w-72">
                <ScoreCounter label={selectedPlayer2.name + " Score :"} onScoreChange={handlePlayer2ScoreChange} initialScore={0}/>
              </div>
            </div>

            <div className="flex justify-end">
              <Link href={"/games-management/"} className="bg-indigo-500 hover:bg-indigo-700 text-center text-white font-bold py-2 px-4 rounded-3xl w-60 mt-10 lg:w-72 ">
                Finish
              </Link>
            </div>

          </form>
        )}
      </>
    );
  }
  