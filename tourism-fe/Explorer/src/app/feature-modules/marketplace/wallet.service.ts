import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, startWith} from "rxjs";
import {environment} from "../../../env/environment";
import {Wallet} from "./model/wallet.model";
import {AuthService} from "../../infrastructure/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private wallet: BehaviorSubject<Wallet> = new BehaviorSubject<Wallet>(new class implements Wallet {
    balance: number;
    userId: number;
  });

  constructor(private http: HttpClient, private authService: AuthService) {
    this.loadWallet();
  }


  getWalletHTTP(userId: number): Observable<Wallet> {
    return this.http.get<Wallet>(environment.apiHost + `tourist/shoppingcart/getWallet?userId=${userId}`);
  }

  loadWallet() {
    this.authService.user$.subscribe((user) => {
      if (user.id !== 0 && user.role === "tourist") {
        this.getWalletHTTP(user.id).subscribe((wallet) => {
          this.wallet.next(wallet);
        });
      }
    });
  }

  getBalance(): number {
    return this.wallet.value.balance;
  }

  getWallet() {
    return this.wallet.pipe(startWith(this.wallet.value));
  }

  updateWalletBalance(balance: number): void {
    this.wallet.value.balance = balance;
    this.wallet.next(this.wallet.value);
  }


}
