<template>
	<div class="py-3">
		<div v-if="!banking">
		<h1 class="text-cheese font-bold text-center text-xl">เพิ่มหอพัก</h1>
			<form action="" class="px-3">
				<div class="bg-dark-blue p-3 rounded-lg my-3">
					<h1 class="text-white text-lg ml-2 mb-2 font-bold">เกี่ยวกับหอพัก</h1>
					<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">ชื่อหอพัก</label>
					<input type="text" autofocus class="py-4 px-2 mb-5 w-full input input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue border-none"
					placeholder="แฮปปี้ดอร์ม" v-model="dorm.name" />
				
					<label for="" class="label-text text-light-blue tracking-wide font-bold">เวลาเปิด</label>
					<input v-model="dorm.openTime" type="time" class="p-2 mb-5 rounded text-light-blue bg-dark-gray border-none focus:outline-none focus:bg-gray-soil w-full" />
					
					<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">เวลาปิด</label>
					<input v-model="dorm.closeTime" type="time" class="p-2 mb-5 rounded text-light-blue bg-dark-gray border-none focus:outline-none focus:bg-gray-soil w-full" />
					
					<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">ค่าน้ำต่อหน่วย</label>
					<input v-model="dorm.waterPerUnit" class="py-4 px-2 mb-5 w-full input input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue border-none"
					placeholder="0.01"/>

					<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">ค่าไฟต่อหน่วย</label>
					<input v-model="dorm.elecPerUnit" class="py-4 px-2 mb-5 w-full input input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue border-none"
					placeholder="0.01"/>

					<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">ข้อมูลเพิ่มเติม</label>
					<input v-model="dorm.description" class="py-4 px-2 mb-5 w-full input input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue border-none"
					placeholder="0.01"/>

					<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">เลือกภาพปกที่ใช้แสดงบนหน้าเว็ป</label>
					<input type="file" class="mb-5 focus:outline-none form-control block w-full bg-dark-gray text-gray-soil rounded transition ease-in-out border-none" @change="onFileChange" multiple/>
					<div v-if="dormImgUrl">
					<!--เเก้ขนาดกับการวางรูป-->
					<img v-for='i in dormImgUrl' :key="i" :src='i' />
					</div>
				</div>
				<Address msg="ที่ตั้งหอพัก" @enterAddressData='addAddress'/>
			</form>
		</div>
		<div v-if="address">
		<!-- <button @click="nextPage" v-if="!banking" class="btn btn-neutral mr-3 ml-auto block">ต่อไป</button> -->
		<div v-for="(i,index) in roomType" :key="i.type" >
			<room-type  @addRoomType = 'addRoomType' @removeRoomTypes="removeRoomTypes" :index="index" :confirmAllRoomTypes="confirmAllRoomType"/>
		</div>
		<button v-if='confirmAllRoomType == false' @click='roomTypeCount++;roomType.push({type: roomTypeCount,price: 0,deposit: 0,area: 0,facility: [{ name: "", description: "" }]})' class="btn btn-neutral mr-3 ml-auto block">เพิ่มประเภทห้องพัก</button>
		<button @click='confirmAllRoomType = true' v-if='confirmAllRoomType == false'  class="btn btn-neutral mr-3 ml-auto block">ยืนยันประเภทห้องพัก</button>
		<div v-if="confirmAllRoomType">
			<room :roomType="roomType" :index='index' :confirmRoom="confirmAllRoom" v-for="(i,index) in room" :key="i.roomNum" @addNewRoom='addRoom' @cancelThisRoom ='cancelThisRoom(index)' />
			<button v-if="confirmAllRoom == false" @click="roomCount++;room.push({roomNum:roomCount,status:'',floors:'',description:'',roomType:''})" class="btn btn-neutral mr-3 ml-auto block">เพิ่มห้องพัก</button>
			<button @click="confirmAllRoom = true" v-if="confirmAllRoom == false" class="btn btn-neutral mr-3 ml-auto block bg-confirmButton">ยืนยันห้องพัก</button>
			<button  @click="confirmAllRoom = false;room=[{roomNum:1,status:'',floors:'',description:'',roomType:''}],roomCount=1" v-else class="btn btn-neutral mr-3 ml-auto block bg-cancelButton">ยกเลิกห้องพักทั้งหมด</button>
		</div>

		</div>
		<button @click="submit" class="btn btn-neutral mr-3 ml-auto block" >Submit</button>
		<!-- <BankAccount v-if="banking"/> -->
		
	</div>
</template>

<script>
import Address from '@/components/Address.vue';
import BankAccount from '~/components/InstallationDorm/BankAccount.vue';
import RoomType from '~/components/InstallationDorm/RoomType.vue';
import Room from '~/components/InstallationDorm/Room.vue';

export default {
	components: { Address, BankAccount, RoomType, Room, RoomType },
data() {
      return {
		banking: false,
		form: true,
		dormImgUrl:[],
		dorm:{
			name : '',
			openTime:null,
			closeTime:null,
			description:'',
			rating:0,
			acceptPercent:0,
			elecPerUnit: 0,
     		waterPerUnit: 0
		},
		dormInputImage:[],
		address:null,
		roomType:[ {type: 1,price: 0,deposit: 0,area: 0,facility: [{ name: "", description: "" }],}],
		roomTypeImage:[],
		roomTypeCount:1,
		roomCount:1,
		confirmAllRoom:false,
		confirmAllRoomType:false,
		room:[{roomNum:1,status:'',floors:'',description:'',roomType:''}]
      }
	},
	methods: {
		nextPage(){
			this.banking = true
			this.form = false
		},
		onFileChange(e) {
			this.dormImgUrl = []
			let files = e.target.files || e.dataTransfer.files;
			for(let i in files){
				if(typeof files[i] == 'object'){
				this.dormInputImage.push(files[i])
				this.dormImgUrl.push(URL.createObjectURL(files[i]))
				}
			}
    },
	async submit(){
		let formData = new FormData()
		let data={};
		if(this.dorm != null){
		data.dorm = this.dorm
		}
		if(this.address != null){
		data.address = this.address
		}
		if(this.roomType.length != 0 || this.roomType != null){
			data.roomType = this.roomType
			if(this.roomTypeImage.length != 0){
				for(let i in this.roomTypeImage){
				for (const [key, value] of Object.entries(this.roomTypeImage[i])) {
  					 for(let j in value){
						   formData.append(`dorm_roomType_${key}`,value[j],'test.jpg')
					   }
					}
				}
			}
		}
		if(this.room.length != 0 || this.room != null){
			data.room = this.room
		}
		if(this.dormInputImage.length != 0 ){
            for(let i in this.dormInputImage){
			formData.append(`dorm_${this.dorm.name}`,this.dormInputImage[i],'test.jpg')
			}
		}
		formData.append('data',JSON.stringify(data))
		for(var pair of formData.entries()) {
   			console.log(pair[0]+ ': '+ pair[1]);
		}

		try{
          postData = await this.$axios.$post(`${this.$store.state.Backend_URL}/dorm/register`,formData)
         }catch (err) {
            console.log(err)
          }

	},
	addAddress(value){
      this.address = value
	  console.log(this.address)
	},
	addRoomType({roomType,roomTypeImage,index}){
		console.log( roomType.type)
		for(let i in this.roomType){
			if(this.roomType[i].type == roomType.type){
				return
			}
		}
		this.roomType[index] = roomType
		let imageRoomTypeformDataName = roomType.type
		this.roomTypeImage.push({[imageRoomTypeformDataName] : roomTypeImage})
		console.log(this.roomType)
		console.log(this.roomTypeImage)
	},
	removeRoomTypes(value){
      this.roomType.splice(value,1)
	},
	addRoom(value){
	  this.room[value.index] = value.room
	  console.log(this.room)
	},
	cancelThisRoom(index){
		if(index == 0){
			return
		}
      this.room.splice(index,1)
	},
	validateDorm(){
	  return this.dorm.name != '' && this.dorm.openTime != null && this.dorm.closeTime && this.dorm.elecPerUnit > 0 && this.dorm.waterPerUnit > 0 && this.dormImgUrl.length>0 ? true : false
	}
	},
	computed :{
		allowToSubmit(){	
			return this.validateDorm()  ? true : false
		}
	}
}
</script>