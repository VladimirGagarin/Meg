import { AboutInfoList } from "../components/SongDetails";
import { Link } from "react-router-dom";
import "./AboutPage.css";

export default function AboutPage() { }
return (
    <div className="about-page">
        {AboutInfoList.map((info, index) => (
            <Link to={`/aboutPerson/${info.id}`} className="about-link" key={index}>
                <div className="about-info">
                    <h2>{info.character}</h2>
                    <p>{info.aboutTrait}</p>
                    <img src={info.photo} alt={info.character} />
                    <p>{info.icon} {info.sentiment}</p>
                </div>
            </Link>
        ))}
    </div>
)