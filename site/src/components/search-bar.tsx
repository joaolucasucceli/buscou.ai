/**
 * SearchBar — visual wrapper do DS com cursor piscante.
 * Reproduzido localmente (turbopack nao resolve TSX direto do @buscou/design-system).
 * Visual identico ao SearchBar.tsx do DS.
 */
interface Props {
  placeholder?: string;
  showCursor?: boolean;
}

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    style={{ width: "18px", height: "18px", flexShrink: 0 }}
  >
    <circle cx="11" cy="11" r="7.5" />
    <path d="m20.5 20.5-4-4" />
  </svg>
);

export function SearchBar({ placeholder = "Buscar...", showCursor = true }: Props) {
  return (
    <label className="searchbar-local">
      <SearchIcon />
      <input
        className="searchbar-input-local"
        placeholder={placeholder}
        readOnly
        tabIndex={-1}
      />
      {showCursor && <span className="searchbar-cursor-local" aria-hidden />}
    </label>
  );
}
