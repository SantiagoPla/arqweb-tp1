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
  return new Map({
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
}

export function addMarkersToMap(map, restaurants) {
  const overlay = createOverlay();
  map.addOverlay(overlay);

  const features = restaurants.map((restaurant) => {
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
  });

  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features,
    }),
  });

  map.addLayer(vectorLayer);

  map.on('click', (event) => {
    const feature = map.forEachFeatureAtPixel(event.pixel, (feat) => feat);
    if (feature) {
      displayOverlayContent(overlay, feature, event.coordinate);
    }
  });
}

function createOverlay() {
  const overlay = new Overlay({
    element: document.createElement('div'),
    positioning: 'bottom-center',
    stopEvent: true,
  });

  return overlay;
}

function displayOverlayContent(overlay, feature, coordinate) {
  const { nombre, descripcion, direccion, horarios } = feature.getProperties();

  // Crear el contenedor para el overlay usando Vue
  const overlayContainer = overlay.getElement();
  overlayContainer.innerHTML = ''; // Limpiar contenido anterior

  // Función para cerrar el overlay
  const closeOverlay = () => {
    overlay.setPosition(undefined); // Cerrar el overlay
  };

  // Crear la aplicación Vue dentro del overlay
  const app = createApp(OverlayContent, {
    nombre,
    descripcion,
    direccion,
    horarios,
    closeOverlay, // Pasar la función para cerrar
  });

  // Montar el componente de overlay en el contenedor
  app.mount(overlayContainer);

  overlay.setPosition(coordinate);
}
