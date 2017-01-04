/**
 * In this file, we imported the basic Angular modules and the articles service we'll shortly create. 
 * We then created a new component that uses router-outlet and injects our service.
 * 
 *  Next, we'll need to create a routing configuration for our articles component
 */

import { Component } from '@angular/core';
import { ArticlesService } from './articles.service';

@Component({
  selector: 'articles',
  template: '<router-outlet></router-outlet>',
  providers: [ArticlesService]
})
export class ArticlesComponent {}