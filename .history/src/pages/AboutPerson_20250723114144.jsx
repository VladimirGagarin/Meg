import { useParams } from "react-router-dom";

export default function AboutPerson() {
  const { id } = useParams();

  return (
    <div className="about-person">
      <h2>Magdalene</h2>
    </div>
  );
}