<template>
  <div class="center pt-24 flex flex-col">
    <div class="flex-grow md:h-[calc(100vh-5rem-13rem)]">
      <vs-table class="overflow-x-auto flex flex-col h-full justify-between">
        <template #thead class="flex justify-center">
          <vs-tr>
            <vs-th> <p class="text-sm md:text-base lg:text-md">ชื่อหอพัก</p> </vs-th>
            <vs-th> <p class="text-sm md:text-base lg:text-md">ประเภทห้อง</p> </vs-th>
            <vs-th> <p class="text-sm md:text-base lg:text-md">ราคา</p> </vs-th>
            <vs-th> <p class="text-sm md:text-base lg:text-md">เลขห้อง</p> </vs-th>
            <vs-th> <p class="text-sm md:text-base lg:text-md">ภาพสลิป</p> </vs-th>
            <vs-th> <p class="text-sm md:text-base lg:text-md">วันที่เริ่มการเข้าพัก</p> </vs-th>
            <vs-th> <p class="text-sm md:text-base lg:text-md">วันที่สิ้นสุดการเข้าพัก</p> </vs-th>
            <vs-th v-if="$store.state.userAccount.role == 'Owner'">
              <p class="text-sm md:text-base lg:text-md">ผู้จอง</p>
            </vs-th>
            <vs-th> <p class="text-sm md:text-base lg:text-md">สถานะ</p> </vs-th>
          </vs-tr>
        </template>
        <template #tbody v-if="bookingList">
          <vs-tr
            :key="i"
            v-for="(tr, i) in $vs.getPage(bookingList, page, max)"
            :data="tr"
          >
            <vs-td>
              <p class="text-sm md:text-base lg:text-md">{{ tr.room.roomType.dorms[0].name }}</p>
            </vs-td>
            <vs-td>
              <p class="text-sm md:text-base lg:text-md">{{ tr.room.roomType.type }}</p>
            </vs-td>
            <vs-td>
              <p class="text-sm md:text-base lg:text-md">{{ tr.room.roomType.dorms[0].dormHasRoomType.price }}</p>
            </vs-td>
            <vs-td>
              <p class="text-sm md:text-base lg:text-md">{{ tr.room.roomNum }}</p>
            </vs-td>
            <vs-td>
              <div
                v-if="
                  tr.status == 'รอการโอน' && tr.bookingId == chosenBookingId
                "
              >
                <img
                  @click="watchImage = true"
                  :src="slipImgUrl"
                  class="object-cover object-center w-full h-full cursor-pointer"
                />
                <vs-dialog
                  not-close
                  auto-width
                  not-padding
                  v-model="watchImage"
                >
                  <div class="con-image">
                    <img :src="slipImgUrl" alt="" />
                  </div>
                </vs-dialog>
              </div>
              <div v-else-if="tr.moneySlip">
                <img
                  @click="watchImage = true"
                  :src="
                    $store.state.Backend_URL + '/booking/image/' + tr.bookingId
                  "
                  class="object-cover object-center w-full h-full cursor-pointer"
                />
                <vs-dialog
                  not-close
                  auto-width
                  not-padding
                  v-model="watchImage"
                >
                  <div class="con-image">
                    <img
                      :src="
                        $store.state.Backend_URL +
                        '/booking/image/' +
                        tr.bookingId
                      "
                      alt=""
                    />
                  </div>
                </vs-dialog>
              </div>
              <div v-else>
                <div
                  v-if="tr.status == 'รอการยืนยัน'"
                  class="font-medium text-warning text-sm md:text-base lg:text-md"
                >
                  {{ tr.status }}
                </div>
                <div
                  v-if="tr.status == 'รอการโอน'"
                  class="font-medium text-info text-sm md:text-base lg:text-md"
                >
                  {{ tr.status }}
                </div>
                <div
                  v-if="tr.status == 'ยกเลิก'"
                  class="font-medium text-error text-sm md:text-base lg:text-md"
                >
                  {{ tr.status }}
                </div>
              </div>
            </vs-td>
            <vs-td>
              <p class="text-sm md:text-base lg:text-md">{{ tr.startDate }}</p>
            </vs-td>
            <vs-td>
              <p class="text-sm md:text-base lg:text-md">{{ tr.endDate }}</p>
            </vs-td>
            <vs-td
              v-if="$store.state.userAccount.role == 'Owner'"
              class="flex flex-col"
            >
              <div class="flex justify-start items-center break-words">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3934/3934228.png"
                  class="w-2 mr-1 md:w-3 lg:w-4"
                />
                <p class="text-sm md:text-base lg:text-md">{{ tr.userAccount.fname }} {{ tr.userAccount.lname }}</p>
              </div>
              <div class="flex justify-start items-center py-3 break-words">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/726/726623.png"
                  class="w-2 mr-1 md:w-3 lg:w-4"
                /><p class="text-sm md:text-base lg:text-md">{{ tr.userAccount.email }}</p>
              </div>
              <div class="flex justify-start items-center break-words">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3014/3014736.png"
                  class="w-2 mr-1 md:w-3 lg:w-4"
                /><p class="text-sm md:text-base lg:text-md">{{ tr.userAccount.phone }}</p>
              </div>
            </vs-td>

            <!-- Status&Slip Customer -->
            <vs-td v-if="$store.state.userAccount.role == 'Customer'">
              <div
                v-if="tr.status == 'รอการโอน' || tr.status == 'ยืนยันการโอน'"
              >
                <div class="pt-5">
                  <label
                    :for="tr.bookingId"
                    class="flex flex-col justify-center items-center w-full rounded-lg border-2 border-gray-300 border-dashed cursor-pointer"
                  >
                    <div
                      class="flex flex-col justify-center items-center pt-5 pb-6 px-2"
                    >
                      <span class="material-symbols-outlined text-gray-400">
                        file_upload
                      </span>
                      <p class="mb-2 text-sm text-gray-400">
                        <span class="font-semibold">กดเพื่ออัพโหลดภาพ</span> หรือ
                        ลากและวาง
                      </p>
                      <p class="text-xs text-gray-400">
                        SVG, PNG, JPG หรือ GIF
                      </p>
                    </div>
                    <input :id="tr.bookingId" type="file" class="hidden" @change="onFileChange($event, tr)" />
                  </label>
                </div>
              </div>
              <div
                class="flex items-center"
                v-else-if="tr.status == 'รอการยืนยัน'"
              >
                <div class="font-medium text-warning text-sm md:text-base lg:text-md">{{ tr.status }}</div>
                <!-- Cancel Button Modal -->
                <div class="px-5">
                  <button
                    @click="active = !active"
                    class="btn btn-accent btn-sm btn-circle"
                  >
                    <span class="material-symbols-outlined"> close </span>
                  </button>
                  <vs-dialog class="font-Kanit" width="550px" v-model="active">
                    <div class="con-content">
                      <div>
                        คูณแน่ใจว่าต้องการที่จะ<b class="underline-offset-auto"
                          >ยกเลิกการจองห้อง?</b
                        >
                      </div>
                      <div class="pt-5 flex flex-wrap">
                        <div class="w-1/2 p-1">
                          <button
                            @click="
                              updateStatus(tr, 'ยกเลิก');
                              active = false;
                            "
                            class="btn btn-success w-full"
                          >
                            ยืนยัน
                          </button>
                        </div>
                        <div class="w-1/2 p-1">
                          <button
                            @click="active = false"
                            class="btn btn-accent w-full"
                          >
                            ยกเลิก
                          </button>
                        </div>
                      </div>
                    </div>
                  </vs-dialog>
                </div>
              </div>
              <p v-else class="text-imperialRed font-medium text-sm md:text-base lg:text-md">{{ tr.status }}</p>
            </vs-td>

            <!-- Status Owner -->
            <vs-td v-if="$store.state.userAccount.role == 'Owner'">
              <!-- Pop-up Button  -->
              <div v-if="tr.status == 'รอการยืนยัน'">
                <button @click="active = !active" class="ml-2 btn btn-warning btn-circle btn-sm"
                  ><span class="material-symbols-outlined">
                    priority_high
                  </span></button
                >
                <vs-dialog class="font-Kanit" not-center v-model="active">
                  <template #header>
                    <h4 class="font-bold">เลือกสถานะการจอง</h4>
                  </template>
                  <div class="con-content">
                    <div class="flex flex-wrap">
                      <div class="w-full">
                        เปลี่ยนสถานะ
                        <span class="font-medium">"รอการยืนยัน"</span> ของ
                        <b
                          >{{ tr.userAccount.fname }}
                          {{ tr.userAccount.lname }}</b
                        >
                        เป็นยืนยันเพื่อ
                        <span class="font-medium">"รอการโอน"</span> ใช่หรือไม่?
                        <p class="text-center py-5">
                          *หากกดยกเลิกจะเป็นการ<b class="text-imperialRed"
                            >ยกเลิกการจอง</b
                          >ทันที*
                        </p>
                      </div>
                      <div class="p-1 pt-3 w-2/3">
                        <button
                          class="btn btn-success w-full"
                          @click="
                            updateStatus(tr, 'รอการโอน');
                            active = false;
                          "
                        >
                          ยืนยัน
                        </button>
                      </div>
                      <div class="p-1 pt-3 w-1/3">
                        <button
                          class="btn btn-accent w-full"
                          @click="
                            updateStatus(tr, 'ยกเลิก');
                            active = false;
                          "
                        >
                          ยกเลิกการจอง
                        </button>
                      </div>
                    </div>
                  </div>
                </vs-dialog>
              </div>

              <div
                v-else-if="
                  tr.status == 'ยืนยันการโอน' || tr.status == 'รอการโอน'
                "
              >
                <div
                  v-if="tr.status == 'รอการโอน'"
                  class="font-medium text-info text-sm md:text-base lg:text-md"
                >
                  {{ tr.status }}
                </div>
                <div
                  v-if="tr.status == 'ยืนยันการโอน'"
                  class="font-medium text-success text-sm md:text-base lg:text-md"
                >
                  {{ tr.status }}
                </div>
              </div>
              <div
                v-else-if="tr.status == 'ยกเลิก'"
                class="font-medium text-imperialRed text-sm md:text-base lg:text-md"
              >
                ยกเลิกการจองเเล้ว
              </div>
              <button
                v-else
                class="btn btn-accent"
                @click="updateStatus(tr, 'ยกเลิก')"
              >
                ยกเลิกการจอง
              </button>
            </vs-td>
          </vs-tr>
        </template>
        <template #notFound>
          <tr class="md:max-h-screen py-5 flex items-center justify-center">
            <ContentEmptyItem msg="ยังไม่มีการจอง" imgSize="xl:w-1/2" />
          </tr>
        </template>
        <template #footer>
          <vs-pagination
            v-if="bookingList"
            v-model="page"
            :length="$vs.getLength(bookingList, max)"
          />
        </template>
      </vs-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      max: 5,
      bookingList: null,
      slipImgUrl: null,
      chosenBookingId: null,
      active: false,
      watchImage: false,
    };
  },
  methods: {
	async getBooking () {
		try {
      if (this.$store.state.userAccount.role == "Customer") {
        this.bookingList = await this.$axios.$get(
          `${this.$store.state.Backend_URL}/booking`,
          {
            withCredentials: true,
          }
        );
        for (let i in this.bookingList) {
        }
      } else if (this.$store.state.userAccount.role == "Owner") {
        this.bookingList = await this.$axios.$get(
          `${this.$store.state.Backend_URL}/booking/owner`,
          {
            withCredentials: true,
          }
        );
      } else {
        this.$router.push({ path: "/" });
      }
    } catch (err) {
      console.log(err);
    }
  },
    async updateStatus(booking, status) {
      booking.status = status;
      const loading = this.$vs.loading();
      let formData = new FormData();
      const data = {
        status: status,
        bookingId: booking.bookingId,
        roomId: booking.roomId,
        roomTypeId: booking.room.roomTypeId,
        dormId: booking.room.dormId,
      };
      formData.append("data", JSON.stringify(data));
      try {
        if (this.$store.state.userAccount.role == "Owner") {
          await this.$axios.$put(
            `${this.$store.state.Backend_URL}/booking/owner/update`,
            formData,
            {
              withCredentials: true,
            }
          );
        } else if (this.$store.state.userAccount.role == "Customer") {
          await this.$axios.$put(
            `${this.$store.state.Backend_URL}/booking/update`,
            formData,
            {
              withCredentials: true,
            }
          );
        }
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "success",
          position: "top-right",
          title: `Data Update`,
          text: `Update status complete!`,
        });
        loading.close();
      } catch (error) {
        loading.close();
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "warn",
          position: "top-right",
          title: `Data Update`,
          text: error.response.data.error.message,
        });
      }
    },
    async onFileChange(e, booking) {
      const loading = this.$vs.loading();
      let formData = new FormData();
      let files = e.target.files || e.dataTransfer.files;
      this.chosenBookingId = booking.bookingId;
      this.slipImgUrl = URL.createObjectURL(files[0]);
      const data = {
        status: "ยืนยันการโอน",
        bookingId: booking.bookingId,
        roomId: booking.roomId,
      };
      formData.append("data", JSON.stringify(data));
      formData.append("moneySlip", files[0]);
      try {
        await this.$axios.$put(
          `${this.$store.state.Backend_URL}/booking/update`,
          formData,
          {
            withCredentials: true,
          }
        );
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "success",
          position: "top-right",
          title: `Data Update`,
          text: `Update status complete!`,
        });
		await this.getBooking();
        loading.close();
      } catch (error) {
        loading.close();
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "warn",
          position: "top-right",
          title: `Data Update`,
          text: error.response.data.error.message,
        });
      }
    },
  },
  created() {
    this.getBooking()
  },
};
</script>

