import { Component, OnInit } from '@angular/core';
declare var MIDI: any;

@Component({
  selector: 'sg-piano-play',
  templateUrl: './sg-piano-play.component.html',
  styleUrls: ['./sg-piano-play.component.css']
})
export class SgPianoPlayComponent implements OnInit {
  public songs=[ 'Again.mid',
  'chinasong.mid',
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
  public progress:any;
   public selectedSong='bi_lv_se_de_tu_zi.mid';//Blue Bird.mid';
  //public selectedSong='Blue Bird.mid';//Blue Bird.mid';
  // public isFirstTime=true;
  public isPreparePlay=false;
  constructor() { }

  ngOnInit(): void {
    const me=this;

    me.comboList=[...me.comboList,...me.songs.map(a=>{
      return {key:a,value:a};
    })];

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
        player.addListener(function(data:any) {
          if(data.message === 144){
            me.activate(data.note - 20);
          }
          if(data.message === 128){
            me.deactivate(data.note - 20);
          }
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
  
  deactivate(note:any) {
    const me=this;
    note = Number(note);
    //this.$delete(this.activeKeys,note)
    delete me.activeKeys[note];
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
        },20);
      //})
    }else {
      // this.$set(this.activeKeys,note,true)
      me.activeKeys[note]=true;
    }

  }
  stopTimer() {
    let timer = this.timer;
    clearInterval(timer);
    this.progress = 0;
    //this.timer = null
  }
  initTimer() {
    this.startTime = +new Date();
    this.totalTime = MIDI.Player.endTime;
    this.timer = setInterval(()=>{
      let timeElapsed = ((new Date() as any) - this.startTime);
      if(timeElapsed/this.totalTime >=1){
        this.stopTimer();
        return;
      }
      this.progress = 100*timeElapsed/this.totalTime +'%';
    },20);

  }
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
  public curVolume:number=100;
  public curSpeed:number=1;//数字越大就越慢
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
  
  }
}
