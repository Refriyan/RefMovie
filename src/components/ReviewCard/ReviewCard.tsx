import type { Review } from "../../types/movie";

interface Props { review: Review; }

const ReviewCard = ({ review }: Props) => {
  const rating = review.author_details?.rating;
  const stars = rating ? Math.round(rating / 2) : null;

  return (
    <div style={{ background: "var(--black3)", border: "1px solid var(--border)", borderRadius: 10, padding: "14px 16px", marginBottom: 10 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--maroon)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
            {review.author[0]?.toUpperCase() || "?"}
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>{review.author}</p>
            <p style={{ fontSize: 11, color: "var(--text3)" }}>{review.created_at?.slice(0,10)}</p>
          </div>
        </div>
        {stars && <span style={{ fontSize: 14, color: "var(--gold)", letterSpacing: 1 }}>{"★".repeat(stars)}{"☆".repeat(5-stars)}</span>}
      </div>
      <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.7, display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {review.content}
      </p>
    </div>
  );
};

export default ReviewCard;
