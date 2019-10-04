<template>
    <div  >
        <!-- <div>{{name}}</div> -->
        <div class=pleyer >
            <transition name="el-zoom-in-top">
        <div class="show_player" v-show='data.online' ><span class="show_player_text">{{data.player}}</span></div>
      </transition>
    </div>
    </div>
    
</template>

<script>
export default {
    props:['data'],
    data(){
        return {
            show2:false


        }
    },
    methods:{
        // pi(){
        //     console.log('565')
        // }

    },
    computed:{
        ifshow(){
            if(this.data){
                return true
            }
            return false
        }
    }

    
    
}
</script>



<style scoped>
.player{
    display: flex; 
}
.show_player{
    background-color:rgb(245, 248, 67);
    width: 80%;
    height: 5vh;
    margin:0 auto;
    margin-top:2vh;
    border-radius: 2vh;
    box-shadow: 0 2vh 4vh rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);


}
.show_player_text{
    line-height: 5vh;
    font-size: 3.5vh;
    font-family: Arial;
    color:black;
}


</style>