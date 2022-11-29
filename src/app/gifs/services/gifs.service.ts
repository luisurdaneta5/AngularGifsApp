import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Gif, SearchGifsResponse } from "../interfaces/gifs.interface";

@Injectable({
	providedIn: "root",
})
export class GifsService {
	private apiKey: string = "0ntl1LphKjCaI24IQik5Eq7kUxyUlNCK";
	private servicioUrl: string = "https://api.giphy.com/v1/gifs";
	private _historial: string[] = [];

	public results: Gif[] = [];

	constructor(private http: HttpClient) {
		this._historial = JSON.parse(localStorage.getItem("historial")!) || [];

		this.results = JSON.parse(localStorage.getItem("resultados")!) || [];
	}

	get historial() {
		return [...this._historial];
	}

	buscarGifs(query: string) {
		query = query.trim().toLocaleLowerCase();

		if (!this._historial.includes(query)) {
			this._historial.unshift(query);
			this._historial = this._historial.splice(0, 10);

			localStorage.setItem("historial", JSON.stringify(this._historial));
		}

		const params = new HttpParams()
			.set("api_key", this.apiKey)
			.set("q", query)
			.set("limit", 10);

		this.http
			.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {
				params,
			})
			.subscribe((res) => {
				this.results = res.data;
				localStorage.setItem(
					"resultados",
					JSON.stringify(this.results)
				);
			});
	}
}
