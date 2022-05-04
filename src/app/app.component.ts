import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sellgirl-midi';
  constructor(private router: Router,){

  }
  public goMidiPlay(){
    const me=this;
    //debugger;
    me.router.navigate(['/piano-play']);
  }
}
