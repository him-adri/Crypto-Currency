import React from "react";
import "./styles.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import ShareIcon from "@mui/icons-material/Share";
import { RWebShare } from "react-web-share";

function Footer() {
  return (
    <div>
      <div className="footer">
        <a href="/">
          <h2 style={{ color: "#fff" }}>CryptoTracker.</h2>
        </a>

        <div className="socials-flex">
          <a
            href="https://www.facebook.com/himadri.das.5283/"
            target={"_blank"}
          >
            <FacebookIcon className="socials-icon" />
          </a>
          <a href="https://www.instagram.com/___himadri__/" target={"_blank"}>
            <InstagramIcon className="socials-icon" />
          </a>
          <a href="mailto:himadrikdass@gmail.com" target={"_blank"}>
            <EmailIcon className="socials-icon" />
          </a>
          <RWebShare
            data={{
              text: "Crypto Dashboard made using React JS in 2022",
              url: "https://crypto-dashboard-nov.netlify.app/",
              title: "Crypto Dashboard",
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <ShareIcon className="socials-icon" />
          </RWebShare>
        </div>
      </div>
      <div className="copyright">
        <p>Copyright <span> @ </span> {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}

export default Footer;
