import { computed, ElementRef, inject, Injectable, signal, viewChild } from '@angular/core';
const themePink = {
  "--bg-color" : "#170c15",
  "--bg-color2" : "#33202c",
  "--bg-color3" : "#21111f",
  "--bg-color4" : "#1a0b18",
  "--bg-color5" : "#422a3d",
  "--icon-bg-color" : "#483746",
  "--text-color1" : "#c1aebb",

};
const themeBlue = {
 "--bg-color" : "#0C1317",
 "--bg-color2" : "#202C33",
 "--bg-color3" : "#111B21",
 "--bg-color4" : "#0B141A",
 "--bg-color5" : "#2A3942",
 "--icon-bg-color" : "#374248",
 "--text-color1" : "#AEBAC1"
}
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private current = signal<"themePink"|"themeBlue">("themePink");
  get themeBlue(){
    return themeBlue;
  }
  get themePink(){
    return themePink;
  }
  currentTheme = computed(()=>{
    if(this.current() === "themePink"){
      return themePink;
      
    }
    else{
      return themeBlue;
    }
  })
  // get currentTheme(){
  //   if(this.current() === "themePink"){
  //     return themePink;
      
  //   }
  //   else{
  //     return themeBlue;
  //   }
  // }
  changeTheme(){
    if(this.current() === "themePink"){
      this.current.set("themeBlue");
    }
    else if(this.current() === "themeBlue"){
      this.current.set("themePink");
    }
  }
  constructor() { }

}
