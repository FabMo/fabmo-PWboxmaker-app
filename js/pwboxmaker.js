$( document ).ready(function() {
	$('.advanced').hide();
	
});


$('#check_lid').on('click', function (){
	if ($('#check_lid').prop('checked')) {
        $('#change').attr("src","images/lid.png");
         }
       else
         {
        $('#change').attr("src","images/no_lid.png");
         }
});


$('.exit-modal').on('click', function (){
	$('.modal, .modal-container').fadeOut('fast');
});


$('.basic-link').on('click', function (){
	$('.basic').show();
	$('.advanced').hide();
	$('.lock').hide();
	$('.unlock').hide();
	$('.advanced').attr("disabled", "true");
	$('.advanced + ul').hide();
	$('.basic + ul').show();
});
$('.advanced-link').on('click', function (){
	$('.basic').hide();
	$('.advanced').show();
	$('.lock').show();
	$('.unlock').hide();
	$('.advanced').attr("disabled", "true");
	$('.parsley-required').hide();
	$('.advanced + ul').show();
	$('.basic + ul').hide();
});

$('.lock').on('click', function (){
	$('.lock').hide();
	$('.unlock').show();
	$('.advanced').removeAttr('disabled');
});

$('.unlock').on('click', function (){
	$('.lock').show();
	$('.unlock').hide();
	$('.advanced').attr("disabled", "true");
});


$('#submit').on('click', function (){
	$('.basic-setting').parsley().on('form:submit', function() {
		
		if ($('#check_lid').prop('checked')) {
		 hasLid = true;
         }
       else
         {
		  hasLid = false;
         }
	      
		// start creating file 
		var BoxLength = parseFloat($('#box-length').val());
		var BoxWidth = parseFloat($('#box-width').val());
		var BoxHeight = parseFloat($('#box-height').val());
		var speed = parseFloat($('#feed-rate').val());
		//var BitDiameter = parseFloat($('#bit-diameter').val());
		var BitDiameter = 0.25
		var ThruCut = Math.abs(parseFloat($('#thru-cut').val()));	
		var BoxThickness = parseFloat($('#box-thickness').val())
		var BottomThickness = parseFloat($('#bottom-thickness').val())
		var BottomDiff = (BottomThickness - BitDiameter)
		if (BottomDiff < 0) {
			BottomDiff = 0
		    }
		var BoxCutDepth =  0 - Math.abs(BoxThickness + ThruCut);
        var BottomCutDepth =  0 - Math.abs(BottomThickness + ThruCut);
		var safeZ = parseFloat($('#safe-Z').val());

		//var Border = parseFloat($('#blank-border').val());
		//var Border = 0
		var NumberOfSteps = 4
		var BottomSlot = 0.5
		var LidSlot = 0.5
		var BitRadius = BitDiameter / 2
		var NubSideCut = BitDiameter - 0.01		
		var FirstSlot = 1
		var SecondSlot = BoxHeight - 1
		var minX = (0 - BitRadius - 0.01)
		var minY = (0 - BitRadius - 0.01)		
		var SideLength = BoxLength - ((BoxThickness / (NumberOfSteps + 1)) * 2)
		// and values based on plywood thickness
		var GrooveDepth = (0 -(BoxThickness - 0.25)).toFixed(2)
		var StepSize = (BoxThickness / (NumberOfSteps + 1)).toFixed(3)
		var ZStep = (0 - StepSize)
		//var SideLength = (BoxLength - (StepSize * 2)).toFixed(2)
		var NubHeight = (0 - (StepSize * 1))
		
		var maxX = (BoxHeight + BitRadius + 0.01)
		var maxY = (BoxWidth + BitRadius + 0.01)
		var maxSideLength = (SideLength + BitRadius + 0.01)
		
		
		var firstStepLeft = (StepSize - BitRadius)
		var firstStepRightSlots =  (BoxWidth - (StepSize - BitRadius))

		var firstStepRightNubs = (SideLength - (StepSize - BitRadius))
		if (hasLid){
			var headerCode = [ 
				"' Box file made with ShopBot Project Wizard",
				"' for a box with a sliding lid ",
				"' ",
				"' length of this box is " + BoxLength,
				"' width of this box is " + BoxWidth,
				"' height of this box is " + BoxHeight,
				"' and it's cut out of plywood that's the same thickness that you input...",
				"' which is actually " + BoxThickness + " inches thick",
				"' with a " + BitDiameter + " inch diameter bit that's zeroed at the table surface",
				"",

				"' ",
				"",
				"'Bit Diameter: " + BitDiameter,

				"'Safe Z: " + safeZ,
				"MZ, " + safeZ,
				"'Turn Spindle On",
				"SO, 1,1",
				"'Set the Move Speed to " + speed,
				"MS," + speed,
				"'Wait 3 sec to give the router a chance to spin up before starting to move",
				"PAUSE 3",
				""
			];
			}
		 
		  else
		   {
			var headerCode = [ 
				"' Box file made with ShopBot Project Wizard",
				"' for a box without a sliding lid ",
				"' ",
				"' length of this box is " + BoxLength,
				"' width of this box is " + BoxWidth,
				"' height of this box is " + BoxHeight,
				"' and it's cut out of plywood that's the same thickness that you input...",
				"' which is actually " + BoxThickness + " inches thick",
				"' with a " + BitDiameter + " inch diameter bit that's zeroed at the table surface",
				"",
				"' ",
				"",
				"'Bit Diameter: " + BitDiameter,
				"VC, " + BitDiameter,
				"'Safe Z: " + safeZ,
				"MZ, " + safeZ,
				"'Turn Spindle On",
				"SO, 1,1",
				"'Set the Move Speed to " + speed,
				"MS," + speed,
				"'Wait 3 sec to give the router a chance to spin up before starting to move",
				"PAUSE 3",
				""
			];
		  };
		  
		  if(hasLid) {
			  
			var Sides = [

			"MZ," + safeZ,
			"M2, " + minX + ", " + firstStepLeft + ", " + safeZ,
			"MZ," + (ZStep * 4).toFixed(2),
			"MX," + FirstSlot,
			"MY," + (firstStepLeft + (StepSize * 3.75)).toFixed(2),
			"MY," + firstStepLeft,
			"MX," + SecondSlot,
			"MY," + (firstStepLeft + (StepSize * 3.75)).toFixed(2),
			"MY," + firstStepLeft,
			"MX," + maxX,
			"MZ," + (ZStep * 3).toFixed(2),
			"MY," + (firstStepLeft + (StepSize * 1)).toFixed(2),
			"MX," + minX,
			"MZ," + (ZStep * 2).toFixed(2),
			"MY," + (firstStepLeft + (StepSize * 2)).toFixed(2),
			"MX," + maxX,
			"MZ," + (ZStep * 1).toFixed(2),
			"MY," + (firstStepLeft + (StepSize * 3)).toFixed(2),
			"MX," + minX,
			"' right end",
			"MZ," + safeZ,
			"M2," + minX + "," + firstStepRightSlots,
			"MZ," + (ZStep * 4).toFixed(2),
			"MX," + FirstSlot,
			"MY," + (firstStepRightSlots - (StepSize * 3.75)).toFixed(2),
			"MY," + firstStepRightSlots,
			"MX," + SecondSlot,
			"MY," + (firstStepRightSlots - (StepSize * 3.75)).toFixed(2),
			"MY," + firstStepRightSlots,
			"MX," + maxX,
			"MZ," + (ZStep * 3).toFixed(2),
			"MY," + (firstStepRightSlots - (StepSize * 1)).toFixed(2),
			"MX," + minX,
			"MZ," + (ZStep * 2).toFixed(2),
			"MY," + (firstStepRightSlots - (StepSize * 2)),
			"MX," + maxX,
			"MZ," + (ZStep * 1).toFixed(2),
			"MY," + (firstStepRightSlots - (StepSize * 3)).toFixed(2),
			"MX," + minX,
			 "' cut groove for top sliding panel",
			"MZ," + safeZ,
			"M2, " + LidSlot + ", " + maxY ,
			"MZ," + GrooveDepth,
			"MY," + minY,
			"MX, " + (LidSlot - BottomDiff),
			"MY, " + maxY,
			"MZ," + safeZ,
			"' cut groove for bottom panel",
			"MZ," + safeZ,
			"M2," + (BoxHeight - BottomSlot).toFixed(2) + "," + minY,
			"MZ," + GrooveDepth,
			"MY," + maxY,
			"MX, " + ((BoxHeight - BottomSlot) + BottomDiff),
			"MY, " + minY,
			"MZ," + safeZ
			];
			
			var cutoutSide1 = [
			
			"' cut out part",
			"MZ," + BoxCutDepth,
			"MX," + maxX,
			// "VB, .1," + (BoxWidth / 4) + ",.4,.3,1,2",
			"MY," + minY,
			"MX," + minX,
			// "VB, .1," + (BoxWidth / 4) + ",.4,.3,1,2",
			"MY," + maxY,
			"MX," + maxX,
			"MZ," + safeZ,
            "' done"			
			];
			
			
			var cutoutSide2 = [
			"' cut out part",
			"MZ," + BoxCutDepth,
			"MX," + maxX,
			// "VB, .1," + (BoxWidth / 4) + ",.4,.3,1,2",
			"MY," + minY,
			"MX," + LidSlot,
			// "VB, .1," + (BoxWidth / 4) + ",.4,.3,1,2",


            //"MY," + (maxY + (StepSize * 1)),
            //"MX," + LidSlot,
            "MY," + maxY,
            "MX," + maxX,           
            "MZ," + safeZ,
            "' done"
			];
			
			var Side3 = [
			"' cut left end",
			"M2," + minX + "," + firstStepLeft,
			"MZ," + (ZStep * 4),			
			"MX," + (FirstSlot - NubSideCut),
			"MY," + (firstStepLeft  + (StepSize * 3)),
			"MZ," + NubHeight,
			"MX," + (FirstSlot + NubSideCut),
			"MZ," + (ZStep * 4),
			"MY," + firstStepLeft,
			"MX," + (SecondSlot - NubSideCut),
			"MY," + (firstStepLeft + (StepSize * 3)),
			"MZ," + NubHeight,
			"MX," + (SecondSlot + NubSideCut),
			"MZ," + (ZStep * 4),
			"MY," + firstStepLeft,
			"MX," + maxX,
			"MZ," + (ZStep * 3),
			"MY," + (firstStepLeft  + (StepSize * 1)),
			"MX," + (SecondSlot + NubSideCut),
			"MZ," + NubHeight,
			"MX," + (SecondSlot - NubSideCut),
			"MZ," + (ZStep * 3),
			"MX," + (FirstSlot + NubSideCut),
			"MZ," + NubHeight,
			"MX," + (FirstSlot - NubSideCut),
			"MX," + (FirstSlot - (BitDiameter * 2)),
            "MY," + (firstStepLeft + (StepSize * 2)),
			"MX," + (FirstSlot + NubSideCut),
			"MZ," + (ZStep * 2),
			"MX," + (SecondSlot - NubSideCut),
			"MZ," + NubHeight,
			"MX," + (SecondSlot + NubSideCut),
			"MZ," + (ZStep * 2),
			"MX," + maxX,
			"MZ," + NubHeight,
			"MY," + (firstStepLeft + (StepSize * 3)),
			//"MX," + (FirstSlot - NubSideCut),
			"MX," + LidSlot,
			"MZ," + safeZ,
	
			"' next cut out right end",
						
			"M2," + minX + "," + firstStepRightNubs,
			"MZ," + (ZStep * 4),
			"MX," + (FirstSlot - NubSideCut),
			"MY," + (firstStepRightNubs - (StepSize * 3)),
			"MZ," + NubHeight,
			"MX," + (FirstSlot + NubSideCut),
			"MZ," + (ZStep * 4),
			"MY," + firstStepRightNubs,
			"MX," + (SecondSlot - NubSideCut),
			"MY," + (firstStepRightNubs - (StepSize * 3)),
			"MZ," + NubHeight,

			"MX," + (SecondSlot + NubSideCut),
			"MZ," + (ZStep * 4),
			"MY," + firstStepRightNubs,
			"MX," + maxX,
			"MZ," + (ZStep * 3),
			"MY," + (firstStepRightNubs - (StepSize * 1)),
			"MX," + (SecondSlot + NubSideCut),
			"MZ," + NubHeight,
			"MX," + (SecondSlot - NubSideCut),
			"MZ," + (ZStep * 3),
			"MX," + (FirstSlot + NubSideCut),
			"MZ," + NubHeight,
			"MX," + (FirstSlot - NubSideCut),
			"MZ," + (ZStep * 3),
			"MX," + minX,
			"MZ," + (ZStep * 2),
			"MY," + (firstStepRightNubs  - (StepSize * 2)),
			"MX," + (FirstSlot - NubSideCut),
			"MZ," + NubHeight,
			"MX," + (FirstSlot + NubSideCut),
			"MZ," + ( ZStep * 2),
			"MX," + (SecondSlot - NubSideCut),
			"MZ," + NubHeight,
			"MX," + (SecondSlot + NubSideCut),
			"MZ," + ( ZStep * 2),
			"MX," + maxX,
			"MZ," + NubHeight,
			"MY," + (firstStepRightNubs - (StepSize * 3)),
			"MX," + minX,
			"MZ," + safeZ,
			
			"' groove for sllding lid",
            "M2, " + LidSlot + ", " + maxSideLength,
			"MZ," + GrooveDepth,
			"MY," + minY,
			"MX, " + (LidSlot - BottomDiff),
			"MY, " + maxSideLength,
			"MZ," + safeZ,
			"' groove for bottom ",     
			"M2," + (BoxHeight - BottomSlot) + ", " + minY,
			"MZ," + GrooveDepth,
			"MY," + maxSideLength,
			"MX, " + ((BoxHeight - BottomSlot) + BottomDiff),
			"MY, " + minY,
			"MZ," + safeZ,
			
			"' cut out side panel",
			"MZ," + BoxCutDepth,
			"MX," + maxX,
			// "VB, .1," + (BoxLength / 4) + ",.4,.3,1,2",
			"MY," + minY,

            "MX, " + LidSlot,
            "MY," + (minY - StepSize),
            "MX," + minX,       
			// "VB, .1," + (BoxLength / 4) + ",.4,.3,1,2",
			"MY," + maxSideLength,
			"MX," + maxX,
			"MZ," + safeZ	
			]
			
		
			var Side4 = [
			
			"MZ," + safeZ,
			"M2," + minX +  "," + firstStepLeft,
			"MZ," + (ZStep * 4),
			"MX," + (FirstSlot - NubSideCut), 
			"MY," + (firstStepLeft + (StepSize * 3)), 
			"MZ," + NubHeight,
			"MX," + (FirstSlot + NubSideCut),
			"MZ," + (ZStep * 4),
			"MY," + firstStepLeft, 
			"MX," + (SecondSlot - NubSideCut), 
			"MY," + (firstStepLeft + (StepSize * 3)), 
			"MZ," + NubHeight,
			"MX," + (SecondSlot + NubSideCut), 
			"MZ," + (ZStep * 4),
			"MY," + firstStepLeft, 

			"MX," + maxX, 
			"MZ," + (ZStep * 3),
			"MY," + (firstStepLeft + (StepSize * 1)),
			"MX," + (SecondSlot + NubSideCut), 
			"MZ," + NubHeight,
			"MX," + (SecondSlot - NubSideCut), 
			"MZ," + (ZStep * 3),
			"MX," + (FirstSlot + NubSideCut), 
			"MZ," + NubHeight,
			"MX," + (FirstSlot - NubSideCut), 
			"MZ," + (ZStep * 3),
			"MX," + minX,  
			"MZ," + (ZStep * 2),
			"MY," + (firstStepLeft + (StepSize * 2)),
			"MX," + (FirstSlot - NubSideCut), 
			"MZ," + NubHeight,
			"MX," + (FirstSlot + NubSideCut), 
			"MZ," + (ZStep * 2),
			"MX," + (SecondSlot - NubSideCut), 
			"MZ," + NubHeight,
			"MX," + (SecondSlot + NubSideCut), 
			"MZ," + (ZStep * 2),

			"MX," + maxX, 
			"MZ," + NubHeight,
			"MY," + (firstStepLeft + (StepSize * 3)), 
			"MX," + minX,
			"MZ," + safeZ,
			// ' second end of side 2
			"M2," + minX + "," + firstStepRightNubs, 
			"MX," + (FirstSlot - NubSideCut),
			"MZ," + (ZStep * 4),
			"MY," + (firstStepRightNubs - (StepSize * 3)), 
			"MZ," + NubHeight,
			"MX," + (FirstSlot + NubSideCut),
			"MZ," + (ZStep * 4),
			"MY," + firstStepRightNubs,
			"MX," + (SecondSlot - NubSideCut), 
			"MY," + (firstStepRightNubs - (StepSize * 3)), 
			"MZ," + NubHeight,
			"MX," + (SecondSlot + NubSideCut), 
			"MZ," + (ZStep * 4),
			"MY," + firstStepRightNubs, 
			"MX," + maxX, 
			"MZ," + (ZStep * 3),
			"MY," + (firstStepRightNubs - (StepSize * 1)), 
			"MX," + (SecondSlot + NubSideCut), 
			"MZ," + NubHeight,
			"MX," + (SecondSlot - NubSideCut), 
			"MZ," + (ZStep * 3),
			"MX," + (FirstSlot + NubSideCut),
			"MZ," + NubHeight,
			"MX," + (FirstSlot - NubSideCut),
			"MX," + (FirstSlot - (BitDiameter * 2)),
		    "MY," + (firstStepRightNubs - (StepSize * 2)), 
			"MX," + (FirstSlot + NubSideCut), 
			"MZ," + (ZStep * 2),
			"MX," + (SecondSlot - NubSideCut),
			"MZ," + NubHeight,
			"MX," + (SecondSlot + NubSideCut), 
			"MZ," + (ZStep * 2),
			"MX," + maxX,
			"MZ," + NubHeight,
			"MY," + (firstStepRightNubs - (StepSize * 3)), 
			"MX," + (FirstSlot - NubSideCut), 

			"MZ," + safeZ,

			"M2," + (BoxHeight -LidSlot) + "," + maxSideLength,
			"MZ," + GrooveDepth,
		    "MY," + minY,
		    "MZ," + safeZ,
			
            "' groove for bottom ",
        
			"M2," + BottomSlot +  ", " + minY,
			"MZ," + GrooveDepth,
			"MY," + maxSideLength,
			"MX, " + (BottomSlot - BottomDiff),
			"MY, " + minY,
			"MZ," + safeZ,
			"' cut out side panel",
			
			"MZ," + BoxCutDepth,
			"MX," + maxX,
			// "VB, .1," + (BoxLength / 4) + ",.4,.3,1,2",
			"MY," + minY,
			"MX," + minX,
			// "VB, .1," + (BoxLength / 4) + ",.4,.3,1,2",
			
			"MY," + (maxSideLength + StepSize),
            "MX," + LidSlot,
            "MY," + maxSideLength,
            "MX," + maxX,             
			"MZ," + safeZ,
			"' done"		
			]
			//full height side
			var first = headerCode.concat(Sides, cutoutSide1);
			var firstCode = first.join('\n');
			fabmoDashboard.submitJob(firstCode, {filename : 'PWBoxmaker_Side1.sbp'}
									
			);
			
			//Side with cutout relief for lid
			
			var second = headerCode.concat(Sides, cutoutSide2);
			var secondCode = second.join('\n');

			fabmoDashboard.submitJob(secondCode, {filename : 'PWBoxmaker_Side2.sbp'}
										
			);
			
			var third = headerCode.concat(Side3);
			var thirdCode = third.join('\n');
				fabmoDashboard.submitJob(thirdCode, {filename : 'PWBoxmaker_Side3.sbp'}
										 
			 );	  
			 
			var fourth = headerCode.concat(Side4);
			var fourthCode = fourth.join('\n');
				fabmoDashboard.submitJob(fourthCode, {filename : 'PWBoxmaker_Side4.sbp'}
										
             );	
			
			var lidPanel = [
			  "M2, " + minX + ", " + minY,
			  "MZ, " + BottomCutDepth,
			  "MY, " + ((BoxLength - 0.3) + BitRadius), 
			  "MX, " + ((BoxWidth - 0.55) + BitRadius),
			  "MY, " + minY,
			  "MX, " + minX,
			  "MZ, " + safeZ
			];
			var lid = headerCode.concat(lidPanel);
		    var lidCode = lid.join('\n');
			fabmoDashboard.submitJob(lidCode, {filename : 'PWBoxmaker_lid.sbp'}
			
			);
		  }
		else
		  {
			var Sides = [
			"MZ," + safeZ,
			"M2, " + minX + ", " + firstStepLeft,
			"MZ," + (ZStep * 4).toFixed(2),
			"MX," + FirstSlot,
			"MY," + (firstStepLeft + (StepSize * 3.75)).toFixed(2),
			"MY," + firstStepLeft,
			"MX," + SecondSlot,
			"MY," + (firstStepLeft + (StepSize * 3.75)).toFixed(2),
			"MY," + firstStepLeft,
			"MX," + maxX,
			"MZ," + (ZStep * 3).toFixed(2),
			"MY," + (firstStepLeft + (StepSize*1)).toFixed(2),
			"MX," + minX,
			"MZ," + (ZStep * 2).toFixed(2),
			"MY," + (firstStepLeft + (StepSize * 2)).toFixed(2),
			"MX," + maxX,
			"MZ," + (ZStep * 1).toFixed(2),
			"MY," + (firstStepLeft + (StepSize * 3)).toFixed(2),
			"MX," + minX,
			"' right end",
			"MZ," + safeZ,
			"M2," + minX + "," + firstStepRightSlots,
			"MZ," + (ZStep * 4).toFixed(2),
			"MX," + FirstSlot,
			"MY," + (firstStepRightSlots - (StepSize * 3.75)).toFixed(2),
			"MY," + firstStepRightSlots,
			"MX," + SecondSlot,
			"MY," + (firstStepRightSlots - (StepSize * 3.75)).toFixed(2),
			"MY," + firstStepRightSlots,
			"MX," + maxX,
			"MZ," + ( ZStep * 3).toFixed(2),
			"MY," + (firstStepRightSlots - (StepSize * 1)).toFixed(2),
			"MX," + minX,
			"MZ," + (ZStep * 2).toFixed(2),
			"MY," + (firstStepRightSlots - (StepSize * 2)),
			"MX," + maxX,
			"MZ," + (ZStep * 1).toFixed(2),
			"MY," + (firstStepRightSlots - (StepSize * 3)).toFixed(2),
			"MX," + minX,
			"' cut groove for bottom panel",
			"MZ," + safeZ,
			"M2," + (BoxHeight - BottomSlot).toFixed(2) + "," + minY,
			"MZ," + GrooveDepth,
			"MY," + maxY,
			"MX, " + ((BoxHeight - BottomSlot) + BottomDiff),
			"MY, " + minY,
			
			"' cut out part",
			"MZ," + BoxCutDepth,
			"MX," + maxX,
			// "VB, .1," + (BoxWidth / 4) + ",.4,.3,1,2",
			"MY," + minY,
			"MX," + minX,
			// "VB, .1," + (BoxWidth / 4) + ",.4,.3,1,2",
			"MY," + maxY,
			"MX," + maxX,
			"MY, " + minY,
			"MZ," + safeZ,
			"' Done"
			];
			var Side3 = [
			"MZ," + (ZStep * 4),
			"M23," + minX  + "," + firstStepLeft,
			"MX," + (FirstSlot - NubSideCut),
			"MZ," + (ZStep * 4),
			"MY," + (firstStepLeft  + (StepSize * 3)),
			"MZ," + NubHeight,
			"MX," + (FirstSlot + NubSideCut),
			"MZ," + (ZStep * 4),
			"MY," + firstStepLeft,
			"MX," + (SecondSlot - NubSideCut),
			"MY," + (firstStepLeft + (StepSize * 3)),
			"MZ," + NubHeight,
			"MX," + (SecondSlot + NubSideCut),
			"MZ," + (ZStep * 4),
			"MY," + firstStepLeft,
			"MX," + maxX,
			"MZ," + (ZStep * 3),
			"MY," + (firstStepLeft + (StepSize * 1)),
			"MX," + (SecondSlot + NubSideCut),
			"MZ," + NubHeight,
			"MX," + (SecondSlot - NubSideCut),
			"MZ," + (ZStep * 3),
			"MX," + (FirstSlot + NubSideCut),
			"MZ," + NubHeight,
			"MX," + (FirstSlot - NubSideCut),	
			"MZ," + (ZStep * 3),
			"MX," + minX,
			"MY," + (firstStepLeft + (StepSize * 2)),
			"MZ," + (ZStep * 2),
			"MX," + (FirstSlot - NubSideCut),
			"MZ," + NubHeight,
			"MX," + (FirstSlot + NubSideCut),
			"MZ," + (ZStep * 2),
			"MX," + (SecondSlot - NubSideCut),
			"MZ," + NubHeight,
			"MX," + (SecondSlot + NubSideCut),
			"MZ," + (ZStep * 2),
			"MX," + maxX,
			"MZ," + NubHeight,
			"MY," + (firstStepLeft + (StepSize * 3)),
			"MX," + minX,
			"MZ," + safeZ,
			
			"' now cut out right end", 
			
			"M2," + minX + "," + firstStepRightNubs,
			"MZ," + (ZStep * 4),
			"MX," + (FirstSlot - NubSideCut),
			"MY," + (firstStepRightNubs - (StepSize * 3)),
			"MZ," + NubHeight,
			"MX," + (FirstSlot + NubSideCut),
			"MZ," + (ZStep * 4),
			"MY," + firstStepRightNubs,
			"MX," + (SecondSlot - NubSideCut),
			"MY," + (firstStepRightNubs - (StepSize * 3)),
			"MZ," + NubHeight,
			"MX," + (SecondSlot + NubSideCut),
			"MZ," + (ZStep * 4),
			"MY," + firstStepRightNubs,
			"MX," + maxX,
			"MZ," + (ZStep * 3),
			"MY," + (firstStepRightNubs - StepSize),
			"MX," + (SecondSlot + NubSideCut),
			"MZ," + NubHeight,
			"MX," + (SecondSlot - NubSideCut),
			"MZ," + (ZStep * 3),
			"MX," + (FirstSlot + NubSideCut),
			"MZ," + NubHeight,
			"MX," + (FirstSlot - NubSideCut),
			"MZ," + (ZStep * 3),
			"MX," + minX,
			"MZ," + (ZStep * 2),
			"MY," + (firstStepRightNubs  - (StepSize * 2)),
			"MX," + (FirstSlot - NubSideCut),
			"MZ," + NubHeight,
			"MX," + (FirstSlot + NubSideCut),
			"MZ," + (ZStep * 2),
			"MX," + (SecondSlot - NubSideCut),
			"MZ," + NubHeight,
			"MX," + (SecondSlot + NubSideCut),
			"MZ," + (ZStep * 2),
			"MX," + maxX,
			"MZ," + NubHeight,
			"MY," + (firstStepRightNubs - (StepSize * 3)),
			"MX," + minX,
			"MZ," + safeZ,  
			"' groove for bottom ",
			
			"M2," + ( BoxHeight - BottomSlot) + ", " + minY,
			"MZ," + GrooveDepth,
			"MY," + maxSideLength,
			"MX, " + ((BoxHeight - BottomSlot) + BottomDiff),
			"MY, " + minY,
			
			"' cut out side panel",
			"MZ," + BoxCutDepth,
			"MX," + maxX,
			// "VB, .1," + (BoxLength / 4) + ",.4,.3,1,2",
			"MY," + minY,
			"MX," + minX,
			// "VB, .1," + (BoxLength / 4) + ",.4,.3,1,2",
			"MY," + maxSideLength,
			"MX," + maxX,
			"MY, " + minY,
			"MZ," + safeZ		
			];
			var Side4 = [
			
			
			"MZ," + safeZ,
			"M2," + minX +  "," + firstStepLeft,
			"MZ," + (ZStep * 4),
			"MX," + (FirstSlot - NubSideCut), 
			"MY," + (firstStepLeft + (StepSize * 3)), 
			"MZ," + NubHeight,
			"MX," + (FirstSlot + NubSideCut),
			"MZ," + (ZStep * 4),
			"MY," + firstStepLeft, 
			"MX," + (SecondSlot - NubSideCut), 
			"MY," + (firstStepLeft + (StepSize * 3)), 
			"MZ," + NubHeight,
			"MX," + (SecondSlot + NubSideCut), 
			"MZ," + (ZStep * 4),
			"MY," + firstStepLeft, 

			"MX," + maxX, 
			"MZ," + (ZStep * 3),
			"MY," + (firstStepLeft + (StepSize * 1)),
			"MX," + (SecondSlot + NubSideCut), 
			"MZ," + NubHeight,
			"MX," + (SecondSlot - NubSideCut), 
			"MZ," + (ZStep * 3),
			"MX," + (FirstSlot + NubSideCut), 
			"MZ," + NubHeight,
			"MX," + (FirstSlot - NubSideCut), 
			"MZ," + (ZStep * 3),
			"MX," + minX,  
			"MZ," + (ZStep * 2),
			"MY," + (firstStepLeft + (StepSize * 2)),
			"MX," + (FirstSlot - NubSideCut), 
			"MZ," + NubHeight,
			"MX," + (FirstSlot + NubSideCut), 
			"MZ," + (ZStep * 2),
			"MX," + (SecondSlot - NubSideCut), 
			"MZ," + NubHeight,
			"MX," + (SecondSlot + NubSideCut), 
			"MZ," + (ZStep * 2),

			"MX," + maxX, 
			"MZ," + NubHeight,
			"MY," + (firstStepLeft + (StepSize * 3)), 
			"MX," + minX,
			"MZ," + safeZ,
			// ' second end of side 2
			"M2," + minX + "," + firstStepRightNubs, 
			//If HasLid = 0 Then "M3,,, " + StepSize
			"MZ, " + (ZStep * 4),
			"MX," + (FirstSlot - NubSideCut),
			"MZ," + (ZStep * 4),
			"MY," + (firstStepRightNubs - (StepSize * 3)), 
			"MZ," + NubHeight,
			"MX," + (FirstSlot + NubSideCut),
			"MZ," + (ZStep * 4),
			"MY," + firstStepRightNubs,
			"MX," + (SecondSlot - NubSideCut), 
			"MY," + (firstStepRightNubs - (StepSize * 3)), 
			"MZ," + NubHeight,
			"MX," + (SecondSlot + NubSideCut), 
			"MZ," + (ZStep * 4),
			"MY," + firstStepRightNubs, 
			"MX," + maxX, 
			"MZ," + (ZStep * 3),
			"MY," + (firstStepRightNubs - (StepSize * 1)), 
			"MX," + (SecondSlot + NubSideCut), 
			"MZ," + NubHeight,
			"MX," + (SecondSlot - NubSideCut), 
			"MZ," + (ZStep * 3),
			"MX," + (FirstSlot + NubSideCut),
			"MZ," + NubHeight,
			"MX," + (FirstSlot - NubSideCut),
			"MZ," + (ZStep * 3),
			"MX," + minX, 
			"MY," + (firstStepRightNubs - (StepSize * 2)),
			"MZ," + (ZStep * 2),
			"MX," + (FirstSlot - NubSideCut), 
			"MZ," + NubHeight,
			
			"MX," + (FirstSlot + NubSideCut), 
			"MZ," + (ZStep * 2),
			"MX," + (SecondSlot - NubSideCut),
			"MZ," + NubHeight,
			"MX," + (SecondSlot + NubSideCut), 
			"MZ," + (ZStep * 2),
			"MX," + maxX,
			"MZ," + NubHeight,
			"MY," + (firstStepRightNubs - (StepSize * 3)), 
			"MX," + (FirstSlot - NubSideCut), 
			"MX," + minX, 
			"MZ," + safeZ,
			
            "' groove for bottom ",
        
			"M2," +  BottomSlot +  ", " + minY,
			"MZ," + GrooveDepth,
			"MY," + maxSideLength,
			"MX, " + (BottomSlot - BottomDiff),
			"MY, " + minY,
			
			"' cut out side panel",
			"MZ," + BoxCutDepth,
			"MX," + maxX,
			// "VB, .1," + (BoxLength / 4) + ",.4,.3,1,2",
			"MY," + minY,
			"MX," + minX,
			// "VB, .1," + (BoxLength / 4) + ",.4,.3,1,2",
			"MY," + maxSideLength,
			"MX," + maxX, 
			"MY, " + minY,
			"MZ," + safeZ,
			"' done"		
			];
			
			//if no lid then side1 and side2 are the same
			var first = headerCode.concat(Sides);
			var firstCode = first.join('\n');
				fabmoDashboard.submitJob(firstCode, {filename : 'PWBoxmaker_side1.sbp'} 
				);
				fabmoDashboard.submitJob(firstCode, {filename : 'PWBoxmaker_side2.sbp'}				
				);	
			
			var third = headerCode.concat(Side3);
			var thirdCode = third.join('\n');
				fabmoDashboard.submitJob(thirdCode, {filename : 'PWBoxmaker_Side3.sbp'}
										 
			 );	  
			 
			var fourth = headerCode.concat(Side4);
			var fourthCode = fourth.join('\n');
				fabmoDashboard.submitJob(fourthCode, {filename : 'PWBoxmaker_Side4.sbp'}
										
             );					
		   };
		   	
		// side 			

			var bottomPanel = [
				  "M2, " + minX + ", " + minY,
				  "MZ, " + BottomCutDepth,
				  "MY, " + ((BoxLength - 0.55) + BitRadius), 
				  "MX, " + ((BoxWidth - 0.55) + BitRadius),
				  "MY, " + minY,
				  "MX, " + minX,
				  "MZ, " + safeZ
				  ];
				  
			var bottom = headerCode.concat(bottomPanel);
		    var bottomCode = bottom.join('\n');
			fabmoDashboard.submitJob(bottomCode, {filename : 'PWBoxmaker_bottom.sbp'}
			
			);			
	    });		
	 }
);


