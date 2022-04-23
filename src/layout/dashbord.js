import React, { Component } from 'react'  
import { getContract, slrContract, contractAddress, gerUserTokenBalance, address } from '../Helpers/contract';
	import { NotificationManager } from 'react-notifications';
	import {dataService} from '../Helpers/storageService'

export class Dashbord extends Component{
     
	
    
	toutaleSuplay=1000000;
    constructor(props) {
		let balance=0;
		if(localStorage.getItem("Balance")!=null){
            balance=localStorage.getItem("Balance")
		}
        super(props);
		this.getpricedata();
		this.getTransactions();
		this. getVolume();
		this.getTotalVolume();
		this.getTotalVolumeOld();
        this.state = {
           SalaryBalance: balance,
           USDTPaid: "0.00",
           PendingUSDT:"0.00",
           TotalUSDTHoldersOld:"0.00",
		   TotalUSDTHoldersNew:"0.00",
           DailyTradingVolume:"0.00",
           Current0rice:"0.00",
           LastTransaction:[],
		   TotalTradingVolume:[],
           SlaryPrice:"0.00",
		   address:0,
		   position:"0",
		   LastPayout:"0"
        }

    } 
	gerUserUSDT_PAID = async (address) => {
		let decimals = 18;
		let info = await slrContract.methods.getAccountDividendsInfo(address).call();
		if (info[2] === 0) {
			return ({
				status: "success",
				paidUSDT: info[3] / Math.pow(10, decimals),
				pendingUSDT: info[4] / Math.pow(10, decimals),
				position : info[2],
				lastPAY : new Date(info[5] * 1000).toLocaleString() 
			});
		} else {
			return ({
				status: "pending",
				paidUSDT: info[3] / Math.pow(10, decimals) == info[4] / Math.pow(10, decimals) ? 0.0 : info[3] / Math.pow(10, decimals),
				pendingUSDT: info[4] / Math.pow(10, decimals),
				position : info[2],
				lastPAY : new Date(info[5] * 1000).toLocaleString() 
			});
		}
	
	};
	getTotalPaidUSDT = async () => {


		let decimals = 18;
	
		let info = await slrContract.methods.getTotalDividendsDistributed().call();
		localStorage.setItem('TotalPaidUSDT',  info / Math.pow(10, decimals));
	
	
		//alert(info/ Math.pow(10, decimals))
		return info / Math.pow(10, decimals);
	};
     

	
    
	getBalanceButton = async (address) => {
		let  tokenBalance = await gerUserTokenBalance(address);
        let USDT_pendings = await this.gerUserUSDT_PAID(address);
	    let  TotalPaidUSDT = await this.getTotalPaidUSDT();
				localStorage.setItem('position', USDT_pendings.position);
				localStorage.setItem('lastPAY', USDT_pendings.lastPAY);
				localStorage.setItem('Balance', tokenBalance);
				localStorage.setItem('USDT_pendings', USDT_pendings.paidUSDT);
				localStorage.setItem('TotalPaidUSDT', TotalPaidUSDT);
				localStorage.setItem('input', address);
				let date1 = new Date();
				localStorage.setItem('date1', date1);
		this.setState({
			SalaryBalance:tokenBalance,
			PendingUSDT:USDT_pendings.paidUSDT,
			USDTPaid:TotalPaidUSDT,
			position:USDT_pendings.position,
			LastPayout:USDT_pendings.lastPAY

		})
		};
     getpricedata(){
        const query = `
        {
            ethereum(network: bsc) {
              dexTrades(
                options: {desc: ["block.height", "tradeIndex"], limit: 1, offset: 0}
                baseCurrency: {is: "0x8619c4b2ecdcb716cd162ec73f332c4d7dc06f1e"}
              ) {
                block {
                  height
                }
                tradeIndex     
                baseAmount
                tradeAmount(in: USD)
              }
            }
          }
          
        `;
        
        const variables = {
            "limit": 10,
            "offset": 0,
            "network": "bsc",
            "token": "0x8619c4b2ecdcb716cd162ec73f332c4d7dc06f1e",
            "from": "2022-03-27",
            "till": "2022-04-03T23:59:59",
            "dateFormat": "%Y-%m-%d"
          };
        
        const url = "https://graphql.bitquery.io/";
        const opts = {
             method: "POST",
             headers: {
                "Content-Type": "application/json",
                "X-API-KEY": "BQYNebMBV72Av20gOE4ajX0ebCCe53xT"
            },
            body: JSON.stringify({
                query
            })
        };
        fetch(url, opts)
        .then(res => res.json())
        .then((data) => {
			var price=0;
             data.data.ethereum.dexTrades.map((e) => {      
				price=e.tradeAmount / e.baseAmount;
             }
             )
             this.setState({
				SlaryPrice: price
			  });
        })
        .catch(console.error)
    }
	 getTransactions(){


		const query = `
		query ($network: EthereumNetwork!, $token: String!, $limit: Int!, $offset: Int!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
			ethereum(network: $network) {
			  dexTrades(
				options: {desc: ["block.height", "tradeIndex"], limit: $limit, offset: $offset}
				date: {since: $from, till: $till}
				baseCurrency: {is: $token}
			  ) {
				block {
				  timestamp {
					time(format: "%Y-%m-%d %H:%M:%S")
				  }
				  height
				}
				tradeIndex
				protocol
				exchange {
				  fullName
				}
				smartContract {
				  address {
					address
					annotation
				  }
				}
				baseAmount
				baseCurrency {
				  address
				  symbol
				}
				quoteAmount
				  tradeAmount(in: USD)
				quoteCurrency {
				  address
				  symbol
				}
				transaction {
				  hash
				}
			  }
			}
		  }
		  
		`;
		
		const variables = {
			"limit": 10,
			"offset": 0,
			"network": "bsc",
			"token": "0x8619c4b2ecdcb716cd162ec73f332c4d7dc06f1e",
			"from": "2022-03-28",
			"till": "2022-04-04T23:59:59",
			"dateFormat": "%Y-%m-%d"
		  };
		
		const url = "https://graphql.bitquery.io/";
		const opts = {
			 method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-API-KEY": "BQYNebMBV72Av20gOE4ajX0ebCCe53xT"
			},
			body: JSON.stringify({
				query, variables
			})
		};
		 
		
		fetch(url, opts)
		.then(res => res.json())
		.then((data) => {
			this.setState({
				LastTransaction: data.data.ethereum.dexTrades
			  });
		})
		.catch(console.error);
		
	}
	 getVolume(){
		const query = `
		query ($network: EthereumNetwork!, $dateFormat: String!, $token: String!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
			ethereum(network: $network) {
			  dexTrades(
				options: {asc: "date.date"}
				date: {since: $from, till: $till}
				baseCurrency: {is: $token}
			  ) {
				date: date {
				  date(format: $dateFormat)
				}
				trades: countBigInt
				amount: baseAmount
				baseCurrency {
				  symbol
				}
				contracts: countBigInt(uniq: smart_contracts)
				currencies: countBigInt(uniq: quote_currency)
			  }
			}
		  }
		  
		`;
		
		const variables = {
			"limit": 10,
			"offset": 0,
			"network": "bsc",
			"token": "0x8619c4b2ecdcb716cd162ec73f332c4d7dc06f1e",
			
			"dateFormat": "%Y-%m-%d"
		  };
		
		const url = "https://graphql.bitquery.io/";
		const opts = {
			 method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-API-KEY": "BQYNebMBV72Av20gOE4ajX0ebCCe53xT"
			},
			body: JSON.stringify({
				query, variables
			})
		};
		 
		
		fetch(url, opts)
		.then(res => res.json())
		.then((data) => {
			this.setState({
				DailyTradingVolume:data.data.ethereum.dexTrades[data.data.ethereum.dexTrades.length - 1].amount,
				TotalTradingVolume:data.data.ethereum.dexTrades,
			})
			// setListChart(data.data.ethereum.dexTrades);
	
		})
		.catch(console.error);
		
	}
	 getTotalVolumeOld(){


		const query = `
		query ($network: EthereumNetwork!, $token: String!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
			ethereum(network: $network) {
			  dexTrades(
				options: {desc: "amount"}
				date: {since: $from, till: $till}
				baseCurrency: {is: $token}
			  ) {
				exchange {
				  fullName
				}
				trades: count
				takers: count(uniq: takers)
				makers: count(uniq: makers)
				amount: baseAmount
				baseCurrency {
				  symbol
				}
			  }
			}
		  }
		  
		`;
		
		const variables = {
			"limit": 10,
			"offset": 0,
			"network": "bsc",
			"token": "0xC24796458fbea043780eeA59EbBA4ad40E87C29b",
			
			"dateFormat": "%Y-%m-%d"
		  };
		
		const url = "https://graphql.bitquery.io/";
		const opts = {
			 method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-API-KEY": "BQYNebMBV72Av20gOE4ajX0ebCCe53xT"
			},
			body: JSON.stringify({
				query, variables
			})
		};
		 
		var t1=0;
		fetch(url, opts)
		.then(res => res.json())
		.then((data) => {
			 this.setState({TotalUSDTHoldersOld:data.data.ethereum.dexTrades[0].amount})
		})
		.catch(console.error);
		
	}
	getTotalVolume(){


		const query = `
		query ($network: EthereumNetwork!, $token: String!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
			ethereum(network: $network) {
			  dexTrades(
				options: {desc: "amount"}
				date: {since: $from, till: $till}
				baseCurrency: {is: $token}
			  ) {
				exchange {
				  fullName
				}
				trades: count
				takers: count(uniq: takers)
				makers: count(uniq: makers)
				amount: baseAmount
				baseCurrency {
				  symbol
				}
			  }
			}
		  }
		  
		`;
		
		const variables = {
			"limit": 10,
			"offset": 0,
			"network": "bsc",
			"token": "0x8619c4b2ecdcb716cd162ec73f332c4d7dc06f1e",
			
			"dateFormat": "%Y-%m-%d"
		  };
		
		const url = "https://graphql.bitquery.io/";
		const opts = {
			 method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-API-KEY": "BQYNebMBV72Av20gOE4ajX0ebCCe53xT"
			},
			body: JSON.stringify({
				query, variables
			})
		};
		 
		var t1=0;
		fetch(url, opts)
		.then(res => res.json())
		.then((data) => {
			 this.setState({TotalUSDTHoldersNew:data.data.ethereum.dexTrades[0].amount})

		})
		.catch(console.error);
		
	}
    checkAdress=null;
	CheckAdress =(event) =>{
		if(event.target.value.length == 42 && event.target.value[0]== 0 && event.target.value[1]=='x')
		this.checkAdress=true;
		else this.checkAdress=false;
		this.setState({
			address : event.target.value
		})
	}
	getParamFromAdress= async (address)=>{
         if(this.checkAdress){
			localStorage.clear();
			this.getBalanceButton(address);
			NotificationManager.success("Success");

		 }
		 else{
			NotificationManager.error('Address not correct', 'Erreur!', 2000);

		 }
	}


	
    

    render() {
		dataService.getData().subscribe(message => {
			this.setState({
				SalaryBalance:message.value
			})

			});
		
		

        return(

<div>
	<div class="clearfix"></div>
	<div class="content-wrapper">
		<div class="container-fluid">
			<div class="col-12 col-lg-12 col-xl-12">
				<div class="input-group">
					<div class="input-group-prepend">
						<span class="input-group-text"><i class="fa fa-edit"></i></span>
					</div>
					{/*
					<button value="Gem" onClick={addItemToCart}>Gem</button>
					*/} <input  type="text" class="form-control" onChange={this.CheckAdress}
						placeholder="Enter address here (0x00....)" />

				</div>

			</div>
			<div class="card mt-3">
	<div class="card-content">
		<div class="row row-group m-0">
			<div class="col-12 col-lg-4 col-xl-4">
				<div class="card bubble">
					<div class="card-body card-block">
						<div class="media align-items-center">
							<div class="media-body">
								<p class="mb-0 text-white">Salary balance</p>
								<h4 class="mb-0 text-white">{ (Number(this.state.SalaryBalance)).toFixed(3)} SLR</h4>
								<p class="hint">$
									{(Number(this.state.SlaryPrice)).toFixed(3)}</p>

								<p class="extra-small-font mt-3 mb-0 text-white">Your SLR
									Holdings</p>
								<br />
							</div>
							<div class="position-relative">
								<img src="assets/images/salary.png" width="80" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-12 col-lg-4 col-xl-4">
				<div class="card bubble">
					<div class="card-body card-block">
						<div class="media align-items-center">
							<div class="media-body">
								<p class="mb-0 text-white">USDT Paid</p>
								<h4 class="mb-0 text-white">{/* {paidUSDT_ ?
									paidUSDT_.toFixed( 2 ) : Number(_USDT_pendings_exact).toFixed(
									2 )} */} {Number(this.state.USDTPaid).toFixed(3)} USDT</h4>
								<p class="hint">Last Payout : {12}</p>

								<p class="extra-small-font mt-3 mb-0 text-white">Your USDT
									Paid</p>
								<br />
							</div>
							<div class="position-relative">
								<img src="assets/images/teather.png" width="80" />
							</div>

						</div>
					</div>
				</div>
			</div>


			<div class="col-12 col-lg-4 col-xl-4">
				<div class="card bubble">
					<div class="card-body card-block">
						<div class="media align-items-center">
							<div class="media-body">
								<p class="mb-0 text-white">Pending </p>
								<h4 class="mb-0 text-white">{/* {USDT_pendings_ ?
									USDT_pendings_.toFixed( 2 ) : Number(_paidUSDT).toFixed( 2 )}
									*/} {Number(this.state.PendingUSDT).toFixed(3)} USDT</h4>
								<p class="hint">
									Queue Position : {this.state.position} {/* <i placement="right"
										class="fa fa-exclamation-circle"></i> */}
								</p>
								<p class="extra-small-font mt-3 mb-0 text-white">Your
									Pending USDT</p>
								<br />
							</div>
							<div class="position-relative">
								<img src="assets/images/teather.png" width="80" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>

	<div class="col-12 col-lg-12 col-xl-12 border-light">
		<div class="card-body">
			<h5 class="text-white mb-0 text-center">
				Total USDT Paid To Salary Holders<span class="float-right"> </span>
			</h5>
			<div class="my-3">
				<p></p>
				<div class="progress my-3">
					<div class="progress-bar"></div>
				</div>
			</div>
			<h3 class="mb-0 text-white text-center">{/* {TotalPaidUSDT_ ?
				TotalPaidUSDT_.toFixed( 2 ) : Number(_TotalPaidUSDT).toFixed( 2 )}
				*/} {(Number(12)+618887.14).toFixed(3)} USDT</h3>
		</div>
	</div>
</div>




			<div class="col-12 col-lg-12 col-xl-12"></div>




			{/*
			<div class="col-12 col-lg-12 col-xl-12">
				<div class="input-group">
					<div class="input-group-prepend">
						<span class="input-group-text"><i class="fa fa-edit"></i></span>
					</div>

					<input type="text" class="form-control"
						placeholder="Enter your address here (0x00....)" />
					<div class="input-group-append">
						<button onClick={getpricedata} class="btn btn-primary">
							<i class="fa fa-check"></i> getpricedata
						</button>
						<button onClick={getVolume} class="btn btn-primary">
							<i class="fa fa-check"></i> getVolume
						</button>
						<button class="btn btn-primary" onClick={sayHello}>
							<i class="fa fa-check"></i>Click
						</button>
					</div>
				</div>
			</div>
			*/}


<div class="row">
<div class="col-12 col-lg-8 col-xl-8">
 
        <div class="col-12 col-lg-12">
            <div class="card">
                <div class="card-body">
                    <p class="text-left">Daily trading volume 24h</p>
                    <h4   class="mb-0 text-left">$ {Number(this.state.DailyTradingVolume).toFixed(3)}  <small class="small-font"> 
                    </small></h4>
                </div>
                <div class="chart-container-">
                <canvas id="chart1"></canvas>
                </div>

                   

                   
            </div>
            
        </div>
     <div class="card">
    <div class="row m-0 row-group text-center border-top border-light-3">
    
        <div class="col-12 col-lg-6">
            <div class="p-3">
                <h5  class="mb-0">$ {Number(this.state.DailyTradingVolume).toFixed(3)}  </h5>
                <small class="mb-0">Trading volume, 24h 
                
                    </small>
                    
            </div>
        </div>
        <div class="col-12 col-lg-6">
              <div class="p-3">
                <h5  class="mb-0">$ {Number(this.state.SlaryPrice).toFixed( 3 )} </h5>
                <small class="mb-0">Current price <span> 
                 
                    </span></small>
            </div>  
        </div>
    </div>
</div>
</div>


<div class="col-12 col-lg-4 col-xl-4">
<div class="card">
    <div class="card-body text-center">
        
        <div class="icon-box bg-light  mx-auto imp"> <i class="fa fa-exclamation-triangle"></i>
        </div><h5 class="text-uppercase text-white">Important</h5>
        <p class="my-5 text-white">Rewards are automatically sent every 60 minutes. It can, however, take longer depending on your holdings and trading volume. Rewards will be triggered once they are big enough to cover the gas fees. If you are a smaller holder it may take from a couple hours to a few days for rewards to appear in your wallet.</p>  
        {/* style="font-size:15px;margin-bottom: 1em !important;margin-top: 1em !important;" */}
    </div>
</div>
</div>




</div>


			<div class="row">
			<div class="col-12 col-lg-6 col-xl-6">
<div class="card">
     
    <div class="card-body text-center">
        
         <h5 class="text-uppercase text-white">TOTAL TRADING VOLUME = ${(Number(this.state.TotalUSDTHoldersOld)+ Number(this.state.TotalUSDTHoldersNew)).toFixed(3)}   </h5>
         {/* <NumberFormat value={2456981} displayType={'text'} thousandSeparator={true} prefix={'$'} /> */}
         </div>
    
    <div class="table-responsive">
        <table class="table table-hover align-items-center">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Volume</th>
                    {/* <th>Open</th>
                    <th>Close</th> */}
                </tr>
            </thead>
            <tbody  >
			
         
            {this.state.TotalTradingVolume.length!=0 ? this.state.TotalTradingVolume.map((item,index) => (
							<tr key={index}>
                                <td>{item.date.date}</td>
                                <td>{item.amount.toFixed( 2 )}</td>   
                                {/* <td></td>
                                <td></td> */}
                                </tr>
						)):<div style={{margin:'10px 90%'}} class="spinner-grow text-info"  role="status">
						<span class="sr-only">Loading...</span>
					  </div>}
             {/* <td   ></td>   */}
             {/* <td   ></td>  */}
            </tbody>
        </table>
    </div>
</div>
</div>
				<div class="col-12 col-lg-6 col-xl-6">
					<div class="card">

						<div class="card-body text-center">
							<h5 class="text-uppercase text-white">Last Transactions</h5>
						</div>

						<div class="table-responsive">
        <table class="table table-hover align-items-center">
            <thead>
                <tr>
                    <th>Timestamp</th>
                    {/* <th>Block</th> */}
                    <th>SLR</th>
                    <th>BNB	</th>
                    <th>USD	</th>
                    <th>Hash	</th>
                </tr>
            </thead>        
			<tbody  >
         
		 {this.state.LastTransaction.length!=0 ? this.state.LastTransaction.map((item,index) => (
						 <tr key={index}>
							 <td>{item.block.timestamp.time}</td>
							 {/* <td>{item.block.height}</td>    */}
							 <td>{item.baseAmount.toFixed(2)} SLR</td>
							 <td>{item.quoteAmount.toFixed(4)} BNB</td>
							 <td>${item.tradeAmount.toFixed(2)} </td>
							 <td><a href={"https://bscscan.com/tx/"+item.transaction.hash} target="_blank">{item.transaction.hash.substring(0, 6)}... </a></td>
							 </tr>
					 )):<div style={{margin:'10px 90%'}} class="spinner-grow text-info"  role="status">
					 <span class="sr-only">Loading...</span>
				   </div>}
		  {/* <td   ></td>   */}
		  {/* <td   ></td>  */}
		 </tbody>
        </table>
                        </div>
					</div>
				</div>
			</div>
			<div class="overlay toggle-menu"></div>

		</div>
         

	</div>
	<a href="javaScript:void();" class="back-to-top"><i
		class="fa fa-angle-double-up"></i> </a>

</div>
        )
    }

	
}

