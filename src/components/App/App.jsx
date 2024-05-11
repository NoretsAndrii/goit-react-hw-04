import { useState, useEffect } from 'react';
import axios from 'axios';

// import css from './App.module.css'
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  //===================================================

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  function openModal() {
    setIsOpen(true);
  }

  //==========================================

  const fetchImages = async (query, page = 1) => {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        client_id: 'atRLm6T0r2wFSN24-uwDTljx3r9QG0FnyRG40FvMP9U',
        query: query,
        page: page,
        orientation: 'landscape',
      },
    });
    console.log(query);
    console.log(response);
    return response.data.results;
  };

  const handleSearch = async query => {
    try {
      setImages([]);
      setPage(1);
      setQuery(query);
      // setError(false);
      //   setLoading(true);

      const data = await fetchImages(query);

      console.log(data);
      setImages(data);
    } catch (error) {
      setQuery('');
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    const onLoadMore = async (query, page) => {
      try {
        console.log(page);
        console.log(query);
        const data = await fetchImages(query, page);
        setImages(prevImages => {
          return [...prevImages, ...data];
        });
      } catch (error) {
        // setError(true);
      } finally {
        // setLoading(false);
      }
    };
    onLoadMore(query, page);
  }, [page, query]);

  // const onLoadMore = async () => {
  //   try {
  //     setPage(page + 1);
  //     console.log(page);
  //     const data = await fetchImages(query, page);
  //     setImages(prevImages => {
  //       return [...prevImages, ...data];
  //     });
  //     console.log(images);
  //     console.log(111);
  //   } catch (error) {
  //     // setError(true);
  //   } finally {
  //     // setLoading(false);
  //   }
  // };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <ImageGallery
        images={images}
        setIsOpen={setIsOpen}
        setModalImage={setModalImage}
      />
      {images.length > 0 && <LoadMoreBtn onClick={() => setPage(page + 1)} />}
      <button onClick={openModal}>Open Modal</button>

      <ImageModal
        isOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        modalImage={modalImage}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        // style={customStyles}
        // contentLabel="Example Modal"
      />
    </>
  );
}

export default App;
