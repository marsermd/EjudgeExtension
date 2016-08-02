var isCorrectURL = window.location.href.indexOf("new-judge") !== -1 || window.location.href.indexOf("new-master") !== -1;
var hasCorrectFilter = $('[name=filter_expr]')[0].value.replace(/\s+/g, '').toLowerCase()	.indexOf("status==pr") !== -1;

if (isCorrectURL && hasCorrectFilter)
{	
	function CheckContestPage(contestPage)
	{
		$.ajax({
			url: contestPage
		}).done(function(data) {
			var prRows = $(data).find('table.b1')[0].rows.length;
			if ($(data).find('table.b1')[0].rows.length > 1)
			{
				var currentPermission;
				Notification.requestPermission( function(result) { currentPermission = result } );
				
				var notify = new Notification("New Pending Review!",
				{
					icon : "https://ejudge.lksh.ru/ejudge/logo3.png"
				});
				notify.onclick = function(){
					window.focus(); 
					window.location.href = $($($(data).find('table.b1')[0]).find('td')[7]).find('a').attr('href');
					this.close();
				};
				setTimeout(function(){
					notify.close(); //closes the notification
				}, 4000);
			}
		});
	}
	
	function Update()
	{
		CheckContestPage(window.location.href);
	}

	if(window.location.href.indexOf("filter_expr=") !== -1)
	{
		Update();
	}
	else
	{
		$("Form")[0].submit(); // Adding Filter Expression to adress line. Somehow it is crucial if you want to store your filter.
	}
	
	setInterval(Update, 10000);
}

