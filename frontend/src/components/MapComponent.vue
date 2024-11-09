<template>
    <div id="map" ref="mapContainer"></div>
  </template>
  
  <script setup>
  import 'ol/ol.css';
  import { Map, View } from 'ol';
  import TileLayer from 'ol/layer/Tile';
  import { fromLonLat } from 'ol/proj';
  import { Feature } from 'ol';
  import { Point } from 'ol/geom';
  import VectorLayer from 'ol/layer/Vector';
  import VectorSource from 'ol/source/Vector';
  import { Style, Icon } from 'ol/style';
  import { onMounted, ref } from 'vue';
  import restaurantIcon from '../assets/restaurant.png'; // Importando el ícono local
  import TileJSON from 'ol/source/TileJSON';

  import Overlay from 'ol/Overlay'; // Importando Overlay para mostrar la información

  
  const mapContainer = ref(null);
  const restaurants = ref([
  { nombre: 'Restaurante 1', ubicacion: [-58.3816, -34.6037], descripcion: 'Restaurante de comida italiana' },
  { nombre: 'Restaurante 2', ubicacion: [-58.3712, -34.6083], descripcion: 'Restaurante de comida japonesa' },
]);
  
  onMounted(() => {
    const map = new Map({
      target: mapContainer.value,
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
  
    const features = restaurants.value.map((restaurant) => {
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
      feature.set('name', restaurant.nombre);
      feature.set('descripcion', restaurant.descripcion);
      return feature;
    });
  
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features,
      }),
    });
  
    map.addLayer(vectorLayer);

    // Crear un Overlay para mostrar la información del restaurante
    const overlay = new Overlay({
        element: document.createElement('div'), //se lo asocia a un div vacio
        positioning: 'bottom-center',           
        stopEvent: false,
    });
    map.addOverlay(overlay);

        // Crear un botón de cierre para el Overlay
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '5px';
    closeButton.style.right = '5px';
    closeButton.style.backgroundColor = 'transparent';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '20px';
    closeButton.style.color = '#333';
    closeButton.style.cursor = 'pointer';
    closeButton.style.zIndex = '10';
    closeButton.addEventListener('click', () => {
        overlay.setPosition(undefined); // Cerrar el overlay
    });
    
    
    map.on('click', (event) => {
        const feature = map.forEachFeatureAtPixel(event.pixel, (feat) => feat); //toma todos los features donde se hizo click.
        if (feature) {
        const name = feature.get('name');
        const descripcion = feature.get('descripcion');

        const content = overlay.getElement();
        content.innerHTML = `
            <div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h3>${name}</h3>
            <p>${descripcion}</p>
            </div>
        `;
        content.style.position = 'relative'; // Aseguramos que el contenido tenga una posición relativa
        content.appendChild(closeButton); // Añadir el botón de cierre al contenido del overlay
        overlay.setPosition(event.coordinate);  //seteamos el popup donde se hizo click. 
        }
  });


  });
  </script>
  
  <style scoped>
  #map {
    width: 100%;
    height: 500px;
  }
  </style>
  