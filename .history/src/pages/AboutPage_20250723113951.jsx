import { AboutInfoList } from "../components/SongDetails";
import { Link } from "react-router-dom";
import LogoImage from "../assets/images/quuen.jpeg";
import "./AboutPage.css";

export default function AboutPage() { }
return (
    <div className="about-page">
        {AboutInfoList.map((info, index) => (
            <Link to={`/aboutPerson/${info.id}`} className="about-link" key={index}>
                <div className="about-card">
                    <img src={LogoImage} alt={info.character} />
                    <p>{info.icon} {info.sentiment}</p>
                </div>
            </Link>
        ))}
    </div>
)