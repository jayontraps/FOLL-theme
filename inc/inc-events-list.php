<?php
$today = date('Ymd');
$the_query = new WP_Query( array(
	'post_type'   => 'events',
    'posts_per_page'   => -1,
	'post_status' => 'publish',
	'meta_key'    => 'expire_date',
    'meta_query' => array(
			array(
		        'key'		=> 'expire_date',
		        'compare'	=> '>=',
		        'value'		=> $today,
		    )
	    ),
	'orderby' => 'meta_value_num',
	'order' => 'ASC'
   
    // 'orderby'     => 'meta_value'
) );

# This will hold what group we're in
$current_header = '';

# The Loop
while ( $the_query->have_posts() ) :
    $the_query->the_post();

    # get the datum for this post
    $temp_date = get_post_meta( get_the_ID(), 'expire_date', true );

    // var_dump($temp_date);

	$y = substr($temp_date, 0, 4);
	$m = substr($temp_date, 4, 2);
	$d = substr($temp_date, 6, 2);

	// create UNIX
	$time = strtotime("{$d}-{$m}-{$y}");

	// format date (23/11/1988)
	// echo date('d/M/Y', $time) . "<br>";    

    # If they aren't the same, we'll start a new group, which for now
    # just means setting a new heading
    // if ( $temp_date != $current_header ) {
    //     $current_header = $temp_date;
    //     echo "<h2>$current_header</h2>";
    // }    

    // if ( $m != $current_header ) { // if they aren't the same, start a new month grouping 
    //     $current_header = $m;
    //     echo "<h2>$current_header</h2>";
    //     echo date('d/M/Y', $time) . " : " . "<br>"; // load the event template for the first event in the new month
    // } else { // it's the same month so load the event template
    // 	echo date('d/M/Y', $time) . " : " . "<br>";
    // }


    if ( $m != $current_header ) : ?>

    	<?php $current_header = $m;?>
		
			
		<header class="month-head">
			<h2><?php echo date('M Y', $time); ?></h2>
		</header>
        

        <?php include "inc-event-entry.php"; ?>
        
     

    <?php else : ?> 

    	<?php include "inc-event-entry.php"; ?>
    	
    <?php endif; 



    # ... do normal loop stuff here
endwhile; wp_reset_postdata(); 


?>