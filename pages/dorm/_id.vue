<template>
  <div class="bg-gray-50" v-if="dorm">
    <div class="bg-ghostWhite px-5 py-12 xl:py-20 xl:px-52 2xl:px-96">
      <div class="breadcrumbs text-gray-500 md:text-lg lg:text-xl">
        <ul>
          <li>หน้าหลัก</li>
          <li>หอพัก</li>
        </ul>
      </div>
      <!-- Dorm Name Heading -->
      <h1 class="text-PrussianBlue font-bold text-3xl md:text-4xl lg:text-5xl">
        {{ dorm.name }}
      </h1>
    </div>
    <div class="px-5 py-12 xl:py-20 xl:px-52 2xl:px-96">
      <div v-if="dorm != null">
        <div class="bg-white drop-shadow-lg rounded-lg">
          <!-- Dorm Img -->
          <client-only>
            <agile v-if="checkDormImg">
              <div
                class="slide text-white block relative h-60 md:h-[480px] lg:h-[550px]"
                v-for="i in dorm.media.filter((x) => x.roomTypeId == null)"
                :key="i.mediaId"
              >
                <img
                  :src="
                    $store.state.Backend_URL +
                    '/dorm/image/' +
                    dorm.dormId +
                    '/' +
                    i.mediaId
                  "
                  class="object-cover object-center w-full h-full"
                  @error="checkDormImg = false"
                />
              </div>
              <template slot="prevButton" class="hover:bg-gray-700"
                ><span class="material-icons">chevron_left</span></template
              >
              <template slot="nextButton" class="hover:bg-gray-700"
                ><span class="material-icons">chevron_right</span></template
              >
            </agile>
            <div v-else>
              <div class="relative">
                <img
                  src="@/assets/error/404.png"
                  class="w-full mx-auto md:w-1/2"
                />
              </div>
            </div>
          </client-only>
          <!-- Body -->
          <div class="p-5">
            <div class="flex flex-wrap">
              <h1 class="w-2/3 py-1 font-bold text-xl xl:text-3xl">
                {{ dorm.name }}
              </h1>
              <!-- Room Remainning -->
              <div class="w-1/3 flex justify-end items-center">
                <div
                  class="badge badge-accent"
                  v-if="(dorm.rooms.status = 'ว่าง' && dorm.rooms.length <= 5)"
                >
                  เหลือ {{ dorm.rooms.length }} ห้อง
                </div>
              </div>
              <hr class="w-full my-5" />
            </div>

            <!-- Info -->
            <div class="pt-2 rounded-md">
              <!-- Address -->
              <div class="flex flex-row items-center pl-3 pt-1">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/535/535137.png"
                  class="w-6 h-6 md:w-7 md:h-7 lg:w-8 xl:w-9 xl:h-9"
                />
                <span class="text-xs pl-2 xl:text-sm">{{ dorm.address }}</span>
              </div>

              <!-- Description -->
              <div
                v-if="dorm.description"
                class="w-full p-3 bg-ghostWhite my-3 rounded-lg shadow text-xs xl:text-sm"
              >
                <div>&emsp;"{{ dorm.description }}"</div>
              </div>

              <hr class="w-full my-5" />
              <!-- This div covering WaterPerUnit to Time -->
              <div class="flex flex-wrap text-xs text-gray-500 xl:text-sm">
                <!-- Water Per Unit -->
                <div class="p-3 w-1/2 flex flex-row items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3119/3119421.png"
                    class="w-5 md:w-6 lg:w-7 xl:w-8"
                  />
                  <span class="pl-1 w-full font-medium"
                    >฿ {{ dorm.waterPerUnit }} ต่อหน่วย</span
                  >
                </div>
                <!-- Electric Per Unit-->
                <div class="p-3 w-1/2 flex flex-row items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/616/616660.png"
                    class="w-5 md:w-6 lg:w-7 xl:w-8"
                  />
                  <span class="pl-1 w-full font-medium"
                    >฿ {{ dorm.elecPerUnit }} ต่อหน่วย</span
                  >
                </div>

                <!-- Price -->
                <div
                  class="ml-3 flex flex-row items-center text-imperialRed font-medium text-lg md:m-0 md:p-3 md:w-1/2 xl:text-xl"
                >
                  <span
                    class="text-gray-400 text-xs flex items-center xl:text-sm"
                    ><img
                      src="https://cdn-icons-png.flaticon.com/512/2603/2603710.png"
                      class="w-5 mr-2 md:w-6 lg:w-7 xl:w-8"
                    />
                    ค่าเช่าต่อเดือน ฿&nbsp;</span
                  >{{ lowPrice }} - {{ highPrice }}
                </div>

                <!-- Deposit Room -->
                <div
                  class="ml-3 mt-3 flex flex-row items-center font-medium text-xs md:m-0 md:p-3 md:w-1/2 xl:text-sm"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2664/2664669.png"
                    class="w-5 mr-2 md:w-6 lg:w-7 xl:w-8"
                  />
                  ค่าจองห้องอยู่ระหว่าง ฿
                  {{ lowDeposit }} - {{ highDeposit }}
                </div>

                <!-- Area -->
                <div
                  class="flex flex-row items-end ml-3 mt-3  text-xs font-medium md:m-0 md:p-3 md:w-1/2 xl:text-sm"
                >
                  <span
                    ><img
                      src="https://cdn-icons-png.flaticon.com/512/8834/8834715.png"
                      class="w-5 mr-2 md:w-6 lg:w-7 xl:w-8"
                    />
                  </span>
                  พื้นที่ห้อง {{ minArea }} - {{ maxArea }} ตารางเมตร
                </div>

                <!-- Open/Close Time -->
                <div
                  v-if="dorm.openTime != null || dorm.closeTime != null"
                  class="flex items-center pt-2 ml-3 text-xs md:m-0 md:p-3 md:w-1/2 xl:text-sm"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/850/850960.png"
                    class="w-5 mr-2 md:w-6 lg:w-7 xl:w-8"
                  />
                  <span v-if="dorm.openTime != null"
                    >&nbsp;{{ dorm.openTime }} -</span
                  >
                  <span v-if="dorm.closeTime != null"
                    >&nbsp;{{ dorm.closeTime }} น.</span
                  >
                  <span v-if="dorm.openTime != null && dorm.closeTime == null"
                    >เปิด {{ dorm.openTime }} น.</span
                  >
                  <span v-if="dorm.openTime == null && dorm.closeTime != null"
                    >ปิด {{ dorm.closeTime }} น.</span
                  >
                </div>

                <!-- Floor&Rooms -->
                <div class="p-3 w-full flex flex-wrap items-center font-medium">
                  <!-- Floors -->
                  <div></div>
                  <!-- Idle Rooms/Rooms -->
                  <div class="flex flex-row items-center pl-1 w-full">
					<img src="https://cdn-icons-png.flaticon.com/512/2534/2534800.png" class="w-5 mr-2 md:w-6 lg:w-7 xl:w-8"/>
                    ห้องพัก&nbsp;
                    <div class="text-success" v-if="dorm.rooms.status = 'ว่าง'">
                      {{ dorm.rooms.length }}
                    </div>
                    /{{ dorm.rooms.length }}
                  </div>
                </div>
                <hr class="w-full my-5" />
              </div>

              <!-- Contact -->
              <h2
                class="pt-2 font-bold flex flex-row items-center lg:text-lg 2xl:text-xl"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3188/3188217.png"
                  class="w-7 md:w-8 xl:w-9"
                />&nbsp;การติดต่อเจ้าของหอพัก
              </h2>
              <ul class="list-none text-xs xl:text-sm">
                <li class="p-3 flex flex-row items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/726/726623.png"
                    class="w-5 md:w-6 lg:w-7"
                  />&nbsp;{{ dorm.userAccount.email }}
                </li>
                <li class="p-3 flex flex-row items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3014/3014736.png"
                    class="w-5 md:w-6 lg:w-7"
                  />&nbsp;{{ dorm.userAccount.phone }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Banking -->
        <div class="my-5 bg-white rounded shadow">
          <vs-table>
            <template #thead>
              <vs-tr>
                <vs-th> ลำดับ </vs-th>
                <vs-th> ชื่อบัญชี </vs-th>
                <vs-th> เลขบัญชี </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr v-for="(user, id) in dorm.bankAccounts" :key="id">
                <vs-td>
                  {{ id + 1 }}
                </vs-td>
                <vs-td>
                  {{ user.accountName }}
                </vs-td>
                <vs-td>
                  {{ user.accountNum }}
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>

        <div class="my-5 dropdown">
          <label
            tabindex="0"
            class="btn btn-neutral m-1 text-lg md:text-xl lg:text-2xl"
            >ประเภทห้องพัก<span class="material-icons">expand_more</span></label
          >
          <ul
            tabindex="0"
            class="dropdown-content menu p-2 shadow rounded-box w-52 bg-white border border-black"
          >
            <li v-for="type in dorm.roomTypes" :key="type.roomTypeId">
              <p
                class="text-black text-sm md:text-base lg:text-lg xl:text-xl"
                @click="selectRoomtype(type)"
              >
                {{ type.type }}
              </p>
            </li>
          </ul>
        </div>
        <div>
          <room-type
            v-if="roomType"
            :roomType="roomType"
            :elecPerUnit="dorm.elecPerUnit"
            :waterPerUnit="dorm.waterPerUnit"
            :media="roomTypeMedia"
            :key="roomType.roomTypeId"
            :rooms="
              dorm.rooms.filter((x) => x.roomTypeId == roomType.roomTypeId)
            "
          />
        </div>
      </div>
      <div v-else>
        <errorPage />
      </div>
    </div>
  </div>
</template>

<script>
import roomType from "~/components/RoomTypeDes.vue";
import errorPage from "@/layouts/error.vue";
export default {
  components: { roomType, errorPage },
  async fetch() {
    if (this.$store.state.selectedDorm != null) {
      this.dorm = this.$store.state.selectedDorm;
      let price = [];
      let deposit = [];
      let area = [];
      for (let i in this.dorm.roomTypes) {
        price.push(this.dorm.roomTypes[i].dormHasRoomType.price);
        deposit.push(this.dorm.roomTypes[i].dormHasRoomType.deposit);
        area.push(this.dorm.roomTypes[i].dormHasRoomType.area);
      }
      this.lowPrice = Math.min(...price);
      this.highPrice = Math.max(...price);
      this.lowDeposit = Math.min(...deposit);
      this.highDeposit = Math.max(...deposit);
      this.minArea = Math.min(...area);
      this.maxArea = Math.max(...area);
    } else {
      let dormInfo = { dorm: null, id: this.$route.params.id };
      await this.$store.dispatch("dormSelected", dormInfo);
      this.dorm = this.$store.state.selectedDorm;
      let price = [];
      for (let i in this.dorm.roomTypes) {
        price.push(this.dorm.roomTypes[i].dormHasRoomType.price);
        deposit.push(this.dorm.roomTypes[i].dormHasRoomType.deposit);
        area.push(this.dorm.roomTypes[i].dormHasRoomType.area);
      }
      this.lowPrice = Math.min(...price);
      this.highPrice = Math.max(...price);
      this.lowDeposit = Math.min(...deposit);
      this.highDeposit = Math.max(...deposit);
      this.minArea = Math.min(...area);
      this.maxArea = Math.max(...area);
    }
  },
  data() {
    return {
      dorm: null,
      lowPrice: 0,
      highPrice: 0,
      lowDeposit: 0,
      highDeposit: 0,
      minArea: 0,
      maxArea: 0,
      roomType: null,
      roomTypeMedia: null,
      checkDormImg: true,
    };
  },
  methods: {
    selectRoomtype(data) {
      this.roomType = data;
      this.roomTypeMedia = this.dorm.media.filter(
        (i) => i.roomTypeId == this.roomType.roomTypeId
      );
    },
  },
};
</script>
