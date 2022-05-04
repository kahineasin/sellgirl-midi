# SellgirlMidi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.14.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## 项目功能简介(this project's function)
1.播放midi  finished
2.显示钢琴  finished
3.显示乐谱
4.调速度  finished
5.表示按键情况的色块  finished
6.色块能不能改为提前出

## 展示地址(demo online)
http://midi.sellgirl.com

## 参考资料
1. https://github.com/qk44077907/piano-simulator 
2. https://github.com/SuneBear/midi.js
3. https://galactic.ink/journal/category/open-source/
4. https://galactic.ink/piano/
5. https://github.com/cwilso/WebMIDIAPIShim  改变播放速度等
6. http://www.picatino.com/piano_typewriter/piazzolla/  音谱处理
7. http://localhost:22666/examples/MIDIPlayer.html  本地的midi.js官方例子

## 待实现的功能:
1.播放MIDI文件(引入midi.js)
  https://github.com/mudcube/MIDI.js
2.5线谱显示,同步往左滚动

## 释放速度
velocity似乎不是播放速度

## 按键颜色
D:\githubRepository\MIDI.js\examples\MIDIPlayer.html
				var colorMap = MIDI.Synesthesia.map();

## bug 
1.第1次的开页面播放时,出现音轨错乱的问题,点第2次播放就没问题
  换成midi.js官方的js之后, 这个bug就不出现了, 好像是之前用js是其他作者 修改过的版本