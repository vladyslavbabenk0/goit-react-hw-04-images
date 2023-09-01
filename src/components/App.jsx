import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { fetchPicturesQuery } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [search, setSearch] = useState('');
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState(null);

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        setLoading(true);
        const data = await fetchPicturesQuery(search, page);
        if (data.hits.length === 0) {
          toast.error('Nothing found');
        } else {
          setPictures((prevPictures) => [...prevPictures, ...data.hits]);
        }
        setTotalHits(data.totalHits);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (search || page > 1) {
      fetchPictures();
    }
  }, [search, page]);

  const searchPictures = ({ search }) => {
    setSearch(search);
    setPictures([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (data) => {
    setShowModal(true);
    setLargeImage(data);
  };

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={searchPictures} />
      {pictures.length !== 0 && (
        <ImageGallery pictures={pictures} openModal={openModal} />
      )}
      
      {showModal && <Modal toggleModal={toggleModal} largeImage={largeImage} />}
      {loading && <Loader />}
      {error && <p>Something goes wrong</p>}
      {totalHits > pictures.length && !loading && (
        <Button onClick={loadMore} />
      )}
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default App;
