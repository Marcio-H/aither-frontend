import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-red',
	templateUrl: './red.component.html',
	styleUrls: ['./red.component.sass']
})
export class RedComponent implements OnInit {
	redForm!: UntypedFormGroup;

	constructor(private fb: UntypedFormBuilder) { }

	ngOnInit(): void {
		this.redForm = this.fb.group({
			titulo: [null, [Validators.required]],
			descricao: [null, [Validators.required]],
			autor: [null],
			// imagem
			endereco: [null, [Validators.required]],
			disciplinas: [[]],
			conteudos: [[], [Validators.required]]
		});
	}

	salvar(): void {
		console.log('Salvando');
	}
}
