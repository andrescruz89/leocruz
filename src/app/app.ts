import { Component } from '@angular/core';
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
export class App {}
