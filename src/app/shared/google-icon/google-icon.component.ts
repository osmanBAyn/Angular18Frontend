import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-google-icon',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './google-icon.component.html',
  styleUrl: './google-icon.component.css',
  animations : [
    trigger("clickedornot",[
      state("clicked",
        style({
          "font-variation-settings" : "'FILL' 1",
          // "background-color" : "#483746",
          "background-color" : "var(--icon-bg-color)"
        })
      ),
      state("not-clicked",
        style({
          "font-variation-settings" : "'FILL' 0"
        })
      ),
      transition("clicked => not-clicked", [animate(0.5)]),
      transition("not-clicked => clicked", [animate(0.5)]),
    ])
  ]
})
export class GoogleIconComponent {
  change = output<string>();
  pageName = input.required<string>();
  clicked = input.required<boolean>();
  onClick(){
    this.change.emit(this.pageName());
  }

}
