import React from 'react';

export function GameGenreBadge({genre, size = 32}: {genre: string; size?: number}) {
  const g = genre.toLowerCase();

  if (g.includes('fps') || g.includes('tiro')) {
    // Retícula / Mira clássica estilo FPS 90s
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="13" fill="#1b2838" stroke="#d55252" strokeWidth="2" />
        <circle cx="16" cy="16" r="8" fill="none" stroke="#e8c64e" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="2.5" fill="#d55252" />
        <line x1="16" y1="2" x2="16" y2="9" stroke="#d55252" strokeWidth="2" />
        <line x1="16" y1="23" x2="16" y2="30" stroke="#d55252" strokeWidth="2" />
        <line x1="2" y1="16" x2="9" y2="16" stroke="#d55252" strokeWidth="2" />
        <line x1="23" y1="16" x2="30" y2="16" stroke="#d55252" strokeWidth="2" />
      </svg>
    );
  }

  if (g.includes('plataforma')) {
    // Personagem/tijolos estilo Prince of Persia / Commander Keen
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <rect x="2" y="2" width="28" height="28" rx="3" fill="#2d1c0b" stroke="#df9b26" strokeWidth="1.5" />
        {/* Tijolos / Masmorra */}
        <rect x="4" y="22" width="11" height="6" fill="#8c5825" stroke="#5a3814" />
        <rect x="17" y="22" width="11" height="6" fill="#8c5825" stroke="#5a3814" />
        <rect x="10" y="15" width="12" height="6" fill="#a46d36" stroke="#5a3814" />
        {/* Espada clássica */}
        <path d="M7 6l10 10m-2 0l4 0m-2-2l0 4" stroke="#e8e8e8" strokeWidth="2" strokeLinecap="round" />
        <circle cx="6" cy="5" r="1.5" fill="#df9b26" />
      </svg>
    );
  }

  if (g.includes('corrida')) {
    // Pista espacial / Nave estilo SkyRoads
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <rect x="2" y="2" width="28" height="28" rx="3" fill="#0b1021" stroke="#318bd5" strokeWidth="1.5" />
        {/* Pista em perspectiva */}
        <polygon points="12,12 20,12 27,29 5,29" fill="#1f3b60" stroke="#4db3ff" strokeWidth="1" />
        <line x1="16" y1="12" x2="16" y2="29" stroke="#fff" strokeWidth="1.5" strokeDasharray="3,2" />
        {/* Nave triangular */}
        <polygon points="16,16 12,23 20,23" fill="#ffdf69" stroke="#d55252" strokeWidth="1" />
        {/* Estrelas */}
        <circle cx="6" cy="6" r="1" fill="#fff" />
        <circle cx="25" cy="8" r="1" fill="#fff" />
      </svg>
    );
  }

  if (g.includes('estratégia') || g.includes('rpg')) {
    // Castelo / Escudo medieval estilo Warcraft / Diablo
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <rect x="2" y="2" width="28" height="28" rx="3" fill="#1b2518" stroke="#518d36" strokeWidth="1.5" />
        <path d="M16 5 L25 10 L22 22 L16 27 L10 22 L7 10 Z" fill="#2d4229" stroke="#7ec45b" strokeWidth="1.5" />
        <path d="M16 7 L16 25 M9 14 L23 14" stroke="#df9b26" strokeWidth="1.5" />
      </svg>
    );
  }

  // Padrão DOS / Computador Retrô
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect x="2" y="2" width="28" height="28" rx="3" fill="#20222a" stroke="#808080" strokeWidth="1.5" />
      <path fill="#313f8e" d="M6 5h16l4 4v18H6z" />
      <path fill="#e9e8db" d="M9 5h10v7H9zM9 16h14v10H9z" />
      <circle cx="16" cy="21" r="2" fill="#008080" />
    </svg>
  );
}
