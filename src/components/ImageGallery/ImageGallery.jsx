import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

export default function ImageGallery({ images, openModal, setModalImage }) {
  const onImageClick = e => {
    if (e.currentTarget === e.target) return console.log('ups');
    const modalImageUrl = e.target.dataset.large;
    setModalImage(modalImageUrl);
    openModal();
  };

  return (
    <ul className={css.gallery} onClick={onImageClick}>
      {images.map(image => {
        return (
          <li className={css.item} key={image.id}>
            <ImageCard image={image} />
          </li>
        );
      })}
    </ul>
  );
}
