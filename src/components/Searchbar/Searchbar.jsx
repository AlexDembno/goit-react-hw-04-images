import { useState } from 'react';

import styles from './Searchbar.module.css';

function Searchbar({ searchImages }) {
  const [search, setSearch] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    searchImages(search);

    reset();
  };

  const reset = () => {
    setSearch('');
  };

  const hendlInputChange = e => {
    const { name, value } = e.target;
    setSearch(value);
  };

  return (
    <header className={styles.App}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <button type="submit" className={styles.SearchForm_button}>
          <span className={styles.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={styles.SearchForm_input}
          name="search"
          value={search}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
          onChange={hendlInputChange}
        />
      </form>
    </header>
  );
}

// class Searchbar extends Component {
//   state = {
//     search: '',
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     const { searchImages } = this.props;
//     searchImages({ ...this.state });
//     this.reset();
//   };

//   reset() {
//     this.setState({ search: '' });
//   }

//   hendlInputChange = e => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   render() {
//     return (
//       <header className={styles.App}>
//         <form onSubmit={this.handleSubmit} className={styles.form}>
//           <button type="submit" className={styles.SearchForm_button}>
//             <span className={styles.SearchForm_button_label}>Search</span>
//           </button>

//           <input
//             className={styles.SearchForm_input}
//             name="search"
//             value={this.state.search}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             required
//             onChange={this.hendlInputChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }

export default Searchbar;
