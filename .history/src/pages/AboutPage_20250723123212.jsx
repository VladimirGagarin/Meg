import { AboutInfoList } from "../components/SongDetails";
import { Link } from "react-router-dom";
import LogoImage from "../assets/images/quuen.jpeg";
import "./About.css";

export default function AboutPage() {
    return (
      <div className="about-page">
        {AboutInfoList.map((info, index) => (
          <Link
            to={`aboutPerson/${info.character}`}
            className="about-link"
            key={index}
          >
            <div className="about-card">
              <img src={LogoImage} alt={info.character} />
              <h3>{info.character}</h3>
              <p className="about">
                {info.icon} {info.sentiment}
              </p>
            </div>
          </Link>
        ))}
      </div>
    );
}