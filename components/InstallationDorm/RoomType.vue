<template>
	<div>
		<div  class="bg-dark-blue p-3 rounded-lg mb-3">
			<h1 class="text-white text-lg ml-2 mb-2 font-bold">ประเภทห้อง</h1>
			<label class="label-text text-light-blue tracking-wide font-bold my-2">ประเภทห้อง</label>
			<input type="text" class="p-2 mb-5 rounded text-light-blue bg-dark-gray border-none focus:outline-none focus:bg-gray- input input-sm w-full"
			placeholder="ห้องนี้สีเขียว" v-model="roomType.type" />
            <label class="label-text text-light-blue tracking-wide font-bold my-2">ราคาห้องพัก</label>
			<input type="number" class="p-2 mb-5 rounded text-light-blue bg-dark-gray border-none focus:outline-none focus:bg-gray- input input-sm w-full"
			placeholder="200" v-model="roomType.price"/>
			<label class="label-text text-light-blue tracking-wide font-bold my-2">ราคาค่าเช่าห้องพัก</label>
			<input type="number" class="p-2 mb-5 rounded text-light-blue bg-dark-gray border-none focus:outline-none focus:bg-gray- input input-sm w-full"
			placeholder="200" v-model="roomType.deposit"/>
			<label class="label-text text-light-blue tracking-wide font-bold my-2">ขนาดพื้นที่ (ตารางเมตร)</label>
			<input type="number" class="p-2 mb-5 rounded text-light-blue bg-dark-gray border-none focus:outline-none focus:bg-gray- input input-sm w-full"
			placeholder="999.99" min="1" max="999" v-model="roomType.area"/>
			<h1 class="text-white text-lg ml-2 mb-2 font-bold">ภาพประเภทห้อง</h1>
					<div class="">
						<div class="mb-3 w-full">
							<label for="formFileMultiple" class="label-text text-light-blue tracking-wide font-bold my-2">เลือกได้มากกว่า1รูป</label>
							<input class="mb-5 focus:outline-none form-control block w-full bg-dark-gray text-gray-soil input input-sm rounded transition ease-in-out border-none" type="file" id="formFileMultiple" @change="onFileChange" multiple>
						</div>
						<img v-for="image in roomTypeImageUrl" :key="image" :src="image" class="py-2" />
					</div>
			<h1 class="text-white text-lg ml-2 mb-2 font-bold">สิ่งอำนวยความสะดวก/บริการเสริม</h1>
			<div v-for="(item,index) in roomType.facility" :key="index" class="relative">
				<h2 class="label-text text-light-blue tracking-wide font-bold my-2">ชื่อ</h2>
				<input type="text" class="p-2 mb-5 rounded text-light-blue bg-dark-gray border-none focus:outline-none focus:bg-gray- input input-sm w-full"
			placeholder="ห้องนี้สีเขียว" v-model="roomType.facility[index].name" />
			    <h2 class="label-text text-light-blue tracking-wide font-bold my-2">รายละเอียด</h2>
				<input type="text" class="p-2 mb-5 rounded text-light-blue bg-dark-gray border-none focus:outline-none focus:bg-gray- input input-sm w-full"
			placeholder="คำอธิบายเพิ่มเติม" v-model="roomType.facility[index].description" />
				<button class="btn btn-ghost text-cancelButton absolute -top-4 -right-5" @click="roomType.facility.splice(index,1)" v-if="roomType.facility.length>1"><span class="material-icons">remove_circle</span></button>
				<hr class="py-2 text-gray-soil" />
			</div>
			<div class="grid grid-cols-2">
				<button class="btn btn-neutral mr-auto block" @click="roomType.facility.push({name:'',description:''})">เพิ่มสิ่งอำนวยความสะดวก</button> 
				<button class="btn btn-neutral ml-auto block" @click="addRoomTypes">ยืนยันข้อมูล</button>
			</div>
			<!-- RoomtypeList Here -->
		</div>
	</div>
</template>

<script>
export default {
  name: "RoomType",
  data() {
    return {
      roomType: {
        type: "",
        price: null,
        deposit: null,
        area: null,
        facility: [{ name: "", description: "" }],
      },
      roomTypeInputImage: [],
      roomTypeImageUrl: [],
    };
  },
  methods: {
    addRoomTypes() {
		if(this.roomType.type == ''){
			return
		}
      this.$emit("addRoomType", {
        roomType: this.roomType,
        roomTypeImage: this.roomTypeInputImage,
      });
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      for (let i in files) {
        if (typeof files[i] == "object") {
          this.roomTypeInputImage.push(files[i]);
          this.roomTypeImageUrl.push(URL.createObjectURL(files[i]));
        }
      }
    },
  },
};
</script>