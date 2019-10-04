const express = require('express')
const app = express()
var server = require('http').Server(app);
var io = require('socket.io')(server);

let scramblegobal


const tnoodle = require('./lib/tnoodle')

tnoodle.getScrmable('333').then((scramble)=>{
    console.log(scramble)
    scramblegobal = scramble
    const scrambleimg = tnoodle.getImage(scramble,'333')
    console.log(scrambleimg)
})











// socket 设置为3000端口
server.listen(4000);

// 将manager目录设置成静态文件目录
// app.use(express.static('manager'));
// app.use(express.static('visitors'));
// app.use('/static', express.static('public'));



//跨域中间件
app.use(require('cors')())

//json中间件
app.use(express.json())

//app 设置为3000端口
app.listen(3000,() =>{
    console.log('3000 is listening')
})

let m_socket_client = ''
let player_info = []

io.on('connection', client => {
    console.log('there is one socket client connected')

    //stage_handshake
    // client.on('handshake_kang',()=>{
    //   client.emit('handshake_server_to_kang',client.id)
    // })


    // //
    // client.on('stop_to_server',(data)=>{
    //     io.emit('stop_timer','nihao')
    // })

    //发现新增页面
    
    client.on('home_to_server',(data)=>{
        if(data.player!=''){
            data.id = client.id
            let loopflag = false
            for(i=0; i<player_info.length;i++){
                if(player_info[i].id == data.id||player_info[i].player == data.player){
                    player_info[i]=data;
                    loopflag = true
                }
                else{null}
            }

            if(!loopflag){
                 player_info.push(data)
            }
            console.log(player_info)
            io.emit('show_all_info',player_info)
            
        }
        else {null}
        
        
    })


    //点击按钮时发送信息判断是否需要重新输入名字
    client.on('rename_or_not',(name)=>{
        let rename = false
        for(i=0; i<player_info.length;i++){
            if(player_info[i].player.replace(/\s*/g,"")== name.replace(/\s*/g,"")&&player_info[i].online==true){
                client.emit('rename_bool',true)
                rename=true
            }}
            if(!rename) {
                client.emit('rename_bool',false)
            }
    })

    //刷新时发送信息判断是否需要重新输入名字
    client.on('created_rename_or_not',(name)=>{
        let rename = false
        for(i=0; i<player_info.length;i++){
            if(player_info[i].player.replace(/\s*/g,"")== name.replace(/\s*/g,"")&&player_info[i].online==true){
                client.emit('created_rename_bool',true)
                rename=true
            }}
            if(!rename) {
                client.emit('created_rename_bool',false)
            }
    })





    //   断开连接

    client.on('disconnect', (reason) => { 
        //
        // if(client.id != m_socket_client.id && m_socket_client!=''){
        //   m_socket_client.emit('visitor_closed_to_manager',client.id)
        // }else if(m_socket_client!=''){
        //   console.log('manager disconnect')
        // }else{
        //      console.log('disconnect',reason)
        // }
        for(i=0;i<player_info.length;i++){
            if(client.id==player_info[i].id){
                // player_info.splice(i,1);
                player_info[i].online=false

            }
            else{null}
        }
    });
    

  });



