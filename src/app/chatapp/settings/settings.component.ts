import { Component, inject, output } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  themeService = inject(ThemeService);
  onClick(){
      this.themeService.changeTheme();
  }
}
