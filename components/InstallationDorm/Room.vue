<template>
	<div class="px-3">
		<div  class="bg-dark-blue p-3 rounded-lg mb-3" >
			<h1 class="text-white text-lg ml-2 mb-2 font-bold">จำนวนห้องพัก</h1>
			<div class="flex flex-wrap">
				<div class="w-full px-1">
					<div class="w-full bg-dark-gray rounded-md p-3">	
						<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">เลขห้อง</label>
						<input type="text" class="py-4 mb-3 px-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
						placeholder="101" v-model="room.roomNum" :disabled="dataIsFill" @blur="checkRoomForm" />
                        <span class=" text-cancelButton" v-if="!validateRoomNum">Input roomNum</span>
						
						<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">สถานะ</label>
						<input type="text" class="py-4 mb-3 px-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
						placeholder="ว่าง/ไม่ว่าง" v-model="room.status" :disabled="dataIsFill" @blur="checkRoomForm"  />
                        <span class=" text-cancelButton" v-if="!validateStatus">Input status</span>

						<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">ชั้น</label>
						<input type="text" class="py-4 mb-3 px-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
						placeholder="1-100" v-model="room.floors" :disabled="dataIsFill" @blur="checkRoomForm"  />
                        <span class=" text-cancelButton" v-if="!validateFloors">Input floors</span>

						<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">รายละเอียดเพิ่มเติม</label>
						<input type="text" class="py-4 mb-3 px-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
						placeholder="ห้องนี้สีเขียว" v-model="room.description" :disabled="dataIsFill"  />

						<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">ประเภทห้อง</label>
						<select class="select mb-5 w-full text-light-blue bg-dark-gray border-2 border-gray-soil" v-model="room.roomType" :disabled="dataIsFill" @blur="checkRoomForm" >
							<option	option disabled selected>กรุณาเลือกประเภทห้อง</option>
							<option v-for="option in roomType" :value="option.type" :key="option.type" >{{option.type}}</option>
						</select>
                        <span class=" text-cancelButton" v-if="!validateRoomType">Input roomType</span>
						<button @click="$emit('cancelThisRoom')" class="btn btn-neutral btn-sm w-full mb-2" v-if="confirmRoom == false&&index!=0">ยกเลิกห้องนี้</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Room',
    props:{
        roomType :{
            type : Array,
            require : true
        },
        confirmRoom : Boolean,
        index:Number
    },
    data()  {
        return {
            room:{
                roomNum:'',
                status:'',
                floors: '',
                description:'',
                roomType:''
            },
             dataIsFill:false,
             validateRoomNum:false,
             validateStatus:false,
             validateFloors:false,
             validateRoomType:false
        }
    },
    watch:{
        confirmRoom(newConfirm, oldConfirm){
            console.log('room')
			this.checkRoomForm()
            if(newConfirm == true ){
                this.addRoom()
            } else {
                this.dataIsFill = false
                this.room.roomNum = ''
                this.room.status=''
                this.room.floors=''
                this.room.description=''
                this.room.roomType=''
            }
        }
    },
	methods: {
        addRoom() {
            if(this.validateRoomNum  && this.validateStatus &&  this.validateFloors && this.validateRoomType){
            console.log(this.room)
            this.dataIsFill = true
            this.$emit('addNewRoom',{index:this.index,room:this.room})
			} else {
			this.dataIsFill = false
			}
        },
        checkRoomForm() {
            this.validateRoomNum = (this.room.roomNum != '') ? true : false
            this.validateStatus = (this.room.status != '') ? true : false
            this.validateFloors = (this.room.floors != '' && 0 < this.room.floors < 51) ? true : false
            this.validateRoomType = (this.room.roomType != '') ? true : false
            if(this.validateRoomNum  && this.validateStatus &&  this.validateFloors && this.validateRoomType){
                this.$emit('validateRoom',true)
            }else{
                this.$emit('validateRoom',false)
            }
        }
    }
}
</script>
