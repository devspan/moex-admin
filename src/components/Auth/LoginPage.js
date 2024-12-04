import { useState } from 'react';
import localConfig from '../../local_config';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { theme } = localConfig;

  return (
    <div style={{
      minHeight: "100vh",
      background: `radial-gradient(circle at 50% 0%, rgba(41, 98, 255, 0.1), transparent 75%),
                  radial-gradient(circle at 0% 50%, rgba(110, 86, 207, 0.1), transparent 50%),
                  linear-gradient(180deg, ${theme.colors.background} 0%, #0A0B0D 100%)`,
      display: "grid",
      gridTemplateColumns: "1fr minmax(320px, 400px)",
      padding: "40px",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "url('/grid-pattern.svg')",
        opacity: 0.05,
        pointerEvents: "none"
      }} />

      {/* Left Side - Branding */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "60px",
        position: "relative"
      }}>
        <img src="/logo.svg" alt="MoEX" style={{ height: "48px", marginBottom: "32px" }} />
        <h1 style={{
          fontSize: "42px",
          fontWeight: 700,
          marginBottom: "24px",
          background: "linear-gradient(135deg, #FFFFFF 0%, #A1A3A7 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Welcome to MoEX Admin
        </h1>
        <p style={{
          fontSize: "16px",
          lineHeight: 1.6,
          color: theme.colors.text.secondary,
          maxWidth: "480px"
        }}>
          Secure access to manage your cryptocurrency exchange platform. Enhanced with advanced security features and real-time monitoring.
        </p>

        {/* Market Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
          marginTop: "48px"
        }}>
          {[
            { label: "Active Users", value: "12.5K+" },
            { label: "Daily Volume", value: "$2.8M" },
            { label: "Markets", value: "89+" }
          ].map((stat, index) => (
            <div key={index} style={{
              padding: "24px",
              background: "rgba(255, 255, 255, 0.02)",
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.05)"
            }}>
              <div style={{ 
                fontSize: "28px", 
                fontWeight: 700,
                background: "linear-gradient(90deg, #2962FF, #6E56CF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                {stat.value}
              </div>
              <div style={{ 
                fontSize: "14px",
                color: theme.colors.text.secondary,
                marginTop: "8px"
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          width: "100%",
          padding: "40px",
          backgroundColor: "rgba(26, 27, 31, 0.40)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          border: "1px solid rgba(255, 255, 255, 0.05)"
        }}>
          <h2 style={{
            fontSize: "24px",
            fontWeight: 600,
            marginBottom: "32px",
            textAlign: "center"
          }}>
            Sign In to Dashboard
          </h2>

          <form onSubmit={(e) => e.preventDefault()}>
            <div style={{ marginBottom: "24px" }}>
              <div style={{ 
                position: "relative",
                marginBottom: "20px" 
              }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    backgroundColor: "rgba(10, 11, 13, 0.5)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    color: theme.colors.text.primary,
                    fontSize: "15px",
                    transition: "all 0.2s",
                    outline: "none",
                    '&:focus': {
                      border: "1px solid rgba(41, 98, 255, 0.5)",
                      boxShadow: "0 0 0 4px rgba(41, 98, 255, 0.15)"
                    }
                  }}
                />
              </div>

              <div style={{ position: "relative" }}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    backgroundColor: "rgba(10, 11, 13, 0.5)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    color: theme.colors.text.primary,
                    fontSize: "15px",
                    transition: "all 0.2s",
                    outline: "none",
                    '&:focus': {
                      border: "1px solid rgba(41, 98, 255, 0.5)",
                      boxShadow: "0 0 0 4px rgba(41, 98, 255, 0.15)"
                    }
                  }}
                />
              </div>
            </div>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "32px"
            }}>
              <label style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                fontSize: "14px",
                color: theme.colors.text.secondary
              }}>
                <input 
                  type="checkbox" 
                  style={{ 
                    width: "16px", 
                    height: "16px",
                    accentColor: theme.colors.primary 
                  }} 
                />
                Remember me
              </label>
              <a href="#" style={{
                color: theme.colors.primary,
                fontSize: "14px",
                textDecoration: "none",
                fontWeight: 500,
                transition: "opacity 0.2s",
                '&:hover': {
                  opacity: 0.8
                }
              }}>
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "16px",
                background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                border: "none",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                position: "relative",
                overflow: "hidden",
                '&:hover': {
                  transform: "translateY(-1px)",
                  boxShadow: "0 8px 24px rgba(41, 98, 255, 0.3)"
                },
                '&:active': {
                  transform: "translateY(0)"
                }
              }}
            >
              Sign In
            </button>

            <div style={{
              marginTop: "24px",
              padding: "16px",
              backgroundColor: "rgba(41, 98, 255, 0.1)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "rgba(41, 98, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: theme.colors.primary
              }}>
                🔒
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 500 }}>
                  Enhanced Security
                </div>
                <div style={{ 
                  fontSize: "13px",
                  color: theme.colors.text.secondary,
                  marginTop: "2px"
                }}>
                  Protected by two-factor authentication
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 