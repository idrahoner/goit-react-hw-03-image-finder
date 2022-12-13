import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  webImage,
  description,
  onClick,
  id,
}) {
  return (
    <li className={css.imageGalleryItem} onClick={() => onClick(id)}>
      <img
        className={css.imageGalleryItemImage}
        src={webImage}
        alt={description}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webImage: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
