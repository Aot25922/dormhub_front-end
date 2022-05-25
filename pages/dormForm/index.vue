<template>
	<div class="py-3">
		<div v-if="!banking">
		<h1 class="text-cheese font-bold text-center text-xl">เพิ่มหอพัก</h1>
			<form action="" class="px-3">
				<div class="bg-dark-blue p-3 rounded-lg my-3">
					<h1 class="text-white text-lg ml-2 mb-2 font-bold">เกี่ยวกับหอพัก</h1>
					<div class="mb-2">
						<label class="label-text text-light-blue tracking-wide font-bold my-2">ชื่อหอพัก <span class="text-cancelButton">*</span></label>
						<input type="text" autofocus class="py-4 px-2 w-full input input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue border-none"
						placeholder="แฮปปี้ดอร์ม" v-model="dorm.name" />
						<p v-if="!validateName" class="text-error text-right mt-2">กรุณาใส่ชื่อหอพัก</p>
					</div>
					<div class="mb-5">
						<label class="label-text text-light-blue tracking-wide font-bold">เวลาเปิด</label>
						<input type="text" class="py-4 px-2 w-full input input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue border-none"
						placeholder="06.00" v-model="dorm.openTime" />
					</div>
					<div class="mb-5">
						<label class="label-text text-light-blue tracking-wide font-bold my-2">เวลาปิด</label>
						<input  type="text" class="py-4 px-2 w-full input input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue border-none"
						placeholder="22.00" v-model="dorm.closeTime" />
					</div>
					<div class="mb-2">
						<label class="label-text text-light-blue tracking-wide font-bold my-2">ค่าน้ำต่อหน่วย <span class="text-cancelButton">*</span></label>
						<input type="number" step="0.01" v-model="dorm.waterPerUnit" class="py-4 px-2 w-full input input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue border-none" 
						placeholder="0.01 - 9.99" />
						<p v-if="!validateWater" class="text-error text-right mt-2">ใส่ค่าได้ตั้งแต่ 0.01 - 9.99</p>
					</div>
					<div class="mb-2">
						<label class="label-text text-light-blue tracking-wide font-bold my-2">ค่าไฟต่อหน่วย <span class="text-cancelButton">*</span></label>
						<input type="number" step="0.01" v-model="dorm.elecPerUnit" class="py-4 px-2 w-full input input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue border-none" 
						placeholder="0.01 - 9.99" />
						<p v-if="!validateElec" class="text-error text-right mt-2">ใส่ค่าได้ตั้งแต่ 0.01 - 9.99</p>
					</div>
					<div class="mb-5">
						<label class="label-text text-light-blue tracking-wide font-bold my-2">ข้อมูลเพิ่มเติม</label>
						<textarea v-model="dorm.description" class="h-[80px] p-2 w-full input input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue border-none"
						placeholder="คำอธิบายเพิ่มเติม"/>
					</div>
					<div class="mb-5">
						<label class="label-text text-light-blue tracking-wide font-bold my-2">เลือกภาพปกที่ใช้แสดงบนหน้าเว็ป <span class="text-cancelButton">*</span></label>
						<input type="file" class="focus:outline-none form-control block w-full bg-dark-gray text-gray-soil rounded transition ease-in-out border-none" @change="onFileChange" multiple/>
						<div v-if="dormImgUrl">
						<img v-for='i in dormImgUrl' :key="i" :src='i' class="py-2" />
						</div>
						<p v-if="!validateDormImg" class="text-error text-right mt-2">ต้องมีอย่างน้อย 1 ภาพ</p>
					</div>
				</div>
				<Address msg="ที่ตั้งหอพัก" @enterAddressData='addAddress'/>
			</form>
		</div>
		<div v-if="address">
		<!-- <button @click="nextPage" v-if="!banking" class="btn btn-neutral mr-3 ml-auto block">ต่อไป</button> -->
		<div v-for="(i,index) in roomType" :key="i.type" >
			<room-type  @addRoomType = 'addRoomType' @removeRoomTypes="removeRoomTypes" :index="index" :confirmAllRoomTypes="confirmAllRoomType" @validateroomTypeForm="validateroomType"/>
		</div>
		<button v-if='confirmAllRoomType == false' @click='roomTypeCount++;roomType.push({type: `dummy${roomTypeCount}`,price: 0,deposit: 0,area: 0,facility: [{ name: "", description: "" }]})' class="btn btn-neutral mr-3 ml-auto block">เพิ่มประเภทห้องพัก</button>
		<button @click='confirmAllRoomType = true;validateroomTypeSubmit=true' v-if='confirmAllRoomType == false && checkforroomType '  class="btn btn-neutral mr-3 ml-auto block" >ยืนยันประเภทห้องพัก</button>
		<div v-if="confirmAllRoomType">
			<div v-for="(i,index) in room" :key="i.roomNum">
				<room :roomType="roomType" :index='index' :confirmRoom="confirmAllRoom"  @addNewRoom='addRoom' @cancelThisRoom ='cancelThisRoom(index)' @validateRoom='validateRoom' />
			</div>
			<button v-if="confirmAllRoom == false" @click="roomCount++;room.push({roomNum:`dummy${roomCount}`,status:'',floors:'',description:'',roomType:''})" class="btn btn-neutral mr-3 ml-auto block">เพิ่มห้องพัก</button>
			<button @click="confirmAllRoom = true;validateRoomSubmit = true" v-if="confirmAllRoom == false && checkforRoom" class="btn btn-neutral mr-3 ml-auto block bg-confirmButton">ยืนยันห้องพัก</button>
			<button  @click="confirmAllRoom = false;room=[{roomNum:'dummy1',status:'',floors:'',description:'',roomType:''}];roomCount=1;validateRoomSubmit = false" v-else class="btn btn-neutral mr-3 ml-auto block bg-cancelButton">ยกเลิกห้องพักทั้งหมด</button>
		</div>
		</div>
		<button @click="submit" class="btn btn-neutral mr-3 ml-auto block" v-if="allowToSubmit" >Submit</button>
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
		dormImgUrl: [],
		dorm: {
			name : '',
			openTime: null,
			closeTime: null,
			description: '',
			rating: 0,
			acceptPercent: 0,
			elecPerUnit: null,
     		waterPerUnit: null
		},
		dormInputImage:[],
		address:null,
		roomType:[ {type: `dummy1`,price: 0,deposit: 0,area: 0,facility: [{ name: "", description: "" }],}],
		roomTypeImage:[],
		roomTypeCount:1,
		roomCount:1,
		confirmAllRoom:false,
		confirmAllRoomType:false,
		room:[{roomNum:'dummy1',status:'',floors:'',description:'',roomType:''}],
		checkforroomType : false,
		checkforRoom : false,
		validateName: true,
		validateElec: true,
		validateWater: true,
		validateDormImg: true,
		validateroomTypeSubmit:false,
		validateRoomSubmit : false
      }
	},
	methods: {
		validateRoom(value){
           this.checkforRoom = value
		},
		validateroomType(value){
          this.checkforroomType = value
		  console.log(this.checkforroomType)
		},
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
		this.checkDormForm()
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
						   formData.append(`dorm_roomType_${key}`, value[j], 'test.jpg')
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
			formData.append(`dorm_${this.dorm.name}`, this.dormInputImage[i], 'test.jpg')
			}
		}
		formData.append('data',JSON.stringify(data))
		for(var pair of formData.entries()) {
   			console.log(pair[0]+ ': '+ pair[1]);
		}
          let postData = await this.$axios.$post(`${this.$store.state.Backend_URL}/dorm/register`,formData).then(res => {
			const noti = this.$vs.notification({
		    progress: 'auto',
		    icon:`<i class='bx bx-folder-open' ></i>`,
			color:'success',
            position:'top-right',
            title: `Upload data complete`,
            text: `You dorm have been upload, Check it out!`
		  })}).catch(err => {
			  const noti = this.$vs.notification({
		    progress: 'auto',
		    icon:`<i class='bx bx-error' ></i>`,
			color:'warn',
            position:'top-right',
            title: `Error : ${err.response.status}`,
            text: `${err.response.data.error.message}, Please try to input data again`
          })
		  })

	},
	checkDormForm(){
		this.validateName = (this.dorm.name != "") ? true : false
		this.validateElec = (this.dorm.elecPerUnit != null && 0 < this.dorm.elecPerUnit < 10) ? true : false
		this.validateWater = (this.dorm.waterPerUnit != null && 0 < this.dorm.waterPerUnit < 10) ? true : false
		this.validateDormImg = (this.dormImgUrl.length != 0) ? true : false
		},
	addAddress(value){
      this.address = value
	},
	addRoomType({roomType,roomTypeImage,index}){
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
	addRoom({index,room}){
		for(let i in this.room){
			if(this.room[i].roomNum == room.roomNum){
				return
			}
		}
	  this.room[index] = room
	},
	cancelThisRoom(index){
		if(index == 0){
			return
		}
	this.checkforRoom = true
      this.room.splice(index,1)
	},
	},
	computed :{
		allowToSubmit(){	
			return this.dorm.name != '' && this.dorm.openTime != null && this.dorm.closeTime !=null && this.dorm.elecPerUnit > 0 && this.dorm.waterPerUnit > 0 && this.dormImgUrl.length>0 && this.address != null
			&& this.validateroomTypeSubmit && this.validateRoomSubmit && this.roomTypeImage.length>0  ? true : false
		}
	}
}
</script>