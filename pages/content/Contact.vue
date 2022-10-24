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

    <div class="xl:flex xl:flex-wrap">
      <div class="py-20 px-5 xl:w-1/2 xl:py-32 xl:pl-52 2xl:pl-96">
        <div class="rounded shadow-lg p-5">
          <h1 class="text-black font-bold text-3xl md:text-4xl">การติดต่อ</h1>
          <p class="text-gray-500 py-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tortor turpis, consequat non aliquet maximus, finibus id nisl. Mauris volutpat commodo felis eu euismod.</p>
          <div>
            <span class="material-icons-outlined">สมาชิก</span>
            <p class="text-gray-500">62130500031 ธนทรัพย์ลีลาพิสุทธิ์</p>
            <p class="text-gray-500">62130500033 ธนภัทร กัลกุล</p>
            <p class="text-gray-500">62130500043 นิทัศน์ วาสนาพงษ์</p>
          </div>
        </div>
      </div>
      <div class="pb-20 xl:w-1/2 xl:py-20">
        <GMap
          ref="gMap"
          language="en"
          :cluster="{options: {styles: clusterStyle}}"
          :center="{lat: locations[0].lat, lng: locations[0].lng}"
          :options="{fullscreenControl: false, styles: mapStyle}"
          :zoom="15"
        >
          <GMapMarker
            v-for="location in locations"
            :key="location.id"
            :position="{lat: location.lat, lng: location.lng}"
            :options="{icon: location === currentLocation ? pins.selected : pins.notSelected}"
            @click="currentLocation = location"
          >
            <GMapInfoWindow>
              <code>
                lat: {{ location.lat }},
                lng: {{ location.lng }}
              </code>
            </GMapInfoWindow>
          </GMapMarker>
          <GMapCircle :options="circleOptions"/>
        </GMap>
      </div>

      <div class="pb-20 stats shadow w-full stats-vertical md:stats-horizontal xl:w-full xl:px-52 2xl:px-96">
        <div class="stat place-items-center">
          <div class="stat-title text-PrussianBlue">Downloads</div>
          <div class="stat-value text-PrussianBlue">31K</div>
          <div class="stat-desc text-gray-500">From January 1st to February 1st</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-title text-PrussianBlue">Users</div>
          <div class="stat-value text-celadonBlue">4,200</div>
          <div class="stat-desc text-gray-500">↗︎ 40 (2%)</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-title text-PrussianBlue">New Registers</div>
          <div class="stat-value text-gray-500">1,200</div>
          <div class="stat-desc text-gray-500">↘︎ 90 (14%)</div>
        </div>
      </div>
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
          lat: 13.651214,
          lng: 100.496429
        },
        {
          lat: 13.651214,
          lng: 100.496429
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
