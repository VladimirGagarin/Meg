import { useParams } from "react-router-dom";
import { AboutInfoList } from "../components/SongDetails";

export default function AboutPerson() {
  const { id } = useParams();
  const personInfo = AboutInfoList.find((info) => info.character === parseInt(id));

  return (
    <div className="about-person">
      <h1>Magdalene | Sing W</h1>
      <h3>{personInfo.character}</h3>
      <p>{personInfo.aboutTrait}</p>
      <p>
        {personInfo.icon} {personInfo.sentiment}
      </p>
    </div>
  );
}