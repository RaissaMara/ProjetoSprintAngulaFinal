import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../component/header/header.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
   veiculoSelecionado: string = 'Ranger'; // Começa com Ranger
  
  // Guardará a lista de veículos que veio da API (/vehicles)
  listaVeiculos: any[] = []; 
  
  // Guardará o veículo atual sendo exibido (Cards de cima)
  veiculoAtual: any = {}; 

  // Guardará os dados técnicos da tabela (/vehicleData)
  dadosTecnicos: any = {};

  // MAPA DE VINS: Como sua API /vehicles não retorna o VIN, 
  // precisamos associar o Nome do carro a um VIN válido da sua API node.
  vinMap: any = {
    'Ranger': '2FRHDUYS2Y63NHD22454',
    'Mustang': '2RFAASDY54E4HDU34874', // Usei um dos IDs do switch da API
    'Territory': '2FRHDUYS2Y63NHD22455',
    'Bronco Sport': '2RFAASDY54E4HDU34875'
  };

  constructor(private DashboardService:DashboardService) {}

  ngOnInit() {
    this.carregarVeiculos();
  }

  carregarVeiculos() {
    // 1. Chama a API para pegar a lista de carros
    this.DashboardService.getVehicles().subscribe({
      next: (response: any) => {
        this.listaVeiculos = response.vehicles;
        this.atualizarTela(); // Carrega os dados do primeiro carro
      },
      error: (err: any) => console.error('Erro ao buscar veículos', err)
    });
  }

  // Função chamada quando trocamos o select ou iniciamos a tela
  atualizarTela() {
    // 1. Encontra os dados gerais (Vendas, Conectados, Imagem) na lista que já baixamos
    this.veiculoAtual = this.listaVeiculos.find(v => v.vehicle === this.veiculoSelecionado);

    // 2. Pega o VIN correspondente no nosso mapa
    const vin = this.vinMap[this.veiculoSelecionado];

    // 3. Chama a API para pegar os dados da tabela (Odômetro, Combustível, etc)
    if (vin) {
      this.DashboardService.getVehicleData(vin).subscribe({
        next: (dados: any) => {
          this.dadosTecnicos = dados;
        },
        error: (err: any) => console.error('Erro ao buscar dados técnicos', err)
      });
    }
  }
}
