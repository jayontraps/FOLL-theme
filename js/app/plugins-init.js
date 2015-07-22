// extend global array prototype
Array.min = function( array ){
    return Math.min.apply( Math, array );
};

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

// Array.max = function( array ){
//     return Math.max.apply( Math, array );
// };
 


jQuery(document).ready(function($) {

    // tinysort
    var table = document.getElementById('results'),
    	tableHead = table.querySelector('thead'),
    	tableHeaders = tableHead.querySelectorAll('th'),
    	tableBody = table.querySelector('tbody');

    tableHead.addEventListener('click',function(e){
        var tableHeader = e.target,
        textContent = tableHeader.textContent,
        tableHeaderIndex,isAscending,order;

        if (textContent!=='Date') {
            while (tableHeader.nodeName!=='TH') {
                tableHeader = tableHeader.parentNode;
            }
            tableHeaderIndex = Array.prototype.indexOf.call(tableHeaders,tableHeader);
            isAscending = tableHeader.getAttribute('data-order')==='asc';
            order = isAscending?'desc':'asc';
            tableHeader.setAttribute('data-order',order);
            tinysort(
                tableBody.querySelectorAll('tr'),
                {
                    selector:'td:nth-child('+(tableHeaderIndex+1)+')',
                    order: order
                }
            );
        }
    });


    $('th').on('click', function(){
        $('.sort-icon').removeClass('active');
        $(this).find('.sort-icon').addClass('active');
    });


    // dateDropdowns init
    $("#start").dateDropdowns({
        submitFieldName: 'start',
        monthFormat: 'short',
        minYear: '1994'
    });

    $("#end").dateDropdowns({
        submitFieldName: 'end',
        monthFormat: 'short',
        minYear: '1994'
    });  



    //Default Action
    $(".tab_content").hide(); //Hide all content
    $("ul.tabs li:first").addClass("active").show(); //Activate first tab
    $(".tab_content:first").show(); //Show first tab content
    
    //On Click Event
    $("ul.tabs li").click(function() {
        $("ul.tabs li").removeClass("active"); //Remove any "active" class
        $(this).addClass("active"); //Add "active" class to selected tab
        $(".tab_content").hide(); //Hide all tab content
        var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
        $(activeTab).show(); //Fade in the active content
        return false;
    });









});