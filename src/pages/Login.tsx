import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { loginUser } from "../services/auth";

const Login = () => {
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]   = useState(false);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) { setError("Please fill in all fields"); return; }
    setLoading(true);
    try {
      loginUser(email.trim(), password);
      navigate("/profile");
    } catch (err: any) {
      setError(err.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="page-enter" style={{ paddingTop: "var(--nav-h)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 1rem 2rem" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <Link to="/" style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", fontWeight: 900, color: "var(--text)" }}>
            Cinema<span style={{ color: "#b8001e" }}>Vault</span>
          </Link>
          <p style={{ fontSize: 13, color: "var(--text3)", marginTop: 4 }}>Sign in to your account</p>
        </div>

        {/* Card */}
        <div style={{ background: "var(--black2)", border: "1px solid var(--border-maroon)", borderRadius: 16, padding: "clamp(1.25rem,4vw,2rem)" }}>

          {error && (
            <div style={{ background: "rgba(122,0,18,0.15)", border: "1px solid var(--border-maroon)", color: "#c94a5e", fontSize: 13, padding: "10px 14px", borderRadius: 8, marginBottom: "1.25rem" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, color: "var(--text2)", fontWeight: 500, marginBottom: 6 }}>Email</label>
              <div style={{ position: "relative" }}>
                <FiMail size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text3)", pointerEvents: "none" }} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com"
                  style={{ width: "100%", background: "var(--black3)", border: "1px solid var(--border)", color: "var(--text)", padding: "10px 14px 10px 38px", borderRadius: 8, fontSize: 14, outline: "none" }} />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 22 }}>
              <label style={{ display: "block", fontSize: 12, color: "var(--text2)", fontWeight: 500, marginBottom: 6 }}>Password</label>
              <div style={{ position: "relative" }}>
                <FiLock size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text3)", pointerEvents: "none" }} />
                <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                  style={{ width: "100%", background: "var(--black3)", border: "1px solid var(--border)", color: "var(--text)", padding: "10px 40px 10px 38px", borderRadius: 8, fontSize: 14, outline: "none" }} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--text3)", cursor: "pointer", display: "flex" }}>
                  {showPw ? <FiEyeOff size={14}/> : <FiEye size={14}/>}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              style={{ width: "100%", background: loading ? "var(--black3)" : "var(--maroon)", color: loading ? "var(--text3)" : "#fff", border: "none", padding: "12px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s" }}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.25rem", fontSize: 13, color: "var(--text3)" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "var(--maroon-light)", fontWeight: 500 }}>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
