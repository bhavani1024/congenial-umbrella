import React, { useState } from "react";
import Groq from "groq-sdk";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;

export const PromptTheme = () => {
  const [webpage, setWebpage] = useState("blue");
  const [query, setQuery] = useState("");
  // State variable for colors
  const [colors, setColors] = useState({

    navbarPrimaryColor: "#4CAF50",
    navbarTextColor: "white",
    headerBackgroundColor: "#4CAF50",
    headerTextColor: "white",
    mainTextColor: "black",
    mainBackgroundColor: "green",
    footerBackgroundColor: "#333",
    footerTextColor: "white",
    linkTextColor: "white",
    linkTextDecoration: "none",
    sliderBackgroundColor: "white",
    sliderTextColor: "black",
    sliderArrowColor: "black",
    fontFamily: "Lucida Console"
  });

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: (
      <div
        style={{
          fontSize: "20px",
          color: colors.sliderArrowColor,
          cursor: "pointer",
        }}
      >
        &raquo;
      </div>
    ),
    prevArrow: (
      <div
        style={{
          fontSize: "20px",
          color: colors.sliderArrowColor,
          cursor: "pointer",
        }}
      >
        &laquo;
      </div>
    ),
  };

  const groq = new Groq({ apiKey: groqApiKey, dangerouslyAllowBrowser: true });

  const handleChangeColors = (data) => {
    setColors(data);
    console.log(colors);
  };

  async function main() {
    const chatCompletion = await getGroqChatCompletion();
    // Print the completion returned by the LLM.

    const newdata = JSON.parse(chatCompletion.choices[0]?.message?.content);

    handleChangeColors(newdata);
  }

  async function getGroqChatCompletion() {
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content:
            query +
            " the text before is the demands of the user regarding the webpage colors , i want you you to give me a js object that has the key value pairs of the different colors that i have in my webpage the following is the current colors of my webpage " +
            JSON.stringify(colors) +
            " give me only the json object that changes the colors according to the text dont add anything before and after the two curly braces necessary for the json object ",
        },
      ],
      model: "llama-3.3-70b-versatile",
    });
  }

  const handleKeyPress = (event) => {
    console.log(event.keyCode);
    
  }

  return (
    <>
      
      <div
        style={{
          fontFamily: colors.fontFamily,
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <nav
          style={{
            backgroundColor: colors.navbarPrimaryColor,
            color: colors.navbarTextColor,
            padding: "10px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>MyWebsite</h1>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              gap: "15px",
            }}
          >
            <li>
              <a
                href="#"
                style={{
                  color: colors.linkTextColor,
                  textDecoration: colors.linkTextDecoration,
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                style={{
                  color: colors.linkTextColor,
                  textDecoration: colors.linkTextDecoration,
                }}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                style={{
                  color: colors.linkTextColor,
                  textDecoration: colors.linkTextDecoration,
                }}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                style={{
                  color: colors.linkTextColor,
                  textDecoration: colors.linkTextDecoration,
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <header
          style={{
            backgroundColor: colors.headerBackgroundColor,
            color: colors.headerTextColor,
            textAlign: "center",
            padding: "50px 20px",
          }}
        >
          <h2>Welcome to My Website</h2>
          <p>Your one-stop solution for everything.</p>
          <input
        type="text"
        value={query}
        onChange={() => {
          setQuery(event.target.value);
        }}
        onKeyDown={()=>{
          if (event.key === "Enter") {
            main();
          }
          
          
        }}
      />
      <button
        onClick={() => {
          main();
        }}
      >
        change theme
      </button>
        </header>

        <main
          style={{
            padding: "20px",
            textAlign: "center",
            backgroundColor: colors.mainBackgroundColor,
          }}
        >
          <h3>Main Content Area</h3>
          <Slider
            style={{
              backgroundColor: colors.sliderBackgroundColor,
              color: colors.sliderTextColor,
              padding: "20px",
            }}
            {...settings}
          >
            <div
              style={{
                backgroundColor: colors.sliderBackgroundColor,
                color: colors.sliderTextColor,
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                width: "100%",
                textAlign: "center",
              }}
            >
              <h3 style={{ color: colors.sliderTextColor }}>backgroundColor: colors.sliderBackgroundColor</h3>
            </div>
            <div
              style={{
                backgroundColor: colors.sliderBackgroundColor,
                color: colors.sliderTextColor,
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                width: "100%",
                textAlign: "center",
              }}
            >
              <h3 style={{ color: colors.sliderTextColor }}>backgroundColor: colors.sliderBackgroundColor</h3>
            </div>
            <div
              style={{
                backgroundColor: colors.sliderBackgroundColor,
                color: colors.sliderTextColor,
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                width: "100%",
                textAlign: "center",
              }}
            >
              <h3 style={{ color: colors.sliderTextColor }}>backgroundColor: colors.sliderBackgroundColor</h3>
            </div>
            <div
              style={{
                backgroundColor: colors.sliderBackgroundColor,
                color: colors.sliderTextColor,
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                width: "100%",
                textAlign: "center",
              }}
            >
              <h3 style={{ color: colors.sliderTextColor }}>backgroundColor: colors.sliderBackgroundColor</h3>
            </div>
            <div
              style={{
                backgroundColor: colors.sliderBackgroundColor,
                color: colors.sliderTextColor,
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                width: "100%",
                textAlign: "center",
              }}
            >
              <h3 style={{ color: colors.sliderTextColor }}>backgroundColor: colors.sliderBackgroundColor</h3>
            </div>
            <div
              style={{
                backgroundColor: colors.sliderBackgroundColor,
                color: colors.sliderTextColor,
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                width: "100%",
                textAlign: "center",
              }}
            >
              <h3 style={{ color: colors.sliderTextColor }}>backgroundColor: colors.sliderBackgroundColor</h3>
            </div>
          </Slider>
          <p style={{ color: colors.mainTextColor }}>
            This is where the main content of the website will go.
          </p>
        </main>

        <footer
          style={{
            backgroundColor: colors.footerBackgroundColor,
            color: colors.footerTextColor,
            textAlign: "center",
            padding: "10px 0",
            marginTop: "20px",
          }}
        >
          <p>
            &copy; {new Date().getFullYear()} MyWebsite. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
};
