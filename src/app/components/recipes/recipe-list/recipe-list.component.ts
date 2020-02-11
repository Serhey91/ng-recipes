import { Component, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: IRecipe[] = [
    {name: 'Test recipe', description: 'Descriptions test', imagePath: 'https://www.reviewgeek.com/thumbcache/0/0/6a0181389c30113203bd612988ee9f0a/p/uploads/2018/08/539d6938.jpg'},
    {name: 'Test recipe', description: 'Descriptions test', imagePath: 'https://www.reviewgeek.com/thumbcache/0/0/6a0181389c30113203bd612988ee9f0a/p/uploads/2018/08/539d6938.jpg'},
    {name: 'Test recipe', description: 'Descriptions test', imagePath: 'https://www.reviewgeek.com/thumbcache/0/0/6a0181389c30113203bd612988ee9f0a/p/uploads/2018/08/539d6938.jpg'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
