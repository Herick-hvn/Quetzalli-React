import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels: string[] = ['Mayo', 'Junio', 'Julio', 'Agosto'];
  public barChartType: ChartType = 'bar'; 
  public pieChartType: ChartType = 'pie'; // Asigna el tipo de gráfico 'pie' aquí
  public lineChartType: ChartType = 'line'; // Asigna el tipo de gráfico 'line' aquí

  public barChartLegend?: boolean;

  public barChartData: any[] = [
    { data: [65, 90, 78, 12], label: 'Producto 1' },
    { data: [28, 98, 47, 29], label: 'Producto 2' },
    { data: [54, 57, 82, 10], label: 'Producto 3' },
    { data: [42, 67, 23, 45], label: 'Producto 4' }
  ];

  public radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
  public radarChartData: any = [
    { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
  ];
  public radarChartType?: ChartType;

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [['Piedra de volcan', 'Materia prima'], ['Pulsera de cristal', 'Producto terminado'], ['Piedra de diamante', 'Poca existencia', 'Inventario'],],
    datasets: [{
      data: [100, 20, 4]
    }]
  };


  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Producto 1 - nombre cliente'},
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B- nombre cliente' },
    { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C - nombre cliente' }
  ];

  public lineChartLabels: Array<any> = ['Mayo', 'Junio', 'Julio', 'Agosto'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    // Color definitions...
  ];
  public lineChartLegend?: boolean;


  constructor() { }

  public chartClicked(e: any): void { }

  public chartHovered(e: any): void { }

  public randomize(): void { }

  ngOnInit() {
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.radarChartType = 'radar';
    this.pieChartType = 'pie';
    this.lineChartLegend = false;
    this.lineChartType = 'line';
    this.barChartLegend = true;
    this.pieChartType= 'pie'; // Asigna el tipo de gráfico 'pie' aquí
    this.lineChartType= 'line'; // Asigna el tipo de gráfico 'line' aquí
  
  }
}
