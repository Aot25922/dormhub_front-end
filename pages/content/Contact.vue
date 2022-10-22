<template>
  <div>
    <div class="bg-ghostWhite px-5 py-12 xl:py-20 xl:px-52 2xl:px-96">
      <div class="breadcrumbs text-gray-500 md:text-lg lg:text-xl">
        <ul>
          <li>หน้าหลัก</li>
          <li>การติดต่อ</li>
        </ul>
      </div>
      <h1 class="text-PrussianBlue font-bold text-3xl md:text-4xl lg:text-5xl">
        การติดต่อ
      </h1>
    </div>

    <div>
      <GMap
        ref="gMap"
        language="en"
        :cluster="{options: {styles: clusterStyle}}"
        :center="{lat: locations[0].lat, lng: locations[0].lng}"
        :options="{fullscreenControl: false, styles: mapStyle}"
        :zoom="6"
      >
        <GMapMarker
          v-for="location in locations"
          :key="location.id"
          :position="{lat: location.lat, lng: location.lng}"
          :options="{icon: location === currentLocation ? pins.selected : pins.notSelected}"
          @click="currentLocation = location"
        >
          <GMapInfoWindow :options="{maxWidth: 200}">
            <code>
              lat: {{ location.lat }},
              lng: {{ location.lng }}
            </code>
          </GMapInfoWindow>
        </GMapMarker>
        <GMapCircle :options="circleOptions"/>
      </GMap>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentLocation: {},
      circleOptions: {},
      locations: [
        {
          lat: 44.933076,
          lng: 15.629058
        },
        {
          lat: 45.815,
          lng: "15.9819"
        },
        {
          lat: "45.12",
          lng: "16.21"
        }
      ],
      pins: {
        selected: "data:image/png;base64,iVBORw0KGgo...",
        notSelected: "data:image/png;base64,iVBORw0KGgo..."
      },
      mapStyle: [],
      clusterStyle: [
        {
          url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png",
          width: 56,
          height: 56,
          textColor: "#fff"
        }
      ]
    }
  }
}
</script>
