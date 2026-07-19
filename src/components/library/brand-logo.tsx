// ainextgrowth — Futuristic Logo Component
// Combines an upward-trending arrow (growth) with a neural network node (AI)
// Colors: Emerald (#10b981) and Purple (#8b5cf6)

export function AinextgrowthLogo({
  size = 32,
  className = '',
  showText = true,
}: {
  size?: number
  className?: string
  showText?: boolean
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="ainextgrowth logo"
      >
        <defs>
          <linearGradient id="ang-logo-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        {/* Neural network nodes (AI) */}
        <circle cx="8" cy="12" r="2.5" fill="url(#ang-logo-grad)" />
        <circle cx="8" cy="28" r="2.5" fill="url(#ang-logo-grad)" opacity="0.7" />
        <circle cx="20" cy="20" r="3" fill="url(#ang-logo-grad)" />
        {/* Connection lines */}
        <line x1="8" y1="12" x2="20" y2="20" stroke="url(#ang-logo-grad)" strokeWidth="1.5" opacity="0.6" />
        <line x1="8" y1="28" x2="20" y2="20" stroke="url(#ang-logo-grad)" strokeWidth="1.5" opacity="0.6" />
        <line x1="20" y1="20" x2="30" y2="10" stroke="url(#ang-logo-grad)" strokeWidth="2" />
        {/* Upward trending arrow (growth) */}
        <path
          d="M22 8 L30 10 L28 18 M30 10 L18 22 L14 18 L8 24"
          stroke="url(#ang-logo-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Arrowhead */}
        <path
          d="M30 10 L26 9 L28 13 Z"
          fill="url(#ang-logo-grad)"
        />
      </svg>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-sm font-bold tracking-tight">
            ai<span className="text-gradient">next</span>growth
          </span>
          <span className="text-[9px] font-medium text-muted-foreground">2026 Ecosystem</span>
        </div>
      )}
    </div>
  )
}

// Favicon SVG (simplified version for browser tab)
export function AinextgrowthFavicon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="fav-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="8" fill="#0a0a0f" />
      <circle cx="10" cy="14" r="2.5" fill="url(#fav-grad)" />
      <circle cx="10" cy="28" r="2.5" fill="url(#fav-grad)" opacity="0.7" />
      <circle cx="22" cy="20" r="3" fill="url(#fav-grad)" />
      <line x1="10" y1="14" x2="22" y2="20" stroke="url(#fav-grad)" strokeWidth="1.5" opacity="0.6" />
      <line x1="10" y1="28" x2="22" y2="20" stroke="url(#fav-grad)" strokeWidth="1.5" opacity="0.6" />
      <path
        d="M24 8 L32 10 L30 18 M32 10 L20 22 L16 18 L10 24"
        stroke="url(#fav-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M32 10 L28 9 L30 13 Z" fill="url(#fav-grad)" />
    </svg>
  )
}
