
// import Layout  from './layout/layout'  



// function App() {

// 	return (
// 		<div className="App">  
// 		<Layout/> 

// 	   </div>  

// 	);
// }

// export default App;


// import React from "react";
// import { useQuery, gql } from "@apollo/client";

// const FILMS_QUERY = gql`
// {
// 	launchesPast(limit: 10) {
// 	  mission_name
// 	  launch_date_local
// 	  launch_site {
// 		site_name_long
// 	  }
// 	  links {
// 		article_link
// 		video_link
// 	  }
// 	  rocket {
// 		rocket_name
// 		first_stage {
// 		  cores {
// 			flight
// 			core {
// 			  reuse_count
// 			  status
// 			}
// 		  }
// 		}
// 		second_stage {
// 		  payloads {
// 			payload_type
// 			payload_mass_kg
// 			payload_mass_lbs
// 		  }
// 		}
// 	  }
// 	  ships {
// 		name
// 		home_port
// 		image
// 	  }
// 	}
//   }
// `;

// export default function App() {
//   const { data, loading, error } = useQuery(FILMS_QUERY);

//   if (loading) return "Loading...";
//   if (error) return <pre>{error.message}</pre>

//   return (
//     <div>
//       <h1>SpaceX Launches</h1>
//       <ul>
//         {data.launchesPast.map((launch) => (
//           <li key={launch.id}>{launch.mission_name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import React from "react";
import { useQuery, gql } from "@apollo/client"; 
import { setprice } from "./context";
import Mcontext from './provider'


import { getContract, slrContract, contractAddress, gerUserTokenBalance } from '../Helpers/contract';
 

export const gerUserUSDT_PAID = async (address) => {
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


export const getTotalPaidUSDT = async () => {


	let decimals = 18;

	let info = await slrContract.methods.getTotalDividendsDistributed().call();
	localStorage.setItem('TotalPaidUSDT',  info / Math.pow(10, decimals));


	//alert(info/ Math.pow(10, decimals))
	return info / Math.pow(10, decimals);
};



const getBalanceButton = async (address) => {
    // debugger
          let  tokenBalance = await gerUserTokenBalance(address);
          let USDT_pendings = await gerUserUSDT_PAID(address);
          let  TotalPaidUSDT = await getTotalPaidUSDT();
          
    
        localStorage.setItem('position', USDT_pendings.position);
        localStorage.setItem('lastPAY', USDT_pendings.lastPAY);
    
    
            // address_local = address;
            localStorage.setItem('Balance', tokenBalance);
            // localStorage.setItem('USDT_paid', USDT_paid);
            localStorage.setItem('USDT_pendings', USDT_pendings.paidUSDT);
            localStorage.setItem('TotalPaidUSDT', TotalPaidUSDT);
            localStorage.setItem('USDT_pendings_exact', USDT_pendings.pendingUSDT);
            localStorage.setItem('input', address);
            // let date1 = new Date();
            // localStorage.setItem('date1', date1);
          
        };
    

const initialList = [];var msg=false;
export default function Dash() {

 
	const [address_local, setAddress_local] = React.useState("");
	const [uSDT_pendings, setUSDT_pendings] = React.useState("");
	const [uSDT_pendings_exact, setUSDT_pendings_exact] = React.useState("");
	const [totalPaidUSDT, setTotalPaidUSDT] = React.useState("");
	const [balance, setBalance] = React.useState("0.000");
	const [lastPAY, setLastPAY] = React.useState("");
	const [position, setPosition] = React.useState("");


	// var address_local = ;
	// var balance_last = localStorage.getItem('Balance');
	// var _paidUSDT = localStorage.getItem('USDT_pendings');
	// var _TotalPaidUSDT = localStorage.getItem('TotalPaidUSDT');
	// var _USDT_pendings_exact = localStorage.getItem('USDT_pendings_exact');

   // alert(localStorage.getItem('address'));
    // setAddress_local(localStorage.getItem('address'));
 
    // setAddress_local(localStorage.getItem('address'));
    function sayHello() {



        getVolume();
        getpricedata();
        getTotalVolume();
        getTransactions();



      //  alert(localStorage.getItem('address'));
        setAddress_local(localStorage.getItem('address'));
        setUSDT_pendings(localStorage.getItem('USDT_pendings'));
        setUSDT_pendings_exact(localStorage.getItem('USDT_pendings_exact'));
        setTotalPaidUSDT(localStorage.getItem('TotalPaidUSDT'));
        setBalance(localStorage.getItem('Balance'));
        setLastPAY(localStorage.getItem('lastPAY'));
        setPosition(localStorage.getItem('position'));
        setInput_(localStorage.getItem('input'));

      }
    

        setTimeout(() => {
           sayHello()  
        }, 2000);











function getTransactions(){


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
         
        console.log(data)
        setListTrns(data.data.ethereum.dexTrades);
        //data.data.ethereum.dexTrades.map((e) => {
            //console.log(e.amount);
         //   setTotalVolume(e.amount);
           // const newList = list.concat({ amount, id: 'c' });
        //	setList(newList);
        
        // }
             

        // )

    })
    .catch(console.error);
    
}

     
function getTotalVolume(){


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
     
    
	fetch(url, opts)
    .then(res => res.json())
    .then((data) => {
         
       // console.log(data)
       // setList(data.data.ethereum.dexTrades);
        data.data.ethereum.dexTrades.map((e) => {
            //console.log(e.amount);
            setTotalVolume(e.amount);
           // const newList = list.concat({ amount, id: 'c' });
        //	setList(newList);
        
        }
             

        )

    })
    .catch(console.error);
    
}


      
function getVolume(){


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
         
       console.log(data)
        setList(data.data.ethereum.dexTrades);
        setListChart(data.data.ethereum.dexTrades);
        data.data.ethereum.dexTrades.map((e) => {
            //console.log(e.amount);
            setVolume(e.amount);
           // const newList = list.concat({ amount, id: 'c' });
        //	setList(newList);
        
        }
             

        )

    })
    .catch(console.error);
    
}



function getpricedata(){


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
         
       // console.log(data)
       // setList(data.data.ethereum.dexTrades);
         data.data.ethereum.dexTrades.map((e) => {
        // console.log(e.tradeAmount);
        // console.log(e.baseAmount);
             setPrice(e.tradeAmount / e.baseAmount);
        //    // const newList = list.concat({ amount, id: 'c' });
        // //	setList(newList);
        
         }
             

         )

    })
    .catch(console.error);
     
    
    
}


React.useEffect(() => console.log('Hi '))

	const [list, setList] = React.useState(initialList);
	const [listTrns, setListTrns] = React.useState(initialList);
	const [listChart, setListChart] = React.useState(initialList);
	
	const [price, setPrice] = React.useState('');
	const [volume, setVolume] = React.useState('');
	const [totalVolume, setTotalVolume] = React.useState('');
    

   

//     setPrice(price());
// console.log(price);
 





    //     fetch(urlPrice, optsPrice)
	// 	.then(res => res.json())
	// 	.then((data) => {
			 
	// 		console.log(data)
    //         // setList(data.data.ethereum.dexTrades);
	// 		// data.data.ethereum.dexTrades.map((e) => {
	// 			//console.log(e.amount);
	// 			// setvolume(e.amount);
    //            // const newList = list.concat({ amount, id: 'c' });
	// 		//	setList(newList);
			
	// 		// }
				 

	// 		// )
 
	// 	})
	// 	.catch(console.error);


	const [input_, setInput_] = React.useState('');

    // this.handleChange = handleChange.bind(this);
    // this.handleSubmit = handleSubmit.bind(this);



 
    function handleChange(event) {   
      //  alert(event.target.value);
    setInput_(event.target.value);
    
          }


 
          function handleClick(event) {   
            //  alert(event.target.value);
          
            localStorage.removeItem("position")
            localStorage.removeItem("lastPAY")
            localStorage.removeItem("Balance")
            localStorage.removeItem("USDT_pendings")
            // localStorage.removeItem("TotalPaidUSDT")
            localStorage.removeItem("USDT_pendings_exact")
            localStorage.removeItem("input")


            getBalanceButton(input_);
            setTimeout(() => {
                sayHello()
            }, 1000);
          
                }
          
    // function handleSubmit(event) {
//       //alert('A name was submitted: ' + this.state.value);
//       let V1 =  getBalanceButton(this.state.value);
//       console.log("-----adress-------"+this.state.value);
//       console.log("-----V1-------"+V1);
//       ///alert(V1)
//       let V2 = old_getBalanceButton(this.state.value);
//       setTimeout(() => {
//           console.log(tokenBalance__+"------------"+old_tokenBalance__);
//           console.log("-----adress-------"+adrs);
//           this.setState({TOKEN: toString(tokenBalance__)});
//           this.setState({oldTOKEN: toString(old_tokenBalance__)});
//       }, 2000);
      
//       // alert(tokenBalance__)
//       // 0xC14A2a9Bf6152640aED9525300c80931d2323d86 = getBalanceButton(this.state.value);
// // setTimeout(() => {
// // 	this.setState({TOKEN: toString(tokenBalance__)});
// // }, 2000);
// // 		 this.setState({oldTOKEN: toString(V1)});
      
//       // this.setState({tokenBalance_old: old_getBalanceButton(this.state.value)});
//       event.preventDefault();
    // }
  




	// const { data, loading, error } = useQuery(FILMS_QUERY);

	// if (loading) return "Loading...";
	// if (error) return <pre>{error.message}</pre>
	//   console.log(this.state.topics) //returns [] the first render, returns ['topic1','topic2','topic3'] on the second render;

	return (
        <div>
                


        <div class="clearfix"></div>
    <div class="content-wrapper">
        <div class="container-fluid">




        
                <div class="col-12 col-lg-12 col-xl-12">
				<div class="input-group">
					<div class="input-group-prepend"> <span class="input-group-text"><i class="fa fa-edit"></i></span>
					</div>
					{/* <button value="Gem" onClick={addItemToCart}> Gem</button> */}
					
									<input  onChange={handleChange} type="text" class="form-control" placeholder="Enter address here (0x00....)" />
							
								 
									<button onClick={handleClick} class="btn btn-primary"><i class="fa fa-check"></i> Submit</button>
							 	
                                    <button class="btn btn-primary" onClick={sayHello}>
                <i class="fa fa-refresh"></i> Refresh 
    </button>
				</div>
				
			</div>
 



        {/* <div class="col-12 col-lg-12 col-xl-12">
        <div class="input-group">
            <div class="input-group-prepend"> <span class="input-group-text"><i class="fa fa-edit"></i></span>
            </div>
            
            <input  type="text"   class="form-control" placeholder="Enter your address here (0x00....)" />
            <div    class="input-group-append"> 
                <button onClick={getpricedata} class="btn btn-primary"><i class="fa fa-check"></i> getpricedata</button> 
                <button onClick={getVolume} class="btn btn-primary"><i class="fa fa-check"></i> getVolume</button> 
                <button class="btn btn-primary" onClick={sayHello}>
                <i class="fa fa-check"></i>Click 
    </button>
            </div>
        </div>
    </div> */}









        <div class="card mt-3">
<div class="card-content">
<div class="row row-group m-0">



     
     
        <div class="col-12 col-lg-4 col-xl-4">
            <div class="card bubble">
                <div class="card-body card-block">
                    <div class="media align-items-center">
                        <div class="media-body">
                            <p class="mb-0 text-white">Salary balance</p>
                            <h4 class="mb-0 text-white">  {balance} SLR</h4>
                            <p class="hint">$ {(Number(balance)*Number(price)).toFixed(3)}</p>
                             
                            <p class="extra-small-font mt-3 mb-0 text-white">Your SLR Holdings</p>
                                <br/> 
                        </div>
                        <div class="position-relative"><img src="assets/images/salary.png"  width="80"/>
                        </div>
                    
                </div>
            </div>
            </div></div>
        <div class="col-12 col-lg-4 col-xl-4">
            <div class="card bubble">
                <div class="card-body card-block">
                    <div class="media align-items-center">
                        <div class="media-body">
                            <p class="mb-0 text-white">USDT Paid</p>
                            <h4 class="mb-0 text-white">
                                {/* {paidUSDT_ ? paidUSDT_.toFixed( 2 ) : Number(_USDT_pendings_exact).toFixed( 2 )}  */}
                                {Number(uSDT_pendings_exact).toFixed(3)} USDT</h4>
                            <p class="hint">Last Payout : 
                            {lastPAY}
                              </p>
                                  
                            <p class="extra-small-font mt-3 mb-0 text-white">Your USDT Paid</p>
                                <br/> 
                        </div>
                        <div class="position-relative"><img src="assets/images/teather.png"  width="80"/>
                        </div>
                    
                </div>
            </div>
            </div></div>


        <div class="col-12 col-lg-4 col-xl-4">
            <div class="card bubble">
                <div class="card-body card-block">
                    <div class="media align-items-center">
                        <div class="media-body">
                            <p class="mb-0 text-white">Pending USDT</p>
                            <h4 class="mb-0 text-white">
                                {/* {USDT_pendings_ ? USDT_pendings_.toFixed( 2 ) : Number(_paidUSDT).toFixed( 2 )}  */}
                                {Number(uSDT_pendings).toFixed(3)}  USDT</h4>
                            <p class="hint">Queue Position : 
                             {position}
                                {/* <i placement="right"     
                                 class="fa fa-exclamation-circle"></i> */}
                                  </p>
                            <p class="extra-small-font mt-3 mb-0 text-white">Your Pending USDT</p>
                                <br/> 
                        </div>
                        <div class="position-relative"><img src="assets/images/teather.png"  width="80"/>
                        </div>
                        </div>	</div>
                </div>
            </div>
        </div>
 
        </div>

    <div class="col-12 col-lg-12 col-xl-12 border-light">
        <div class="card-body">
            <h5 class="text-white mb-0 text-center">Total USDT Paid To Salary Holders<span class="float-right"> </span></h5>
            <div class="my-3">
                <p>
                 
                </p>
                <div class="progress my-3"  >
                                    <div class="progress-bar" ></div>
                                </div>
            </div>
            <h3 class="mb-0 text-white text-center">
                {/* {TotalPaidUSDT_ ? TotalPaidUSDT_.toFixed( 2 ) : Number(_TotalPaidUSDT).toFixed( 2 )}  */}
               {(Number(totalPaidUSDT)+618887.14).toFixed(3)}   USDT
                 
            </h3>
        </div>
        </div></div>








        <div class="row">
<div class="col-12 col-lg-8 col-xl-8">
 
        <div class="col-12 col-lg-12">
            <div class="card">
                <div class="card-body">
                    <p class="text-left">Daily trading volume 24h</p>
                    <h4   class="mb-0 text-left">$ {Number(volume).toFixed(3)}  <small class="small-font"> 
                     
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
                <h5  class="mb-0">$ {Number(volume).toFixed(3)}  </h5>
                <small class="mb-0">Trading volume, 24h 
                
                    </small>
                    
            </div>
        </div>
        <div class="col-12 col-lg-6">
              <div class="p-3">
                <h5  class="mb-0">$ {Number(price).toFixed( 3 )} </h5>
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
        
         <h5 class="text-uppercase text-white">TOTAL TRADING VOLUME = ${(Number(totalVolume)+ 6825941.53).toFixed(3)}   </h5>
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
         
            {list.map((item) => (
							<tr >
                                <td>{item.date.date}</td>
                                <td>{item.amount.toFixed( 2 )}</td>   
                                {/* <td></td>
                                <td></td> */}
                                
                                
                                </tr>
						))}
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
        
         <h5 class="text-uppercase text-white"> </h5>
         </div>
        <div>
        
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
         
            {listTrns.map((item) => (
							<tr >
                                <td>{item.block.timestamp.time}</td>
                                {/* <td>{item.block.height}</td>    */}
                                <td>{item.baseAmount.toFixed(2)} SLR</td>
                                <td>{item.quoteAmount.toFixed(4)} BNB</td>
                                <td>${item.tradeAmount.toFixed(2)} </td>
                                <td><a href={"https://bscscan.com/tx/"+item.transaction.hash} target="_blank">{item.transaction.hash.substring(0, 6)}... </a></td>
                                
                                
                                </tr>
						))}
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

    </div><a href="javaScript:void();" class="back-to-top"><i class="fa fa-angle-double-up"></i> </a>

    </div>
	);
}