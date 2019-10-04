<template>
    <div class ="main">
        <div class="aside">
        <div class="count" >
            <span class="count_text"><i class="el-icon-user-solid"></i>{{count}}</span>
            
            </div>

        <div class="players">
            <ShowPlayerName 
            v-for="(info,i) in lst" :key="i"
            :data="info" ></ShowPlayerName>
        </div>
        </div>
        <div class="right">
        <div class="item">
            <span class="item_text"><i class="el-icon-s-grid"></i>{{item}}</span>
        </div>
        <div class="time_panel">
            <span class="time_text">{{time}}</span>
        </div>
        <div class="score">
            <ShowPlayerResault 
            v-for="(rns,i) in rank_name_score_lst" :key="i"
            :show_rns="rns"></ShowPlayerResault>
        <!-- <button @click="time_start()">start</button>
        <button @click="time_end()">end</button> -->
        </div>
        </div>
    </div>
</template>


<script>
import ShowPlayerName from '../components/player'
import ShowPlayerResault from '../components/resault'

export default {
    components : {ShowPlayerName, ShowPlayerResault},
    data(){
        return {
            count:0,
            lst:[],
            item: '三阶速拧',
            time: '0.000',
             run2: false,
             loop2: 0,
            end: 0,
            end_or_not:false,
            start_info:[],
            rank_name_score_lst:[],
            temp_rank:1
        }
    },
    sockets:{
    // connect: function () {
    //         console.log('socket connected')
    //     },
    // handshake_server_to_kang :function(data){
    //   console.log(data)
    // },
    // stop_timer(){
    //   this.ti()
    // }
    connect: function(){},
    show_all_info(data){
        //展示选手个数和选手名字
        this.count=0
        for(let i=0;i<data.length;i++){
          data[i].online==true ? this.count+=1 : null
        }
        this.lst=data



        //第一个选手开始计时，触发计时
        for(let i=0;i<data.length;i++){
          if(data[i].bool){
              this.time_start()
          }
          else{null}
        }

        //每个人按下停止键时，将数据传给生成组件的数组
        console.log('rank list',this.rank_name_score_lst)
         for(let i=0;i<data.length;i++){
             if(data[i].bool==false && data[i].time!='0.000'){
                let abc = false
                for(let j=0; j<this.rank_name_score_lst.length;j++){
                    if(this.rank_name_score_lst[j].player == data[i].player){
                        abc = true
                        data[i].rank=j+1
                        this.rank_name_score_lst[j]=data[i]
                        console.log('nininininini')
                    }
                    else{null}
                }

                if(!abc){
                    data[i].rank=this.rank_name_score_lst.length + 1
                    this.rank_name_score_lst.push(data[i])
            }}
        }




        //当确定所有选手都触发过开始计时，才给予执行计时终止的的权限
        let online_num=0
        for(let i=0;i<data.length;i++){
          if(data[i].bool){
              if(this.start_info.includes(i)){null}
              else{this.start_info.push(i)}
          }
          else{null}
          if(data[i].online){
              online_num+=1
          }
        }
        if(this.start_info.length==online_num){
            this.end_or_not=true
        }
        else{null}

        

        
        //当最后一个选手停止计时，结束计时。
        this.end=0
        for(let i=0;i<data.length;i++){
         
          if(data[i].bool){
              this.end+=1
          }
          else{null}
        }
        if(this.end==0&&this.end_or_not==true){
            this.time_end()
            this.end_or_not=false
            this.start_info=[]
        }





    }

  

    },
        
    
  
    methods:{
    //     pi(){
    //   this.$socket.emit('stop_to_server','')
    //}
    // display(da){
    //     console.log(da.time)
    //     if(da.bo==false&& da.time!='0.000'){
    //         this.player_name= da.player
    //         this.player_score= da.time
    //     }
    // },
    time_start()
    {
        let a = new Date().getTime();
        let b;
        if (this.run2 == false) {
          this.run2 = true;
          this.loop2 = setInterval(() => {
            b = new Date().getTime() - a;
            this.time = this.tt(b);
          }, 27);
        } 
        else {null}
    },
    time_end(){
        if (this.run2) {
          this.run2 = false;
          clearInterval(this.loop2);
        } else {null}
    },
    tt(t) {
      if (t < 60000) {
        t = (t / 1000).toFixed(3);
      } else if (t < 3600000) {
        if (t % 60000 < 10000) {
          t = Math.floor(t / 60000) + ":0" + ((t % 60000) / 1000).toFixed(3);
        } else {
          t = Math.floor(t / 60000) + ":" + ((t % 60000) / 1000).toFixed(3);
        }
      } else {
        if (t % 3600000 < 10000) {
          t =
            Math.floor(t / 3600000) +
            ":00:0" +
            ((t % 3600000) / 1000).toFixed(3);
        } else if (t % 3600000 < 60000) {
          t =
            Math.floor(t / 3600000) +
            ":00:" +
            ((t % 3600000) / 1000).toFixed(3);
        } else if (t % 3600000 < 600000) {
          t = Math.floor(t / 3600000) + ":0" + this.tt(t % 3600000);
        } else {
          t = Math.floor(t / 3600000) + ":" + this.tt(t % 3600000);
        }
      }
      return t;
    },



    

    },
    created() {
        
        
    }
}
</script>



<style scoped>
.main{
    background-color: aquamarine;
    width: 100vw;
    height: 99vh;
    display: flex;
    margin:-8px;
    box-sizing: border-box;
}
.aside{
    flex:0 0 20vw;
    height: 99vh;
    border-radius: 3vh;
    background-color:  rgb(29, 221, 157);
    box-shadow: 0 2vh 4vh rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.right{
   
    height: 99vh;
    width: 80vw;
    float: right;
}
.count{
    background-color: aquamarine;
    margin:2vh;
    height: 5vh;
    border-radius: 2vh;
    box-shadow: 0 2vh 4vh rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.count_text{
    line-height: 5vh;
    font-size: 4vh;
    color: black;
    letter-spacing: 5vw;
    padding-right: 2vw;
}
.players{
    background-color: aquamarine;
    height: 88vh;
    margin:2vh;
    padding-top:0.1px;
    border-radius: 2vh;
    box-shadow: 0 2vh 4vh rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.item{
    background-color: rgb(29, 221, 157);
    height: 5vh;
    width: 30vw;
    margin: 0 auto;
    margin-top: 1vh;
    margin-bottom: 1vh;
    border-radius: 2vh;
    box-shadow: 0 2vh 4vh rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    
}
.item_text{
    color: black;
    line-height: 5vh;
    font-size: 4vh;
    font-family:    SimHei;
    
}
.time_panel{
    background-color: rgb(178, 245, 245);
    width: 70vw;
    height: 40vh;
    border-radius:5vh;
    margin:0 auto;
    margin-top:2vh;
    margin-bottom: 2vh;
    box-shadow: 0 2vh 4vh rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.time_text{
    line-height: 40vh;
    font-size: 30vh;
    text-shadow: 1vh 1vh rgb(138, 196, 196);
}
.score{
    width: 72vw;
    margin:0 auto;
    }


</style>