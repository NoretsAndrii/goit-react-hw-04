import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ScrollToTop from 'react-scroll-to-top';
import { SlArrowUp } from 'react-icons/sl';

import { fetchImages } from '../../api';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import NotResultMessage from '../NotResultMessage/NotResultMessage';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [notResult, setNotResult] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const notify = () => {
    setError(false);
    setNotResult(false);
    toast.error('Enter text to search!!!');
  };

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (query.trim() === '') return;
    const getImages = async () => {
      try {
        setError(false);
        setNotResult(false);
        setLoading(true);
        const data = await fetchImages(query, page);
        if (data.results.length === 0) return setNotResult(true);
        setImages(prevImages => {
          return [...prevImages, ...data.results];
        });
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(true);
        setQuery('');
      } finally {
        setLoading(false);
      }
    };
    getImages();
  }, [query, page]);

  const handleSearch = async query => {
    setImages([]);
    setPage(1);
    setQuery(query);
  };

  const onLoadMore = async () => {
    setPage(prev => prev + 1);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} notify={notify} />
      <Toaster
        containerStyle={{
          top: 100,
        }}
      />
      {images.length > 0 && (
        <ImageGallery
          images={images}
          openModal={openModal}
          setModalImage={setModalImage}
        />
      )}
      {notResult && <NotResultMessage />}
      {error && <ErrorMessage />}
      {loading && <Loader />}
      {images.length > 0 && page < totalPages && (
        <LoadMoreBtn onClick={onLoadMore} />
      )}
      {images.length > 0 && (
        <ImageModal
          isOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          modalImage={modalImage}
        />
      )}
      <ScrollToTop
        smooth
        component={<SlArrowUp />}
        style={{
          backgroundColor: 'rgba(0, 0, 255,0.75)',
          color: 'white',
        }}
      />
    </>
  );
}

export default App;
