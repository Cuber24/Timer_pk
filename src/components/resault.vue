<template>
    <div  >
        <!-- <div>{{name}}</div> -->
        <div class="resault">
        <transition name="el-zoom-in-left">
        <div class="show_resault" v-show='show_rns.rank' >
            <div class='rank'><span class="text">{{show_rns.rank}}</span></div>
            <div class="name"><span class="text">{{show_rns.player}}</span></div>
            <div class="score"><span class="text">{{show_rns.time}}</span></div>
        </div>
      </transition>
    </div>
    </div>
    
</template>

<script>
export default {
    props:['show_rns'],
    data(){
        return {

        }
    },
    methods:{


    },
    computed:{
        // ifshow(){
            // if(重写){
            //     return true
            // }
            // return false
        // }
    }

    
    
}
</script>



<style scoped>
.player{
    display: flex;  
    height: 7vh;
}
.show_resault{
    background-color: white;
    width: 30.4%;
    height: 7vh;
    float: left;
    margin:1vw;
    background-color: #409eff;
    border-radius: 2vh;
    box-shadow: 0 2vh 4vh rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.rank{
    width: 18%; 
    float: left;
    height: 100%;
}
.name{
    width: 40%;
    border-left-style:solid;
    border-left-color:white;  
    border-left-width: 1px;
    border-right-style:solid;
    border-right-color:white;  
    border-right-width: 1px;
    float: left;
    height: 100%;
}
.score{
    width: 40%; 
    float: left;
    height: 100%;
}
.text{
    font-size: 4vh;
    line-height: 7vh;
    color: white;
}


</style>