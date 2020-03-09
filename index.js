var app = require ('express')();
var http = require ('http').createServer(app);
var io = require('socket.io')(http);


var messages = [];
var usersNum = 0;
const preName = 'User';
let users =[];
var numbers= /[a-f0-9]{6}/;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', function(socket){
    usersNum++;
    var user = preName + usersNum;
    socket.emit('/setname', user);

    console.log('a user connected ' + user);


    io.emit('/recievemsg', user + ' has connected.', 'Admin', timeStamp(), 'grey');
    users.push({name: user, color: 'black'});
    io.emit('/getusers', users);
    socket.emit('/loadmsgs', messages);

    socket.on('/sendmsg', function(msg, user, uscolor){
        timest = timeStamp();
        messages.push({mess: msg, name: user, time: timest, color: uscolor});
        io.emit('/recievemsg', msg, user, timest, uscolor);
        console.log('message: '+ msg);
        console.log(messages);
    });

    socket.on('/namechange', function(msg, user){
        if(!users.includes(msg)){
            users[
                users.indexOf(
                users.find(function(obj){
                    return obj.name === user;
                })
            )].name = msg;
            socket.emit('/setname', msg);
            socket.emit('/recievemsg', ' Name Changed to: ' + msg, 'Admin', timeStamp(), 'grey')
            io.emit('/getusers', users);
            console.log(user + 'Name changed to: ' + msg);
        }
        else{
            socket.emit('/recievemsg', 'Name is already being used', 'Admin', timeStamp(), 'grey');
        }
    });

    socket.on('/colorchange', function(msg, user){

        if(numbers.test(msg)){
            msg = '#' + msg;
        }
        users[
            users.indexOf(
            users.find(function(obj){
                return obj.name === user;
            })
        )].color = msg;
        io.emit('/getusers',users);
    })

    socket.on('disconnect', function(){
        users = users.filter(obj => obj.name !== user);
        io.emit('/getusers', users);
        io.emit('/recievemsg', user + ' has disconnected.', 'Admin', timeStamp(), 'grey')
        console.log('user disconnected ' + user);
    });
});

function timeStamp(){
    let date = new Date();
    let hours = date.getHours();
    if (hours < 10){
        hours = '0' + hours;
    }
    let mins = date.getMinutes();
    if (mins < 10){
        mins = '0' + mins;
    }
    let secs = date.getSeconds();
    if  (secs < 10){
        secs = '0' + secs;
    }
    return hours + ':' + mins + ':' + secs  + ' ';
}

http.listen(3000, function (){
    console.log('listening on *:3000');
});
