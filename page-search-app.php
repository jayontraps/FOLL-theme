<?php
/**
 * Template name: serach application page
 *
 */

get_header(); ?>

	<div class="wrap foll-content">

		<?php while ( have_posts() ) : the_post(); ?>


		<div id="overlay">
<!-- 
			<div class="container">
			  <div class="outer">
			    <div class="inner">
			      <div class="centered">
			        <h4>loading the latest bird records ...</h4>
			      </div>
			    </div>
			  </div>
			</div>			
			 -->
		</div>

		<div class="innerWrap">

			

<div id="table-overlay">
		<div class="spinner"></div>
	</div>

	

	<div class="wrapper">	

		<div class="row">
			<div class="col-1-3">				
				<div class="selectivity-input">				
					<div class="speciesSearch"></div>
				</div>
			</div>
			<div class="col-2-3">
				<h4>Species <span id="sp-name"></span></h4>
			</div>
		</div>



	 	<ul class="tabs">
	        <li><a href="#tab1">Search</a></li>
	        <li><a href="#tab2">Earliest/Latest dates</a></li>
	        <li><a href="#tab3">Histogram</a></li>
	    </ul>



		<div class="tab_container">

			<div id="tab1" class="tab_content">

				<div class="s-wrap">
					<h4>Location</h4>
					<div class="location_options">
						<select class="locationSearch" name="loc_select" id="locationSearch">
							<option value="">All locations</option>
						</select>
					</div>
				</div>

				<div class="s-wrap">

	         		<h4>Date options</h4>
					<div class="date_set">
					 	<label for="date-range-1">Range</label>
			         	<input type="radio" name="date-range" id="date-range-1" tabindex="3" value="by-range" />
			         	<span>Between:</span> 
		         		<span id="start"></span>
						<span>and:</span> 
						<span id="end"></span>
		     		</div>
					<div class="date_set">
					 	<label for="date-range-2">During</label>
			         	<input type="radio" name="date-range" id="date-range-2" tabindex="4" value="by-month" />
						<select name="byMonth" id="byMonth">
			              <option value="1">January</option>
			              <option value="2">February</option>
			              <option value="3">March</option>
			              <option value="4">April</option>
			              <option value="5">May</option>
			              <option value="6">June</option>
			              <option value="7">July</option>
			              <option value="8">August</option>
			              <option value="9">September</option>
			              <option value="10">October</option>
			              <option value="11">November</option>
			              <option value="12">December</option>
			            </select>         	
			     	</div>
					<div class="date_set">
					 	<label for="date-range-3">All dates</label>
			         	<input type="radio" name="date-range" id="date-range-3" tabindex="3" value="all-dates" />
		 			</div>

	 			</div>

	 			<div class="s-wrap">
			    	<div id="submit" class="btn">Submit</div>
		    	</div>


		    	<div class="s-wrap" id="search-summary">Results: </div>
		
				<table id="results">
					<thead>
						<tr>
							<th class="no-sort">Species</th>
							<th class="no-sort">Date</th>
							<th class="sort">Location <span class="sort-icon"></span> </th>
							<th class="sort">Count <span class="sort-icon"></span> </th>
							<!-- <th>Breeding Code <span class="sort-icon"></span> </th> -->
							<th class="sort">Observer <span class="sort-icon"></span> </th>
							<th class="sort notes">Notes <span class="sort-icon"></span> </th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>

		    </div>	<!-- #tab1 -->		
		




			<div id="tab2" class="tab_content">

				<h4>Arrival and departure dates</h4>

				<h5>Summer Visitors:</h5>
				<p>earliest arrival: <input type="radio" class="arrive-depart" name="arrive-depart" data-season="summer" value="earliest"><br>    
				latest departure: <input type="radio" class="arrive-depart" name="arrive-depart" data-season="summer" value="latest"></p>


				<h5>Winter Visitors:</h5>
				<p>earliest arrival: <input type="radio" class="arrive-depart" name="arrive-depart" data-season="winter" value="earliest"><br>    
				latest departure: <input type="radio" class="arrive-depart" name="arrive-depart" data-season="winter" value="latest"></p>

				<div id="submit_2" class="btn">Submit</div>

				<table id="results_2">
					<thead>
						<tr>
							<th>Date</th>
							<th>Location <span class="sort-icon"></span> </th>
							<th>Count <span class="sort-icon"></span> </th>
							<!-- <th>Breeding Code <span class="sort-icon"></span> </th> -->
							<th>Observer <span class="sort-icon"></span> </th>
							<th>Notes <span class="sort-icon"></span> </th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>

			</div>  


		
			<div id="tab3" class="tab_content">
				<div class="graph-wrapper">

				 	<h4>Histogram range:</h4>
		         	
		         	<span>From the 1st Jan </span> 
	         		<select id="start-graph" class="year" name="graph-start">
	         			<option value="0000">Year</option>
	         			<option value="2015">2015</option>
	         			<option value="2014">2014</option>
	         			<option value="2013">2013</option>
	         			<option value="2012">2012</option>
	         			<option value="2011">2011</option>
	         			<option value="2010">2010</option>
	         			<option value="2009">2009</option>
	         			<option value="2008">2008</option>
	         			<option value="2007">2007</option>
	         			<option value="2006">2006</option>
	         			<option value="2005">2005</option>
	         			<option value="2004">2004</option>
	         			<option value="2003">2003</option>
	         			<option value="2002">2002</option>
	         			<option value="2001">2001</option>
	         			<option value="2000">2000</option>
	         			<option value="1999">1999</option>
	         			<option value="1998">1998</option>
	         			<option value="1997">1997</option>
	         			<option value="1996">1996</option>
	         			<option value="1995">1995</option>
	         			<option value="1994">1994</option>
	         		</select>


					<span>to the 31st Dec </span> 
					<select id="end-graph" class="year" name="graph-end">
	         			<option value="0000">Year</option>
	         			<option value="2015">2015</option>
	         			<option value="2014">2014</option>
	         			<option value="2013">2013</option>
	         			<option value="2012">2012</option>
	         			<option value="2011">2011</option>
	         			<option value="2010">2010</option>
	         			<option value="2009">2009</option>
	         			<option value="2008">2008</option>
	         			<option value="2007">2007</option>
	         			<option value="2006">2006</option>
	         			<option value="2005">2005</option>
	         			<option value="2004">2004</option>
	         			<option value="2003">2003</option>
	         			<option value="2002">2002</option>
	         			<option value="2001">2001</option>
	         			<option value="2000">2000</option>
	         			<option value="1999">1999</option>
	         			<option value="1998">1998</option>
	         			<option value="1997">1997</option>
	         			<option value="1996">1996</option>
	         			<option value="1995">1995</option>
	         			<option value="1994">1994</option>
	         		</select>

		     	</div>
				
				<div class="date_set">
			    	<a href="#" class="btn" id="generateGraph" >Generate graph</a>
		    	</div>	

<!-- 		    	<div id="error-msg"></div>	 -->	

		     	<div style="width: 50%">
					<canvas id="canvas" height="450" width="600"></canvas>
				</div>
				

			</div>


		</div><!-- .tab_container -->


	</div><!-- .wrapper -->



			
		</div>

	</div><!-- .wrap -->		

			

		<?php endwhile; // end of the loop. ?>
		
		

<?php get_footer(); ?>
