import React from "react";

function GameImages() {
  const images = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
  ];

  return (
    <div className="flex flex-col gap-4 w-full sm:w-1/3">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Screenshot ${index + 1}`}
          className="rounded-lg shadow-md hover:scale-105 transition-transform"
        />
      ))}
    </div>
  );
}

export default GameImages;
