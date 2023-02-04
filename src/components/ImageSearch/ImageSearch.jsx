import { useState, useEffect } from 'react';

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
      {Boolean(articles.length) && (
        <ImageGallery items={articles} openModal={openModal} />
      )}
      {loading && <Loader />}
      {!loading && page < Math.ceil(totalHits / 40) && (
        <Button loadMore={loadMore} />
      )}
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

export default ImageSearch;
