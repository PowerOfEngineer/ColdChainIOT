import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/token/",
        { username, password }
      );

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      onLogin();
    } catch (err) {
      console.error(err);
      setError("Identifiants incorrects ou serveur indisponible");
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    card: {
      width: '100%',
      maxWidth: '440px',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '24px',
      padding: '48px 40px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      backdropFilter: 'blur(10px)'
    },
    logoContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '32px'
    },
    logo: {
      width: '80px',
      height: '80px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
      transition: 'transform 0.3s ease',
      cursor: 'pointer'
    },
    title: {
      textAlign: 'center',
      fontSize: '32px',
      fontWeight: '700',
      color: '#1a202c',
      marginBottom: '8px'
    },
    subtitle: {
      textAlign: 'center',
      fontSize: '14px',
      color: '#718096',
      marginBottom: '32px'
    },
    errorBox: {
      padding: '16px 20px',
      background: '#fee',
      border: '2px solid #f56565',
      borderRadius: '16px',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'start',
      gap: '12px',
      animation: 'shake 0.5s'
    },
    errorText: {
      color: '#c53030',
      fontSize: '14px',
      fontWeight: '600',
      margin: 0
    },
    formGroup: {
      marginBottom: '24px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '600',
      color: '#2d3748',
      marginBottom: '8px'
    },
    inputWrapper: {
      position: 'relative',
      width: '100%'
    },
    input: {
      width: '100%',
      padding: '14px 16px 14px 48px',
      fontSize: '16px',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      outline: 'none',
      transition: 'all 0.3s ease',
      background: '#f7fafc',
      boxSizing: 'border-box'
    },
    inputFocus: {
      borderColor: '#667eea',
      background: '#fff',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
    },
    icon: {
      position: 'absolute',
      left: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#a0aec0',
      pointerEvents: 'none'
    },
    toggleBtn: {
      position: 'absolute',
      right: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '4px',
      color: '#a0aec0',
      transition: 'color 0.2s'
    },
    submitBtn: {
      width: '100%',
      padding: '16px',
      fontSize: '16px',
      fontWeight: '700',
      color: '#fff',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 20px rgba(102, 126, 234, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      marginTop: '32px'
    },
    submitBtnHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 15px 30px rgba(102, 126, 234, 0.4)'
    },
    submitBtnDisabled: {
      opacity: '0.6',
      cursor: 'not-allowed',
      transform: 'none'
    },
    footer: {
      marginTop: '32px',
      paddingTop: '24px',
      borderTop: '1px solid #e2e8f0',
      textAlign: 'center'
    },
    footerText: {
      fontSize: '12px',
      color: '#718096',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px'
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spin { animation: spin 1s linear infinite; }
      `}</style>

      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoContainer}>
          <div style={styles.logo} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <svg width="40" height="40" fill="white" viewBox="0 0 24 24">
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
        </div>

        {/* Titre */}
        <h2 style={styles.title}>Bienvenue</h2>
        <p style={styles.subtitle}>Connectez-vous à votre compte</p>

        {/* Erreur */}
        {error && (
          <div style={styles.errorBox}>
            <svg width="20" height="20" fill="#f56565" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p style={styles.errorText}>{error}</p>
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div style={styles.formGroup}>
            <label htmlFor="username" style={styles.label}>Nom d'utilisateur</label>
            <div style={styles.inputWrapper}>
              <svg style={styles.icon} width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              <input
                id="username"
                type="text"
                placeholder="Votre nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                required
                style={styles.input}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.background = '#f7fafc';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Mot de passe</label>
            <div style={styles.inputWrapper}>
              <svg style={styles.icon} width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                style={styles.input}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.background = '#f7fafc';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.toggleBtn}
                onMouseEnter={(e) => e.currentTarget.style.color = '#4a5568'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#a0aec0'}
              >
                {showPassword ? (
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L19 19"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              ...styles.submitBtn,
              ...(isLoading ? styles.submitBtnDisabled : {})
            }}
            onMouseEnter={(e) => !isLoading && Object.assign(e.target.style, styles.submitBtnHover)}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)';
            }}
          >
            {isLoading ? (
              <>
                <svg className="spin" width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" opacity="0.25"/>
                  <path fill="white" opacity="0.75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                <span>Connexion...</span>
              </>
            ) : (
              <>
                <span>Se connecter</span>
                <svg width="20" height="20" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            <svg width="16" height="16" fill="#48bb78" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            Connexion sécurisée SSL
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
