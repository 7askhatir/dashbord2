import React, { Component } from 'react'  
export class Social extends Component{
	
	
    constructor(props) {
		super(props);
		this.state = {
		  tweets: [],
		};
	}

	componentDidMount() {
		fetch("https://salary-backend.herokuapp.com/tweet/20",{
			"method": "GET",
		})
		  .then(res => res.json())
		  .then(
			(result) => {
			  this.setState({
				tweets: result
			  });
			},
			(error) => {
			  this.setState({
				isLoaded: true,
				error
			  });
			}
		  )
	  }


    render(){
        return (  
            <div>
            <div class="clearfix"></div>
            <div class="content-wrapper">
                <div class="container-fluid">
        
                {/* <!-- {{tweet | json}} --> */}
<div class="row mt-3">
	<div class="col-12 col-lg-12 col-xl-6">
		<div class="card-deck flex-column flex-xl-row">
			<div class="card">
				<div class="card-body">
					<div class=""><i class="fa fa-telegram text-white font-33"></i>
					</div>
					<h5 class="mb-0 mt-2">  Telegram<a  target="blank_" href="https://t.me/SalaryEN"><i class="fa fa-external-link"></i></a></h5>
					<p class="mb-0  mt-1">+8.2k</p>
				</div>
			 
			</div>
			<div class="card">
				<div class="card-body">
					<div class=""><i class="zmdi zmdi-twitter text-white font-33"></i>
					</div>
					<h5 class="mb-0 mt-2">Twitter <a  target="blank_" href="https://twitter.com/SalaryEcoFin"><i class="fa fa-external-link"></i></a> </h5>
					<p class="mb-0 mt-1">+13.8K
						</p>
				</div>
				 
			</div>
		</div>
		 
	</div>
	<div class="col-12 col-lg-12 col-xl-6">
		<div class="card-deck flex-column flex-xl-row">
			<div class="card">
				<div class="card-body">
					<div class=""><a href="#"> <i class="zmdi zmdi-instagram text-white font-33"></i></a>
					</div>
					<h5 class="mb-0 mt-2"> Instagram <a   target="blank_" href="https://www.instagram.com/salaryecofinance"> <i  class="fa fa-external-link"></i></a></h5>
					<p class="mb-0  mt-1">+800  </p>
				</div>
			 
			</div>
			<div class="card">
				<div class="card-body">
					<div class=""><a href="#"> <img width="35px" src="https://img.icons8.com/ios-filled/100/ffffff/discord-logo.png"/></a>
					</div>
					<h5 class="mb-0 mt-2">Discord <a target="blank_"  href="https://discord.com/invite/KHWXPPE7KX"> <i  class="fa fa-external-link"></i></a></h5>
					<p class="mb-0 mt-1">New </p>
				</div>
			</div>
		</div>
	</div>
	{/* <!-- <div class="col-12 col-lg-12 col-xl-6">
		<div class="card">
			<div class="card-body">
				<div id="submitted-application"></div>
			</div>
		</div>
		<div class="card">
			<div class="card-body">
				<div id="users-status"></div>
			</div>
		</div>
	</div> --> */}
	<div class="row">
	<div class="col-12 col-lg-12 col-xl-12">
		<div class="card">
			<div class="card-header">Last Annonncement</div>
			<div  class="card-body">
			  {this.state.tweets.map(d => (
			   <div style={{float: 'left'}} class="flex-column flex-xl-row col-12 col-lg-6 col-xl-6" >
			   <div class="card-deck flex-column flex-xl-row">
				   <div  class="card">
				   <a href="https://twitter.com/SalaryEcoFin" target="_blank">
				   {/* <div dangerouslySetInnerHTML={{__html: d.text}} class="card-body">	 */}
                   <div style={{pointerEvents: 'none'}} dangerouslySetInnerHTML={{__html: d.text}} class="card-body">							 
					   </div>
				   </a>
				   </div>
			   </div>
		   </div>
			 
			 ))} 
			</div>
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
export default Social  