import React, { Component, useState } from 'react'  
  

import { getContract  , slrContract ,contractAddress , gerUserTokenBalance } from '../Helpers/contract';


import { old_gerUserTokenBalance } from '../Helpers/old_contract';


 var tokenBalance__ = 0;
 var old_tokenBalance__ = 0;
 var adrs = 0;
// var tokenBalance_old;

const old_getBalanceButton = async (address) => {
	// debugger
	let tokenBalance = await old_gerUserTokenBalance(address); 
	old_tokenBalance__ = tokenBalance;
	console.log("-----adress2-------"+address);
		console.log("-----tokenBalance-------"+tokenBalance);
	adrs = address;
	// this.setState({TOKEN: toString(V2)});
	//alert(tokenBalance);

	// USDT_pendings = await gerUserUSDT_PAID(address); 
	// TotalPaidUSDT = await getTotalPaidUSDT(); 
 return tokenBalance;
  };



const getBalanceButton = async (address) => {
	// debugger
	let tokenBalance_old = await gerUserTokenBalance(address); 
	tokenBalance__ = tokenBalance_old;
	console.log("-----tokenBalance__-------"+tokenBalance__);
	
	// alert(tokenBalance_old);
	return tokenBalance_old;
	
	// USDT_pendings = await gerUserUSDT_PAID(address); 
	// TotalPaidUSDT = await getTotalPaidUSDT(); 
 
  };

//   this.state = {tokenBalance_old: ''};
var aa = 0;
export class Old extends Component {  





	constructor(props) {
		super(props);
		this.state = {value: '',oldTOKEN:0,TOKEN:0};
		aa = this.props.id;
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
		// const [cart, setCart] = useState();
	  }
	
	  handleChange(event) {    this.setState({value: event.target.value});  }


	  handleSubmit(event) {
		//alert('A name was submitted: ' + this.state.value);
		let V1 =  getBalanceButton(this.state.value);
		console.log("-----adress-------"+this.state.value);
		console.log("-----V1-------"+V1);
		///alert(V1)
		let V2 = old_getBalanceButton(this.state.value);
		setTimeout(() => {
			console.log(tokenBalance__+"------------"+old_tokenBalance__);
			console.log("-----adress-------"+adrs);
			this.setState({TOKEN: toString(tokenBalance__)});
			this.setState({oldTOKEN: toString(old_tokenBalance__)});
		}, 2000);
		
		// alert(tokenBalance__)
		// 0xC14A2a9Bf6152640aED9525300c80931d2323d86 = getBalanceButton(this.state.value);
// setTimeout(() => {
// 	this.setState({TOKEN: toString(tokenBalance__)});
// }, 2000);
// 		 this.setState({oldTOKEN: toString(V1)});
		
		// this.setState({tokenBalance_old: old_getBalanceButton(this.state.value)});
		event.preventDefault();
	  }
	




    render() {  
        return (  
            <div>
                <div class="clearfix"></div>
				<div class="content-wrapper">
                <div class="container-fluid">





<form onSubmit={this.handleSubmit}>
                <div class="col-12 col-lg-12 col-xl-12">
				<div class="input-group">
					<div class="input-group-prepend"> <span class="input-group-text"><i class="fa fa-edit"></i></span>
					</div>
					{/* <button value="Gem" onClick={addItemToCart}> Gem</button> */}
					
									<input value={this.state.value} onChange={this.handleChange} type="text" class="form-control" placeholder="Enter address here (0x00....)" />
							
								 
									<button type="submit" class="btn btn-primary"><i class="fa fa-check"></i> Submit</button>
							 	
					 
				</div>
				
			</div>
</form>








                <div class="card mt-3">
	<div class="card-content">
		<div class="row row-group m-0">



			 
			 
                {/* <div class="col-12 col-lg-4 col-xl-4">
					<div class="card bubble">
						<div class="card-body card-block">
							<div class="media align-items-center">
								<div class="media-body">
									<p class="mb-0 text-white">Salary balance</p>
									<h4 class="mb-0 text-white"> {balance_ ? balance_ : balance_last}  SLR</h4>
									<p class="hint">$ </p>
									 
									<p class="extra-small-font mt-3 mb-0 text-white">Your SLR Holdings</p>
										<br/> 
								</div>
								<div class="position-relative"><img src="assets/images/salary.png"  width="80"/>
								</div>
							
						</div>
					</div>
                    </div></div> */}
				<div class="col-12 col-lg-6 col-xl-6">
					<div class="card bubble">
						<div class="card-body card-block">
							<div class="media align-items-center">
								<div class="media-body">
									<p class="mb-0 text-white">Old SALARY Token</p>
									<h4 class="mb-0 text-white">{tokenBalance__} SLR V1  {this.props.id} {aa}</h4>
									
									
									{/* <p class="hint">Last Payout : {_lastPAY}  </p> */}
										  
									{/* <p class="extra-small-font mt-3 mb-0 text-white">Your USDT Paid</p> */}
										<br/> 
								</div>
								<div class="position-relative"><img src="assets/images/salary.png"  width="80"/>
								</div>
							
						</div>
					</div>
                    </div></div>


				<div class="col-12 col-lg-4=6 col-xl-6">
					<div class="card bubble">
						<div class="card-body card-block">
							<div class="media align-items-center">
								<div class="media-body">
									<p class="mb-0 text-white">New SALARY Token </p>
									<h4 class="mb-0 text-white"> {old_tokenBalance__} SLR V2</h4>
									{/* <p class="hint">Queue Position :  {_position}
										<i placement="right"     
										 class="fa fa-exclamation-circle"></i>
										  </p> */}
									{/* <p class="extra-small-font mt-3 mb-0 text-white">Your Pending USDT</p> */}
										<br/> 
								</div>
								<div class="position-relative"><img src="assets/images/salary.png"  width="80"/>
								</div>
                                </div>	</div>
						</div>
					</div>
				</div>
		 
                </div>

		</div>








              

 







                  

                </div>

            </div><a href="javaScript:void();" class="back-to-top"><i class="fa fa-angle-double-up"></i> </a>
            </div>
   
         
        )  
    }  
}  
  
export default Old  






