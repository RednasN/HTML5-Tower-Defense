import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  private money = 0;
  private readonly moneyChanged = new BehaviorSubject<number>(0);
  public moneyChanged$ = this.moneyChanged.asObservable();

  public getMoney(): number {
    return this.money;
  }

  public addReward(amount: number): void {
    this.money += amount;
    this.moneyChanged.next(this.money);
  }

  public spendMoney(amount: number): void {
    this.money -= amount;
    this.moneyChanged.next(this.money);
  }
}
