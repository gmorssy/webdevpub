<script>
	import { Clock } from "./clock";
	import { fade, fly } from 'svelte/transition';
	import { spring } from 'svelte/motion';

	// Variables
	let clock = new Clock(0,0);

	let totalClocks = 1;
	let buttonMode = 'submit';
	let clockDisplay = '00:00';
	let addClockId = 2;

	let title = 'Clock Selector';

	let clocks = [{id: 1, name: '', alarm: '', type: 'digital', style: 'standard'}];

	let analogMinutes = spring(clock.hours * 60 + clock.minutes);
	let progressMinutes = spring(clock.minutes);
	let progressHours = spring(clock.hours);

	let alarmActive = {color: '#00000009', button: 'Set Alarm'}
	let resultText = '';

	let style = 'standard';
	let clockType = 'digital';

	let mainColor = 'white';
	let subColor = 'black';

	function addClock() {
		if (totalClocks < 3) {			
			// Clone element
			clocks.push({id: addClockId, name: '', alarm: '', type: 'digital', style: 'standard'});

			// Update variables
			totalClocks++;
			addClockId++;
		}
	}

	function removeClock() {
		if (totalClocks > 1) {

			// Update list + variable
			clocks.pop();
			totalClocks--;
			addClockId--;
		}
	}

	function updateClocks() {
		let clockDisplays = document.getElementsByClassName('block-clock');
		
		for (let i = 0; i < clockDisplays.length; i++) {
			clockDisplays[i].id = (i+1).toString();
			
			// Update name
			clockDisplays[i].getElementsByClassName('name-display')[0].innerHTML = (clocks[i].name == '') ? 'Clock ' + (i+1) : clocks[i].name;

			// Update alarm
			clockDisplays[i].getElementsByClassName('alarm-display')[0].innerHTML = (clocks[i].alarm == '') ? 'Alarm (--:--)' : 'Alarm (' + clocks[i].alarm + ')';
		}

	}

	function tick() {
		clockDisplay = clock.tick();
		analogMinutes.set(clock.hours * 60 + clock.minutes);
		
		if (clock.minutes % 5 == 0) {
			progressMinutes.set(clock.minutes/5);
		}

		if (clock.hours % 2 == 0) {
			progressHours.set(clock.hours/2);
		}

		for (let i = 0; i < clocks.length; i++) {
			// Activate alarm
			if (clockDisplay == clocks[i].alarm) {
				title = (clocks[i].name != '') ? clocks[i].name + ' is going off!' : 'An alarm is going off!';
				alarmActive.color = '#ff5454';
				alarmActive.button = 'Disable';

				buttonMode = 'disable';
			}
		}

	}

	function button() {
		let id = document.getElementById('clock-list').value;
		let arrayPos;

		for (let i = 0; i < clocks.length; i++) {
			if (clocks[i].id == id) {
				arrayPos = i;
				
			}
		}

		// Delay for removing result text
		const delay = ms => new Promise(res => setTimeout(res, ms));

		const cooldown = async () => {
			await delay(3000);
			resultText = '';
		}

		cooldown();
		// Submit
		if (buttonMode == 'submit') {
			clocks[arrayPos].alarm = document.getElementById('input').value;
			
			if (clocks[arrayPos].alarm != '') {
				resultText = "Alarm has been set to " + clocks[arrayPos].alarm + ".";
			}

			else {
				resultText = 'Please enter a valid time!';
			}
		}

		// Disable
		else if (buttonMode == 'disable') {
			title = 'Clock Selector';
			alarmActive.color = '#00000009';
			alarmActive.button = 'Set Alarm';

			buttonMode = 'submit';

		}
	}

	function applyAttributes() {
	    let id = document.getElementById('clock-list').value;
    	let arrayPos;

    	for (let i = 0; i < clocks.length; i++) {
        	if (clocks[i].id == id) {
            	arrayPos = i;
        	}
   		}

    	// Add all attributes to variables
    	clocks[arrayPos].name = document.getElementById('name-input').value;
	    clockType = document.getElementById('clock-type').value;
    	style = document.getElementById('style-type').value;

		// Update style
		switch (style) {
			case 'day':
				mainColor = '#9be4f3';
				subColor = 'black';
				break;
		
			case 'night':
			mainColor = '#1452a9';
				subColor = 'white';
				break;

			default:
				mainColor = 'white';
				subColor = 'black';
				break;
		}
	}

	setInterval(updateClocks, 10);
	setInterval(tick, 1000);

</script>

<style>
	#title {
		font-size: 70px;
		text-align: center;
		font-family: 'Merriweather', serif;
		color: rgb(20, 20, 20);

		margin-top: 0;
		padding-top: 30px;
		padding-bottom: 30px;
		background-color: #00000010;
		border: 3px transparent;
		border-radius: 30px;
		margin-bottom: 20px;

		transition: background-color 0.7s;
	}

	:global(body) {
		padding: 0;
	}
	
	.center {
  		margin: auto;

  		display: flex;
  		flex-direction: row;
  		justify-content: center;
	}

	.block-clock {
		border: 3px solid rgb(169, 169, 169);

		background-color: #00000006;

		min-width: 180px;
		max-width: 180px;
		
		min-height: 200px;
		max-height: 200px;
		
		border-radius: 5%;
  		
		padding: 20px;
		margin-left: 2px;
		margin-right: 2px;
		display: block;

		transition: border-color 0.5s;
	}

	.block-clock:hover {
		border-color: black;

		box-shadow: 0px 2px 5px rgba(0,0,0,0.5);
	}

	#add-clocks {
		border: 3px solid rgb(169, 169, 169);

		background-color: #00000006;

		min-width: 50px;
		max-width: 50px;

		min-height: 50px;
		max-height: 50px;

		border-radius: 10px;

		margin-left: 5px;

		text-align: center;
		font-weight: bold;

		transition: border-color 0.5s;
	}

	.add-buttons {
		display: flex;
		flex-direction: column;
	}

	#add-clocks:hover {
		border-color: black;

		box-shadow: 0px 2px 5px rgba(0,0,0,0.5);
	}

	#clock-display {
		text-align: center;
		font-size: 80px;

		margin-top: 0;
		margin-bottom: 10px;
	}

	.middle {
		display: flex;
		justify-content: center;
	}

	#button {
		min-width: 90px;
		max-width: 90px;

		border: 2px solid black; 
		border-radius: 5px;

		background-color: rgb(109, 238, 210);

		margin-left: 5px;
	}

	#cmd {
		justify-content: center;

		border: 3px solid rgb(169, 169, 169);
		background-color: #00000006;

		min-width: 250px;
		max-width: 450px;
		
		min-height: 180px;
		max-height: 180px;
		
		border-radius: 10px;

		padding: 10px;
		margin-bottom: 20px;

		transition: border-color 0.5s;
	}

	#cmd:hover {
		border-color: black;

		box-shadow: 0px 2px 5px rgba(0,0,0,0.5);		
	}

	button, select {
		cursor: pointer;
	}

	input {
		cursor: text;
	}

	option {
		color: black;
	}

	@media only screen and (max-width: 690px) {
  		#all-clocks {
			display: flex;
    		flex-direction: column;
			min-width: 200px;
			max-width: 250px;
  		}
		
		.add-buttons {
			position: fixed;
			right: 8px;
			bottom: 0%;
		}

		.block-clock {
			margin-left: 0px;
			margin-bottom: 5px;
		}
	}

	@media only screen and (max-width: 520px) {
		#name-input {
			width: 20%;
		}

		#title {
			font-size: 50px;
		}
	}

	@media only screen and (max-width: 326px) {
  		#title {
    		padding-bottom: 10px;
			padding-top: 10px;
  		}
	}

	@media only screen and (max-width: 317px) {
  		.middle {
    		flex-direction: column;
  		}

		#name-input {
			width: 100%;
		}

		#cmd {
			max-height: 600px;
		}
	}

</style>
<main style="height: 100vh">
	<div style="position: fixed; background-color: {mainColor}; width: 100%; height: 100%; transition: background-color 0.7s;"></div>
	<body>
		<h1 id="title" style="color: {subColor}; background-color: {alarmActive.color}">{title}</h1>

		<div class="center">
			<!-- Options -->
			<div id="cmd">
				<div class="middle">
					<select id="clock-list" style="background-color: transparent; ; border: 2px solid {subColor};">
						{#each [1,2,3] as clockListItem}
							<option class="option-clock" value="{clockListItem}">Clock {clockListItem}</option>
						{/each}
					</select>
				</div>

				<div class="middle">
					<input placeholder="Enter Name" maxlength="20" id="name-input" style="background-color: transparent; color: {subColor}; border: 2px solid {subColor};">
					<!-- Alarm -->
					<input style="margin-left: 5px; border: 2px solid black;" type="time" id="input">
					<button id="button" on:click={() => button()}>{alarmActive.button}</button>
				</div>

				<div class="middle">
					<select id="clock-type" style="background-color: transparent; color: {subColor}; border: 2px solid {subColor};">
						<option value="digital">Digital</option>
						<option value="analog">Analog</option>
						<option value="loading-bar">Loading Bar</option>
					</select>

					<select id="style-type" style="background-color: transparent; color: {subColor}; border: 2px solid {subColor};">
						<option value="standard">Standard</option>
						<option value="day">Day</option>
						<option value="night">Night</option>
					</select>
					<button id="d-clocks" style="background-color: transparent; color: {subColor}; border: 2px solid {subColor}; border-radius: 5px; margin-left: 5px" on:click={applyAttributes}>Apply</button>
				</div>
				<p id="result-text" style="text-align: center; color: {subColor};">{resultText}</p>
			</div>

			<div class="add-buttons">
				<button id="add-clocks" style="color: {subColor}" on:click={addClock}>+</button>
				<button id="add-clocks" style="color: {subColor}" on:click={removeClock}>-</button>
			</div>
		</div>

			<div class="center" id="all-clocks">		
				{#each clocks as clockLoop}
				<div class="block-clock" in:fly={{ y: 40 }} out:fly={{ y: 40 }}>
					{#key clocks.length}
					<div class="middle">
						<!-- Digital clock -->
						{#if clockType == 'digital'}
							<p id="clock-display" class="display" style="color: {subColor}">{clockDisplay}</p>
						{/if}
						<!-- Analog clock -->
						{#if clockType == 'analog'}
							<svg id="analog" class="display" width="100" height="100">
								<!-- markers -->
								{#each [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55] as minute}
										<line x1="0" y1="50" x2="10" y2="50" stroke="{subColor}" transform="rotate({30 * minute}, 50, 50)" style="stroke-width: 0.8"/>
									{#each [1, 2, 3, 4] as offset}
										<line x1="0" y1="50" x2="5" y2="50" stroke="{subColor}" transform="rotate({6 * (minute + offset)}, 50, 50)" style="stroke-width: 0.4" />
									{/each}
								{/each}
								<circle class="clock-face" cx="50" cy="50" r="3" fill="{subColor}" />
								
								<!-- Hour and minute pointers -->
								<line class="hour-pointer" x1="15" y1="50" x2="50" y2="50" stroke="{subColor}" stroke-width="2" transform="rotate({0.5 * $analogMinutes + 90}, 50, 50)" />
								<line class="minute-pointer" x1="0" y1="50" x2="50" y2="50" stroke="{subColor}" stroke-width="2" transform="rotate({6 * $analogMinutes + 90}, 50, 50)" />
							</svg>
						{/if}
						<!-- Progress bar -->
						{#if clockType == 'loading-bar'}
							<svg id="progress" class="display" width="150" height="100">
								<rect x="0" y="0" width="150" height="40" fill="{mainColor}" />
								<rect x="0" y="50" width="150" height="40" fill="{mainColor}" />
				
								<rect x="4" y="4" width="{$progressHours * ((150-8)/12)}" height="32" fill="#b115b7" />
								<rect x="4" y="54" width="{$progressMinutes * ((150-8)/12)}" height="32" fill="#e656eb" />
				
								{#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as divider}
									<line x1="{divider * ((150-8)/12) + 4}" y1="90" x2="{divider * ((150-8)/12) + 4}" y2="50" stroke="{mainColor}" stroke-width="3" />
									<line x1="{divider * ((150-8)/12) + 4}" y1="40" x2="{divider * ((150-8)/12) + 4}" y2="0" stroke="{mainColor}" stroke-width="3" />
								{/each}
				
								<rect x="0" y="0" width="150" height="40" fill="none" stroke-width="3" stroke="{subColor}" />
								<rect x="0" y="50" width="150" height="40" fill="none" stroke-width="3" stroke="{subColor}" />
							</svg>
						{/if}
					</div>
					
					<p class="alarm-display" style="text-align: center; font-size: 25px; margin-top: 1px; color: {subColor}" in:fade={{ delay: 10, duration: 100 }}>Alarm ({clockLoop.alarm})</p>
					<p class="name-display" style="text-align: center; font-size: 20px; color: {subColor}" in:fade={{ delay: 10, duration: 100 }}>Clock {clockLoop.name}</p>
					{/key}
				</div>
				{/each}
			</div>
	</body>
</main>