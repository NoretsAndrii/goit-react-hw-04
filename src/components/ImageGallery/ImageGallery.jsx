import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

export default function ImageGallery({ images, setIsOpen, setModalImage }) {
  const onImageClick = e => {
    if (e.currentTarget === e.target) return console.log('ups');
    console.log('ok');
    const modalImageUrl = e.target.dataset.large;
    setModalImage(modalImageUrl);
    console.log(e.target);
    console.log(modalImageUrl);
    setIsOpen(true);
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
