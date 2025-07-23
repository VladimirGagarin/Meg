import { AboutInfoList } from "../components/SongDetails";
import { Link } from "react-router-dom";
import "./AboutPage.css";

export default function AboutPage() { }
return (
    <div className="about-page">
        {AboutInfoList.map((info, index) => (
            <L
            <div key={index} className="about-info">
                <h2>{info.character}</h2>
                <p>{info.aboutTrait}</p>
                <img src={info.photo} alt={info.character} />
                <p>{info.icon} {info.sentiment}</p>
            </div>
        ))}
    </div>
)