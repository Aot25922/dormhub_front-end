<template>
  <div class="py-3 md:py-5">
        <p>{{dorm}}</p>
         <button  class="btn btn-neutral mx-auto block bg-cheese" @click="submit">Next</button>
  </div>
</template>
<script>
export default {
    middleware: 'permission',
  data(){
    return {
    }
  },
  methods: {
    submit(){
        console.log(this.$store.state.newDorm)
        this.$store.dispatch("addDorm")
        
      }
  },
  computed: {
    dorm(){
        return this.$store.state.newDorm
    }
  }
};
</script>
