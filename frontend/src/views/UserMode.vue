<template>
  <div id="map" ref="mapContainer"></div>
</template>

<script>
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Icon } from 'ol/style';
import { onMounted, ref } from 'vue';
import restaurantIcon from '../assets/restaurant.png';  // Importando el ícono local

export default {
  setup() {
    const mapContainer = ref(null);
    const restaurants = ref([
      { nombre: 'Restaurante 1', ubicacion: [-58.3816, -34.6037] },
      { nombre: 'Restaurante 2', ubicacion: [-58.3712, -34.6083] },
    ]);

    onMounted(() => {
      const map = new Map({
        target: mapContainer.value,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([-58.3816, -34.6037]),
          zoom: 12,
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
            }),
          })
        );
        feature.set('name', restaurant.nombre);
        return feature;
      });

      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          features,
        }),
      });
      map.addLayer(vectorLayer);
    });

    return { mapContainer };
  },
};
</script>

<style>
#map {
  width: 100%;
  height: 500px; /* Ocupa toda la altura de la pantalla */
}

</style>