import { Component, OnInit } from '@angular/core';
import { BankAccountService } from 'src/app/services/bank-account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  accountNumber!: string;
  accountBalance!: string;

  constructor(private accountService: BankAccountService) {}

  ngOnInit(): void {
    this.getAccountByUser();
  }

  public getAccountByUser() {
    this.accountService.getAccountByAuthenticatedUser().subscribe(data => {
      this.accountNumber = data.accountNumber;
      this.accountBalance = data.accountBalance;
      console.log(data);
    })
  }
}
