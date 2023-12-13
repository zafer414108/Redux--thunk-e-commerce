import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const state = useSelector((store) => store.basketReducer);

  // sepetteki elemanların adetlerini toplama
  const total_count = state.basket.reduce(
    (total, item) => total + item.adet,
    0
  );

  return (
    <header className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>

        <nav className="d-flex gap-5">
          <NavLink to={'/'}>Anasayfa</NavLink>
          <NavLink to={'/sepet'}>
            <span>Sepet</span>
            <span className="ms-2 badge bg-danger">
              {total_count}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
