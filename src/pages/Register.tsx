import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { registerUser } from "../services/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim() || !password.trim()) { setError("Fill in all fields"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      registerUser(name.trim(), email.trim(), password);
      navigate("/profile");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputBase = { width: "100%", background: "var(--black3)", border: "1px solid var(--border)", color: "var(--text)", padding: "10px 14px 10px 40px", borderRadius: 8, fontSize: 14, outline: "none" };

  const Field = ({ icon: Icon, label, type, value, onChange, placeholder, extra }: any) => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 12, color: "var(--text2)", fontWeight: 500, marginBottom: 6 }}>{label}</label>
      <div style={{ position: "relative" }}>
        <Icon size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text3)" }} />
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={{ ...inputBase, ...extra }} />
      </div>
    </div>
  );

  return (
    <div className="page-enter" style={{ paddingTop: 62, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 1rem 2rem" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ background: "var(--black2)", border: "1px solid var(--border-maroon)", borderRadius: 16, padding: "2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.75rem", fontWeight: 900, color: "var(--text)" }}>Create account</h1>
            <p style={{ fontSize: 13, color: "var(--text3)", marginTop: 6 }}>Join CinemaVault today — it's free</p>
          </div>

          {error && (
            <div style={{ background: "rgba(122,0,18,0.15)", border: "1px solid var(--border-maroon)", color: "#c94a5e", fontSize: 13, padding: "10px 14px", borderRadius: 8, marginBottom: "1.25rem" }}>{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <Field icon={FiUser} label="Name" type="text" value={name} onChange={(e: any) => setName(e.target.value)} placeholder="Your name" />
            <Field icon={FiMail} label="Email" type="email" value={email} onChange={(e: any) => setEmail(e.target.value)} placeholder="email@example.com" />

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, color: "var(--text2)", fontWeight: 500, marginBottom: 6 }}>Password</label>
              <div style={{ position: "relative" }}>
                <FiLock size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text3)" }} />
                <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 characters" style={{ ...inputBase, paddingRight: 40 }} />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text3)" }}>
                  {showPw ? <FiEyeOff size={14}/> : <FiEye size={14}/>}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{ width: "100%", background: "var(--maroon)", color: "#fff", border: "none", padding: "11px", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.25rem", fontSize: 13, color: "var(--text3)" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "var(--maroon-light)" }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
