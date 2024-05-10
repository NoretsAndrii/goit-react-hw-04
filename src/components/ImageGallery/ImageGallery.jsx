import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

export default function ImageGallery({ images }) {
  return (
    <ul className={css.gallery}>
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
