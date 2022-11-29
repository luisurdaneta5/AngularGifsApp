import { Component } from "@angular/core";
import { GifsService } from "src/app/gifs/services/gifs.service";

@Component({
	selector: "app-sidebar",
	templateUrl: "./sidebar.component.html",
})
export class SidebarComponent {
	get historial(): any {
		return this.gifsService.historial;
	}

	buscar(query: string) {
		this.gifsService.buscarGifs(query);
	}

	constructor(private gifsService: GifsService) {}
}
