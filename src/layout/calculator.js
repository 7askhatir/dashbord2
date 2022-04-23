import React, { Component } from 'react'  
  




 
export class Calculator extends Component {  
	
    toutaleSuplay=1000000;
	dailyVolum=1000;
	Balance=1000;
	PRICE=1;
	constructor (props) {
		
		super(props);
		this.state = {
			updatable: false,
			hold: "0.1",
			rewardWeek :"0.000",
			rewardMonth : "0.000",
			rewardYear : "0.000",
			balanceWeek :"0.000",
			balanceMonth : "0.000",
			balanceYear :"0.000"
		};
		this.getpricedata();
		this.getVolume();
		 this.checkEvent_init();
		 this.checkEvent()
	  }
	  
	  checkEvent_init(){
		 
	 
		var  hold=parseInt(this.Balance)*100/(this.toutaleSuplay);
		if(this.Balance<=0) hold=0;
		var rewardWeek=(((this.dailyVolum * 0.08 )* Number(hold) / 100)*7).toFixed(3);
		var rewardMonth=(((this.dailyVolum * 0.08 )* Number(hold) / 100)*30).toFixed(3);
		var rewardYear = (((this.dailyVolum * 0.08 )* Number(hold) / 100)*365.25).toFixed(3);
		var balanceWeek = ((rewardWeek/this.PRICE) + Number(this.Balance) ).toFixed(3);
        var balanceMonth = (rewardMonth/this.PRICE  + Number(this.Balance)).toFixed(3) ;
        var balanceYear = (rewardYear/this.PRICE + Number(this.Balance) ).toFixed(3);
		// console.log(yourSalary);
		this.setState({
			hold: hold,
			rewardWeek:rewardWeek,
			rewardMonth:rewardMonth,
			rewardYear:rewardYear,
			balanceWeek:balanceWeek,
			balanceMonth:balanceMonth,
			balanceYear:balanceYear
	   });
    };



	  checkEvent = (event)=>{
		let yourSalary=0;
		
		  if(event==undefined)yourSalary=1000;
		  else yourSalary=event.target.value;	
		var  hold=parseInt(yourSalary)*100/(this.toutaleSuplay);
		if(yourSalary<=0) hold=0;
		var rewardWeek=(((this.dailyVolum * 0.08 )* Number(hold) / 100)*7).toFixed(3);
		var rewardMonth=(((this.dailyVolum * 0.08 )* Number(hold) / 100)*30).toFixed(3);
		var rewardYear = (((this.dailyVolum * 0.08 )* Number(hold) / 100)*365.25).toFixed(3);
		var balanceWeek = ((rewardWeek/this.PRICE) + Number(yourSalary) ).toFixed(3);
        var balanceMonth = (rewardMonth/this.PRICE  + Number(yourSalary)).toFixed(3) ;
        var balanceYear = (rewardYear/this.PRICE + Number(yourSalary) ).toFixed(3);
		console.log(yourSalary);
		this.setState({
			hold: hold,
			rewardWeek:rewardWeek,
			rewardMonth:rewardMonth,
			rewardYear:rewardYear,
			balanceWeek:balanceWeek,
			balanceMonth:balanceMonth,
			balanceYear:balanceYear
	   });
    };

	
	checkEventVolum = (event)=>{
		this.dailyVolum = event.target.value;
		var  hold=parseInt(this.Balance)*100/(this.toutaleSuplay);
	//	if(yourSalary<=0) hold=0;
		var rewardWeek=(((this.dailyVolum * 0.08 )* Number(hold) / 100)*7).toFixed(3);
		var rewardMonth=(((this.dailyVolum * 0.08 )* Number(hold) / 100)*30).toFixed(3);
		var rewardYear = (((this.dailyVolum * 0.08 )* Number(hold) / 100)*365.25).toFixed(3);
		var balanceWeek = ((rewardWeek/this.PRICE) + Number(this.Balance) ).toFixed(3);
        var balanceMonth = (rewardMonth/this.PRICE  + Number(this.Balance)).toFixed(3) ;
        var balanceYear = (rewardYear/this.PRICE + Number(this.Balance) ).toFixed(3);
		this.setState({
			hold: hold,
			rewardWeek:rewardWeek,
			rewardMonth:rewardMonth,
			rewardYear:rewardYear,
			balanceWeek:balanceWeek,
			balanceMonth:balanceMonth,
			balanceYear:balanceYear
	   });
    };








      
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
			 
		//    console.log(data)
			 
			data.data.ethereum.dexTrades.map((e) => {
				//console.log(e.amount);
				this.dailyVolum =  (e.amount).toFixed(3);
			   // const newList = list.concat({ amount, id: 'c' });
			//	setList(newList);
			
			}
				 
	
			)
	
		})
		.catch(console.error);
		
	}
	
	
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
			 
		    console.log(data)
		   // setList(data.data.ethereum.dexTrades);
			 data.data.ethereum.dexTrades.map((e) => {
			// console.log(e.tradeAmount);
			// console.log(e.baseAmount);
			this.PRICE = ((e.tradeAmount / e.baseAmount)).toFixed(3);
			//alert(this.PRICE)
			//    // const newList = list.concat({ amount, id: 'c' });
			// //	setList(newList);
			
			 }
				 
	
			 )
	
		})
		.catch(console.error);
		 
		
		
	}
	












    render() {  
        return (  
            <div>
                <div class="clearfix"></div> 
            <div class="content-wrapper">
                <div class="container-fluid">

                 
<div class="row pt-2 pb-2">
	<div class="col-sm-9">
		<h4 class="page-title text-left">How to calculate your reward</h4>
		 
	</div>
	  <div class="col-sm-3">
		 
	</div> 
</div>
 
<div class="card">
	<div class="card-header text-uppercase text-left">SALARY Rewards Calculator</div>
	<div class="card-body">
		<form>
			<div class="row">
			
				<div class="col-12 col-lg-6 col-xl-6">
					<div class="form-group row">
						<label class="col-sm-4 col-form-label"  >Your salary*</label>
						<div class="col-sm-8">
							<input type="number"  onChange={this.checkEvent } placeholder="1000" class="form-control" />
						</div>
					</div>
				</div>
				<div class="col-12 col-lg-6 col-xl-6">
					<div class="form-group row">
						<label class="col-sm-4 col-form-label">Daily volume*</label>
						<div class="col-sm-8">
							<input type="text" onChange={this.checkEventVolum } placeholder={this.dailyVolum}        class="form-control"  />
						</div>
					</div>
				</div>
				<div class="col-12 col-lg-6 col-xl-6">
					<div class="form-group row">
						<label class="col-sm-4 col-form-label">Circulating Supply</label>
						<div class="col-sm-4">
							<input type="text" disabled="disabled"  class="form-control" value="1,000,000.00" />
						</div>
						<div class="col-sm-4">
							<input type="text" disabled="disabled"   class="form-control" value={"Holding :"+this.state.hold+"%"}/>
						</div>
					</div>
				</div>
				  <div class="col-12 col-lg-6 col-xl-6">
					<div class="form-group row">
					<label class="col-sm-4 col-form-label">Rewards in %</label>
						<div class="col-sm-8">
							<input type="text" disabled="disabled"  class="form-control" value="8%" />
						</div>
					</div>
				</div>  
				
				 
			</div>
		</form>
	</div>
</div>



<div class="row">
	<div class="col-12 col-lg-12 col-xl-6">
		<div class="card">
			<div class="card-header text-uppercase">Rewards USDT  </div>
			<div class="card-content">
				<div class="row row-group m-0">
					<div class="col-12 col-md-4 col-lg-4 col-xl-4">
						<div class="card-body text-center px-0">
							 
							<h4 class="mb-0"> {this.state.rewardWeek}
							</h4><h6> USDT</h6>
							<p class="mb-0">Rewards week</p>
						</div>
					</div>
					<div class="col-12 col-md-4 col-lg-4 col-xl-4">
						<div class="card-body text-center px-0">
							 
							<h4 class="mb-0">{this.state.rewardMonth} </h4><h6>USDT</h6>
							<p class="mb-0">Rewards Month</p>
						</div>
					</div>
					<div class="col-12 col-md-4 col-lg-4 col-xl-4">
						<div class="card-body text-center px-0">
							 
							<h4 class="mb-0">
							{this.state.rewardYear}
							</h4><h6>USDT</h6>
							<p class="mb-0">Rewards Year</p>
						</div>
					</div>
				</div>
			</div>
			<div class="card-footer text-center" >
				Estimations are based on the current volume of $ {this.dailyVolum}
			</div>
		</div>
	</div>
	<div class="col-12 col-lg-12 col-xl-6">
		
		<div class="card">
			<div class="card-header text-uppercase">By reinvesting your USDT rewards </div>
			<div class="card-content">
				<div class="row row-group m-0">
					<div class="col-12 col-md-4 col-lg-4 col-xl-4">
						<div class="card-body text-center px-0">
							<h4 class="mb-0">{this.state.balanceWeek} </h4><h6>SLR</h6>
							<p class="mb-0">Balance Week</p>
						</div>
					</div>
					<div class="col-12 col-md-4 col-lg-4 col-xl-4">
						<div class="card-body text-center px-0">
							<h4 class="mb-0"> {this.state.balanceMonth}</h4><h6>SLR</h6>
							<p class="mb-0">Balance Month</p>
						</div>
					</div>
					<div class="col-12 col-md-4 col-lg-4 col-xl-4">
						<div class="card-body text-center px-0">
							<h4 class="mb-0"> {this.state.balanceYear}</h4><h6>SLR</h6>
							<p class="mb-0">Balance Year</p>
						</div>
					</div>
				</div>
			</div>
			<div class="card-footer text-center">
				Estimations are based on the current Salary price $ {this.PRICE}
			</div>
		</div>
	</div>
</div>


                    <div class="overlay toggle-menu"></div>

                </div>

            </div><a href="javaScript:void();" class="back-to-top"><i class="fa fa-angle-double-up"></i> </a>
            </div>
   
         
        )  
    }  
}  
  
export default Calculator  