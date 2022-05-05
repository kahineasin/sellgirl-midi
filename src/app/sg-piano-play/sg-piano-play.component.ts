import { Component, OnInit } from '@angular/core';
import { PfUtil } from 'pf-angular-helper-lib';
import { interval } from 'rxjs';
declare var MIDI: any;

@Component({
  selector: 'sg-piano-play',
  templateUrl: './sg-piano-play.component.html',
  styleUrls: ['./sg-piano-play.component.css']
})
export class SgPianoPlayComponent implements OnInit {
  public songs=[ 'Again.mid',
  //'chinasong.mid',
    'aLIEz.mid',
    'All in good time.mid',
    'Allegro Cantabile Sound.mid',
    'Amnanesis.mid',
    'AQUA.mid',
    'Aruji Naki Sono Koe.mid',
    'Ashita e no Kaerimichi.mid',
    'Attack on Titan.mid',
    'Before my body is dry.mid',
    'Bios.mid',
    'Blessing.mid',
    'Blue Bird.mid',
    'Blumenkranz.mid',
    'Boku ja nai.mid',
    'Boys be Smile.mid',
    'Brave Heart.mid',
    'Brave Shine.mid',
    'Brave Song (piano + viola).mid',
    'Brave Song.mid',
    'Butterfly.mid',
    'Cha-la Head-Cha-La.mid',
    'Challenge accepted (1).mid',
    'City of Eternity.mid',
    'COLORS.mid',
    'Cras numquam scire.mid',
    'Daydream Syndrome.mid',
    'departures.mid',
    'Dream theme from Nazo no Kanojo X.mid',
    'Enter Enter Mission.mid',
    'EONIAN.mid',
    'Esoragoto.mid',
    'Euterpe.mid',
    'Everyday World.mid',
    'Extra magic hour.mid',
    'Fallen Angel.mid',
    'Fubuki.mid',
    'GO GO Maniac.mid',
    'Gotta catch \'em all.mid',
    'Guren no Yumiya.mid',
    'Heartwarming.mid',
    'Hello Alone -Yui Ballade-.mid',
    'Hikari no Senritsu.mid',
    'Hikaru Nara.mid',
    'Jiyuu no Tsubasa for two pianos (MIDI).mid',
    'Kanashimi no ato ni.mid',
    'Kancolle - Piano Suite.mid',
    'Key anime piano suite.mid',
    'Kibou ni Tsuite.mid',
    'Kibou no Hana.mid',
    'Killy Killy Joker.mid',
    'Kimi ni Matsuwaru Mystery.mid',
    'Kimi no Shiranai Monogatari.mid',
    'Koibumi.mid',
    'Koko Kara Hajimaru Monogatari.mid',
    'Kokoro no Senritsu.mid',
    'Kono Namida wo Kimi ni Sasagu (2).mid',
    'kono suba piano suite.mid',
    'Kuchizuke Diamond.mid',
    'Kuusou Mesorogiwi.mid',
    'Level 5 - Judgelight.mid',
    'Life goes on.mid',
    'Light my Fire.mid',
    'Little Busters!.mid',
    'Lumis Eterne.mid',
    'Madoka Magica - Piano Medley.mid',
    'Magia.mid',
    'Main Theme from Non Non Byori.mid',
    'Masshiro World.mid',
    'Megumeru - Cuckool mix 2007 -.mid',
    'Miiro.mid',
    'Mikansei Stride.mid',
    'Moonlight Densetsu.mid',
    'My Dearest.mid',
    'My precious friend - Isshuukan Friends.mid',
    'My Soul Your Beats.mid',
    'Nagi no Asukara - Piano Suite.mid',
    'Namae no nai Kaibutsu.mid',
    'Niji no Ressha.mid',
    'Ninelie.mid',
    'Oath Sign.mid',
    'One Last Song.mid',
    'Only my railgun (easy ver).mid',
    'Only my railgun (full ver).mid',
    'Only my railgun.mid',
    'Owari no Sekai Kara.mid',
    'Patema Inverse.mid',
    'Philosophyz.mid',
    'Pierce the Heavens with your drill!.mid',
    'REDLINE DAY.mid',
    'Resonance.mid',
    'Rewrite v2 - Lenno Liu.mid',
    'Sagitta Luminis.mid',
    'Sakura.mid',
    'Satori_Maiden__3rd_eye_-_Satori_Komeijis_Theme_-_by_Animenzzz.mid',
    'Sayonara Memories.mid',
    'Scarlet Ballet.mid',
    'Secret_Base_-_Kimi_ga_Kureta_Mono_(10_years_after_Ver - ThePianoL.mid',
    'Shakugan no Shana Medley.mid',
    'Sis puella magica!.mid',
    'Sister\'s Noise.mid',
    'Snow Halation.mid',
    'Sora to Kimi no Message.mid',
    'Sparkling Daydream.mid',
    'Sweet & Sweet Cherry.mid',
    'Swordland (Main Theme).mid',
    'The city in the night.mid',
    'The Reluctant Heroes.mid',
    'The Song of Aether.mid',
    'This Game (1).mid',
    'This Game (TV Size).mid',
    'This is (not) the end.mid',
    'Toki Tsukasadoru Juuni no Meiyaku.mid',
    'tokimeki poporon.mid',
    'Trust me.mid',
    'Unbeatable Network.mid',
    'unfinished.mid',
    'Unravel.mid',
    'We are!.mid',
    'Wiosna.mid',
    'World End.mid',
    'Yasashii Boukyaku.mid',
    'Yasashisa no Riyuu.mid',
    'Yoake Umarekuru Shoujo.mid',
    'Yume wa Nando mo Umarekawaru.mid',
    'ZZZ.mid' ];

    public comboList:any[]=[
      {key:"bi_lv_se_de_tu_zi.mid",value:"碧绿色的兔子"}
    ];
    
   public loading=0;
   public loadingDone=false;
   
  private timer:any=null;
  private totalTime=0;
  private startTime=0;
  public activeKeys:any={
    // 5:true,
    // 6:true
  };
  //如果只用1个定时器,这个属性不需要的
  public lastActiveKeys:any={
    // 5:true,
    // 6:true
  };
  public progress:any;
   public selectedSong='bi_lv_se_de_tu_zi.mid';//Blue Bird.mid';
  //public selectedSong='Blue Bird.mid';//Blue Bird.mid';
  // public isFirstTime=true;
  public isPreparePlay=false;
  
  private defaultSpeed=1;
  public curVolume:number=100;
  public curSpeed:Number=1;//数字越大就越慢
  public colorIdx:{idx:number,hsl:string,hex:string}[]=[];
  public colorRect:any[]=[
    
  ];
  constructor(private pfUtil:PfUtil) { }

  ngOnInit(): void {
    const me=this;

    me.comboList=[...me.comboList,...me.songs.map(a=>{
      return {key:a,value:a};
    })];
    for(let i=1;i<=88;i++){
      // me.colorIdx.push({[i]:"#ffffff"});
      me.colorIdx.push({idx:i,hex:"#ffffff",hsl:""});
      me.colorRect.push([]);
    }

    me.onSongChange();

    var fcolorMap = MIDI.Synesthesia.map();
    // console.info(fcolorMap);
    me.updateColorArea(fcolorMap);
    
    // //测试数据,测试色块移动成功
    // let tmpColor=me.colorIdx.find(a=>a.idx===8)?.hex;
    // let rect01={y1:100,y2:200,hex:tmpColor,hashId:PfUtil.newHashId()};
    // me.colorRect[8].push(rect01);
    // me.colorRect[9].push({y1:150,y2:220,hex:me.colorIdx.find(a=>a.idx===9)?.hex});
    // let inter=setInterval(function(){      
    //   if(rect01.y1>300){
    //     clearInterval(inter);
    //     //me.colorRect[8].removeAll((a:any)=>a.hashId===rect01.hashId);
    //     me.colorRect[8].splice(me.colorRect[8].findIndex((a:any)=>a.hashId===rect01.hashId), 1);
    //   }
    //   rect01.y1+=1;rect01.y2+=1;
    //   // rect01.top+=1;
    // },100);

    //let tmpPlugin=  loadPlugin()没有返回值
    MIDI.loadPlugin({
      //soundfontUrl: "./soundfont/",
      soundfontUrl: "./assets/soundfont/",
      instrument: "acoustic_grand_piano",
      //velocity:50,//找不到地方设置这个速度参数
      onprogress: function(state:any, progress:number) {
        // me.loading = parseInt(progress * 100)
        me.loading = progress * 100;
        // if(progress==1){
        //   debugger;
        // }
        if(progress == 1 && state == 'load'){
          me.loadingDone = true;
        }
      },
      onsuccess: function() {
        let player = MIDI.Player;
        player.timeWarp = 0.5; // speed the song is played back
        // // debugger;
        // var fcolorMap = MIDI.Synesthesia.map();
        // // console.info(fcolorMap);
        // me.updateColorArea(fcolorMap);
        player.addListener(function(data:any) {
          if(data.message === 144){
            me.activate(data.note - 20);
          }
          if(data.message === 128){
            me.deactivate(data.note - 20);
          }
          // var colorMap = MIDI.Synesthesia.map();//颜色和音节进度无关,只和按键位置有关
          // console.info(colorMap);
          // me.updateColorArea(colorMap);
          // debugger;
          //console.info(data.velocity);
          //data.velocity=22;
          
	// 		var delay = 0; // play one note every quarter second
	// 		var note = 50; // the MIDI note
	// 		var velocity = 127; // how hard the note hits
	// 		// play the note
	 		//MIDI.setVolume(0, 10);
	// 		MIDI.noteOn(0, note, velocity, delay);
	// 		MIDI.noteOff(0, note, delay + 0.75);
        });
        // debugger;//
        // let MIDIPlugin = (document as any).MIDIPlugin;
        // MIDIPlugin.setVelocity(100);
      }
    });
    //debugger;
  }
  updateColorArea(map:any){
    const me=this;
    // for(let i in map){
    //   if(map.hasOwnProperty(i)){

    //   }
    // }
    for(let i=0;i< me.colorIdx.length;i++){
      if(map.hasOwnProperty(me.colorIdx[i].idx)){
        me.colorIdx[i].hex=map[i].hex;
        me.colorIdx[i].hsl=map[i].hsl;
      }
    }
  }
  protected testConsole(...msg: any) {
    const me = this;
    let r="";
    for(let i=0;i<msg.length;i++){
      r+=msg[i]+"_";
    }
    console.info(
      me.pfUtil.formatTime(new Date(), "yyyy-MM-dd HH:mm:ss") +
        "--------------------" +
        r +
        "--------------------"
    );
  }
  getRectQty():number{
    const me=this;
    let r:number=0;
    // debugger;
    for(let i=0;i<me.colorRect.length;i++){
      for(let j=0;j<me.colorRect[i].length;j++){
        r+=1;
      }
    }
    return r;
  }
  addRect(note:number,millionSecond:number){

    const me=this;
    
    let height:number=800;//假设的滚动距离
    let oneTime:number=1000;//从上滚到下的时间
    let speed=height/oneTime;

    let intervalTime:number=20;
    let distance=speed*intervalTime;
    // console.info("note",note);
    // console.info("speed",speed);
    // console.info("distance",distance);
    //200px 10s ->  200px 10000ms
    let tmpColor=me.colorIdx.find(a=>a.idx===note)?.hex;
    // let rect01={y1:0,y2:height*note/oneTime,hex:tmpColor,hashId:PfUtil.newHashId()};
    let rect01={y1:0,y2:speed+millionSecond,hex:tmpColor,hashId:PfUtil.newHashId()};
    me.colorRect[note].push(rect01);
    // let inter=setInterval(function(){
      
    //   if(rect01.y1>height){
    //     //debugger;
    //     clearInterval(inter);
    //     //me.colorRect[8].removeAll((a:any)=>a.hashId===rect01.hashId);
    //     me.colorRect[note].splice(me.colorRect[note].findIndex((a:any)=>a.hashId===rect01.hashId), 1);
    //   }else{
    //     // rect01.y1+=1;rect01.y2+=1;
    //     rect01.y1=rect01.y1+distance;rect01.y2=rect01.y2+distance;
    //     //console.info("y1",rect01.y1);
    //   }
    //   // rect01.top+=1;
    // },intervalTime);
  }
  deactivate(note:any) {
    const me=this;
    note = Number(note);
    // //this.$delete(this.activeKeys,note)
    // if(me.activeKeys.hasOwnProperty(note)&&me.lastActiveKeys.hasOwnProperty(note)){
    //   let timeElapsed = new Date().getTime() -me.lastActiveKeys[note].getTime();
    //   me.addRect(note,timeElapsed);
    // }
    
    let l=me.colorRect[note].length;
    if(l>0){
      me.colorRect[note][l-1].y1=0;
    }else{
      // let tmpColor=me.colorIdx.find(a=>a.idx===note)?.hex;
      // // let rect01={y1:0,y2:height*note/oneTime,hex:tmpColor,hashId:PfUtil.newHashId()};
      // let rect01={y1:0,y2:1,hex:tmpColor,hashId:PfUtil.newHashId()};
      // me.colorRect[note].push(rect01);
    }
    
    delete me.activeKeys[note];
    //delete me.lastActiveKeys[note];
  };
  activate(note:any) {
    const me=this;
    note = Number(note);
    if(this.activeKeys[note]){
      this.deactivate(note);
      //this.$nextTick(()=>{
        setTimeout(function(){
          // this.$set(this.activeKeys,note,true)
          me.activeKeys[note]=true;
          //me.lastActiveKeys[note]=new Date();
        },20);
      //})

      //如果原来是按下,现在又是按下,就加长色条(一般没有这种情况)
      let l=me.colorRect[note].length;
      if(l>0){
        me.colorRect[note][l-1].y1=0;
      }else{
        let tmpColor=me.colorIdx.find(a=>a.idx===note)?.hex;
        // let rect01={y1:0,y2:height*note/oneTime,hex:tmpColor,hashId:PfUtil.newHashId()};
        let rect01={y1:0,y2:1,hex:tmpColor,hashId:PfUtil.newHashId()};
        me.colorRect[note].push(rect01);
      }      
    }else {
      // this.$set(this.activeKeys,note,true)
      me.activeKeys[note]=true;

      // if(!me.lastActiveKeys.hasOwnProperty(note)){
      //   me.lastActiveKeys[note]=new Date();
      // }
      
      //如果原来没按下,现在是按下,就新增色条
      let tmpColor=me.colorIdx.find(a=>a.idx===note)?.hex;
      // let rect01={y1:0,y2:height*note/oneTime,hex:tmpColor,hashId:PfUtil.newHashId()};
      let rect01={y1:0,y2:1,hex:tmpColor,hashId:PfUtil.newHashId()};
      me.colorRect[note].push(rect01);
      
    }

  }
  stopTimer() {
    let timer = this.timer;
    clearInterval(timer);
    this.progress = 0;
    //this.timer = null
  }
  initTimer() {
    const me=this;
    this.startTime = +new Date();
    this.totalTime = MIDI.Player.endTime;
    this.timer = setInterval(()=>{
      let timeElapsed = ((new Date() as any) - this.startTime);
      if(timeElapsed/this.totalTime >=1){
        this.stopTimer();
        return;
      }
      this.progress = 100*timeElapsed/this.totalTime +'%';

      
      for(let i=me.colorRect.length-1;i>=0;i--){
        let jLen=me.colorRect[i].length;
        for(let j=jLen-1;j>=0;j--){
          let rect01=me.colorRect[i][j];
          if(rect01.y1>700){
            //me.colorRect[i].splice(me.colorRect[i].findIndex((a:any)=>a.hashId===rect01.hashId), 1);
            //改善性能,1次性删除前面的
            let removeIdx=me.colorRect[i].findIndex((a:any)=>a.hashId===rect01.hashId);
            me.colorRect[i].splice(0, removeIdx+1);
            break;
          }else{
            // rect01.y1+=1;rect01.y2+=1;         
            //如果原来是按下,就加长最后1个色条,否则y1下移
            if(j===jLen-1&&me.activeKeys[i]){
              rect01.y1=0;
            }else{
              rect01.y1+=me.colorMoveDistance;
            }
            rect01.y2+=me.colorMoveDistance;
            //console.info("y1",rect01.y1);   
          }
        }
      }
    },20);

  }
  private colorMoveDistance:number=8;
  play() {
    const me=this;
    if(me.isPreparePlay){
      return;
    }
    me.isPreparePlay=true;
    me.stopTimer();
    // me.stop();
    let player = MIDI.Player;
    //debugger;
    player.timeWarp = me.curSpeed;//speed播放速度
    player.loadFile('./assets/midifiles/'+me.selectedSong, function(){
      // setTimeout(function(){
      // },500);
      player.start();
      me.initTimer();
      me.isPreparePlay=false;
      // if(me.isFirstTime){
      //   me.isFirstTime=false;
      //   setTimeout(function(){//暂时这样解决第1次播放的混乱bug
      //     me.stop();
      //     me.play();
      //   },500);
      // }
    });
    //debugger;

    //测试这样可以播放音调 
	// MIDI.loadPlugin({
	// 	// soundfontUrl: "./soundfont/",
	// 	soundfontUrl: "./assets/soundfont/",
	// 	instrument: "acoustic_grand_piano",
	// 	onprogress: function(state:any, progress:any) {
	// 		console.log(state, progress);
	// 	},
	// 	onsuccess: function() {
	// 		var delay = 0; // play one note every quarter second
	// 		var note = 50; // the MIDI note
	// 		var velocity = 127; // how hard the note hits
	// 		// play the note
	// 		MIDI.setVolume(0, 127);
	// 		MIDI.noteOn(0, note, velocity, delay);
	// 		MIDI.noteOff(0, note, delay + 0.75);
	// 	}
	// });

  }
  stop() {
    this.stopTimer();
    let player = MIDI.Player;
    player.stop();
  }
  //x琴键位置,4~15
  public isActive(n:number,x:number):boolean{
    return true;
    //return  this.activeKeys[(n -1)*12+x];
  }
  public updateVolume(){
    
    // MIDI.setVolume(0, 10);
    //debugger;
    MIDI.setVolume(0, this.curVolume);
  }
  public updateSpeed(){
    const me=this;
	 		// var delay = 0; // play one note every quarter second
			// var note = 50; // the MIDI note
	// 		var velocity = 127; // how hard the note hits
	// 		// play the note
	// 		MIDI.setVolume(0, 127);
  //debugger;
			//MIDI.noteOn(0, note, me.curSpeed, delay);//这个指令是用来手动发音的..
	// 		MIDI.noteOff(0, note, delay + 0.75);
	// debugger;		
  let	player = MIDI.Player;
  player.timeWarp = me.curSpeed; // speed the song is played back
  me.play();
  me.pfUtil.setLocalStorage(me.cacheKey+"_speed_"+me.selectedSong,me.curSpeed);
  
  }
  private cacheKey="sg_midi_play_speed";
  public onSongChange(){
    const me=this;
    //debugger;
    let cache=me.pfUtil.getLocalStorage(me.cacheKey+"_speed_"+me.selectedSong);
    if(!me.pfUtil.isAllEmpty(cache)){      
      me.curSpeed=new Number(cache);
    }else if(me.curSpeed!==me.defaultSpeed){
      me.curSpeed=me.defaultSpeed;
    }
  }
}
