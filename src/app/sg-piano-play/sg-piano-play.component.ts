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
  constructor() { }

  ngOnInit(): void {
  }

  play() {
    // this.stopTimer()
    // let player = MIDI.Player
    // player.timeWarp = 1
    // player.loadFile('./midifiles/'+this.selectedSong, ()=>{
    //   player.start();
    //   this.initTimer()
    // })
	MIDI.loadPlugin({
		// soundfontUrl: "./soundfont/",
		soundfontUrl: "./assets/soundfont/",
		instrument: "acoustic_grand_piano",
		onprogress: function(state:any, progress:any) {
			console.log(state, progress);
		},
		onsuccess: function() {
			var delay = 0; // play one note every quarter second
			var note = 50; // the MIDI note
			var velocity = 127; // how hard the note hits
			// play the note
			MIDI.setVolume(0, 127);
			MIDI.noteOn(0, note, velocity, delay);
			MIDI.noteOff(0, note, delay + 0.75);
		}
	});

  }
  stop() {
    // this.stopTimer()
    // let player = MIDI.Player
    // player.stop()
  }
}
