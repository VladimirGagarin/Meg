import { useParams , useNavigate} from "react-router-dom";
import { AboutInfoList } from "../components/SongDetails";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function AboutPerson() {
    const { character } = useParams(); // use correct param name
    const navigate = useNavigate();

  const personInfo = AboutInfoList.find(
    (info) => info.character === character // no need to parseInt
    );
    
    const navigations = (url) => {
    if (url) {
      navigate(`/song/${url}`);
    } else {
      navigate("/about");
    }
  };

  return (
    <div className="about-person">
      <h1>
        <span className="about-character">{personInfo.character}</span>{" "}
        |Magdalene | Sing With Magdalene
      </h1>
      <img
        src={personInfo.photo}
        alt={personInfo.character}
        className="about-photo"
        onContextMenu={(e) => {
          e.preventDefault();
          e.t
        }}
      />
      <div className="about-details">
        <p>
          {personInfo.aboutTrait}{" "}
          <span
            onClick={() => navigations(personInfo.preferedSongId)}
            className="listen-song-link"
          >
            Sing With Her <FaExternalLinkAlt style={{ marginLeft: "5px" }} />
          </span>
        </p>
        <p>
          {personInfo.icon} {personInfo.sentiment} {personInfo.icon}
        </p>
      </div>
    </div>
  );
}
