import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { PartOfMe } from './components/part-of-me/part-of-me';
import { Portfolio } from './components/portfolio/portfolio';
import { Stack } from './components/stack/stack';

@Component({
  selector: 'app-root',
  imports: [Header, Hero, Portfolio, Stack, PartOfMe, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit, OnDestroy {
  @ViewChild('matrixCanvas') private readonly matrixCanvas?: ElementRef<HTMLCanvasElement>;

  private intervalId = 0;
  private readonly fontSize = 14;

  ngAfterViewInit(): void {
    const canvas = this.matrixCanvas?.nativeElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Caracteres Matrix (Katakana + Números + Hex) – idéntico al .html original
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEF';

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    let columns = Math.floor(window.innerWidth / this.fontSize);
    let drops = Array(columns).fill(1);

    // Fuente con soporte CJK para katakana + fallback mono
    // El CSS --mono tiene 'JetBrains Mono', 'Fira Code', Consolas (no cubren katakana solos)
    // Se antepone 'BIZ UDGothic', 'MS Gothic', 'Noto Sans JP' para cubrir japonés
    const fontFamily = `'BIZ UDGothic','MS Gothic','Noto Sans JP','Yu Gothic',${getComputedStyle(document.documentElement).getPropertyValue('--mono') || 'monospace'}`;

    const drawMatrix = (): void => {
      if (!ctx) return;
      // Fondo semi-transparente para dar efecto de estela/fade (igual que el original)
      ctx.fillStyle = 'rgba(5, 8, 6, 0.1)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.fillStyle = '#3ddc84';
      ctx.font = `${this.fontSize}px ${fontFamily}`;

      // Ajustar columnas si cambia el tamaño de la ventana
      const currentColumns = Math.floor(window.innerWidth / this.fontSize);
      if (currentColumns !== columns) {
        columns = currentColumns;
        drops = Array(columns).fill(1);
      }

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * this.fontSize, drops[i] * this.fontSize);

        if (drops[i] * this.fontSize > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    this.intervalId = window.setInterval(drawMatrix, 33);
  }

  ngOnDestroy(): void {
    window.clearInterval(this.intervalId);
  }
}
