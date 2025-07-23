import { useParams } from "react-router-dom";
import { AboutInfoList } from "../components/SongDetails";

export default function AboutPerson() {
 const { character } = useParams(); // use correct param name

 const personInfo = AboutInfoList.find(
   (info) => info.character === character // no need to parseInt
    );
    
  return (
    <div className="about-person">
      <h1>|Magdalene | Sing With  Magdalene</h1>
      <h3></h3>
      <p>{personInfo.aboutTrait}</p>
      <p>
        {personInfo.icon} {personInfo.sentiment}
      </p>
    </div>
  );
}