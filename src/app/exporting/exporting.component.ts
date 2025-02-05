import { Component, OnInit, ViewChild } from '@angular/core';
import { IDataOptions, PivotView, PDFExportService, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { Button } from '@syncfusion/ej2-buttons';
import { PdfExportProperties } from '@syncfusion/ej2-grids';
import { pivot_Data } from '../data';

@Component({
  selector: 'app-container',
  providers: [PDFExportService],
  templateUrl: `./exporting.component.html`
})
export class TableExportingComponent implements OnInit {
    public width: string;
    public dataSourceSettings: IDataOptions;
    public button: Button;

    @ViewChild('pivotview', {static: false})
    public pivotGridObj: PivotView;

    load() {
        this.pivotGridObj.allowEngineExport = true;
    }

    ngOnInit(): void {
        this.dataSourceSettings = {
            dataSource: pivot_Data as IDataSet[],
            columns: [{ name: 'Year', caption: 'Production Year' }],
            values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            filters: [],
        };
        this.width = '100%';

        this.button = new Button({ isPrimary: true });
        this.button.appendTo('#export');

        this.button.element.onclick = (): void => {
            let pdfExportProperties: PdfExportProperties = { };
            this.pivotGridObj.pdfExport(pdfExportProperties, false, undefined, false);
        };
    }
}
