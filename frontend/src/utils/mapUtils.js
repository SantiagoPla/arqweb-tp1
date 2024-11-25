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
import Draw from 'ol/interaction/Draw';
import restaurantIcon from '../assets/restaurant.png';
import restaurantIconOpen from '../assets/restaurant_open.png';
import TileJSON from 'ol/source/TileJSON';
import { createApp } from 'vue';
import OverlayContent from '../components/OverlayContent.vue';
import Restaurant from '../models/Restaurant.js';

const MAP_SOURCE_URL = 'https://api.maptiler.com/maps/streets-v2/tiles.json?key=RqO4vUrdJGLJtkYpKX7y';

let drawInteraction = null;
let isDrawingEnabled = false;

export function initMap(targetElement) {
  const map = new Map({
    target: targetElement,
    layers: [
      new TileLayer({
        source: new TileJSON({
          url: MAP_SOURCE_URL,
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


  map.on('click', (event) => {
    if (!isDrawingEnabled) {
      handleMapClick(event, map, overlay);
    }
  });

  addDrawButton(map);

  return map;
}

function isOpen(restaurant) {
  const currentTime = new Date();
  const [openingHour, openingMinute] = restaurant.opening_time.split(':');
  const [closingHour, closingMinute] = restaurant.closing_time.split(':');
  const openingTotalMinutes = parseInt(openingHour) * 60 + parseInt(openingMinute);
  const closingTotalMinutes = parseInt(closingHour) * 60 + parseInt(closingMinute);
  const currentTotalMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  return closingTotalMinutes > openingTotalMinutes
    ? currentTotalMinutes >= openingTotalMinutes && currentTotalMinutes <= closingTotalMinutes
    : currentTotalMinutes >= openingTotalMinutes || currentTotalMinutes <= closingTotalMinutes;
}
let restaurantFeatures = []; 



export function addRestaurantMarkersToMap(map, restaurants) {
  restaurantFeatures = restaurants.map(restaurant => {
    const feature = createRestaurantFeature(restaurant);
    const iconSrc = isOpen(restaurant) ? restaurantIconOpen : restaurantIcon;

    feature.setStyle(new Style({
      image: new Icon({
        src: iconSrc,
        scale: 0.08,
        anchor: [0.5, 1],
      }),
    }));

    return feature;
  });

  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: restaurantFeatures,
      features: restaurantFeatures,
    }),
  });

  map.addLayer(vectorLayer);
  map.restaurantLayer = vectorLayer; 
}

function createRestaurantFeature(restaurant) {
  const feature = new Feature({
    geometry: new Point(fromLonLat([restaurant.longitude, restaurant.latitude])),
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
    offset: [0, -10],
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


let currentOverlayApp = null;  

function updateOverlayContent(overlay, feature, coordinate) {

  const overlayContainer = overlay.getElement();
  overlayContainer.innerHTML = '';

  if (currentOverlayApp) {
    currentOverlayApp.unmount();
  }

  const closeOverlay = () => overlay.setPosition(undefined);
  const featureRestaurant = feature.values_
  currentOverlayApp = createApp(OverlayContent, {
    featureRestaurant,
    closeOverlay,
    router: window.router
  });

  currentOverlayApp.mount(overlayContainer);

  overlay.setPosition(coordinate);
}

function addDrawButton(map) {
  const appDiv = document.getElementById('app');
  
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'button-container';
  buttonContainer.style.display = 'flex';
  buttonContainer.style.flexDirection = 'row';
  buttonContainer.style.justifyContent = 'space-evenly';
  buttonContainer.style.alignItems = 'center';
  buttonContainer.style.padding = '10px';
  buttonContainer.style.borderRadius = '5px';
  
  appDiv.insertBefore(buttonContainer, appDiv.firstChild);
  const drawButton = document.createElement('button');
  drawButton.className = 'custom-draw-button';
  drawButton.innerHTML = 'Activar Dibujo';
  buttonContainer.appendChild(drawButton);

  drawButton.addEventListener('click', () => toggleDrawInteraction(map, drawButton));

  const reloadButton = document.createElement('button');
  reloadButton.className = 'custom-reload-button';
  reloadButton.innerHTML = 'Recargar Restaurantes';
  buttonContainer.appendChild(reloadButton);

  reloadButton.addEventListener('click', () => resetRestaurantMarkers(map));

  const openFilterContainer = document.createElement('div');
  openFilterContainer.className = 'filter-container';
  openFilterContainer.style.marginLeft = '20px';  
  buttonContainer.appendChild(openFilterContainer);

  const openFilterLabel = document.createElement('label');
  openFilterLabel.setAttribute('for', 'openFilterCheckbox');
  openFilterLabel.className = 'filter-label';
  openFilterLabel.innerHTML = 'Mostrar sólo abiertos';
  openFilterContainer.appendChild(openFilterLabel);

  const openFilterCheckbox = document.createElement('input');
  openFilterCheckbox.id = 'openFilterCheckbox';
  openFilterCheckbox.type = 'checkbox';
  openFilterCheckbox.className = 'filter-checkbox';
  openFilterContainer.appendChild(openFilterCheckbox);

  const nameFilterContainer = document.createElement('div');
  nameFilterContainer.className = 'filter-container';
  nameFilterContainer.style.marginLeft = '20px';  
  buttonContainer.appendChild(nameFilterContainer);

  const nameFilterLabel = document.createElement('label');
  nameFilterLabel.setAttribute('for', 'nameFilterInput');
  nameFilterLabel.className = 'filter-label';
  nameFilterContainer.appendChild(nameFilterLabel);

  const nameFilterInput = document.createElement('input');
  nameFilterInput.id = 'nameFilterInput';
  nameFilterInput.type = 'text';
  nameFilterInput.className = 'filter-input';
  nameFilterInput.placeholder = 'Filtrar por nombre...';
  nameFilterContainer.appendChild(nameFilterInput);

  openFilterCheckbox.addEventListener('change', () => {
    filterRestaurants(map, openFilterCheckbox.checked, nameFilterInput.value);
  });

  nameFilterInput.addEventListener('input', () => {
    filterRestaurants(map, openFilterCheckbox.checked, nameFilterInput.value);
  });
}


function filterRestaurants(map, isOpenOnly, nameQuery) {
  const filteredRestaurants = restaurantFeatures.filter(restaurant => {
    const isOpenRestaurant = isOpenOnly ? isOpen(restaurant.getProperties()) : true;
    const isNameMatch = restaurant.getProperties().name.toLowerCase().includes(nameQuery.toLowerCase());
    return isOpenRestaurant && isNameMatch;
  });

  const filteredVectorLayer = new VectorLayer({
    source: new VectorSource({
      features: filteredRestaurants,
    }),
  });

  if (map.restaurantLayer) {
    map.removeLayer(map.restaurantLayer);
  }

  map.addLayer(filteredVectorLayer);
  map.restaurantLayer = filteredVectorLayer;
}

function resetRestaurantMarkers(map) {
  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: restaurantFeatures, 
    }),
  });

  if (map.restaurantLayer) {
    map.removeLayer(map.restaurantLayer);
  }

  map.addLayer(vectorLayer);
  map.restaurantLayer = vectorLayer; 
}

function toggleDrawInteraction(map, button) {
  isDrawingEnabled = !isDrawingEnabled;
  button.innerHTML = isDrawingEnabled ? 'Desactivar Dibujo' : 'Activar Dibujo';

  if (isDrawingEnabled) {
    drawInteraction = new Draw({
      source: new VectorSource(),
      type: 'Polygon',
    });

    drawInteraction.on('drawend', (event) => {
      const polygon = event.feature.getGeometry();

      const restaurantsInsidePolygon = restaurantFeatures.filter(feature => 
        polygon.intersectsCoordinate(feature.getGeometry().getCoordinates())
      );

      const coordinates = polygon.getCoordinates()[0];

      const newVectorLayer = new VectorLayer({
        source: new VectorSource({
          features: restaurantsInsidePolygon,
        }),
      });

      map.removeLayer(map.restaurantLayer);
      map.addLayer(newVectorLayer);
      map.restaurantLayer = newVectorLayer; 
    });

    map.addInteraction(drawInteraction);
  } else {
    map.removeInteraction(drawInteraction);
    drawInteraction = null;
  }
}