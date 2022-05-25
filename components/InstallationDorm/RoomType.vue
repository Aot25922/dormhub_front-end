<template>
	<div class="px-3 md:px-20 lg:px-[335px]">
		<div  class="bg-dark-blue p-3 rounded-lg mb-3">
			<h1 class="text-white text-lg ml-2 mb-2 font-bold">ประเภทห้อง</h1>	
			<label class="label-text text-light-blue tracking-wide font-bold my-2">ชื่อประเภทห้อง <span class="text-cancelButton">*</span></label>
			<input type="text" class="p-2 mb-5 rounded text-light-blue bg-dark-gray border-none focus:outline-none focus:bg-gray- input input-sm w-full"
			placeholder="ห้องนี้สีเขียว" v-model="roomType.type" :disabled="confirmAllRoomTypes" @blur="validateForm" />
			<p class="text-error text-right mt-2" v-if="validateType">กรุณาใส่ชื่อประเภทห้อง</p>
            
			<label class="label-text text-light-blue tracking-wide font-bold my-2">ราคาห้องพัก <span class="text-cancelButton">*</span></label>
			<input type="number" class="p-2 mb-5 rounded text-light-blue bg-dark-gray border-none focus:outline-none focus:bg-gray- input input-sm w-full"
			placeholder="200" v-model="roomType.price" :disabled="confirmAllRoomTypes" min="1" max="100000" @blur="validateForm" />
			<p class="text-error text-right mt-2" v-if="validatePrice">ราคาได้ตั้งแต่ 1-100000</p>
			
			<label class="label-text text-light-blue tracking-wide font-bold my-2">ราคาค่าเช่าห้องพัก <span class="text-cancelButton">*</span></label>
			<input type="number" class="p-2 mb-5 rounded text-light-blue bg-dark-gray border-none focus:outline-none focus:bg-gray- input input-sm w-full"
			placeholder="200" v-model="roomType.deposit" :disabled="confirmAllRoomTypes" min="1" max="100000" @blur="validateForm"/>
			<p class="text-error text-right mt-2" v-if="validateDeposit">ราคาได้ตั้งแต่ 1-100000</p>
			
			<label class="label-text text-light-blue tracking-wide font-bold my-2">ขนาดพื้นที่ (ตารางเมตร) <span class="text-cancelButton">*</span></label>
			<input type="number" class="p-2 mb-5 rounded text-light-blue bg-dark-gray border-none focus:outline-none focus:bg-gray- input input-sm w-full"
			placeholder="999.99" min="1" max="999.99" v-model="roomType.area" :disabled="confirmAllRoomTypes" @blur="validateForm" />
			<p class=" text-error text-right mt-2" v-if="validateArea">พื้นที่ได้ตั้งแต่ 1-999.99</p>
			<h1 class="text-white text-lg ml-2 mb-2 font-bold">ภาพประเภทห้อง</h1>
					<div class="">
						<div class="mb-3 w-full">
							<label for="formFileMultiple" class="label-text text-light-blue tracking-wide font-bold my-2">เลือกได้มากกว่า1รูป <span class="text-cancelButton">*</span></label>
							<input class="mb-5 focus:outline-none form-control block w-full bg-dark-gray text-gray-soil input input-sm rounded transition ease-in-out border-none" type="file" id="formFileMultiple" @change="onFileChange" multiple :disabled="confirmAllRoomTypes" >
						</div>
						<p class="text-error text-right mt-2" v-if="validateFile">ต้องมีอย่างน้อย1ภาพ</p>
						<div class="md:grid md:grid-cols-2 lg:grid lg:grid-cols-4">
							<img v-for="image in roomTypeImageUrl" :key="image" :src="image" class="py-2 md:p-2" />
						</div>
					</div>
			<h1 class="text-white text-lg ml-2 mb-2 font-bold">สิ่งอำนวยความสะดวก/บริการเสริม</h1>
			<div v-for="(item,index) in roomType.facility" :key="index" class="relative">
				<h2 class="label-text text-light-blue tracking-wide font-bold my-2">ชื่อ <span class="text-cancelButton">*</span></h2>
				<input type="text" class="p-2 mb-5 rounded text-light-blue bg-dark-gray border-none focus:outline-none focus:bg-gray- input input-sm w-full"
			placeholder="ห้องนี้สีเขียว" v-model="roomType.facility[index].name" :disabled="confirmAllRoomTypes" @blur="validateForm" />
			<p class="text-error text-right mt-2" v-if="validateFacility">กรุณาใส่ชื่อสิ่งอำนวยความสะดวก</p>
			    <h2 class="label-text text-light-blue tracking-wide font-bold my-2">รายละเอียด</h2>
				<input type="text" class="p-2 mb-5 rounded text-light-blue bg-dark-gray border-none focus:outline-none focus:bg-gray- input input-sm w-full"
			placeholder="คำอธิบายเพิ่มเติม" v-model="roomType.facility[index].description" :disabled="confirmAllRoomTypes" />
				<button class="btn btn-ghost text-cancelButton absolute -top-4 -right-5" @click="roomType.facility.splice(index,1)" v-if="roomType.facility.length>1 && confirmAllRoomTypes == false"><p class="material-icons" :disabled="confirmAllRoomTypes" >remove_circle</p></button>
				<hr class="py-2 text-gray-soil" />
			</div>
			<div class="grid grid-cols-2">
				<button class="btn btn-neutral mx-auto block" @click="roomType.facility.push({name:'',description:''})" v-if="confirmAllRoomTypes == false">เพิ่มสิ่งอำนวยความสะดวก</button>
				<button class="btn btn-neutral mx-auto block" @click="removeRoomTypes" v-if="confirmAllRoomTypes == false && index!=0">ยกเลิกข้อมูลประเภทห้องพัก</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: "RoomType",
  props:{index:Number, confirmAllRoomTypes:Boolean},
   watch:{
	   confirmAllRoomTypes(newValue,oldValue){
           if(newValue == true){
			   this.addRoomTypes()
		   }else{
			   this.roomType.type = ''
			   this.roomType.price = null
			   this.roomType.deposit= null
			   this.roomType.area= null
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
	  confirmThisroomType:false,
	  validateType:false,
	  validatePrice:false,
	  validateDeposit:false,
      validateArea:false,
	  validateFacility:false,
	  validateFile:false,
      roomTypeInputImage: [],
      roomTypeImageUrl: [],
    };
  },
  methods: {
    addRoomTypes() {
		if(this.roomType.type == ''){
			return
		}
		this.validateForm()
		if(this.validateType == false && this.validatePrice == false && this.validateDeposit == false && this.validateArea == false && this.validateFacility == false){
      this.$emit("addRoomType", {
        roomType: this.roomType,
        roomTypeImage: this.roomTypeInputImage,
		index : this.index
      });
		}
    },
	removeRoomTypes(){
		if(this.index == 0){
			return
		}
		this.$emit('validateroomTypeForm',true)
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
	  this.validateForm()
    },
	validateForm(){
       this.validateType = this.roomType.type == '' ? true : false
	   this.validatePrice = this.roomType.price <=0 ? true : false
	   this.validateDeposit = this.roomType.deposit <= 0 ? true : false
	   this.validateArea = this.roomType.area <= 0 ? true : false
	   this.validateFacility = this.roomType.facility[0].name == '' ? true : false
	   this.validateFile = this.roomTypeInputImage.length == 0 ? true : false
	   if(this.validateType == false && this.validatePrice == false && this.validateDeposit == false && this.validateArea == false && this.validateFacility == false){
	   this.$emit('validateroomTypeForm',true)
	   }else{
		this.$emit('validateroomTypeForm',false)
	   }
	}
  },
};
</script>