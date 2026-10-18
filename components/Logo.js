import { LOGO_VIEWBOX, TAP_PATH, KO_PATH } from "./LogoPaths";

export default function Logo({ className = "h-8 w-auto", tapColor = "#fff", koColor = "#C4D836", title = "tapko" }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <path fill={tapColor} fillRule="evenodd" d={TAP_PATH} />
      <path fill={koColor} fillRule="evenodd" d={KO_PATH} />
    </svg>
  );
}
