import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { BeerService } from '../services/beer.service';
import { Beer } from '../models/beer';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-beer-menu',
  templateUrl: './beer-menu.component.html',
  styleUrls: ['./beer-menu.component.scss']
})
export class BeerMenuComponent implements OnInit {

  beerImages;
  beerList: Beer[];

  displayedColumns: string[] = ['id', 'image', 'name', 'style', 'ounces',  'ibu', 'abv'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: BeerService) { }

  ngOnInit(): void {
    this.getBeerList();
  }

  getBeerList = () => {
    this.service.getBeerList().subscribe((response: Beer[]) => {
      this.beerList = response;
      // console.log(this.beerList);
      this.getBeerImages();
    });
  }

  getBeerImages = () => {
    this.service.getBeerImages().subscribe((response) => {
      this.beerImages = response;
      // console.log(this.beerImages);
      this.finalBeerList();
    });
  }

  finalBeerList = () => {
    for(const item of this.beerList){
      const img = this.beerImages[Math.floor(Math.random() * this.beerImages.length)];
      item.image = img.image;
    }
    // console.log(this.beerList);
    this.dataSource = new MatTableDataSource(this.beerList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      return data.name.toLowerCase().includes(filter) || data.style.toLowerCase().includes(filter) || data.id.toString() === filter;
    };
  }

  applyFilter = (event: Event) => {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
