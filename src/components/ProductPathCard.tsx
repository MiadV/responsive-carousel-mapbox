import * as React from 'react';
import { PathType } from '../data';
import ChevronDown from '../icons/ChevronDown';
import PinnedImage from './PinnedImage';

export default function ProductPathCard({ pathItem }: { pathItem: PathType }) {
  const [expandBody, setExpandBody] = React.useState(false);

  return (
    <div className="product-card">
      <div className="card__img">
        <img src={pathItem.image} alt={pathItem.location.title} />
        <span className="overlay"></span>
        <div className="location__container">
          <div className="location__wrapper">
            <PinnedImage imgSrc={pathItem.image} />
            <div>
              <span className="title">{pathItem.location.title}</span>
              <span className="subtitle">{pathItem.location.subtitle}</span>
            </div>
          </div>
          <div>
            <ChevronDown
              cursor="pointer"
              className={expandBody ? 'rotate' : undefined}
              onClick={() => setExpandBody(!expandBody)}
            />
          </div>
        </div>
      </div>

      <div
        className={`card__body ${expandBody ? 'card__body-expand' : undefined}`}
      >
        <p>{pathItem.body}</p>
        {!expandBody && <span className="fade"></span>}
      </div>
      <div className="card__footer" onClick={() => setExpandBody(!expandBody)}>
        <ChevronDown
          cursor="pointer"
          className={expandBody ? 'rotate' : undefined}
          height="14"
          width="14"
        />
        <span>{expandBody ? 'Minimize' : 'See more details'}</span>
      </div>
    </div>
  );
}
