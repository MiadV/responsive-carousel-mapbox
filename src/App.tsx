import * as React from 'react';
import { createRoot } from 'react-dom/client';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ProductPathCard from './components/ProductPathCard';
import PinnedImage from './components/PinnedImage';
import PinIcon from './icons/PinIcon';
import useHorizontalSwipe from './hooks/useHorizontalSwipe';
import { productPaths } from './data';
import './app.scss';

/**
 * Feel free to do some cleanup 😀
 * I have to go grab some ☕
 */

// Create a free account at MapBox 🌎 and get your access token.
// 📌 Replace me with your token 🔑.
mapboxgl.accessToken = 'your-token';

const carouselItemWidth = 32;
const carouselItemGap = 8;
const visibleItems = 3;

export default function App({ slides = productPaths }) {
  const items = React.useMemo(() => [...slides, ...slides], [slides]); // need this to be able to loop carousel items with transition.
  const carouselRef = React.useRef<HTMLDivElement | null>(null);
  const [trackWidth, setTrackWidth] = React.useState(0);
  const [activeIdx, setActiveIdx] = React.useState(0);
  const activeItem = items[activeIdx];
  const nextItemIdx = (activeIdx % slides.length) + 1;
  const prevItemIdx = (activeIdx - 1 + slides.length) % slides.length;
  const itemWidth = carouselItemWidth + carouselItemGap * 2;
  const activeItemWidth = trackWidth - itemWidth * (visibleItems - 1);

  const mapMarkerRef = React.useRef<HTMLDivElement | null>(null);
  const mapContainer = React.useRef<HTMLDivElement | null>(null);
  const mapRef = React.useRef<mapboxgl.Map | null>(null);

  function jumpToIdx(idx: number) {
    if (idx + 1 === slides.length) {
      setActiveIdx(0);
    }

    let newActiveIdx = idx >= activeIdx ? nextItemIdx : prevItemIdx;

    setActiveIdx(newActiveIdx);
  }

  const swipeHandlers = useHorizontalSwipe<HTMLDivElement>({
    onSwipedLeft: () => jumpToIdx(activeIdx + 1),
    onSwipedRight: () => jumpToIdx(activeIdx - 1),
  });

  React.useLayoutEffect(() => {
    setTrackWidth(carouselRef.current?.clientWidth ?? 0);
  }, []);

  React.useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/light-v11',
      center: slides[0].location.coordinates,
      zoom: 1,
    });

    map.zoomTo(6, {
      duration: 1000,
      offset: [100, 50],
    });

    mapRef.current = map;

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // Add markers to the map.
    for (const item of slides) {
      // Create a new DOM node and save it to the mapMarkerRef
      mapMarkerRef.current = document.createElement('div');

      // Render a Marker Component on our new DOM node
      createRoot(mapMarkerRef.current).render(
        <PinnedImage key={item.id} imgSrc={item.image} boxSize={32} />
      );

      // Create a Mapbox Marker at our new DOM node
      new mapboxgl.Marker({ element: mapMarkerRef.current, anchor: 'bottom' })
        .setLngLat(item.location.coordinates)
        .addTo(map);
    }

    function getGeoCoordinates() {
      return slides.map((item) => [
        item.location.coordinates.lng,
        item.location.coordinates.lat,
      ]);
    }

    map.on('load', () => {
      map.addSource('route-line', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: getGeoCoordinates(),
          },
        },
      });
      map.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route-line',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#ffb801',
          'line-width': 2,
          'line-dasharray': [2, 2],
        },
      });
    });

    return () => map.remove();
  }, [slides]);

  React.useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: activeItem.location.coordinates,
        zoom: 6,
        speed: 1.2,
      });
    }
  }, [activeItem]);

  React.useEffect(() => {
    function handleWindowResize() {
      setTrackWidth(carouselRef.current?.clientWidth ?? 0);
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div className='app-wrapper'>
      <h1 className='heading'>Responsive Carousel + MapBox</h1>
      <div className='instruction'>
        <h4>Instructions:</h4>
        <ol>
          <li>
            Create a free account at{' '}
            <a href='https://www.mapbox.com/'>MapBox</a> and get your access
            token.
          </li>
          <li>
            Replace <span>mapboxgl.accessToken</span> in <span>App.tsx</span>{' '}
            with yours.
          </li>
        </ol>
      </div>

      <section className='journey'>
        <span className='journey__title'>
          <PinIcon />
          <span>Product Journey</span>
        </span>
        <div className='journey__map-wrapper'>
          <div id='map' className='map' ref={mapContainer}></div>
        </div>
        <div className='journey__slider'>
          <div className='steps'>
            <div className='carousel' ref={carouselRef}>
              <div
                className='carousel__inner'
                style={{
                  transform: `translateX(-${activeIdx * itemWidth}px)`,
                }}
                {...swipeHandlers}
                onTouchEnd={(e) => console.log(e)}
              >
                {items.map((item, i) => (
                  <div
                    key={i}
                    className={`carousel__item ${
                      activeIdx === i ? 'carousel__item--active' : ''
                    } ${nextItemIdx === i ? 'carousel__item--next' : ''}`}
                    style={{
                      width: `${
                        activeIdx === i
                          ? activeItemWidth
                          : i === activeIdx + 2
                          ? itemWidth + carouselItemGap
                          : itemWidth
                      }px`,
                    }}
                    data-title={item.title}
                  >
                    <span title={item.title} onClick={() => jumpToIdx(i)}>
                      {item.id}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <section className='product-card-wrapper'>
            <ProductPathCard pathItem={activeItem} />
          </section>
        </div>
      </section>
      <p className='p'>
        Inspired by{' '}
        <a href='https://seedtrace.org/supply-chain-visualization'>
          seedtrace.org
        </a>
      </p>
    </div>
  );
}
