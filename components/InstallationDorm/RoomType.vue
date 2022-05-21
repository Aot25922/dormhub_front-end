<template>
	<div>
		<div  class="bg-dark-blue p-3 rounded-lg mb-3">
			<h1 class="text-white text-lg ml-2 mb-2 font-bold">ประเภทห้อง</h1>
			<input type="text" class="py-4 mb-3 px-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
			placeholder="ห้องนี้สีเขียว" v-model="roomType.type" />
            <h1 class="text-white text-lg ml-2 mb-2 font-bold">ราคาห้องพัก</h1>
			<input type="number" class="py-4 mb-3 px-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
			placeholder="ห้องนี้สีเขียว" v-model="roomType.price"/>
			<h1 class="text-white text-lg ml-2 mb-2 font-bold">ราคาค่าเช่าห้องพัก</h1>
			<input type="number" class="py-4 mb-3 px-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
			placeholder="ห้องนี้สีเขียว" v-model="roomType.deposit"/>
			<h1 class="text-white text-lg ml-2 mb-2 font-bold">ขนาดพื้นที่</h1>
			<input type="number" class="py-4 mb-3 px-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
			placeholder="ห้องนี้สีเขียว" v-model="roomType.area"/>
			<h1 class="text-white text-lg ml-2 mb-2 font-bold">สิ่งอำนวยความสะดวก/บริการเสริม</h1>
			<div v-for="(item,index) in roomType.facility" :key="index">
				<h2 class="text-white text-lg ml-2 mb-2 font-bold">ชื่อ</h2>
				<input type="text" class="py-4 mb-3 px-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
			placeholder="ห้องนี้สีเขียว" v-model="roomType.facility[index].name" />
			    <h2 class="text-white text-lg ml-2 mb-2 font-bold">รายละเอียด</h2>
				<input type="number" class="py-4 mb-3 px-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
			placeholder="text" v-model="roomType.facility[index].description" />
				<button class="btn btn-neutral mt-3 ml-auto block" @click="roomType.facility.splice(index,1)" v-if="roomType.facility.length>1">ลด</button>
			</div>
			<button class="btn btn-neutral mt-3 ml-auto block" @click="roomType.facility.push({name:'',description:''})">เพิ่ม</button>
			 <h1 class="text-white text-lg ml-2 mb-2 font-bold">ภาพประเภทห้อง</h1>
					<div class="flex justify-center">
						<div class="mb-3 w-96">
							<label for="formFileMultiple" class="label-text text-light-blue tracking-wide font-bold my-2">เลือกได้มากกว่า1รูป</label>
							<input class="mb-5 focus:outline-none form-control block w-full bg-dark-gray text-gray-soil rounded transition ease-in-out border-none" type="file" id="formFileMultiple" @change="onFileChange" multiple>
						</div>
						<img v-for="image in roomTypeImageUrl" :key="image" :src="image"/>
					</div>

			<!-- <div class="center con-checkbox text-light-blue">
				<vs-checkbox warn val="html" v-model="options">
					Html
				</vs-checkbox>
				<vs-checkbox warn val="css" v-model="options">
					Css
				</vs-checkbox>
				<vs-checkbox warn val="javascript" v-model="options">
					Javascript
				</vs-checkbox>
				<vs-checkbox warn val="vue" v-model="options">
					Vue
				</vs-checkbox>
				<vs-checkbox warn val="vuesax" v-model="options">
					Vuesax
				</vs-checkbox>
				<textarea class="resize-y p-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue border-none"
				placeholder="กรณีติ๊กอื่น ๆ"/> -->
			<!-- </div> -->
			<button class="btn btn-neutral mt-3 ml-auto block" @click="addRoomTypes">ยืนยันข้อมูล</button>

			<!-- RoomtypeList Here -->
		</div>
	</div>
</template>

<script>
export default {
  name: "RoomType",
  data() {
    return {
      // option: [
      // 	'javascript', 'css', 'html', 'vue', 'vuesax'
      // ],
      // options:null,
      roomType: {
        type: "",
        price: 0,
        deposit: 0,
        area: 0,
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