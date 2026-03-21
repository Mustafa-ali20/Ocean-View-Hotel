import { FaStar } from "react-icons/fa";
import "./TestimonialCard.scss";

const TestimonialCard = ({ data }) => {
  return (
    <div className="t-card">
      {/* stars */}
      <div className="t-card__stars">
        {Array.from({ length: data.stars }).map((_, i) => (
          <FaStar key={i} className="t-card__star" />
        ))}
      </div>

      {/* country */}
      <p className="t-card__country">{data.country}</p>

      {/* review */}
      <p className="t-card__review">{data.review}</p>

      {/* name */}
      <p className="t-card__name">{data.name}</p>
    </div>
  );
};

export default TestimonialCard;