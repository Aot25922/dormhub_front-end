<template>
  <div class="py-3 md:py-5">
    <div class="xl:px-48 2xl:px-80">
      <!--Dorm Info-->
      <div class="bg-white rounded-b-lg mb-5 shadow-lg">
        <agile>
          <div
            class="slide text-white block relative h-60 md:h-[480px] lg:h-[550px]"
            v-for="(i, index) in dormImg"
            :key="index"
          >
            <img :src="i" class="object-cover object-center w-full h-full" />
          </div>
          <template slot="prevButton"
            ><span class="material-icons">chevron_left</span></template
          >
          <template slot="nextButton"
            ><span class="material-icons">chevron_right</span></template
          >
        </agile>
        <div class="p-5">
          <h1 class="w-2/3 py-1 font-bold text-xl xl:text-3xl">
            {{ dorm.dorm.name }}
          </h1>
          <hr class="w-full my-5" />

          <!-- Info -->
          <div class="pt-2 rounded-md">
            <!-- Address -->
            <div class="flex flex-row items-center pl-3 pt-1">
              <img
                src="https://cdn-icons-png.flaticon.com/512/535/535137.png"
                class="w-6 h-6 md:w-7 md:h-7 lg:w-8 xl:w-9 xl:h-9"
              />
              <span class="text-xs pl-2 xl:text-sm">{{
                dorm.dorm.address
              }}</span>
            </div>
            <!-- Description -->
            <div
              v-if="dorm.dorm.description"
              class="w-full p-3 bg-ghostWhite my-3 rounded-lg shadow text-xs xl:text-sm"
            >
              <div>&emsp;"{{ dorm.dorm.description }}"</div>
            </div>
            <hr class="w-full my-5" />
            <div class="flex flex-wrap text-xs text-gray-500 xl:text-sm">
              <!-- Water Per Unit -->
              <div class="p-3 w-1/2 flex flex-row items-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3119/3119421.png"
                  class="w-5 md:w-6 lg:w-7 xl:w-8"
                />
                <span class="pl-1 w-full font-medium"
                  >฿ {{ dorm.dorm.waterPerUnit }} ต่อหน่วย</span
                >
              </div>
              <!-- Electric Per Unit-->
              <div class="p-3 w-1/2 flex flex-row items-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/616/616660.png"
                  class="w-5 md:w-6 lg:w-7 xl:w-8"
                />
                <span class="pl-1 w-full font-medium"
                  >฿ {{ dorm.dorm.elecPerUnit }} ต่อหน่วย</span
                >
              </div>
            </div>
            <!-- Open/Close Time -->
            <div
              v-if="dorm.dorm.openTime != null || dorm.dorm.closeTime != null"
              class="flex items-center pt-2 ml-3 text-xs md:m-0 md:p-3 md:w-1/2 xl:text-sm"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/850/850960.png"
                class="w-5 mr-2 md:w-6 lg:w-7 xl:w-8"
              />
              <span v-if="dorm.dorm.openTime != null"
                >&nbsp;{{ dorm.dorm.openTime }} -</span
              >
              <span v-if="dorm.dorm.closeTime != null"
                >&nbsp;{{ dorm.dorm.closeTime }} น.</span
              >
              <span
                v-if="dorm.dorm.openTime != null && dorm.dorm.closeTime == null"
                >เปิด {{ dorm.dorm.openTime }} น.</span
              >
              <span
                v-if="dorm.dorm.openTime == null && dorm.dorm.closeTime != null"
                >ปิด {{ dorm.dorm.closeTime }} น.</span
              >
            </div>
          </div>
        </div>
      </div>

      <!--bankAccount -->
      <div class="my-5 bg-white rounded-lg shadow">
        <h1 class="p-5 font-bold text-xl">ช่องทางการชำระเงิน</h1>
        <vs-table>
          <template #thead>
            <vs-tr>
              <vs-th> <p class="mx-auto">ลำดับ</p> </vs-th>
              <vs-th> <p class="mx-auto">ชื่อบัญชี</p> </vs-th>
              <vs-th> <p class="mx-auto">เลขบัญชี</p> </vs-th>
              <vs-th> <p class="mx-auto">ธนาคาร</p> </vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr v-for="(bank, id) in dorm.bankAccount" :key="id">
              <vs-td class="w-1/6">
                <p class="text-center">{{ id + 1 }}</p>
              </vs-td>
              <vs-td class="w-2/6">
                <p class="text-center">{{ bank.accountName }}</p>
              </vs-td>
              <vs-td class="w-1/6">
                <p class="text-center">{{ bank.accountNum }}</p>
              </vs-td>
              <vs-td class="w-2/6">
                <p class="text-center">{{ bank.bankId.name }}</p>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>

      <!--roomType Info-->
      <div
        class="bg-white rounded-lg mb-5 shadow-lg"
        v-for="(roomType, index) of dorm.roomType"
        :key="index"
      >
        <div class="p-0">
          <agile>
            <div
              class="slide text-black block relative h-60 md:h-[480px] lg:h-[550px]"
              v-for="(i, index) in roomTypeImg[roomType.type].img"
              :key="index"
            >
              <img :src="i" class="object-cover object-center w-full h-full" />
            </div>
            <template slot="prevButton"
              ><span class="material-icons">chevron_left</span></template
            >
            <template slot="nextButton"
              ><span class="material-icons">chevron_right</span></template
            >
          </agile>
        </div>

        <div class="p-5">
          <div class="flex flex-wrap">
            <h1 class="w-full text-xl font-bold">
              ประเภทห้องพักที่ {{ index + 1 }} : {{ roomType.type }}
            </h1>
            <div
              v-if="roomType.facility"
              class="w-full p-3 bg-ghostWhite my-3 rounded-lg shadow text-xs xl:text-sm"
            >
              &emsp;"{{ roomType.facility }}"
            </div>
            <div
              class="w-1/2 flex flex-row items-end ml-3 mt-3 text-xs font-medium md:m-0 md:p-3 md:w-1/3 xl:text-sm"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2603/2603710.png"
                class="w-5 mr-2 md:w-6 lg:w-7 xl:w-8"
              />ค่าเช่าต่อเดือน ฿ {{ roomType.price }}
            </div>
            <div
              class="w-1/2 flex flex-row items-end ml-3 mt-3 text-xs font-medium md:m-0 md:p-3 md:w-1/3 xl:text-sm"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2664/2664669.png"
                class="w-5 mr-2 md:w-6 lg:w-7 xl:w-8"
              />ค่าจองห้อง ฿ {{ roomType.deposit }}
            </div>
            <div
              class="w-1/2 flex flex-row items-end ml-3 mt-3 text-xs font-medium md:m-0 md:p-3 md:w-1/3 xl:text-sm"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/8834/8834715.png"
                class="w-5 mr-2 md:w-6 lg:w-7 xl:w-8"
              />พื้นที่ห้อง {{ roomType.area }} ตารางเมตร
            </div>
          </div>
        </div>
      </div>

      <!--room Info-->
      <div class="p-5 bg-white rounded-lg mb-5 shadow-lg">
        <h1 class="pt-2 pb-5 font-bold text-lg xl:text-xl">ห้องพักทั้งหมด</h1>
        <div>
          <!-- <vs-table>
            <template #thead>
              <vs-tr>
                <vs-th> <p class="mx-auto">ชั้น</p> </vs-th>
                <vs-th> <p class="mx-auto">เลขห้อง</p> </vs-th>
                <vs-th> <p class="mx-auto">สถานะ</p> </vs-th>
                <vs-th> <p class="mx-auto">หมายเหตุ</p> </vs-th>
                <vs-th></vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr v-for="(floor, key) in roomList" :key="key">
                <vs-td class="w-1/6">
                  <p class="text-center">{{ room.floors }}</p>
                </vs-td>
                <vs-td class="w-1/6">
                  <p class="text-center">{{ room.roomNum }}</p>
                </vs-td>
                <vs-td class="w-1/6">
                  <div v-if="room.status == 'ว่าง'" class="text-success">
                    <p class="text-center">{{ room.status }}</p>
                  </div>
                  <div v-else class="text-imperialRed">
                    <p class="text-center">{{ room.status }}</p>
                  </div>
                </vs-td>
                <vs-td class="w-1/6">
                  <div v-if="room.description">
                    <p class="text-center">{{ room.description }}</p>
                  </div>
                  <div v-else><p class="text-center">-</p></div>
                </vs-td>
                <vs-td class="w-2/6">
                  <label
                    for="my-modal-6"
                    class="btn btn-success w-full modal-button"
                    v-if="
                      room.status == 'ว่าง' &&
                      $store.state.userAccount.role == 'Customer'
                    "
                    @click="selectedRoom = room"
                    >จองห้องพัก</label
                  >
                  <label
                    class="btn btn-accent w-full"
                    v-if="room.status == 'จองแล้ว'"
                    >ไม่สามารถจองได้</label
                  >
                </vs-td>
              </vs-tr>
            </template>
            <template #footer>
          <vs-pagination v-model="page" :length="$vs.getLength(users, max)" />
        </template>
 </vs-table> -->
          <div
            v-for="(floor, key) in roomList"
            :key="key"
            class="flex flex-wrap"
          >
            <div class="w-full font-bold">ชั้น : {{ key }}</div>
            <div
              v-for="(room, index) in floor"
              :key="index"
              class="w-1/2 md:w-1/3 lg:w-1/4"
            >
              <div class="p-5 m-1 rounded bg-ghostWhite flex flex-wrap shadow">
                <p class="w-full">
                  เลขห้อง: <b>{{ room.roomNum }}</b>
                </p>
                <div class="w-full">
                  <div v-if="room.status == 'ว่าง'">
                    สถานะ: <b class="text-success">{{ room.status }}</b>
                  </div>
                  <div v-else>
                    สถานะ: <b class="text-imperialRed">{{ room.status }}</b>
                  </div>
                </div>
                <div class="w-full">
                  ประเภทห้อง: <b>{{ room.roomType }}</b>
                </div>
                <div>
                  <div
                    v-if="room.description != ''"
                    class="w-full px-2 py-3 bg-white mt-3 rounded"
                  >
                    {{ room.description }}
                  </div>
                  <div v-else class="bg-inherit hidden"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap mt-10">
        <div class="w-1/2 px-1">
          <nuxt-link
            to="/dormForm/registerDormPaymentDetail"
            class="btn btn-ghost w-full"
            >ย้อนกลับ</nuxt-link
          >
        </div>
        <div class="w-1/2 px-1">
          <button class="btn btn-primary w-full" @click="submit">ยืนยีน</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware: "permission",
  methods: {
    submit() {
      const loading = this.$vs.loading();
      this.$store
        .dispatch("addDorm")
        .then(() => {
          loading.close();
          const noti = this.$vs.notification({
            progress: "auto",
            icon: `<i class='bx bx-folder-open' ></i>`,
            color: "success",
            position: "top-right",
            title: `Data Update`,
            text: `You data is submit`,
          });
          this.$router.push({ path: "/" });
          this.$store.commit("RESET_NEWDORM");
          this.$store.dispatch("nuxtServerInit");
        })
        .catch((error) => {
          loading.close();
          const noti = this.$vs.notification({
            progress: "auto",
            icon: `<i class='bx bx-folder-open' ></i>`,
            color: "warning",
            position: "top-right",
            title: `Data Update`,
            text: `${error.response.data}, please edit it in form`,
          });
        });
    },
  },
  computed: {
    dorm() {
      return this.$store.state.newDorm;
    },
    dormImg() {
      let IMGLIST = [];
      let myDormImg = { ...this.$store.state.newDorm.dormImg };
      for (let i in myDormImg) {
        IMGLIST.push(URL.createObjectURL(myDormImg[i]));
      }
      return IMGLIST;
    },
    roomTypeImg() {
      let IMGLIST = {};
      let myroomTypeImg = { ...this.$store.state.newDorm.roomTypeImg };
      for (let key in myroomTypeImg) {
        let imgList = [];
        for (let i in Object.values(myroomTypeImg[key])) {
          imgList.push(
            URL.createObjectURL(Object.values(myroomTypeImg[key])[i])
          );
        }
        this.$set(IMGLIST, key, { img: imgList });
      }
      return IMGLIST;
    },
    roomList() {
      let rooms = {};
      let myRooms = [...this.$store.state.newDorm.room];
      for (let i in myRooms) {
        if (!rooms.hasOwnProperty(myRooms[i].floors)) {
          this.$set(rooms, myRooms[i].floors, []);
        }
        rooms[myRooms[i].floors].push(myRooms[i]);
      }
      return rooms;
    },
  },
};
</script>
