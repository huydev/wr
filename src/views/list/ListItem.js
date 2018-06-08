import React from 'React';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { imgPrefix } from 'Src/utils/config';

const ListItem = ({id, imgUrl, title, author, type, info}) => {
  return (
    <li className="item">
      <Link to={"/book/"+id} className="item__flex">
        <div className="item__cover">
          <img src={imgPrefix + imgUrl} alt={title}/>
        </div>
        <div className="item__details">
          <h3>{title}</h3>
          <p>{author} | {type}</p>
          <p>{info}</p>
        </div>
      </Link>
    </li>
  );
}
ListItem.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired
}

export default ListItem;