import { useParams } from "react-router-dom";
import { AboutInfoList } from "../components/SongDetails";

export default function AboutPerson() {
  const { id } = useParams();

  return (
    <div className="about-person">
      <h2>Magdalene</h2>
    </div>
  );
}