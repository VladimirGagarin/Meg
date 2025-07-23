import { useParams } from "react-router-dom";

export default function AboutPerson() {
  const { id } = useParams();

  return (
    <div className="about-person">
      <h2>Mag</h2>
    </div>
  );
}