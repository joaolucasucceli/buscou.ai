import * as React from 'react';
import './SearchBar.css';

export interface SearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Exibe um cursor mint piscando a direita (assinatura da marca). */
  showCursor?: boolean;
  /** Visual-only: nao aceita input, apenas renderiza a forma. */
  ambient?: boolean;
}

const SearchIcon = () => (
  <svg className="searchbar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="11" cy="11" r="7.5" />
    <path d="m20.5 20.5-4-4" />
  </svg>
);

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ showCursor = true, ambient, placeholder = 'Buscar...', className = '', ...rest }, ref) => {
    const classes = ['searchbar', ambient ? 'searchbar--ambient' : '', className].filter(Boolean).join(' ');
    return (
      <label className={classes}>
        <SearchIcon />
        <input ref={ref} className="searchbar__input" placeholder={placeholder} {...rest} />
        {showCursor && <span className="searchbar__cursor" aria-hidden />}
      </label>
    );
  },
);

SearchBar.displayName = 'SearchBar';
export default SearchBar;
