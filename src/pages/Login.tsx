import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { loginUser } from "../services/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) { setError("Fill in all fields"); return; }
    setLoading(true);
    try {
      loginUser(email.trim(), password);
      navigate("/profile");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (focus: boolean = false) => ({
    width: "100%", background: "var(--black3)", border: `1px solid ${focus ? "var(--maroon-light)" : "var(--border)"}`,
    color: "var(--text)", padding: "10px 14px 10px 40px", borderRadius: 8,
    fontSize: 14, outline: "none", transition: "border 0.2s",
  });

  return (
    <div className="page-enter" style={{ paddingTop: 62, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 1rem 2rem" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        {/* Card */}
        <div style={{ background: "var(--black2)", border: "1px solid var(--border-maroon)", borderRadius: 16, padding: "2rem" }}>
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.75rem", fontWeight: 900, color: "var(--text)" }}>Welcome back</h1>
            <p style={{ fontSize: 13, color: "var(--text3)", marginTop: 6 }}>Sign in to your CinemaVault</p>
          </div>

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
                <FiMail size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text3)" }} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" style={inputStyle()} />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, color: "var(--text2)", fontWeight: 500, marginBottom: 6 }}>Password</label>
              <div style={{ position: "relative" }}>
                <FiLock size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text3)" }} />
                <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ ...inputStyle(), paddingRight: 40 }} />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text3)" }}>
                  {showPw ? <FiEyeOff size={14}/> : <FiEye size={14}/>}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{ width: "100%", background: "var(--maroon)", color: "#fff", border: "none", padding: "11px", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, transition: "all 0.2s" }}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.25rem", fontSize: 13, color: "var(--text3)" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "var(--maroon-light)" }}>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
