interface BrandIconProps {
  className?: string;
}

interface BrandMarkProps {
  className?: string;
  compact?: boolean;
  inverted?: boolean;
}

export function BrandIcon({ className = "h-11 w-11" }: BrandIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M14 106L64 14L116 106H14Z" fill="#F7F1E4" />
      <path d="M64 14L37 106H78L64 14Z" fill="#173525" />
      <path d="M64 14L52 52L64 43L78 70L90 59L116 106L64 14Z" fill="#F7F1E4" />
      <path d="M17 106L44 61L73 106H17Z" fill="#E87818" />
      <path d="M44 61L30 106H55L44 61Z" fill="#B9530B" />
      <path d="M34 75L22 75L31 66L25 66L38 52L34 75Z" fill="#F7F1E4" opacity="0.92" />
      <path d="M19 106H116" stroke="#F7F1E4" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

export default function BrandMark({ className = "", compact = false, inverted = false }: BrandMarkProps) {
  const textColor = inverted ? "text-white" : "text-forest";
  const subColor = inverted ? "text-white/60" : "text-textgrey";

  return (
    <div className={`flex min-w-0 items-center gap-3 ${className}`}>
      <BrandIcon className={compact ? "h-10 w-10 shrink-0" : "h-[60px] w-[60px] shrink-0"} />
      {!compact && (
        <div className="min-w-0 leading-none">
          <div className={`truncate text-[2.15rem] font-extrabold tracking-[-0.055em] ${textColor}`}>
            CampIn
          </div>
          <div className={`mt-1 text-[13px] font-bold tracking-[-0.025em] ${subColor}`}>Permission-first camping in India</div>
        </div>
      )}
    </div>
  );
}
