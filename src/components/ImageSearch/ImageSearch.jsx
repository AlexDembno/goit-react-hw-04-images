import { useState, useEffect } from 'react';

// import initialState from './InitialState';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import response from '../../shared/services/images-Api';

function ImageSearch() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [tags, setTags] = useState(null);

  const searchImages = search => {
    setSearch(search);
    setArticles([]);
    setPage(1);
  };

  useEffect(() => {
    if (search) {
      const fetch = async () => {
        try {
          setLoading(true);
          const data = await response(search, page);
          setTotalHits(data.data.totalHits);
          setArticles(prevState => [...prevState, ...data.data.hits]);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetch();
    }
  }, [page, search]);

  const openModal = (largeImageURL, tags) => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImageURL(null);
    setTags(null);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <Searchbar searchImages={searchImages} />
      <ImageGallery items={articles} openModal={openModal} />
      {loading && <Loader />}
      {page < Math.ceil(totalHits / 40) && <Button loadMore={loadMore} />}
      {showModal && (
        <Modal
          closeModal={closeModal}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      )}
    </>
  );
}

// class ImageSearch extends Component {
//   state = {
//     search: '',
//     page: 1,
//     articles: [],
//     loading: false,
//     error: null,
//     totalHits: '',
//     showModal: false,
//     largeImageURL: null,
//     tags: null,
//   };

//   searchImages = search => {
//     this.setState({ search, articles: [], page: 1 });
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const { search, page } = this.state;

//     if (search !== prevState.search || prevState.page !== page) {
//       try {
//         this.setState({ loading: true });
//         const data = await response(search, page);
//         this.setState({ totalHits: data.data.totalHits });
//         this.setState(prevState => ({
//           articles: [...prevState.articles, ...data.data.hits],
//         }));
//       } catch (error) {
//         this.setState({ error });
//       } finally {
//         this.setState({ loading: false });
//       }
//     }
//   }

//   openModal = (largeImageURL, tags) => {
//     this.setState({
//       showModal: true,
//       largeImageURL: largeImageURL,
//       tags: tags,
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       showModal: false,
//       largeImageURL: null,
//       tags: null,
//     });
//   };

//   loadMore = () => {
//     this.setState(({ page }) => ({
//       page: page + 1,
//     }));
//   };

//   render() {
//     const {
//       loading,
//       articles,
//       page,
//       totalHits,
//       showModal,
//       largeImageURL,
//       tags,
//     } = this.state;

//     return (
//       <>
//         <Searchbar searchImages={this.searchImages} />
//         <ImageGallery items={articles} openModal={this.openModal} />
//         {loading && <Loader />}
//         {page < Math.ceil(totalHits / 40) && (
//           <Button loadMore={this.loadMore} />
//         )}
//         {showModal && (
//           <Modal
//             closeModal={this.closeModal}
//             largeImageURL={largeImageURL}
//             tags={tags}
//           />
//         )}
//       </>
//     );
//   }
// }

export default ImageSearch;
