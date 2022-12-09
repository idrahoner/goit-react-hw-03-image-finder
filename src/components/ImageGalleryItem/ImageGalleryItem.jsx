import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ webImage, description, onClick }) {
  // console.log('description: ', description);
  return (
    <li className={css.imageGalleryItem} onClick={onClick}>
      <img
        className={css.imageGalleryItemImage}
        src={webImage}
        alt={description}
        width="240"
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webImage: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
