import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ToastController, ToastOptions } from 'ionic-angular';

import { ItemWrite } from '../../../../models/item';
import { MeasureUnitRead } from '../../../../models/measure-unit';
import { ItemService } from '../../../../services/item';
import { MeasureUnitService } from '../../../../services/measure-unit';

export enum ItemFormMode {
  Create = 'New',
  Update = 'Edit'
}

@Component({
  selector: 'page-item-form',
  templateUrl: './item-form.html'
})
export class ItemFormPage implements OnInit {
  mode: string = ItemFormMode.Create;
  item: ItemWrite;
  itemForm: FormGroup;
  measureUnitList: MeasureUnitRead[];

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private toastCtrl: ToastController,
              private itemService: ItemService,
              measureUnitService: MeasureUnitService) {
    measureUnitService.findMeasureUnits()
      .subscribe((measureUnitList: MeasureUnitRead[]) => {
        this.measureUnitList = measureUnitList;
      });
  }

  ngOnInit(): void {
    this.mode = this.navParams.get('mode');
    if (this.isUpdate()) {
      this.item = this.navParams.get('item');
    }
    this.createForm();
  }

  onSubmit() {
    const {
      name,
      code,
      input_measure_unit,
      input_quantity,
      output_measure_unit,
      output_quantity
    } = this.itemForm.value;
    const input = {
      measure_unit_id: input_measure_unit,
      quantity: input_quantity
    };
    const output = {
      measure_unit_id: output_measure_unit,
      quantity: output_quantity
    };
    const item = new ItemWrite(name, code, input, output);
    if (this.isUpdate()) {
      this.itemService.updateItem(this.item.id, item)
        .subscribe(() => {
          this.createToast('The item was successfully updated!');
          this.itemService.sendEventToListener();
          this.navCtrl.pop();
        });
    } else {
      this.itemService.createItem(item)
        .subscribe(() => {
          this.createToast('An item was successfully created!');
          this.itemService.sendEventToListener();
          this.navCtrl.pop();
        });
    }
  }

  private createForm() {
    let name = '';
    let code = '';
    let input_quantity = null;
    let input_measure_unit_id = null;
    let output_quantity = null;
    let output_measure_unit_id = null;
    if (this.isUpdate()) {
      console.log(this.item);
      ({
        name,
        code,
        input_measure_unit_id,
        input_quantity,
        output_measure_unit_id,
        output_quantity
      } = this.item);
    }
    this.itemForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      code: new FormControl(code, Validators.required),
      input_measure_unit: new FormControl(input_measure_unit_id || '', Validators.required),
      input_quantity: new FormControl(input_quantity || '', [
        Validators.required,
        Validators.min(1)
      ]),
      output_measure_unit: new FormControl(output_measure_unit_id || '', Validators.required),
      output_quantity: new FormControl(output_quantity || '', [
        Validators.required,
        Validators.min(1)
      ])
    });
  }

  private createToast(message: string) {
    const options: ToastOptions = {
      message,
      duration: 2500
    };
    this.toastCtrl.create(options).present();
  }

  private isUpdate() {
    return this.mode === ItemFormMode.Update;
  }
}
