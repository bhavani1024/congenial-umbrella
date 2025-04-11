import React, { useState } from "react";
import fs from "fs";
import Groq from "groq-sdk";
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const Speech = () => {
  const [file, setFile] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const groq = new Groq({
    apiKey: GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  async function main() {
    // Create a transcription job
    const transcription = await groq.audio.transcriptions.create({
      file: file, // Required path to audio file - replace with your audio file!
      model: "distil-whisper-large-v3-en", // Required model to use for transcription
      prompt: "Specify context or spelling", // Optional
      language: "tr", // Optional
      response_format: "json", // Optional
      language: "en", // Optional
      temperature: 0.0, // Optional
    });
    // Log the transcribed text
    console.log(transcription.text);
  }

  const handleFileChange = (e) => {
    console.log("jjj");

    if (e.target.files) {
      console.log(e.target);
      console.log("lll" + e.target.files[0]);

      setFile(e.target.files[0]);
    }
  };

  return (
    <>
      <div className="relative flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            onChange={(e) => {
              handleFileChange(e);
            }}
            id="dropzone-file"
            type="file"
            className="absolute top-0 left-0 opacity-0 w-full h-full border-solid border-2 border-red-600"
          />
        </label>
      </div>
      <button
        onClick={() => {
          main();
        }}
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Submit audio
      </button>

      <button
        onClick={() => {
          setIsVisible((prev) => !prev);
          console.log(file);
        }}
      >
        {" "}
        show details{" "}
      </button>
      {file && (
        <div
          className={isVisible ? "" : "hidden"}
          style={{
            fontSize: "20px",
            color: "red",
            cursor: "pointer",
            border: "2px solid black",
          }}
        >
          <p>name : {file.name}</p>
          <p>file size {(file.size / 1024).toFixed(2)} KB</p>
          <p>type : {file.type}</p>
        </div>
      )}
    </>
  );
};
