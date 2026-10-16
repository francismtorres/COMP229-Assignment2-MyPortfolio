/**
 * Logo: custom, original hexagon mark with the initials "FT".
 * Drawn as inline SVG so it stays crisp at every size and needs no image file.
 */
export default function Logo({ size = 44 }) {
  return (
    <svg
      className="logo-mark"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Francis Torres logo"
    >
      <polygon points="32,3 58,17.5 58,46.5 32,61 6,46.5 6,17.5" fill="var(--color-accent)" />
      <polygon
        points="32,9 53,21 53,43 32,55 11,43 11,21"
        fill="none"
        stroke="var(--color-cream)"
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />
      <text
        x="32"
        y="40.5"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="25"
        fontWeight="700"
        fill="var(--color-cream)"
      >
        FT
      </text>
    </svg>
  );
}
