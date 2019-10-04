<template>
  <div class="home">

    <div style="width:90vw;margin:0 auto;text-align:left">
      <el-button class="player_butt" type="primary" @click="player_butt" round>
        <i class="el-icon-user-solid"></i>
        {{form.name}}
      </el-button>
    </div>

    <div class="scramble">
      <b>{{scramble}}</b>
    </div>

    <el-dialog title="请输入姓名" width="70vw" :visible.sync="dialogFormVisible">
      <el-form :model="form" @submit.native.prevent>
        <el-form-item label="姓名" class="label">
          <el-input
            v-model="player_name"
            autocomplete="off"
            @keyup.enter.native="confirm_butt"
            placeholder="请输入姓名"
          ></el-input>
          <span style="color:red" v-if="show_error"><i class="el-icon-error" style="color:red"></i>该姓名重复，请重新填写</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm_butt">确 定</el-button>
      </div>
    </el-dialog>

    <div class="sq" @click="ti()">
      <b class="timer-num">{{message}}</b>
    </div>

    <button
      plain="true"
      :style="buttonsty"
      @mouseenter="mouseEnter"
      @mouseleave="mouseLeave"
      class="butt"
      type="button"
      @click="ti()"
    >
      <span :style="{color:textcolor}" class="buu">{{buttontext}}</span>
    </button>
  </div>
</template>


<script>
export default {
  name: "home",
  data() {
    return {
      player_name: "",
      dialogFormVisible: false,
      message: "0.000",
      form: { name: "" },
      run: false,
      loop: 0,
      buttontext: "开始",
      buttonsty: {
        "background-color": "darkgray"
      },
      textcolor: "black",
      data: {},
      scramble: "比赛即将开始",
      show_error:false
    };
  },

  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    // handshake_server_to_kang :function(data){
    //   console.log(data)
    // },
    // stop_timer(){
    //   this.ti()
    // }
    rename_bool(data){
      if(data==true){
        this.player_name=''
        this.show_error=true
      }
      else {
        this.show_error=false
        if(this.player_name.match(/^[ ]*$/)) {
        this.$message({
          showClose: true,
          message: "请先输入您的姓名",
          type: "error"
        });
        }   
        else {
        localStorage.player_name = this.player_name;
        this.form.name = this.player_name;
        this.dialogFormVisible = false;
      }  
      }

    },
    created_rename_bool(data){
      if(data==true){
        this.dialogFormVisible=true
        this.form.name=''
        this.show_error=true
      } 
        else {
        this.dialogFormVisible=false
        this.form.name= localStorage.player_name
      } 
      
    }
  },
  methods: {
    player_butt() {
      this.dialogFormVisible = true;
    },

    confirm_butt() {
      this.$socket.emit('rename_or_not',this.player_name)
    },
    mouseEnter() {
      if (this.run) {
        this.buttonsty["background-color"] = "pink";
      } else {
        this.buttonsty["background-color"] = "#bbbbbb";
      }
    },
    mouseLeave() {
      if (this.run) {
        this.buttonsty["background-color"] = "lightpink";
      } else {
        this.buttonsty["background-color"] = "";
      }
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
    ti() {
      let a = new Date().getTime();
      let b;
      if (this.form.name.match(/^[ ]*$/)) {
        this.$message({
          showClose: true,
          message: "请先输入您的姓名",
          type: "error"
        });
      } else {
        if (this.run == false) {
          this.run = true;
          this.buttontext = "结束";
          this.buttonsty["background-color"] = "lightpink";
          this.textcolor = "#FF3E00";
          this.loop = setInterval(() => {
            b = new Date().getTime() - a;
            this.message = this.tt(b);
          }, 27);
        } else {
          this.run = false;
          this.buttontext = "开始";
          this.buttonsty["background-color"] = "darkgray";
          this.textcolor = "";
          clearInterval(this.loop);
        }
      }
    },
    bindglobalkeyevent(vue_this) {
      document.onkeyup = function(keycode) {
        if (keycode.code == "Space" && vue_this.dialogFormVisible == false) {
          vue_this.ti();
        } else if (keycode.code == "KeyR") {
          vue_this.player_butt();
        }
      };
    },
    send() {
      // this.data={
      //   type: 'timer',
      //   bool: this.run,
      //   player: this.form.name,
      //   time: this.message,
      // }

      setInterval(() => {
        this.data = {
          id: "",
          type: "timer",
          bool: this.run,
          player: this.form.name,
          time: this.message,
          online:true,
          rank:0
        };
        this.$socket.emit("home_to_server", this.data);
        // console.log(this.name,this.message,this.run)
      }, 500);
    }
  },

  created() {
    //this.shakehands()
    this.bindglobalkeyevent(this);
    this.send();
    if(localStorage.player_name){
      this.$socket.emit('created_rename_or_not',localStorage.player_name)
      }
    else {
      this.dialogFormVisible = true;
    }
    

    // this.dialogFormVisible = localStorage.player_name ? false : true;
  }
};
</script>


<style scoped>
.home {
  height: 100vh;

  margin: -8px;
}
.scramble {
  background-color: rgb(74, 205, 245);
  width: 90vw;
  margin: 0 auto;
  margin-bottom: 1vh;
  padding: 1vh;
  border-radius: 2vh;
}
.sq {
  background-color: aquamarine;
  border-radius: 20px;
  height: 20vh;
  margin: 0 auto;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  width: 90vw;
}
.timer-num {
  line-height: 20vh;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12vh;
  text-shadow: 0.7vh 0.7vh rgb(83, 185, 185);
}
.butt {
  width: 90vw;
  margin-top: 3vh;
  border-style: none;
  background-color: darkgray;
  height: 10vh;
  border-radius: 40px;
  outline: none;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.buu {
  color: black;
  letter-spacing: 10vw;
  padding-left: 10vw;
  font-size: 8vh;
  text-align: center;
  font-family: simhei;
  line-height: 10vh;
}
.player_butt {
  height: 5vh;
  margin-top: 2vh;
  margin-bottom: 2vh;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  /* transform-origin:center left; */
  /* transform: translateX(-45vw) */
  /* margin-right: 85vw; */
}
.label {
  width: 50vw;
  margin: 0 auto;
}
</style>
