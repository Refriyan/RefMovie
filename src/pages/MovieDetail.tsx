import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiBookmark,
  FiCheck,
  FiExternalLink,
} from "react-icons/fi";
import {
  tmdbApi,
  IMG_ORIGINAL,
  IMG_W500,
  IMG_W185,
  formatYear,
  formatRating,
  formatRuntime,
} from "../services/tmdbApi";
import { useWatchlist } from "../contexts/WatchlistContext";
import ReviewCard from "../components/ReviewCard/ReviewCard";
import type { MovieDetail as MovieDetailType } from "../types/movie";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const { toggleWatchlist, isInWatchlist } = useWatchlist();

  useEffect(() => {
    setLoading(true);
    setMovie(null);
    window.scrollTo(0, 0);
    if (id)
      tmdbApi
        .getMovieDetails(id)
        .then((d) => {
          setMovie(d);
          setLoading(false);
        })
        .catch(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div
        style={{
          paddingTop: "var(--nav-h)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 40,
              height: 40,
              border: "3px solid var(--border)",
              borderTop: "3px solid var(--maroon)",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 12px",
            }}
          />
          <p style={{ color: "var(--text3)", fontSize: 13 }}>Loading...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );

  if (!movie)
    return (
      <div
        style={{
          paddingTop: "var(--nav-h)",
          padding: "4rem 1.5rem",
          textAlign: "center",
        }}
      >
        <p style={{ color: "var(--text2)", marginBottom: "1rem" }}>
          Movie not found
        </p>
        <Link to="/" style={{ color: "#c94a5e" }}>
          ← Back Home
        </Link>
      </div>
    );

  const wl = isInWatchlist(movie.id);
  const backdrop = movie.backdrop_path
    ? `${IMG_ORIGINAL}${movie.backdrop_path}`
    : "";
  const poster = movie.poster_path ? `${IMG_W500}${movie.poster_path}` : null;
  const cast = movie.credits?.cast?.slice(0, 12) || [];
  const director = movie.credits?.crew?.find((c) => c.job === "Director");
  const reviews = movie.reviews?.results || [];

  return (
    <div className="page-enter" style={{ paddingTop: "var(--nav-h)" }}>
      {/* Backdrop */}
      {backdrop && (
        <div
          style={{
            position: "relative",
            height: "clamp(180px, 40vw, 340px)",
            overflow: "hidden",
          }}
        >
          <img
            src={backdrop}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 20%",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, var(--black) 100%)",
            }}
          />
        </div>
      )}

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 1rem 4rem" }}>
        {/* Back */}
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            color: "var(--text3)",
            fontSize: 13,
            marginBottom: "1rem",
            marginTop: backdrop ? "-1.5rem" : "1.5rem",
            position: "relative",
          }}
        >
          <FiArrowLeft size={14} /> Back
        </Link>

        {/* Main info: poster + details */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Mobile: poster on top, stacked */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1fr)",
              gap: "1rem",
            }}
            className="detail-grid"
          >
            {/* Poster - only on desktop via CSS */}
            <div className="detail-poster" style={{ display: "none" }}>
              {poster ? (
                <img
                  src={poster}
                  alt={movie.title}
                  style={{
                    width: "100%",
                    borderRadius: 12,
                    display: "block",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
                    maxWidth: 220,
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    maxWidth: 220,
                    aspectRatio: "2/3",
                    background: "var(--black3)",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "3rem",
                  }}
                >
                  🎬
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              {/* Mobile poster inline */}
              <div
                className="mobile-poster"
                style={{
                  display: "flex",
                  gap: "1rem",
                  marginBottom: "1rem",
                  alignItems: "flex-start",
                }}
              >
                {poster && (
                  <img
                    src={poster}
                    alt={movie.title}
                    style={{
                      width: "clamp(90px,28vw,130px)",
                      borderRadius: 8,
                      flexShrink: 0,
                      boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
                    }}
                  />
                )}
                <div>
                  <h1
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "clamp(1.1rem,4vw,2rem)",
                      fontWeight: 900,
                      lineHeight: 1.1,
                      marginBottom: 6,
                      color: "var(--text)",
                    }}
                  >
                    {movie.title}
                  </h1>
                  {movie.tagline && (
                    <p
                      style={{
                        fontSize: "clamp(11px,2.5vw,13px)",
                        color: "var(--maroon-light)",
                        fontStyle: "italic",
                        marginBottom: 8,
                      }}
                    >
                      "{movie.tagline}"
                    </p>
                  )}
                  {/* Rating */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 8,
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        background: "rgba(122,0,18,0.18)",
                        border: "1px solid var(--border-maroon)",
                        padding: "3px 10px",
                        borderRadius: 20,
                        color: "var(--gold)",
                        fontWeight: 600,
                        fontSize: 13,
                      }}
                    >
                      ★ {formatRating(movie.vote_average)}
                    </span>
                    <span style={{ fontSize: 12, color: "var(--text2)" }}>
                      {formatYear(movie.release_date)}
                    </span>
                    <span style={{ fontSize: 12, color: "var(--text2)" }}>
                      ⏱ {formatRuntime(movie.runtime)}
                    </span>
                  </div>
                  {/* Genres */}
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {movie.genres?.slice(0, 3).map((g) => (
                      <span
                        key={g.id}
                        style={{
                          background: "var(--black3)",
                          border: "1px solid var(--border)",
                          color: "var(--text2)",
                          fontSize: 10,
                          padding: "2px 8px",
                          borderRadius: 20,
                        }}
                      >
                        {g.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p
                style={{
                  fontSize: "clamp(12px,2.5vw,14px)",
                  color: "var(--text2)",
                  lineHeight: 1.75,
                  marginBottom: "1.25rem",
                }}
              >
                {movie.overview}
              </p>

              {/* Extra meta */}
              <div
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  flexWrap: "wrap",
                  marginBottom: "1.25rem",
                }}
              >
                {director && (
                  <div>
                    <span
                      style={{
                        fontSize: 10,
                        color: "var(--text3)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Director
                    </span>
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--text)",
                        marginTop: 2,
                      }}
                    >
                      {director.name}
                    </p>
                  </div>
                )}
                {movie.budget > 0 && (
                  <div>
                    <span
                      style={{
                        fontSize: 10,
                        color: "var(--text3)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Budget
                    </span>
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--text)",
                        marginTop: 2,
                      }}
                    >
                      ${(movie.budget / 1e6).toFixed(0)}M
                    </p>
                  </div>
                )}
                {movie.revenue > 0 && (
                  <div>
                    <span
                      style={{
                        fontSize: 10,
                        color: "var(--text3)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Revenue
                    </span>
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--text)",
                        marginTop: 2,
                      }}
                    >
                      ${(movie.revenue / 1e6).toFixed(0)}M
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  onClick={() =>
                    toggleWatchlist({
                      id: movie.id,
                      title: movie.title,
                      poster_path: movie.poster_path,
                      vote_average: movie.vote_average,
                      release_date: movie.release_date,
                    })
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: wl ? "var(--black3)" : "var(--maroon)",
                    color: wl ? "var(--maroon-light)" : "#fff",
                    border: `1px solid ${wl ? "var(--maroon)" : "transparent"}`,
                    padding: "9px 18px",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  {wl ? <FiCheck size={13} /> : <FiBookmark size={13} />}
                  {wl ? "In Watchlist" : "Add to Watchlist"}
                </button>
                {movie.homepage && (
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      background: "rgba(255,255,255,0.07)",
                      color: "var(--text)",
                      border: "1px solid var(--border)",
                      padding: "9px 16px",
                      borderRadius: 8,
                      fontSize: 13,
                    }}
                  >
                    <FiExternalLink size={13} /> Site
                  </a>
                )}
                {movie.imdb_id && (
                  <a
                    href={`https://www.imdb.com/title/${movie.imdb_id}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      background: "rgba(255,255,255,0.07)",
                      color: "var(--text)",
                      border: "1px solid var(--border)",
                      padding: "9px 14px",
                      borderRadius: 8,
                      fontSize: 13,
                    }}
                  >
                    IMDb ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cast */}
        {cast.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: "0.9rem",
              }}
            >
              <div
                style={{
                  width: 3,
                  height: 18,
                  background: "#b8001e",
                  borderRadius: 2,
                }}
              />
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(1rem,3vw,1.15rem)",
                  fontWeight: 700,
                  color: "var(--text)",
                }}
              >
                Cast
              </h2>
            </div>
            <div className="h-scroll-row">
              {cast.map((a) => (
                <div
                  key={a.id}
                  style={{
                    textAlign: "center",
                    flexShrink: 0,
                    minWidth: "clamp(64px,18vw,80px)",
                  }}
                >
                  {a.profile_path ? (
                    <img
                      src={`${IMG_W185}${a.profile_path}`}
                      alt={a.name}
                      loading="lazy"
                      style={{
                        width: "clamp(52px,14vw,64px)",
                        height: "clamp(52px,14vw,64px)",
                        borderRadius: "50%",
                        objectFit: "cover",
                        margin: "0 auto 5px",
                        display: "block",
                        border: "2px solid var(--border-maroon)",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "clamp(52px,14vw,64px)",
                        height: "clamp(52px,14vw,64px)",
                        borderRadius: "50%",
                        background: "var(--black3)",
                        border: "2px solid var(--border-maroon)",
                        margin: "0 auto 5px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.2rem",
                      }}
                    >
                      👤
                    </div>
                  )}
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      color: "var(--text)",
                      lineHeight: 1.2,
                    }}
                  >
                    {a.name}
                  </p>
                  <p
                    style={{
                      fontSize: 9,
                      color: "var(--text3)",
                      marginTop: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {a.character}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        <div style={{ marginTop: "2rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: "0.9rem",
            }}
          >
            <div
              style={{
                width: 3,
                height: 18,
                background: "#b8001e",
                borderRadius: 2,
              }}
            />
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(1rem,3vw,1.15rem)",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              Reviews{" "}
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text3)",
                  fontFamily: "Inter",
                  fontWeight: 400,
                }}
              >
                ({reviews.length})
              </span>
            </h2>
          </div>
          {reviews.length === 0 ? (
            <p style={{ color: "var(--text3)", fontSize: 13 }}>
              No reviews yet.
            </p>
          ) : (
            reviews.map((r) => <ReviewCard key={r.id} review={r} />)
          )}
        </div>
      </div>

      <style>{`
        @media (min-width: 600px) {
          .detail-grid { grid-template-columns: 200px 1fr !important; }
          .detail-poster { display: block !important; }
          .mobile-poster > img:first-child { display: none !important; }
          .mobile-poster { display: block !important; }
        }
      `}</style>
    </div>
  );
};

export default MovieDetail;
