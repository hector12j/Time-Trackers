$(document).ready(function(){
	var counter;
	var task_id;
	goTasks();
// **************** Events ********************************************

	$('.go-tasks').click(function(){
		$('.nav-link').removeClass('active');
		$(this).addClass('active');
		goTasks();
	});

	$('.go-trackers').click(function(){
		$('.nav-link').removeClass('active');
		$(this).addClass('active');
		goTasksTime();
	});

	$('.new-task-js').click(function(){
		let data = {
			'name': $('#name').val(),
			'description': $('#description').val()
		};	
		$.ajax({
			type: 'POST',
			url: 'http://localhost:3000/api/v1/tasks',
			data: data,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'datatype': 'application/json',
				'Access-Control-Allow-Origin': '127.0.0.1'
			}
		}).done(function(response){
			$('.go-tasks').hasClass('active') ? printTask(response) : printTaskTime(response);
			$('#name').val(''),
			$('#description').val('')
		});
	});

	$(document).on('click', '.task, .task-time', function(){
		if(!$('.timetracker').hasClass('danger')){
			$('.task, .task-time').removeClass('select');
			$(this).addClass('select');
			task_id = $('.select').data('id');
			$('.timetracker').prop('disabled', false);
		}
	});

	$('.timetracker').click(function(){
		// Jquery element
		$this = $(this);
		if ($this.hasClass('danger')) {
			$this.removeClass('danger').html('Star Time-Tracker');
			let seconds = $('.timer').data('seconds');
			let data = {
				'time': seconds,
				'task_id': $('.select').data('id') 
			};
			$.ajax({
				type: 'POST',
				url: 'http://localhost:3000/api/v1/trackers',
				data: data,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'datatype': 'application/json',
					'Access-Control-Allow-Origin': '127.0.0.1'
				}
			}).done(function(response){
				stopTimer();
				$('.timetracker').prop('disabled', true);
				if ($('.go-trackers').hasClass('active')) {
					let $seconds_tag = $('.task-hours',$('.select'));
					let total_seconds = $seconds_tag.data('seconds') + seconds;
					$seconds_tag.data('seconds', total_seconds);
					$seconds_tag.text(getHours(total_seconds));
				}
				$('.task, .task-time').removeClass('select');
				$('.task, .task-time').removeClass('border-select');
				task_id = null;
				$('.timer').data('seconds',0);
				$('.timer').html('<i class="clock fas fa-stopwatch-20 timer-icon"></i> 00:00:00');
			});
		} else {
			$this.addClass('danger').html('Stop Time-Tracker');
			startTimer();
				
		}
	});

// ************************************************************************* 
	// change view
	function goTasks(){
		$('#tasks-container').html('');
		$.ajax({
			type: 'GET',
			url: 'http://localhost:3000/api/v1/tasks'
		}).done(function(tasks){
			if (tasks.length > 0){
				tasks.forEach(function(task){
					printTask(task);
				});
			} else {
				$('#tasks-container').html("<h1> You don't have tasks<h1>");		
			}
		});
	}

	function printTask(task){
		$('#tasks-container h1').remove();
		task['id'] == task_id ? task_class = 'select' : task_class = '';
		let description = task['description'] ? task['description'] : ''; 
		let taskHtml = `<div class="task ${task_class}" style=" background-color: ${task['color']};" data-id="${task['id']}">
						    <h5 class="task-title">${task['name']}</h5>
						    <p class="task-text">${description}</p>
							</div>`;
		$('#tasks-container').append(taskHtml);
	}
	
	function startTimer(){
		counter = setInterval(function(){
			let seconds = $('.timer').data('seconds');
			seconds += 1;
			$('.timer').data('seconds',seconds);
			$('.timer').html('<i class="clock fas fa-stopwatch-20 timer-icon"></i>' + getHours(seconds));
			$('.select').toggleClass('border-select');
		},1000);
	}
	// get time in hours
	function getHours(time){
		let timeSet = '00:00:00';
		if (time) {
			let hours = Math.floor( time / 3600 );  
			let minutes = Math.floor( (time % 3600) / 60 );
			let seconds = time % 60;
			 
			minutes = minutes < 10 ? '0' + minutes : minutes;
			seconds = seconds < 10 ? '0' + seconds : seconds;
			timeSet = hours + ":" + minutes + ":" + seconds;
		}
		return timeSet;
	}

	function stopTimer(){
		clearInterval(counter);
	}
	// change view
	function goTasksTime(){
		$('#tasks-container').html('');
		$.ajax({
			type: 'GET',
			url: 'http://localhost:3000/api/v1/tasks/time'
		}).done(function(tasks){
			if (tasks.length > 0){
				$('#tasks-container').html('');
				tasks.forEach(function(task){
					printTaskTime(task);
				});
			} else {
				$('#tasks-container').append("<h1> You don't have tasks<h1>");		
			}
		});
	}

	function printTaskTime(task){
		$('#tasks-container h1').remove();
		task['id'] == task_id ? task_class = 'select' : task_class = '';
		let description = task['description'] ? task['description'] : ''; 
		let taskHtml = `<div class="task-time ${task_class}" style=" background-color: ${task['color']};" data-id="${task['id']}">
						    <h4 class="task-title">${task['name']}</h4>
						    <p class="task-hours" data-seconds=${task['time']}>${getHours(task['time'])}</p>
							</div>`;
		$('#tasks-container').append(taskHtml);
	}
});	
