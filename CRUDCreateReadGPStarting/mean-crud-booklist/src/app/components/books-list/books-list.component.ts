import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../service/crud.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-books-list',
	templateUrl: './books-list.component.html',
	styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit {
	Books: any = [];

	constructor(private crudService: CrudService, private router: Router) {}

	ngOnInit(): void {
		this.fetchBooks();
	}

	fetchBooks(): void {
		this.crudService.GetBooks().subscribe((res) => {
			console.log(res);
			this.Books = res;
		});
	}

	onDelete(id: any): void {
		this.crudService.DeleteBook(id).subscribe(
			(res) => {
				console.log(res);
				// Reload books after deletion
				this.fetchBooks();
			},
			(error) => {
				console.error(error);
			}
		);
	}

	onEdit(book: any): void {
		// Navigate to the edit page with book ID as a parameter
		this.router.navigate(['/edit-book', book._id]);
	}
}
