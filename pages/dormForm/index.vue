<template>
  <div class="py-3 md:py-5">
    <RegisterDormInfoForm />
   <RegisterDormAddressForm />
    <!-- <div>
      <RegisterDormRoomtypeForm />
    </div>
    <RegisterDormRoomForm />  -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      // banking: false,
      // form: true,
      // dormImgUrl: [],
      // dorm: {
      // 	name : '',
      // 	openTime: null,
      // 	closeTime: null,
      // 	description: '',
      // 	rating: 0,
      // 	acceptPercent: 0,
      // 	elecPerUnit: null,
      // 	waterPerUnit: null
      // },
      // dormInputImage:[],
      // address:null,
      // roomType:[ {type: `dummy1`, price: 0, deposit: 0, area: 0, facility: [{ name: "", description: "" }],}],
      // roomTypeImage:[],
      // roomTypeCount:1,
      // roomCount:1,
      // confirmAllRoom:false,
      // confirmAllRoomType:false,
      // room:[{roomNum:'dummy1',status:'',floors:'',description:'',roomType:''}],
      // checkforroomType : false,
      // checkforRoom : false,
      // validateName: true,
      // validateOpenTime: true,
      // validateCloseTime: true,
      // validateElec: true,
      // validateWater: true,
      // validateDormImg: true,
      // validateroomTypeSubmit:false,
      // validateRoomSubmit : false
    };
  },
  methods: {
    // 	validateRoom(value){
    //        this.checkforRoom = value
    // 	},
    // 	validateroomType(value){
    //       this.checkforroomType = value
    // 	  console.log(this.checkforroomType)
    // 	},
    // 	nextPage(){
    // 		this.banking = true
    // 		this.form = false
    // 	},
    // 	onFileChange(e) {
    // 		this.dormImgUrl = []
    // 		let files = e.target.files || e.dataTransfer.files;
    // 		for(let i in files){
    // 			if(typeof files[i] == 'object'){
    // 			this.dormInputImage.push(files[i])
    // 			this.dormImgUrl.push(URL.createObjectURL(files[i]))
    // 			}
    // 		}
    // },
    // async submit(){
    // 	let formData = new FormData()
    // 	let data={};
    // 	if(this.dorm != null){
    // 	data.dorm = this.dorm
    // 	}
    // 	if(this.address != null){
    // 	data.address = this.address
    // 	}
    // 	if(this.room.length != 0 || this.room != null){
    // 		data.room = this.room
    // 	}
    // 	if(this.roomType.length != 0 || this.roomType != null){
    // 		data.roomType = this.roomType
    // 	}
    // 	formData.append('data',JSON.stringify(data))
    // 	if(this.roomTypeImage.length != 0){
    // 			for(let i in this.roomTypeImage){
    // 			for (const [key, value] of Object.entries(this.roomTypeImage[i])) {
    // 				 for(let j in value){
    // 					   formData.append(`dorm_roomType_${key}`, value[j], 'test.jpg')
    // 				   }
    // 				}
    // 			}
    // 		}
    // 	if(this.dormInputImage.length != 0 ){
    //         for(let i in this.dormInputImage){
    // 		formData.append(`dorm_${this.dorm.name}`, this.dormInputImage[i], 'test.jpg')
    // 		}
    // 	}
    // 	for(var pair of formData.entries()) {
    // 		console.log(pair[0]+ ': '+ pair[1]);
    // 	}
    //       let postData = await this.$axios.$post(`${this.$store.state.Backend_URL}/dorm/register`,formData).then(res => {
    // 		const noti = this.$vs.notification({
    // 	    progress: 'auto',
    // 	    icon:`<i class='bx bx-folder-open' ></i>`,
    // 		color:'success',
    //         position:'top-right',
    //         title: `Upload data complete`,
    //         text: `You dorm have been upload, Check it out!`
    // 	  })}).catch(err => {
    // 		  const noti = this.$vs.notification({
    // 	    progress: 'auto',
    // 	    icon:`<i class='bx bx-error' ></i>`,
    // 		color:'warn',
    //         position:'top-right',
    //         title: `Error : ${err.response.status}`,
    //         text: `${err.response.data.error.message}, Please try to input data again`
    //       })
    // 	  })
    // },
    // checkDormForm(){
    // 	this.validateName = (this.dorm.name != "") ? true : false
    // 	this.validateOpenTime = (this.dorm.openTime != "") ? true : false
    // 	this.validateCloseTime = (this.dorm.closeTime != "") ? true : false
    // 	this.validateElec = (this.dorm.elecPerUnit != null && 0 < this.dorm.elecPerUnit < 10) ? true : false
    // 	this.validateWater = (this.dorm.waterPerUnit != null && 0 < this.dorm.waterPerUnit < 10) ? true : false
    // 	this.validateDormImg = (this.dormImgUrl.length != 0) ? true : false
    // 	},
    // addAddress(value){
    //   this.address = value
    // },
    // addRoomType({roomType,roomTypeImage,index}){
    // 	for(let i in this.roomType){
    // 		if(this.roomType[i].type == roomType.type){
    // 			return
    // 		}
    // 	}
    // 	this.roomType[index] = roomType
    // 	let imageRoomTypeformDataName = roomType.type
    // 	this.roomTypeImage.push({[imageRoomTypeformDataName] : roomTypeImage})
    // 	console.log(this.roomType)
    // 	console.log(this.roomTypeImage)
    // },
    // removeRoomTypes(value){
    //   this.roomType.splice(value,1)
    // },
    // addRoom({index,room}){
    // 	for(let i in this.room){
    // 		if(this.room[i].roomNum == room.roomNum){
    // 			return
    // 		}
    // 	}
    //   this.room[index] = room
    // },
    // cancelThisRoom(index){
    // 	if(index == 0){
    // 		return
    // 	}
    // this.checkforRoom = true
    //   this.room.splice(index,1)
    // },
    // },
    // computed :{
    // 	allowToSubmit(){
    // 		return this.dorm.name != '' && this.dorm.elecPerUnit > 0 && this.dorm.waterPerUnit > 0 && this.dormImgUrl.length>0 && this.address != null
    // 		&& this.validateroomTypeSubmit && this.validateRoomSubmit && this.roomTypeImage.length>0  ? true : false
    // 	}
    // }
  },
};
</script>
