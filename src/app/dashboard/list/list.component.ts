import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { uniqBy } from 'lodash';
import { ServerData } from '../../../mock_data/data';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() { }

  displayedColumns: string[] = ['Model', 'RAM', 'HDD', 'Location'];
  dataSource = new MatTableDataSource(ServerData);
  selectedLocation = null;
  selectedHDD = null;
  selectedStorageCapacity = '0';
  selectedRange = 0;
  serverList;
  locationList;
  hddTypeList = ['SAS', 'SATA', 'SSD'];
  allRamSelected = false;
  ram: any = {
    name: 'Ram',
    completed: false,
    color: '',
    ramTypes: [
      { name: '2GB', completed: false },
      { name: '4GB', completed: false },
      { name: '8GB', completed: false },
      { name: '12GB', completed: false },
      { name: '16GB', completed: false },
      { name: '24GB', completed: false },
      { name: '32GB', completed: false },
      { name: '48GB', completed: false },
      { name: '64GB', completed: false },
      { name: '96GB', completed: false },
    ]
  };
  storageList = ['0', '250GB', '500GB', '1TB', '2TB', '3TB', '4TB', '8TB', '12TB', '24TB', '48TB', '72TB'];

  applyFilter() {
    let result = [];
    let tempArr = this.serverList;
    if (this.selectedLocation) {
      tempArr = tempArr.filter(element => {
        if (element.Location === this.selectedLocation) {
          return element;
        }
      });
    }

    if (this.selectedHDD) {
      tempArr = tempArr.filter(element => {
        if (element.HDD.indexOf(this.selectedHDD) > -1) {
          return element;
        }
      });
    }

    if (this.selectedStorageCapacity !== '0') {
      tempArr = tempArr.filter(element => {
        const tempStorage = element.HDD.indexOf('GB') > -1 ? element.HDD.split('GB')[0] : element.HDD.split('TB')[0];
        const totalCapacity = parseInt(tempStorage.split('x')[0], 0) * parseInt(tempStorage.split('x')[1], 0);
        if (this.selectedStorageCapacity.indexOf('GB') > -1) {
          if (totalCapacity > 1000 && element.HDD.indexOf('GB') > -1
            && parseInt(this.selectedStorageCapacity, 0) === totalCapacity) {
            return element;
          }
        }
        else {
          if (totalCapacity > 1000 && element.HDD.indexOf('GB') > -1
            && parseInt(this.selectedStorageCapacity, 0) === Math.ceil(totalCapacity / 1000)) {
            return element;
          }
          else if (parseInt(this.selectedStorageCapacity, 0) === (totalCapacity)) {
            return element;
          }
        }
      });
    }

    if (this.allRamSelected === false) {
        let count = 0;
      this.ram.ramTypes.forEach(element => {
        if (element.completed) {
          let tempList = [];
          tempList = tempArr.filter(res => {
            if (res.RAM.indexOf(element.name) === 0) {
              return res;
            }
          });
          if (tempList.length > 0) {
            if (result.length > 0) {
              result = result.concat(tempList);
            }
            else {
              result = tempList;
            }
          }
        }
        else{
          count = count + 1;
          if (count == this.ram.ramTypes.length){
            result = tempArr;
          }
        }
      });
    }
    if (this.allRamSelected) {
      this.dataSource.data = tempArr;
    } else {
      this.dataSource.data = result;
    }
  }

  formatLabel(value: number) {
    if (value >= 0) {
      switch (value) {
        case 0:
          return 0;
        case 1:
          return '250GB';
        case 2:
          return '500GB';
        case 3:
          return '1TB';
        case 4:
          return '2TB';
        case 5:
          return '3TB';
        case 6:
          return '4TB';
        case 7:
          return '8TB';
        case 8:
          return '12TB';
        case 9:
          return '24TB';
        case 10:
          return '48TB';
        case 11:
          return '72TB';
      }
    }
  }

  setAllRams(completed: boolean) {
    this.allRamSelected = completed;
    if (this.ram.ramTypes == null) {
      return;
    }
    this.ram.ramTypes.forEach(t => t.completed = completed);
  }

  checkSelectedRams() {
    this.allRamSelected = this.ram.ramTypes != null && this.ram.ramTypes.every(t => t.completed);
  }

  changeStorageCapacity() {
    this.selectedStorageCapacity = this.storageList[this.selectedRange];
    this.applyFilter();
  }

  ngOnInit(): void {
    this.serverList = ServerData;
    this.getLocationList();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getLocationList() {
    this.locationList = uniqBy(this.serverList, 'Location');
    this.locationList = this.locationList.map(element => {
      return element.Location;
    });
  }
}
