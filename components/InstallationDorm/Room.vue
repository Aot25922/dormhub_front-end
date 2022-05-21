<template>
	<div >
		<div  class="bg-dark-blue p-3 rounded-lg mb-3" >
			<h1 class="text-white text-lg ml-2 mb-2 font-bold">เลขห้อง</h1>
			<input type="text" class="py-4 mb-3 px-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
			placeholder="ห้องนี้สีเขียว" v-model="room.roomNum" :disabled="dataIsFill"  />
            <h1 class="text-white text-lg ml-2 mb-2 font-bold">สถานะ</h1>
			<input type="text" class="py-4 mb-3 px-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
			placeholder="ห้องนี้สีเขียว" v-model="room.status" :disabled="dataIsFill" />
            <h1 class="text-white text-lg ml-2 mb-2 font-bold">ชั้น</h1>
			<input type="text" class="py-4 mb-3 px-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
			placeholder="ห้องนี้สีเขียว" v-model="room.floors" :disabled="dataIsFill" />
            <h1 class="text-white text-lg ml-2 mb-2 font-bold">รายละเอียดเพิ่มเติม</h1>
			<input type="text" class="py-4 mb-3 px-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
			placeholder="ห้องนี้สีเขียว" v-model="room.description" :disabled="dataIsFill" />
            <label for="" class="label-text text-light-blue tracking-wide font-bold my-2">ประเภทห้อง</label>
			<select class="select select-sm mb-5 w-full text-confirmButton bg-dark-gray border-0" v-model="room.roomType" :disabled="dataIsFill" >
				<option	option disabled selected>กรุณาเลือกประเภทห้อง</option>
				<option v-for="option in roomType" :value="option.type" :key="option.type" >{{option.type}}</option>
			</select>
            <button @click="$emit('cancelThisRoom')" class=" text-white">ยกเลิกห้องนี้</button>
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
                floors:'',
                description:'',
                roomType:''
            },
             dataIsFill:false
        }
    },
    watch:{
        confirmRoom(newConfirm,oldConfirm){
            console.log('room')
            if(newConfirm == true ){
                this.addRoom()
            }else{
                this.dataIsFill = false
                this.room.roomNum = ''
                this.room.status=''
                this.room.floors=''
                this.room.description=''
                this.room.roomType=''
            }
        }
    }
    ,methods : {
        addRoom(){
            if(this.room.roomNum != '' && this.room.status!='' && this.room.floors!=''&& this.room.roomType!=''){
            console.log(this.room)
            this.dataIsFill = true
            this.$emit('addNewRoom',{index:this.index,room:this.room})
        }else{
          this.dataIsFill = false
        }
        },
    }
}
</script>
