import { useParams } from "react-router-dom";
import { AboutInfoList } from "../components/SongDetails";

export default function AboutPerson() {
  const { id } = useParams();
  const personInfo = AboutInfoList.find((info) => info.character === parseInt(id));

  return (
    <div className="about-person">
          <h2>Magdalene</h2>
          <h3>{personInfo.character}</h3>
          <p>{personInfo.icon} {personInfo.sentiment}</p>
            <p>{personInfo.description}</p>
    </div>
  );
}