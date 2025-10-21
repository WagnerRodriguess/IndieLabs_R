import React from "react";
import GameImages from "../components/GameImages";
import GameDescription from "../components/GameDescription";
import GameInfo from "../components/GameInfo";

function CelestePage() {
  return (
    <main className="bg-purple-900 min-h-screen px-6 py-10 flex flex-col items-center">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-10 max-w-6xl w-full">
        <GameImages />
        <div className="flex flex-col justify-center items-start">
          <GameDescription />
          <GameInfo />
        </div>
        <img
          src="/madeline.png"
          alt="Madeline"
          className="w-64 sm:w-72 md:w-80 lg:w-96 object-contain mt-8 sm:mt-0"
        />
      </div>
    </main>
  );
}

export default CelestePage;
