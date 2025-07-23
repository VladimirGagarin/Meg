import { useParams } from "react-router-dom";
import { AboutInfoList } from "../components/SongDetails";

export default function AboutPerson() {
 const { character } = useParams(); // use correct param name

 const personInfo = AboutInfoList.find(
   (info) => info.character === character // no need to parseInt
    );
    
  return (
    <div className="about-person">
          <h1><span className="about-character">{personInfo.character}</span> |Magdalene | Sing With Magdalene</h1>
          <img
      <p>{personInfo.aboutTrait}</p>
      <p>
        {personInfo.icon} {personInfo.sentiment}
      </p>
    </div>
  );
}