import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-part-of-me',
  imports: [],
  templateUrl: './part-of-me.html',
  styleUrl: './part-of-me.scss'
})
export class PartOfMe {
  protected readonly activeTab = signal('gym');
  protected setTab(tab: string): void { this.activeTab.set(tab); }
}
