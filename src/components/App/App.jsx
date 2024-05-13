import { useState } from 'react';
import axios from 'axios';

import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

let totalPages = 0;

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  function openModal() {
    setIsOpen(true);
  }

  const fetchImages = async (query, page = 1) => {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        client_id: 'atRLm6T0r2wFSN24-uwDTljx3r9QG0FnyRG40FvMP9U',
        query: query,
        page: page,
        orientation: 'landscape',
      },
    });
    console.log(response);
    return response.data;
  };

  const handleSearch = async query => {
    try {
      setImages([]);
      setPage(1);
      setQuery(query);
      setError(false);
      setLoading(true);
      const data = await fetchImages(query);
      setImages(data.results);
      totalPages = data.total_pages;
      console.log(totalPages);
    } catch (error) {
      setError(true);
      setQuery('');
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (page === 1) return;
  //   const onLoadMore = async (query, page) => {
  //     try {
  //       setLoading(true);
  //       const data = await fetchImages(query, page);
  //       setImages(prevImages => {
  //         return [...prevImages, ...data];
  //       });
  //     } catch (error) {
  //       setError(true);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   onLoadMore(query, page);
  // }, [page, query]);

  const onLoadMore = async () => {
    try {
      const currentPage = page + 1;
      setPage(prev => prev + 1);
      setError(false);
      setLoading(true);
      const data = await fetchImages(query, currentPage);
      setImages(prevImages => {
        return [...prevImages, ...data.results];
      });
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  console.log('render');

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {images.length > 0 && (
        <ImageGallery
          images={images}
          openModal={openModal}
          setModalImage={setModalImage}
        />
      )}
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
    </>
  );
}

export default App;
