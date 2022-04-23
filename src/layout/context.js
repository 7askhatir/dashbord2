
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


 
const query = `

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

 










const initialList = [];
export function setprice(){










    return 1;
} ;
export default function Contest() {




	const [list, setList] = React.useState(initialList);
	const [balance, setBalance] = React.useState('');
	const [price, setPrice] = React.useState('');
	const [volume, setVolume] = React.useState('');
    
	fetch(url, opts)
		.then(res => res.json())
		.then((data) => {
			 
			console.log(data)
            // setList(data.data.ethereum.dexTrades);
			// data.data.ethereum.dexTrades.map((e) => {
			// 	//console.log(e.amount);
			// 	setBalance(e.amount);
            //    // const newList = list.concat({ amount, id: 'c' });
			// //	setList(newList);
			
			// }
				 

			// )
 
		})
		.catch(console.error);

 


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
            
            <input  type="text"   class="form-control" placeholder="Enter your address here (0x00....)" />
            <div    class="input-group-append"> 
                <button  class="btn btn-primary"><i class="fa fa-check"></i> Submit</button> 
            </div>
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
                            <h4 class="mb-0 text-white"> {price}  SLR</h4>
                            <p class="hint">$ </p>
                             
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
                                USDT</h4>
                            <p class="hint">Last Payout : 
                            {/* {_lastPAY} */}
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
                                 USDT</h4>
                            <p class="hint">Queue Position : 
                             {/* {balance} */}
                                <i placement="right"     
                                 class="fa fa-exclamation-circle"></i>
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
                 USDT
                 
            </h3>
        </div>
        </div></div>








        <div class="row">
<div class="col-12 col-lg-8 col-xl-8">
 
        <div class="col-12 col-lg-12">
            <div class="card">
                <div class="card-body">
                    <p class="text-left">Daily trading volume 24h</p>
                    <h4   class="mb-0 text-left">$ {volume}  <small class="small-font"> 
                     
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
                <h5  class="mb-0">$ {volume}  </h5>
                <small class="mb-0">Trading volume, 24h 
                
                    </small>
                    
            </div>
        </div>
        <div class="col-12 col-lg-6">
              <div class="p-3">
                <h5  class="mb-0">$ {price} </h5>
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
<div class="col-12 col-lg-12 col-xl-12">
<div class="card">
     
    <div class="card-body text-center">
        
         <h5 class="text-uppercase text-white">TOTAL TRADING VOLUME = ${balance}   </h5>
         </div>
    
    <div class="table-responsive">
        <table class="table table-hover align-items-center">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Volume</th>
                    <th>Open</th>
                    <th>Close</th>
                </tr>
            </thead>
            <tbody  >
         
            {list.reverse().map((item) => (
							<tr >
                                <td>{item.date.date}</td>
                                <td>{item.amount.toFixed( 2 )}</td>   
                                <td></td>
                                <td></td>
                                
                                
                                </tr>
						))}
             {/* <td   ></td>   */}
             {/* <td   ></td>  */}
            </tbody>
        </table>
    </div>
</div>
</div>
<div class="col-12 col-lg-12 col-xl-6">
<div class="row">
 
</div>
</div>
</div> 







            <div class="overlay toggle-menu"></div>

        </div>

    </div><a href="javaScript:void();" class="back-to-top"><i class="fa fa-angle-double-up"></i> </a>

    </div>
	);
}






