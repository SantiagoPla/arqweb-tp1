import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Icon } from 'ol/style';
import Overlay from 'ol/Overlay';
import restaurantIcon from '../assets/restaurant.png';
import TileJSON from 'ol/source/TileJSON';
import { createApp } from 'vue';
import OverlayContent from '../components/OverlayContent.vue';

export function initMap(targetElement) {
  const map = new Map({
    target: targetElement,
    layers: [
      new TileLayer({
        source: new TileJSON({
          url: 'https://api.maptiler.com/maps/streets-v2/tiles.json?key=RqO4vUrdJGLJtkYpKX7y',
          tileSize: 512,
        }),
      }),
    ],
    view: new View({
      center: fromLonLat([-58.3816, -34.6037]),
      zoom: 13,
    }),
  });

  const overlay = initializeOverlay();
  map.addOverlay(overlay);

  map.on('click', (event) => handleMapClick(event, map, overlay));

  return map;
}

export function addMarkersToMap(map, restaurants) {
  const features = restaurants.map(createRestaurantFeature);

  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features,
    }),
  });

  map.addLayer(vectorLayer);
}

function createRestaurantFeature(restaurant) {
  const feature = new Feature({
    geometry: new Point(fromLonLat(restaurant.ubicacion)),
  });

  feature.setStyle(
    new Style({
      image: new Icon({
        src: restaurantIcon,
        scale: 0.1,
        anchor: [0.5, 1],
      }),
    })
  );
  feature.setProperties(restaurant);
  return feature;
}

function initializeOverlay() {
  const overlayElement = document.createElement('div');
  overlayElement.className = 'overlay-content';

  const overlay = new Overlay({
    element: overlayElement,
    positioning: 'bottom-center',
    stopEvent: true,
  });

  return overlay;
}

function handleMapClick(event, map, overlay) {
  const feature = map.forEachFeatureAtPixel(event.pixel, (feat) => feat);
  if (feature) {
    const coordinate = event.coordinate;
    updateOverlayContent(overlay, feature, coordinate);
  }
}

function updateOverlayContent(overlay, feature, coordinate) {
  const { nombre, descripcion, direccion, horarios } = feature.getProperties();

  const overlayContainer = overlay.getElement();
  overlayContainer.innerHTML = '';

  const closeOverlay = () => overlay.setPosition(undefined);

  const app = createApp(OverlayContent, {
    nombre,
    descripcion,
    direccion,
    horarios,
    closeOverlay,
  });

  app.mount(overlayContainer);

  overlay.setPosition(coordinate);
}
