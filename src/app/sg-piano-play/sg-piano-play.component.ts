import { Component, OnInit } from '@angular/core';
import { PfUtil } from 'pf-angular-helper-lib';
import { interval } from 'rxjs';
import { localSongNameData } from '../local-data/localSongNameData';
declare var MIDI: any;

@Component({
  selector: 'sg-piano-play',
  templateUrl: './sg-piano-play.component.html',
  styleUrls: ['./sg-piano-play.component.css'],
})
export class SgPianoPlayComponent implements OnInit {
  public songs = localSongNameData;

  public comboList: any[] = [
    { key: 'bi_lv_se_de_tu_zi.mid', value: '碧绿色的兔子' },
  ];

  public loading = 0;
  public loadingDone = false;

  private timer: any = null;
  private totalTime = 0;
  private startTime = 0;
  public activeKeys: any = {
    // 5:true,
    // 6:true
  };

  public progress: any;
  public selectedSong = 'bi_lv_se_de_tu_zi.mid'; //Blue Bird.mid';

  public isPreparePlay = false;

  private defaultSpeed = 1;
  public curVolume: number = 100;
  public curSpeed: Number = 1; //数字越大就越慢
  public colorIdx: { idx: number; hsl: string; hex: string }[] = [];
  public colorRect: any[] = [];
  constructor(private pfUtil: PfUtil) {}

  ngOnInit(): void {
    const me = this;

    me.comboList = [
      ...me.comboList,
      ...me.songs.map((a) => {
        return { key: a, value: a };
      }),
    ];
    for (let i = 1; i <= 88; i++) {
      // me.colorIdx.push({[i]:"#ffffff"});
      me.colorIdx.push({ idx: i, hex: '#ffffff', hsl: '' });
      me.colorRect.push([]);
    }

    me.onSongChange();

    var fcolorMap = MIDI.Synesthesia.map();
    me.updateColorArea(fcolorMap);

    MIDI.loadPlugin({
      //soundfontUrl: "./soundfont/",
      soundfontUrl: './assets/soundfont/',
      instrument: 'acoustic_grand_piano',
      onprogress: function (state: any, progress: number) {
        me.loading = progress * 100;

        if (progress == 1 && state == 'load') {
          me.loadingDone = true;
        }
      },
      onsuccess: function () {
        let player = MIDI.Player;
        player.timeWarp = 0.5; // speed the song is played back

        player.addListener(function (data: any) {
          if (data.message === 144) {
            me.activate(data.note - 20);
          }
          if (data.message === 128) {
            me.deactivate(data.note - 20);
          }
        });
      },
    });
  }
  updateColorArea(map: any) {
    const me = this;
    for (let i = 0; i < me.colorIdx.length; i++) {
      if (map.hasOwnProperty(me.colorIdx[i].idx)) {
        me.colorIdx[i].hex = map[i].hex;
        me.colorIdx[i].hsl = map[i].hsl;
      }
    }
  }
  getRectQty(): number {
    const me = this;
    let r: number = 0;
    // debugger;
    for (let i = 0; i < me.colorRect.length; i++) {
      for (let j = 0; j < me.colorRect[i].length; j++) {
        r += 1;
      }
    }
    return r;
  }

  deactivate(note: any) {
    const me = this;
    note = Number(note);


    delete me.activeKeys[note];
    //delete me.lastActiveKeys[note];
  }
  activate(note: any) {
    const me = this;
    note = Number(note);
    if (this.activeKeys[note]) {
      this.deactivate(note);
      setTimeout(function () {
        me.activeKeys[note] = true;
      }, 20);

      //如果原来是按下,现在又是按下,就加长色条(一般没有这种情况) -- benjamin
      let l = me.colorRect[note].length;
      if (l > 0) {
        me.colorRect[note][l - 1].y1 = 0;
      } else {
        let tmpColor = me.colorIdx.find((a) => a.idx === note)?.hex;
        let rect01 = {
          y1: 0,
          y2: 1,
          hex: tmpColor,
          hashId: PfUtil.newHashId(),
        };
        me.colorRect[note].push(rect01);
      }
    } else {
      me.activeKeys[note] = true;
      //如果原来没按下,现在是按下,就新增色条 -- benjamin
      let tmpColor = me.colorIdx.find((a) => a.idx === note)?.hex;
      let keyIdx=note%12-4;//0~11
      if(keyIdx<0){keyIdx+=12;}
      let keyName="";
      switch(keyIdx){
        case 0:
          keyName="C";
          break;
          case 1:
            keyName="#C";
            break;
            case 2:
              keyName="D";
              break;
              case 3:
                keyName="#D";
                break;
                case 4:
                  keyName="E";
                  break;
                  case 5:
                    keyName="F";
                    break;
                    case 6:
                      keyName="#F";
                      break;
                      case 7:
                        keyName="G";
                        break;
                        case 8:
                          keyName="#G";
                          break;
                          case 9:
                            keyName="A";
                            break;
                            case 10:
                              keyName="#A";
                              break;
                              case 11:
                                keyName="B";
                                break;
          default:
            break
      }
      let rect01 = { y1: 0, y2: 1, hex: tmpColor, hashId: PfUtil.newHashId(),keyName:keyName };
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
    const me = this;
    this.startTime = +new Date();
    this.totalTime = MIDI.Player.endTime;
    this.timer = setInterval(() => {
      let timeElapsed = (new Date() as any) - this.startTime;
      if (timeElapsed / this.totalTime >= 1) {
        this.stopTimer();
        return;
      }
      this.progress = (100 * timeElapsed) / this.totalTime + '%';

      for (let i = me.colorRect.length - 1; i >= 0; i--) {
        let jLen = me.colorRect[i].length;
        for (let j = jLen - 1; j >= 0; j--) {
          let rect01 = me.colorRect[i][j];
          if (rect01.y1 > 700) {
            //me.colorRect[i].splice(me.colorRect[i].findIndex((a:any)=>a.hashId===rect01.hashId), 1);
            //改善性能,1次性删除前面的
            let removeIdx = me.colorRect[i].findIndex(
              (a: any) => a.hashId === rect01.hashId
            );
            me.colorRect[i].splice(0, removeIdx + 1);
            break;
          } else {
            // rect01.y1+=1;rect01.y2+=1;
            //如果原来是按下,就加长最后1个色条,否则y1下移
            if (j === jLen - 1 && me.activeKeys[i]) {
              rect01.y1 = 0;
            } else {
              rect01.y1 += me.colorMoveDistance;
            }
            rect01.y2 += me.colorMoveDistance;
            //console.info("y1",rect01.y1);
          }
        }
      }
    }, 20);
  }
  private colorMoveDistance: number = 8;
  play() {
    const me = this;
    if (me.isPreparePlay) {
      return;
    }
    me.isPreparePlay = true;
    me.stopTimer();

    let player = MIDI.Player;

    player.timeWarp = me.curSpeed; //speed播放速度
    player.loadFile('./assets/midifiles/' + me.selectedSong, function () {
      //debugger;
      player.start();
      me.initTimer();
      me.isPreparePlay = false;
    });
    //debugger;
  }
  stop() {
    this.stopTimer();
    let player = MIDI.Player;
    player.stop();
  }
  //x琴键位置,4~15
  public isActive(n: number, x: number): boolean {
    return true;
    //return  this.activeKeys[(n -1)*12+x];
  }
  public updateVolume() {
    // MIDI.setVolume(0, 10);
    //debugger;
    const me = this;
    MIDI.setVolume(0, this.curVolume);
    me.play();
  }
  public updateSpeed() {
    const me = this;
    // debugger;
    let player = MIDI.Player;
    player.timeWarp = me.curSpeed; // speed the song is played back
    me.play();
    me.pfUtil.setLocalStorage(
      me.cacheKey + '_speed_' + me.selectedSong,
      me.curSpeed
    );
  }
  private cacheKey = 'sg_midi_play_speed';
  public onSongChange() {
    const me = this;
    //debugger;
    let cache = me.pfUtil.getLocalStorage(
      me.cacheKey + '_speed_' + me.selectedSong
    );
    if (!me.pfUtil.isEmpty(cache)) {
      me.curSpeed = new Number(cache);
    } else if (me.curSpeed !== me.defaultSpeed) {
      me.curSpeed = me.defaultSpeed;
    }
  }
  protected testConsole(...msg: any) {
    const me = this;
    let r = '';
    for (let i = 0; i < msg.length; i++) {
      r += msg[i] + '_';
    }
    console.info(
      me.pfUtil.formatTime(new Date(), 'yyyy-MM-dd HH:mm:ss') +
        '--------------------' +
        r +
        '--------------------'
    );
  }
  /**
   * 此方法用于根据键盘按键来发音,暂不使用
   */
  private soundByKey() {
    // var delay = 0; // play one note every quarter second
    // var note = 50; // the MIDI note
    // 		var velocity = 127; // how hard the note hits
    // 		// play the note
    // 		MIDI.setVolume(0, 127);
    //debugger;
    //MIDI.noteOn(0, note, me.curSpeed, delay);//这个指令是用来手动发音的..
    // 		MIDI.noteOff(0, note, delay + 0.75);
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
}
