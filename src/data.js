// basic props for all element
export default {

        ballProps:{
            x:150,
            y:470,
            dx:3,
            dy:3,
            rad:10,
            speed:3
        },
        
        brickProps:{
            x:15,
            y:50,
            height:20,
            density:2,
            colors:['blue','lightblue']
        },
        
        player:{
            name:'jaydip',
            lives:5,
            score:0,
            level:1
        },
        paddleProps:{
            height:20,
            width:100,
            x:100,
            color:'#ff6600'
        }
}