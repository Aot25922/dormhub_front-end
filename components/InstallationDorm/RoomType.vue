<template>
	<div>
		<div  class="bg-dark-blue p-3 rounded-lg mb-3">
			<h1 class="text-white text-lg ml-2 mb-2 font-bold">ประเภทห้อง</h1>
			<input type="text" class="py-4 mb-3 px-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
			placeholder="ห้องนี้สีเขียว" v-model="roomType.type" :disabled="confirmAllRoomTypes" />
            <h1 class="text-white text-lg ml-2 mb-2 font-bold">ราคาห้องพัก</h1>
			<input type="number" class="py-4 mb-3 px-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
			placeholder="ห้องนี้สีเขียว" v-model="roomType.price" :disabled="confirmAllRoomTypes"/>
			<h1 class="text-white text-lg ml-2 mb-2 font-bold">ราคาค่าเช่าห้องพัก</h1>
			<input type="number" class="py-4 mb-3 px-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
			placeholder="ห้องนี้สีเขียว" v-model="roomType.deposit" :disabled="confirmAllRoomTypes"/>
			<h1 class="text-white text-lg ml-2 mb-2 font-bold">ขนาดพื้นที่</h1>
			<input type="number" class="py-4 mb-3 px-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
			placeholder="ห้องนี้สีเขียว" v-model="roomType.area" :disabled="confirmAllRoomTypes"/>
			<h1 class="text-white text-lg ml-2 mb-2 font-bold">สิ่งอำนวยความสะดวก/บริการเสริม</h1>
			<div v-for="(item,index) in roomType.facility" :key="index">
				<h2 class="text-white text-lg ml-2 mb-2 font-bold">ชื่อ</h2>
				<input type="text" class="py-4 mb-3 px-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
			placeholder="ห้องนี้สีเขียว" v-model="roomType.facility[index].name" :disabled="confirmAllRoomTypes"/>
			    <h2 class="text-white text-lg ml-2 mb-2 font-bold">รายละเอียด</h2>
				<input type="text" class="py-4 mb-3 px-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
			placeholder="text" v-model="roomType.facility[index].description" :disabled="confirmAllRoomTypes"/>
				<button class="btn btn-neutral mt-3 ml-auto block" @click="roomType.facility.splice(index,1)" v-if="roomType.facility.length>1">ลด</button>
			</div>
			<button class="btn btn-neutral mt-3 ml-auto block" @click="roomType.facility.push({name:'',description:''})" :disabled="confirmAllRoomTypes">เพิ่ม</button>
			 <h1 class="text-white text-lg ml-2 mb-2 font-bold">ภาพประเภทห้อง</h1>
					<div class="flex justify-center">
						<div class="mb-3 w-96">
							<label for="formFileMultiple" class="label-text text-light-blue tracking-wide font-bold my-2">เลือกได้มากกว่า1รูป</label>
							<input class="mb-5 focus:outline-none form-control block w-full bg-dark-gray text-gray-soil rounded transition ease-in-out border-none" type="file" id="formFileMultiple" @change="onFileChange" multiple :disabled="confirmAllRoomTypes">
						</div>
						<img v-for="image in roomTypeImageUrl" :key="image" :src="image"/>
					</div>
			<!-- <button class="btn btn-neutral mt-3 ml-auto block" @click="addRoomTypes">ยืนยันข้อมูลประเภทห้องพัก</button> -->
            <button class="btn btn-neutral mt-3 ml-auto block" @click="removeRoomTypes" v-if="confirmAllRoomTypes == false">ยกเลิกข้อมูลประเภทห้องพัก</button>

		</div>
	</div>
</template>

<script>
export default {
  name: "RoomType",
  props:{index:Number,
  confirmAllRoomTypes:Boolean},
   watch:{
	   confirmAllRoomTypes(newValue,oldValue){
           if(newValue == true){
			   this.addRoomTypes()
		   }else{
			   this.roomType.type = ''
			   this.roomType.price =0
			   this.roomType.deposit=0
			   this.roomType.area=0
			   this.roomType.facility=[{ name: "", description: "" }]
		   }
	   }
   },
  data() {
    return {
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
		index : this.index
      });
    },
	removeRoomTypes(){
		if(this.index == 0){
			return
		}
		this.$emit("removeRoomTypes",this.index)
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