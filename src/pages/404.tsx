import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ height: '100vh', background: 'var(--color-base)', color: 'var(--color-text)' }}
    >
      {/* Background glow */}
      <div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{ width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
      />

      {/* Robot emoji floats */}
      <div
        className="text-8xl mb-6 select-none"
        style={{ animation: 'notfound-float 3s ease-in-out infinite' }}
      >
        🤖
      </div>

      <h1
        className="font-bold mb-4 cursor-default select-none"
        style={{
          fontSize: 'clamp(6rem, 15vw, 12rem)',
          lineHeight: 1,
          animation: 'notfound-glitch 2.5s infinite',
        }}
      >
        404
      </h1>

      <p className="text-xl sm:text-2xl text-center px-6 mb-8 font-light" style={{ color: 'var(--color-text-secondary)' }}>
        {t("Beep Boop! Diese Seite scheint im Cyberspace verloren gegangen zu sein")}
      </p>

      <button
        onClick={() => window.location.href = '/'}
        className="flex items-center gap-2 px-7 py-3 rounded-2xl text-base font-semibold transition-transform hover:-translate-y-1"
        style={{
          border: '2px solid #646cff',
          color: 'white',
          background: 'rgba(100,108,255,0.08)',
        }}
      >
        🤖 {t("Nach Hause telefonieren")}
      </button>

      <style>{`
        @keyframes notfound-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(-10deg); }
          75% { transform: translateY(-10px) rotate(10deg); }
        }
        @keyframes notfound-glitch {
          0%,15%  { text-shadow:  0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff, 0.025em 0.04em 0 #fffc00; }
          16%,49% { text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff, -0.05em -0.05em 0 #fffc00; }
          50%,99% { text-shadow:  0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff, 0 -0.04em 0 #fffc00; }
          100%    { text-shadow: -0.05em 0 0 #00fffc, -0.025em -0.04em 0 #fc00ff, -0.04em -0.025em 0 #fffc00; }
        }
      `}</style>
    </div>
  );
};

export default NotFound;